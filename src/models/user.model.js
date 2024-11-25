import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true //this make the field searchable
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String, 
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinry url
            required: true
        },
        coverImage:{
            type: String,
        },
        watchHistory : [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type : String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

// userSchema.pre("save", ()=> {}) DONT WRITE CALLBACK LIKE THIS BECOZ ARROW FUNCTION DOES NOT HAVE THIS reference// save is  an event we also have remove update etc
userSchema.pre("save", async function (next) { //this is async becoz encryption takes time
    if(!this.isModified("password")) return next(); //this will return next if password is not modified otherwise if modified it will encrypt new password again

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// methods to check if password is correct when importing user 

userSchema.methods.isPasswordCorrect = async function(password) {
    await bcrypt.compare(password, this.password) //return true or false
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this._email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefershToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)
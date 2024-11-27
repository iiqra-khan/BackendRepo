import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js" //this user is created with mongoose it can directly interact with the database
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

let registerUser = asyncHandler(async (req, res)=> {
    // res.status(200).json({
    //     message: "ok"
    // })


    // get user details from frontend
    // validation - not empty
    // check if user exists: username, email
    // check for images. check for avatar
    // upload them to cloudinary, avatar
    // create user object(for mongodb as it is nosql) - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return res, else error



    const {fullName, email, username, password} = req.body;
    // console.log(req.body);
    
    // console.log("email: ", email);

    //if (fullName === ""){
      //  throw new ApiError(400, "fullname is required");  
   // } //BEGINNER FRNDLY WAY TO CHECK
    if (
        [fullName, email, username, password].some((field)=> field?.trim === "")
        //also .every() that returns true only if all elements satisfy the condition
    ){
        throw new ApiError(400, "All fields are required")
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(email)){
        throw new ApiError(400, "Invalid Email Address")
    }
    
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    // console.log(existedUser);
    
    if(existedUser){
        throw new ApiError(409, "User with email or username exists")
    }
    // console.log(req.files);
    
    const avatarLocalPath = req.files?.avatar[0]?.path;

    console.log(avatarLocalPath);
    
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar field is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400, "Avatar field is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url, //read cloudinary docs for upload object
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

})


export {registerUser}
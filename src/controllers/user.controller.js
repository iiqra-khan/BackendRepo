import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res)=> {
    rs.status(200).json({
        message: "ok"
    })
})


export {registerUser}
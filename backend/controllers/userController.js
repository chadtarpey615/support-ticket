const asyncHandler = require("express-async-handler")
// @desc regster new user
// @route /api/user
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password)
    {
        res.status(400)
        throw new Error("Please include all fields")
    }
    res.send("Register Route")
})

// @desc login user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.send("Login Route")
})

module.exports = {
    registerUser,
    loginUser
}
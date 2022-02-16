const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")



// @desc get  user tickets
// @route  get /api/tickets/
// @access private
const getTickets = asyncHandler(async (req, res) => {
    // get user from id and jwt

    const user = await User.findById(req.user.id)

    if (!user)
    {
        res.status(401)
        throw new Error("User not found")
    }

    const tickets = await Ticket.find({ user: req.user.id })

    const user = await User.findById(req.user.id)

    if (!user)
    {
        res.status(401)
        throw new Error("User not found")
    }


    res.status(20).json(tickets)

})


// @desc create new tickets
// @route post /api/tickets/
// @access private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description)
    {
        res.status(400)
        throw new Error("Please add product and description")
    }

    if (!user)
    {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "new"
    })
    res.status(201).json(ticket)
})

module.exports = {
    getTickets,
    createTicket
} 
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





    res.status(20).json(tickets)

})

// route GET /api/tickets/:id

const getUserTicket = asyncHandler(async (req, res) => {
    // get user from id and jwt

    const user = await User.findById(req.user.id)

    if (!user)
    {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)


    if (!ticket)
    {
        res.status(404)
        throw new Error("ticket not found")
    }

    if (ticket.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error("not authorized")
    }




    res.status(201).json(tickets)

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

    const user = await User.findById(req.user.id)

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

// @desc delete tickets
// @route delete /api/tickets/:id
// @access private

const deleteTicket = asyncHandler(async (req, res) => {
    // get user from id and jwt

    const user = await User.findById(req.user.id)

    if (!user)
    {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)


    if (!ticket)
    {
        res.status(404)
        throw new Error("ticket not found")
    }



    if (ticket.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error("not authorized")
    }
    await ticket.remove()




    res.status(201).json({ success: true })

})

// @desc update tickets
// @route put /api/tickets/:id
// @access private

const updateTicket = asyncHandler(async (req, res) => {
    // get user from id and jwt

    const user = await User.findById(req.user.id)

    if (!user)
    {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)


    if (!ticket)
    {
        res.status(404)
        throw new Error("ticket not found")
    }



    if (ticket.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error("not authorized")
    }


    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })




    res.status(201).json(updateTicket)

})



module.exports = {
    getTickets,
    getUserTicket,
    createTicket,
    deleteTicket,
    updateTicket

} 
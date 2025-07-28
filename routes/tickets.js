const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');

router.post('/', auth, async (req, res) => {

    const { title, issue, priority } = req.body;
    console.log(req.user._id);
    try {
        const ticket = new Ticket({
        title,
        issue,
        priority,
        userId: req.user._id
        });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error creating ticket' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ userId: req.user._id }).populate('userId', 'username');
        res.json(tickets);
    }catch(err) {
        res.status(500).json({ error : 'Error fetching tickets' }); 
    };
});

router.get('/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('userId', 'username');
        
        if(!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        
        res.json(ticket);
    }catch(err) {
        res.status(500).json({ error: 'Error ticket' });
    }
});

router.put('/:id/update', auth, async (req, res) => {
    const { title, issue, priority, status } = req.body;
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { title, issue, priority, status, updatedAt: new Date() },
            { new: true }
        );
        
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error updating ticket' });
    }
});

router.delete('/:id/delete', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if(!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json({ message : 'Ticket deleted successfully' });
    }catch(err) {
        res.status(500).json({ error: 'Error deleting ticket' });
    }
});

module.exports = router;
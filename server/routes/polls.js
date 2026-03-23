const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// @route   POST /api/polls
// @desc    Create a new poll
// @access  Public (in real app, should be Private/Faculty only)
router.post('/', async (req, res) => {
    const { question, options, facultyId } = req.body;

    if (!question || !options || options.length < 2) {
        return res.status(400).json({ message: 'Valid question and at least 2 options required' });
    }

    try {
        const formattedOptions = options.map(opt => ({ text: opt, votes: 0 }));
        
        const newPoll = new Poll({
            question,
            options: formattedOptions,
            createdBy: facultyId
        });

        await newPoll.save();
        res.status(201).json(newPoll);
    } catch (error) {
        console.error('Error creating poll:', error);
        res.status(500).json({ message: 'Server error creating poll' });
    }
});

// @route   GET /api/polls/active
// @desc    Get all active polls
// @access  Public
router.get('/active', async (req, res) => {
    try {
        const polls = await Poll.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(polls);
    } catch (error) {
        console.error('Error fetching polls:', error);
        res.status(500).json({ message: 'Server error fetching polls' });
    }
});

// @route   POST /api/polls/:id/vote
// @desc    Vote on a poll
// @access  Public (in real app, should be Private/Student only)
router.post('/:id/vote', async (req, res) => {
    const { optionId, studentId } = req.body;

    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (!poll.isActive) {
            return res.status(400).json({ message: 'Poll is closed' });
        }

        if (poll.voters.includes(studentId)) {
            return res.status(400).json({ message: 'You have already voted on this poll' });
        }

        const option = poll.options.id(optionId);
        if (!option) {
            return res.status(404).json({ message: 'Option not found' });
        }

        option.votes += 1;
        poll.voters.push(studentId);
        await poll.save();

        res.json({ message: 'Vote recorded successfully', poll });
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ message: 'Server error recording vote' });
    }
});

// @route   PUT /api/polls/:id/close
// @desc    Close a poll
// @access  Public (in real app, should be Private/Faculty only)
router.put('/:id/close', async (req, res) => {
    try {
        const poll = await Poll.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }
        res.json(poll);
    } catch (error) {
        console.error('Error closing poll:', error);
        res.status(500).json({ message: 'Server error closing poll' });
    }
});

module.exports = router;

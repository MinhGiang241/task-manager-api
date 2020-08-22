const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const tasks = require('../models/task')


router.post('/tasks', auth, async(req, res) => {
    // const Task = new tasks(req.body)
    const Task = new tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await Task.save()
        res.status(201).send(Task)
    } catch (e) {
        res.status(400).send(e)
    }
    await Task.save()
})


router.get('/tasks', auth, async(req, res) => {
    const match = {}
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        //const Task = await tasks.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            // match:{completed:true}
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                //sort: {completed: 1 || createdAt :1}
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        // const Task = await tasks.findById(_id)
        const Task = await tasks.findOne({ _id, owner: req.user._id })
        if (!Task) {
            return res.status(404).send()
        }
        res.send(Task)
    } catch (e) {
        res.status(500).send()
    }

})

router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'complete']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))


    if (!isValidOperation) {

        return res.status(400).send({ error: 'Invalid Update' })
    }

    try {
        const Task = await tasks.findOne({ _id: req.param.id, owner: req.user._id })

        if (!Task) {
            return res.status(404).send()
        }

        updates.forEach((update) => Task[update] = req.body[update])
        await Task.save()
        res.send(Task)


    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {

    try {
        const task = await tasks.findOneAndDelete({ _id: req.param.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
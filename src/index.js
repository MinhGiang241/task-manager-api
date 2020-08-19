const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT


const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')


app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) { //!file.originalname.endsWith('.pdf')
//             return cb(new Error('Please upload a Word document'))
//         }

//         cb(undefined, true)


//         // cb(new Error('File must be PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }

// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }


// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (err, req, res, next) => {
//     res.status(400).send({ error: err.message })
// })



// const User = require('./models/user')
// const Task = require('./models/task')
// const main = async() => {
//     const user = await User.findById('5f3209b85049803794321dd8')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

//     // const task = await Task.findById('5f32116b7349f7186ce6dcce')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
// }
// main()

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     return {     }
// }

// console.log(JSON.stringify(pet))

// const jwt = require('jsonwebtoken')


// const myFunction = async() => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()
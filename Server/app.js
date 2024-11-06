const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Server } = require('socket.io')
const { type } = require('os')
require('dotenv').config()

const app = express()
const { Schema, model } = mongoose
const jwtSecret = process.env.JWT_SECRET;

//middlewares
app.use(express.json())
app.use(cors())

// database connection
mongoose.connect('mongodb+srv://abdumh:AmhkbwgA@cluster0.rfkxh.mongodb.net/cms', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('error connecting to mongodb', err))

// Schemas

const userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role:{type: String, default: 'user'},
    createdAt: {type: Date, default: Date.now}
})

userSchema.index({ email: 1 }, { unique: true }) // this is added so that the email becomes unique

//hashing password with bcrypt
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt) 
    next()
})
// end of hashing


const complaintSchema = new Schema({
    department: {type: String, required: true},
    severity: {type: String, required: true},
    description: {type: String, required: true},
    reporter: {type: String},
    status: {type: String, default: 'unread'},
    createdAt: {type: Date, default: Date.now}
})

const departmentSchema = new Schema({
    name: {type: String, required: true},
    head: {type: String, required: true},
    members: {type: Array, required: true},
    createdAt: {type: Date, default: Date.now}
})

const User = model('User', userSchema)
const Complaint = model('Complaint', complaintSchema)
const Department = model('Department', departmentSchema)

// Routes

app.get('/userList', async (req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/complaintList', async (req, res) => {
    try {
        const complaints = await Complaint.find()
        res.json(complaints)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/unreadedcomplaintList', async (req, res) => {
    try {
        const complaints = await Complaint.find({status: 'unread'})
        res.json(complaints)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/departmentList', async (req, res) => {
    try {
        const departments = await Department.find()
        res.json(departments)
    } catch (error) {
        res.status(500).json(error)
    }
})
 
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})

        //check if user exists
        if( !user ) return res.status(400).json({message: 'The user does\'t exist'})
        
        //compare the password
        const isMatch = await bcrypt.compare(password, user.password)

        //check if password matches
        if( !isMatch ) return res.status(400).json({message: 'Invalid credentials'})

        // generate jwt 
        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: '1h'})
        res.json({token, email, fname: user.fname, role: user.role})
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
          res.status(400).json({ error: 'Email already exists' });
        } else {
          res.status(400).json(error);
        }
      }
})

app.post('/complaint', async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body)
        const savedComplaint = await newComplaint.save()
        res.status(201).json(savedComplaint)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/department', async (req, res)=> {
    try {
        const newDepartment = new Department(req.body)
        const savedDepartment = await newDepartment.save()
        res.status(201).json(savedDepartment)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/departments', async (req, res) => {
    try {
        const deps = await Department.insertMany(req.body)
        res.status(201).json(deps)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/deleteDepartment', async (req, res) => {
    try {
        const deleteDep = await Department.deleteOne(req.body)
        res.status(200).json(deleteDep)
    } catch (error) {
        res.status(400).json(error)
    }
})


// chat app 
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ['POST']
  }
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('chat message', msg => {
    

    socket.broadcast.emit('chat message', msg)
  })
  socket.on('disconnect', ()=>{
    console.log('disconnected')
  })

})

app.listen(2005, () => console.log('server listening on port 2005...'))
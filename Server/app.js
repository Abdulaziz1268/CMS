const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Server } = require('socket.io')
const { type } = require('os')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()
const { Schema, model } = mongoose
const jwtSecret = process.env.JWT_SECRET;

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Replace this with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // If you're using cookies or authentication
}));

app.use('/uploads', express.static('uploads'))

// database connection
mongoose.connect('mongodb+srv://abdumh:AmhkbwgA@cluster0.rfkxh.mongodb.net/cms', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
// mongoose.connect('mongodb://localhost:27017/CMS', {
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// })
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
    fileUrl: {type: String},
    status: {type: String, default: 'unread'},
    createdAt: {type: Date, default: Date.now},
    solution: {type: String, default: 'Not solved yet'}
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

//configuring multer storage
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

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

// app.get('/unreadedcomplaintList', async (req, res) => {
//     try {
//         const complaints = await Complaint.find({status: 'unread'})
//         const complaintsWithFilePath = complaints.map(complaint => {
//             const filePath = path.join(__dirname, complaint.fileUrl)
//             if(fs.existsSync(filePath)){
//                 return { ...complaint._doc, filePath}
//             } else {
//                 return { ...complaint._doc }
//             }
//         })

//         res.json(complaintsWithFilePath)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

app.get('/unreadedcomplaintList', async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: 'unread' });

        const complaintsWithFilePath = complaints.map(complaint => {

            if (complaint.fileUrl && typeof complaint.fileUrl === "string") {
                // Construct the file path based on each complaint's fileUrl
                const filePath = path.join(__dirname, complaint.fileUrl);

                // Check if the file exists in the filesystem
                if (fs.existsSync(filePath)) {
                    return { ...complaint._doc, filePath };
                }
            }
            return { ...complaint._doc };
        });

        res.status(200).json(complaintsWithFilePath);
    } catch (error) {
        console.error("Error retrieving complaints:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});


app.get('/departmentList', async (req, res) => {
    try {
        const departments = await Department.find()
        res.json(departments)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/getDepHead/:name', async (req, res) => {
    const {name} = req.params
    try {
        const depHead = await Department.find({head: name})
        res.status(200).json(depHead)
    } catch (error) {
        res.status(404).json(error)
    }
})

// app.get('/file/:fileUrl', async (req, res) => {
//     try {
//         const { fileUrl } = req.params
//         const response = await Complaint.find({ fileUrl })

//         if(!file){
//             return res.status(404).json({message: "File not found"})
//         }

//         const filePath = path.join(__dirname, response.filePath)

//         if(fs.existsSync(filePath)){
//             return res.status(404).json({ message: "File not found on server"})
//         }

//         res.status(200).json(filepath)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// })
 
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

app.post('/complaint', upload.single('file'), async (req, res) => {
    const { department, severity, description, reporter} = req.body
    const fileUrl = req.file ? req.file.path : null
    try {
        const newComplaint = new Complaint({
            department, severity, description, fileUrl, reporter
        })
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

app.delete('/deleteDepartment/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteDep = await Department.deleteOne({ _id: id })
        res.status(200).json(deleteDep)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/deleteUser/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await User.deleteOne({ _id: id })
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.patch('/userList/:id', async (req, res) => {
    const { id } = req.params; // Retrieve id from route parameters
    const updateData = req.body; // Data to update

    try {
        const updateUser = await User.updateOne(
            { _id: id },              // Use `_id` if `id` is the MongoDB ObjectID
            { $set: updateData }       // Spread the update data correctly inside `$set`
        );

        if (updateUser.nModified === 0) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }

        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.patch('/updateDepartment/:id', async (req, res) => {
    const{ id } = req.params
    const updateData = req.body
    try {
        const updateDep = await Department.updateOne(
            {_id: id},
            {$set: updateData}
        )
        if(updateDep.nModified === 0){
            res.status(404).json({error: "Department not found or no changes made"})
        }
        res.status(200).json(updateDep)
    } catch (error) {
        res.status(404).json(error)
    }
})

app.patch('/updateUser/:id', async (req, res) => {
    const{ id } = req.params
    const updateData = req.body
    try {
        const updateUser = await User.updateOne(
            {_id: id},
            {$set: updateData}
        )
        if(updateUser.nModified === 0){
            res.status(404).json({error: "Department not found or no changes made"})
        }
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

app.put('/solution/:id', async (req, res) => {
    const {id} = req.params
    const {solution} = req.body
    console.log(id, solution)
    try {
        const response = await Complaint.updateOne(
            {_id: id},
            {$set: {solution, status: 'read'}}
        )
        if(response.nModified === 0){
           return res.status(404).json({error: "complaint not found or no changes made"})
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({ err: "not posting", error})
    }
})



// chat app 
// const server = http.createServer(app)
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ['POST']
//   }
// })

// io.on('connection', socket => {
//   console.log('a user connected')

//   socket.on('chat message', msg => {
    

//     socket.broadcast.emit('chat message', msg)
//   })
//   socket.on('disconnect', ()=>{
//     console.log('disconnected')
//   })

// })

app.listen(2005, () => console.log('server listening on port 2005...'))
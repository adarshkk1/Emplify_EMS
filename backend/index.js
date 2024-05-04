const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Employee = require('./models/employee');
const Userdetails = require('./models/userdetails');
const Leave = require('./models/leave');
const cors = require('cors');
app.use(cors());


app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/emsapp', {
}).then(
    () => console.log('Connected to MongoDB')
).catch(err => console.log(err));
// //add employee
app.post('/addemployee', async (req, res) => {
    const { firstname, lastname, email, birthdate, gender, education, company, department, jobExperience, salary, profile } = req.body

    try {
        const newData = new Employee({ firstname, lastname, email, birthdate, gender, education, company, department, jobExperience, salary, profile });
        newData.save();
        return res.json(await Employee.find())
    } catch (err) {
        console.log(err.message);
    }
})
// allemployee
app.get('/getallemployee', async (req, res) => {
    try {
        const allData = await Employee.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }
})


// single employee by id
app.get('/getallemployee/:id', async (req, res) => {
    try {
        const Data = await Employee.findById(req.params.id)
        return res.json(Data);
    }
    catch (err) {
        console.log(err.message);
    }
})

//delete employee
app.delete('/deleteemployee', async (req, res) => {
    const id = req.body;
    try {
        await Employee.deleteOne({ _id: id.id })
        res.send({ success: true })
    }
    catch (err) {
        console.log(err.message);
        res.send({ success: false })
    }
})

// update employee
app.put('/updateemployee', async (req, res) => {
    const employee = req.body;

    try {
        await Employee.findOneAndUpdate({ _id: employee._id }, 
            {
                $set: {
                    firstname: employee.firstname,
                    lastname: employee.lastname,
                    email:employee.email,
                    birthdate: employee.birthdate,
                    gender: employee.gender,
                    education: employee.education,
                    company: employee.company,
                    department: employee.department,
                    jobExperience: employee.jobExperience,
                    salary: employee.salary,
                    profile: employee.profile
                }
            })
        res.send({success:true})
    }
    catch (err) {
        console.log(err.message);
        res.send({success:false})
    }
})

//Userdetails
//adduser
app.post('/adduser', async (req, res) => {
    const { name, emailId, mobileNo, password } = req.body

    try {
        const newData = new Userdetails({ name, emailId, mobileNo, password });
        newData.save();
        return res.json(await Userdetails.find())
    } catch (err) {
        console.log(err.message);
    }
})

//getuser
app.get('/getalluser', async (req, res) => {

    try {
        const allData = await Userdetails.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }
})

//get one user

app.get('/getalluser/:id', async (req, res) => {
    try {
        const Data = await Userdetails.findById(req.params.id)
        return res.json(Data);
    }
    catch (err) {
        console.log(err.message);
    }
})


app.post('/addLeave', async (req, res) => {
    const leave = req.body;

    try {
        const newLeave = new Leave(leave);
        await newLeave.save();
        return res.json(await Leave.find())
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/getLeaves', async (req, res) => {

    try {
        const allData = await Leave.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }
})

app.get('/getalluser/:id', async (req, res) => {
    try {
        const Data = await Leave.findById(req.params.id)
        return res.json(Data);
    }
    catch (err) {
        console.log(err.message);
    }
})

app.put('/updateLeave', async (req, res) => {

    const updatedLeave = req.body;

    try {
        await Leave.findOneAndUpdate({ _id: updatedLeave._id }, {
            $set: {
                name: updatedLeave.name,
                emailId: updatedLeave.emailId,
                startdate: updatedLeave.startdate,
                enddate: updatedLeave.enddate,
                reason: updatedLeave.reason,
                status: updatedLeave.status
            }

        });
        res.send({ success: true })

    } catch (err) {
        console.log(err);
        res.send({ success: false })
    }
});


app.listen(8000, () => console.log('Server started at port : 8000'));


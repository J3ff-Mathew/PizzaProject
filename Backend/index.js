const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const jwtSecretKey = "jeffffejjeffffej"
const userModule = require("./templates/UserTemplate");
const menuModule = require("./templates/MenuTemplate");
const orderModule = require("./templates/OrderTemplate");


const PORT = 6969;
const database = "mongodb://localhost:27017/CrazyFoodie";
const app = express();
const connectDB = async () => {
    try {
        await mongoose.connect(database, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
connectDB();
async function validateToken(req, res, next) {
    // console.log(req.headers)
    if (req.headers['authorization']) {
        let authHeader = await req.headers['authorization'];
        authHeader = authHeader.split(' ');
        // console.log(authHeader)
        let token = authHeader[1]
        // console.log(token);
        if (token != undefined) {
            jwt.verify(token, jwtSecretKey, (err, data) => {
                if (err) {
                    res.json({ err: 1, message: "Token not valid" });
                }
                else {
                    console.log("token valid")
                    next();
                }
            })
        }
    }
}
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'clashparadise7@gmail.com',
        pass: 'clashparadise7@123'
    }
});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.post('/adduser', async (req, res) => {
    let insert = await new userModule({ name: req.body.name, phone: req.body.phone, email: req.body.email, password: req.body.password });
    insert.save((err) => {
        if (err) {
            console.log(err)
            res.send({ error: "Email Already Exists in database" });
        }
        else
            res.send({ error: "" })
    });
});

app.get('/getUser/:email/:pass', async (req, res) => {
    let email = req.params.email;
    let pass = req.params.pass;
    userModule.findOne({ email: email, password: pass }, (err, data) => {
        console.log(data);
        if (err) {
            throw err;
        }
        console.log(data != null)
        if (data != null) {
            let payload = { data };
            const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 1000 * 60 * 60 * 24 });
            res.send(token);
        } else {
            res.send(false);
        }
    });
});

app.get('/getMenu', validateToken, async (req, res) => {
    console.log("In menu")
    menuModule.find({}, (err, data) => {
        if (err)
            throw err;
        res.send(data);
        // console.log(data);

    });
});

app.post('/addorder', validateToken, (req, res) => {
    console.log("hello world");
    console.log(req.body);
    let items = req.body.items;
    const insert = new orderModule(req.body);
    insert.save((err) => {
        if (err)
            res.send({ error: "Opps Faced An Error" });
        else {
            let mailTemplate = `<!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Render Employee</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    </head>

<body>
            <h1 style={{ fontSize: '3rem', marginTop: '2rem' }}>User Details</h1>
                    <div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr >
                                    <th className='px-4 py-2'>Name</th>
                                    <th className='px-4 py-2'>Email</th>
                                    <th className='px-4 py-2'>Phone</th>
                                    <th className='px-4 py-2'>Grand Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='px-4 py-2'>${req.body.username}</td>
                                    <td className='px-4 py-2'>${req.body.email}</td>
                                    <td className='px-4 py-2'>${req.body.phone}</td>

                                    <td className="text-success px-4 py-2"> &#8377;${req.body.total}/-</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <h1 style={{ fontSize: '3rem', marginTop: '2rem' }}>Order Details</h1>
                    <Container>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr >
                                    <th className='px-4 py-2'>Item Name</th>
                                    <th className='px-4 py-2'>Price</th>
                                    <th className='px-4 py-2'>Quantity</th>
                                    <th className='px-4 py-2'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map(ele =>
                `<tr>
                    <td className='px-4 py-2'>${ele.name}</td>
                    <td className='px-4 py-2'>&#8377;${ele.price}</td>
                    <td className='px-4 py-2'>${ele.quantity}</td>

                    <td className=" px-4 py-2"> &#8377;${parseInt(ele.price) * parseInt(ele.quantity)}/-</td>
                </tr>`)}

                            </tbody>
                        </Table>
                    </Container>
                </body>
                </html>`;

            const mailData = {
                from: 'clashparadise7@gmail.com',  // sender address
                to: req.body.email,   // list of receivers
                subject: 'Pizza order reciept',
                text: 'Pizza order Reciept',
                html: mailTemplate
            };
            transporter.sendMail(mailData, (err, data) => {
                if (err)
                    console.log(err)
                else
                    console.log(data)
            })
            res.send({ error: "" })
        }
    });
});


app.listen(PORT, (err) => {
    if (err)
        throw err;
    console.log(`Working on Port ${PORT}`);
})
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const InventoryModel = require('./models/inventory');
const customerModel = require('./models/customer');
const checkExistingCustomer = require('./utility/checkExistingCustomer');
const orderModel = require('./models/order');

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set EJS as templeting engine
app.set('view engine', 'ejs');

// Mongoose connect
mongoose.connect('mongodb://localhost/api_web_tech_assignment', () => {
    console.log('connected to db api_web_tech_assignment');
});

app.post('/addinventory', (req, res) => {
    const inventory = new InventoryModel({
        inventory_id: req.body.inventory_id,
        inventory_type: req.body.inventory_type,
        item_name: req.body.item_name,
        available_quantity: req.body.available_quantity
    })

    inventory.save().then(() => {
        console.log('Inventory Added');
        res.send('Inventory Added');
    }).catch(err => {
        console.log(err)
    });
});

app.post('/addcustomer', async (req, res) => {
    console.log(req.body.email)
    console.log(await checkExistingCustomer(req.body.email))
    if(await checkExistingCustomer(req.body.email)) {
        res.status(200).send('Email Already Exists');
    } else {
        const customer = new customerModel({
            customer_id: req.body.customer_id,
            customer_name: req.body.customer_name,
            email: req.body.email
        });
    
        customer.save().then(() => {
            console.log('Customer Added');
            res.status(200).send('Customer Added');
        }).catch(err => {
            console.log(err)
        });
    }
})

app.post('/addorder', (req, res) => {
    const order = new orderModel({
        customer_id: req.body.customer_id,
        inventory_id: req.body.inventory_id,
        item_name: req.body.item_name,
        quantity: req.body.quantity
    })

    order.save().then(() => {
        console.log('order Added');
        res.send('order Added');
    }).catch(err => {
        console.log(err)
    });
});

app.get('/inventory', (req, res) => {
    // let data1 = "";
    // let data2 = ""
    // function getData(model1, model2) {
    //     model1.find((err, docs1) => {
    //     data1 = docs1;
    //     })
    //     model2.find((err, docs1) => {
    //     data2 = docs1;
    //     })
    // }

            InventoryModel.find((err, docs1) => {
            data1 = docs1; 
            res.render('inventory', {data: docs1});
        });
    // async () => {
    //     await getData(InventoryModel, customerModel);
    //     res.render('inventory', {data1: data1, data2: data2});
    // }
})

app.get('/customer', (req, res) => {
    customerModel.find((err, docs) => {
        res.render('customer', {data: docs});
    });
});

app.listen(3001, () => {
    console.log('connected to server 3001')
})
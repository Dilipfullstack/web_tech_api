const customerModel = require('../models/customer');

const checkExistingCustomer = async (email) => {
    let existingCustomer = false;
    await customerModel.find({ email: email}).then((customerData) => {
        if(customerData.length) {
            existingCustomer = true;
        }
    });
    return existingCustomer;
};

module.exports = checkExistingCustomer;
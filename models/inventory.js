const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    inventory_id: String,
    inventory_type: String,
    item_name: String,
    available_quantity: String
});

const InventoryModel = mongoose.model('InventoryModel', inventorySchema);

module.exports = InventoryModel;
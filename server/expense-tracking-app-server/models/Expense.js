const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    issuedOn: {
        type: Date,
        required: true
    },
    details: [
        {
            title: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            },           
            notes: {
                type: String,
                required: true
            },
        },
    ],
});

const ExpenseModel = mongoose.model("expenses", ExpenseSchema);

module.exports = ExpenseModel;

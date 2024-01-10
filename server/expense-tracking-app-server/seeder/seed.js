const mongoose = require("mongoose");
const Chance = require("chance");

mongoose.connect("mongodb://localhost:27017/expense-tracker", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("Connected to the database");

    const ExpenseModel = require("../models/Expense");
    const chance = new Chance();

    const categories = ["groceries", "utilities", "transportation", "entertainment"];

    // Create a function for inserting or updating expenses
    const insertOrUpdateExpense = async (issuedOn, details) => {
        const existingExpense = await ExpenseModel.findOne({ "issuedOn": issuedOn });

        if (existingExpense) {
            existingExpense.details.push(details);
            return existingExpense.save();
        } else {
            return ExpenseModel.create({ issuedOn, details });
        }
    };

    const dummyData = Array.from({ length: 100 }, () => {
        const issuedOn = chance.date({ year: 2022 });
        const details = {
            title: chance.sentence(),
            amount: chance.integer({ min: 1, max: 1000 }),
            category: chance.pickone(categories),
            notes: chance.sentence(),
        };

        // Use the function to insert or update expenses
        return insertOrUpdateExpense(issuedOn, details);
    });

    // Wait for all promises to resolve
    try {
        await Promise.all(dummyData);
        console.log("Dummy data inserted successfully");
        db.close();
    } catch (error) {
        console.error("Error inserting dummy data:", error);
        db.close();
    }
});

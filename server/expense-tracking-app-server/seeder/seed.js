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

    const dummyData = Array.from({ length: 100 }, () => ({
        issuedOn: chance.date({ year: 2022 }),
        details: {
            title: chance.sentence(),
            amount: chance.integer({ min: 1, max: 1000 }),
            category: chance.pickone(categories),
            notes: chance.sentence(),
        },
    }));

    (async () => {
        for (const data of dummyData) {
            const existingExpense = await ExpenseModel.findOne({ "issuedOn": data.issuedOn });

            if (existingExpense) {
                existingExpense.details.push(data.details);
                await existingExpense.save();
            } else {
                await ExpenseModel.create(data);
            }
        }

        console.log("Dummy data inserted successfully");
        db.close();
    })().catch((error) => {
        console.error("Error inserting dummy data:", error);
        db.close();
    });
});

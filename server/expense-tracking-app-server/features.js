const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const ExpenseModel = require("./models/Expense")

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["https://expense-tracker-eight-lime.vercel.app/"],
        methods: ["POST", "GET", "DELETE", "PUT"],
        credentials: true
    }
))

mongoose.connect("mongodb+srv://shuvomonowar:admin@cluster0.4cjvgtq.mongodb.net/expense-tracker?retryWrites=true&w=majority")

app.post("/record", async (req, res) => {
    const { title, amount, category, issuedOn, notes } = req.body;

    try {
        const existingExpense = await ExpenseModel.findOne({ "issuedOn": issuedOn });

        if (existingExpense) {
            existingExpense.details.push({
                title: title,
                amount: amount,
                category: category,
                notes: notes
            });

            const updatedExpense = await existingExpense.save();
            res.json(updatedExpense);
        } else {
            const newExpense = await ExpenseModel.create({
                issuedOn: issuedOn,
                details:{
                    title: title,
                    amount: amount,
                    category: category,
                    notes: notes
                }
            });

            res.json(newExpense);
        }
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/record", async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        let query = {};

        if (startDate && endDate) {
            query = {
                issuedOn: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            };
        }

        const expenses = await ExpenseModel.find(query).sort({ issuedOn: 1 });

        if (expenses.length > 0) {
            res.json(expenses);
        } else {
            res.status(404).json({ message: "No expenses found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/record/:recordId/:detailId", async (req, res) => {
    const { recordId, detailId } = req.params;

    try {
        const existingExpense = await ExpenseModel.findById(recordId);

        if (!existingExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        existingExpense.details.pull(detailId);

        if (existingExpense.details.length === 0) {
            await ExpenseModel.findByIdAndDelete(recordId);
        } else {
            await existingExpense.save();
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/record", async (req, res) => {
    const { title, amount, category, issuedOn, notes, details_index } = req.body;

    try {
        const existingExpense = await ExpenseModel.findOne({ "issuedOn": issuedOn });

        if (!existingExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        const detailToUpdate = existingExpense.details[details_index];

        if (!detailToUpdate) {
            return res.status(404).json({ message: "Expense detail not found" });
        }

        detailToUpdate.title = title;
        detailToUpdate.amount = amount;
        detailToUpdate.category = category;
        detailToUpdate.notes = notes;

        await existingExpense.save();

        res.json({ message: "Expense updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  
module.exports = app;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Secure-CRUD API is running 🚀");
});

// Simple Schema
const TaskSchema = new mongoose.Schema({
    title: String
});

const Task = mongoose.model("Task", TaskSchema);

// CREATE
app.post("/tasks", async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

// READ
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTask);
});

app.listen(5000, () => console.log("Server running on port 5000"));
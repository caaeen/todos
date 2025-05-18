const express = require("express");
const app = express();
const cors = require("cors");
// similar sya sa php wherein u require the dbcon.php file
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req body


//ROUTES


//create todo
//POST GET PUT DELETE 

app.post("/todos", async(req, res)=>{
    try {
        console.log(req.body)
        const { todo } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [todo]);
        res.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
})

//get todo
app.get("/show", async(req,res)=>{
    try {
        const showTodo = await pool.query("SELECT * FROM todo");
        res.json(showTodo.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/show/:id", async(req,res)=>{
    try {
        const { id } = req.params;
        const showTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(showTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//update todo


app.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { todo } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [todo, id]);
        res.json("todo was updated");
    } catch (error) {
        console.log(error.message);
    }
});

//delete todo

app.delete("/delete/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("DELETED");
    } catch (error) {
        console.log(error.message);
    }
});








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

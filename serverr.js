const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

// create student
app.post("/postUser", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const newTodo = await pool.query(
      "INSERT INTO student (firstname,lastname) VALUES($1,$2)",
      [firstname,lastname]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all students

app.get("/getStudents", async (req, res) => {
  try {
    const allStudents = await pool.query("SELECT * FROM student");
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/getStudents/:first", async (req, res) => {
  try {
    const firstname = req.params.first;
    console.log(firstname)
    const allStudents = await pool.query("SELECT * FROM  student WHERE firstname = $1", [
      firstname
    ]);
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// create book
app.post("/postBook", async (req, res) => {
    try {
        const book_name = req.body.book_name;
        const book_author = req.body.book_author;
        const book_borrowedby=req.body.book_borrowedby;
        const date_ofborrow=req.body.date_ofborrow;
        const expected_return=req.body.expected_return;
      const newTodo = await pool.query(
        "INSERT INTO book (book_name,book_author,book_borrowedby,date_ofborrow,expected_return) VALUES ($1,$2,$3,$4,$5)",
        [ book_name, book_author,book_borrowedby? book_borrowedby: null,date_ofborrow,expected_return],
      );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get all students
  app.get("/getBooks", async (req, res) => {
    try {
      const allBooks = await pool.query("SELECT * FROM book");
      res.json(allBooks.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
//get a todo

// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id
//     ]);

//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//update a todo

app.put("/updateStudent/:prev/:first/:last", async (req, res) => {
  try {
    const { prev } = req.params;
    const { first } = req.params;
    const { last } = req.params;
    // console.log(prev,first,last)
    const updateStudent = await pool.query(
      "UPDATE student SET firstname = $1 , lastname = $2 WHERE firstname = $3",
      [first,last,prev]
    );

    res.json("Student was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a student

app.delete("/deleteStudent/:firstname", async (req, res) => {
  try {
    const firstname = req.params.firstname;
    const deleteStudent = await pool.query("DELETE FROM student WHERE firstname = $1", [
      firstname
    ]);
    res.json("Student was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

// delete a book 
app.delete("/deleteBook/:bid", async (req, res) => {
  try {
    const bid = req.params.bid;
    const deleteBook = await pool.query("DELETE FROM book WHERE bid = $1", [
      bid
    ]);
    console.log('aaa')
    res.json("Student was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
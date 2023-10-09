import express from "express"
import mysql from "mysql";
//import cors from "cors";

const app = express()

app.use(express.json());


const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Root@node21410",
    database : "tododb"
})


db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });


app.get("/", (req, res) => {
    res.json("hello from backend kill me");
  });
  
app.get("/todolist", (req, res) => {
    const q = "SELECT * FROM todolist"
    db.query(q, (err, data) => {
      if (err) {
        console.log(err)
        return res.json(err)
      }
      return res.json(data)
    })
    // db.query(q, (err, data) => {
    //     if (err) { console.error("Error querying database: " + err.stack) 
    //     return res.json(err) }
    //     return res.json(data) })
})



app.post("/todolist/add", (req, res) => {
    let details = {
      todo: req.body.todo,
    };
    let sql = "INSERT INTO todolist SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Table todolist created Failed" });
      } else {
        res.send({ status: true, message: "todolist created successfully" });
      }
    });
  });

//Search the Records

app.get("/todolist/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM todolist WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


//Update the Records

app.put("/todolist/update/:id", (req, res) => {
    let sql =
      "UPDATE todolist SET todo='" +
      req.body.todo +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "todo list Update Failed" });
      } else {
        res.send({ status: true, message: "Todo-List Updated successfully" });
      }
    });
  });


   //Delete the Records

   app.delete("/todolist/delete/:id", (req, res) => {
    let sql = "DELETE FROM todolist WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "list Deleted Failed" });
      } else {
        res.send({ status: true, message: "List Deleted successfully" });
      }
    });
  });



app.listen(3000,()=>{
    console.log("Connected to Backend2!")
})
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
// Allow all origins for testing purposes (avoid using this in production)
app.use(cors());

// app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sql#1234567K",
  database: "quiz",
});

app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello this the backend");
});

// Retrieve random selection of 5 questions from the database
app.get("/mcqs", (req, res) => {
  const q = "SELECT * FROM `mcqs` ORDER BY RAND() LIMIT 5";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


app.post("/mcqs", (req, res) => {
    const q = "INSERT INTO mcqs(`Questions`, `CorrectAnswer`, `optionA`, `optionB`, `optionC`) VALUES (?)";
    const values=[req.body.Questions,
     req.body.CorrectAnswer, 
     req.body.optionA ,
     req.body.optionB, 
     req.body.optionC];


  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("MCQS has been created");
  });
});



app.listen(8800, () => {
  console.log("Connected to backend.");
});
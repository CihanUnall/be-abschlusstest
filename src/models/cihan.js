import express from "express";

const app = express();
const PORT = 5500;

// middleware
app.use(express.json());
app.get("/", (req, res) => res.send("Hallo World"));

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:PORT`);
});

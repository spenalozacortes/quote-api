const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/prueba", (req, res) => {
    res.send("Hello!");
});

app.listen(8080, () => {
    console.log("Server listening");
});
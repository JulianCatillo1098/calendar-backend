const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

const app = express();

//base de datos
dbConnection();

//cors
app.use(cors());
//DIRECTORIO PUBLICO

app.use(express.static("public"));

//leer rutas de json
app.use(express.json());

//RUTAS
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//ESCUCHAR PETICONES

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});

//mi aplicacion

app.get("/", (req, res) => {
  const htmlResponse = `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link  rel="stylesheet" href="./styles.css"><title>BLOQUEADO</title>
    </head>
    <body>
    <h1>bloqueado</h1>
    </body>
  </html>
  `;
  res.send(htmlResponse);
});

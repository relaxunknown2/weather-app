import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// using ejs latest syntax
app.set("view engine", "ejs");

// path for static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// variables
const baseUrl = "https://api.openweathermap.org/data/2.5";
const API_KEY = "7c02189cfbfe80f1ca04bcc857ff958b";

//rendering home page
app.get("/", (req, res) => {
  res.render("index");
});

// displaying data
app.post("/weather-data", async (req, res) => {
  const cityName = req.body["city-name"];
  try {
    const result = await axios.get(
      `${baseUrl}/weather?q=${cityName}&appid=${API_KEY}`
    );
    res.render("index", { content: result.data });
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
    res.status(500).send("An error occurred while fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`your server is runing on port ${port}`);
});

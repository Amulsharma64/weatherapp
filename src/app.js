const express = require("express");
const port = process.env.PORT || 3000
const hbs = require("hbs");
const app = express();
const path = require("path");

const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("", (req, res) => {
    res.render("");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("*", (req, res) => {
    res.render("404error");
});

app.listen(port, () => {
    console.log("Amul Sharma");
});
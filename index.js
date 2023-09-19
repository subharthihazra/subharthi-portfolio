require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

const portfolioData = require("./data");
const { getDatas } = require("./utils/sanity");

// static assets
app.use(express.static(path.join(__dirname, "public")));
// set view engine and path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/", async (req, res) => {
  const portfolioData2 = await getDatas();
  // console.log(portfolioData2.projects);
  res.render("index", { portfolioData: portfolioData2 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} ...`);
});

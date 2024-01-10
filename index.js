require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

const portfolioData = require("./data");
const { getDatas } = require("./utils/sanity");
const { connectDB, storeMessage } = require("./utils/db");
const { sendEmail } = require("./utils/nodemailer");

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
  // console.log(portfolioData2.skills);
  res.render("index", { portfolioData: portfolioData2 });
});

app.post("/sendmessage", storeMessage, async (req, res) => {
  try {
    const { name, message } = req.body;

    await sendEmail(name, message);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

app.get("/cron", (req, res) => {
  res.send(200).json({ cron: "hit" });
});

const PORT = process.env.PORT || 5000;
const initserver = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} ...`);
    });
  } catch (err) {}
};
initserver();

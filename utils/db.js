const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

function connectDB() {
  return mongoose.connect(String(process.env.MONGO_URI));
}

const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
    default: "",
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

const messageModel = mongoose.model("DirectMessage", messageSchema);

async function storeMessage(req, res, next) {
  try {
    const { name, message } = req.body;
    if (message) {
      messageModel.create({
        name,
        message,
      });
      next();
    }
  } catch (error) {
    res.status(400).json({ message: "badreq" });
    return;
  }
}

module.exports = { connectDB, messageModel, storeMessage };

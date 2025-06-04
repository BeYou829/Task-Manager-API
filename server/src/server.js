require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("../db/connect");
const tasks = require("./routes/tasks");
const notFound = require("./middlewares/notfound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/tasks", tasks);

// Undefinied routes
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();

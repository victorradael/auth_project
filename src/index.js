require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const resumeRoutes = require("./routes/resume");

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/user", usersRoutes);
app.use("/resume", resumeRoutes);

app.use((request, response, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  return response.status(error.status || 500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`API Online on http://localhost:${port}!`);
});

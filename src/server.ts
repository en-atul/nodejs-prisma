import express from "express";
import morgan from "morgan";
import router from "./router";
import cors from "cors";
import { protect } from "./modules";
import { createNewUser, signin } from "./handlers";

const customLogger = (message) => (req, res, next) => {
  console.log("Logger ----> ", message);
  next();
};

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

/**
 * we can also use nested middleware using compose-middleware i.e. https://www.npmjs.com/package/compose-middleware
 */
app.use(customLogger("log"));
app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    return res.status(400).send("invalid input");
  }
});

// creates and starts a server for our API on a defined port
export default app;

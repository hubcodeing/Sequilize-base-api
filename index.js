import express from "express";
const app = express();
import { db } from "./config";
import morgan from "morgan";
import bodyParser from "body-parser";
import { userApi } from "./route";
import { notesApi } from "./route";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

db.connection
  .authenticate()
  .then(() => console.log("connected to database successfully..."))
  .catch((error) => console.log(error.message));

// db.connection.sync({ alter: true }).then(() => {
//   console.log("new table create");
// });

app.use("/", userApi);
app.use("/", notesApi);

app.listen(9000, () => {
  console.log("server is start");
});

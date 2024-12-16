import connectToDb from "./database.js";
import router from "./src/routes/routes.js";

import e from "express";
import cors from "cors";

const PORT = process.env.PORT || 8000;

connectToDb();

const app = e();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(e.json());

app.use("/", router);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

import mongoose from "mongoose";
import { PORT, DB_URI, DB_OPTIONS } from "./src/config";
import { createApp } from "./src/app";

const app = createApp();

mongoose
  .connect(DB_URI, DB_OPTIONS)
  .then(() =>
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server listening on port ${PORT}`)
    )
  )
  .catch((err) => console.log(err));

if (process.env.NODE_ENV !== "production") require("dotenv").config();

export const { PORT = 8080, SECRET_KEY = "YOUR_SECRET_KEY" } = process.env;

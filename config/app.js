if (process.env.NODE_ENV !== "production") require("dotenv").config();

export const { PORT = 8080 } = process.env;

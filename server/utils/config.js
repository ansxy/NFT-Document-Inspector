require("dotenv").config({ path: ".env" });

module.exports = {
  BASE_URL: process.env.BASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_API_SECRET: process.env.PINATA_API_SECRET,
  REACT_APP_SERVICE_ID: process.env.REACT_APP_SERVICE_ID,
  REACT_APP_TEMPLATE_ID: process.env.EACT_APP_TEMPLATE_ID,
  REACT_APP_PUBLIC_KEY: process.env.REACT_APP_PUBLIC_KEY,
};

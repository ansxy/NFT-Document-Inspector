const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin({
      REACT_APP_SERVICE_ID: process.env.REACT_APP_SERVICE_ID,
      REACT_APP_TEMPLATE_ID: process.env.EACT_APP_TEMPLATE_ID,
      REACT_APP_PUBLIC_KEY: process.env.REACT_APP_PUBLIC_KEY,
      BASE_URL: process.env.BASE_URL,
    }),
  ],
};

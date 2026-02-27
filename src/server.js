require("dotenv").config();

const app = require("./app");
const config = require("./config/env");

async function connectToDB() {}

const startServer = () => {
  const port = config.app.port;
  const isProductionMode = config.app.nodeEnv || "production";

  app.listen(port, () => {
    console.log(
      `🚀 Server running in ${
        isProductionMode ? "production" : "development"
      } mode on port ${port}`,
    );
  });
};

async function run() {
  await connectToDB();
  startServer();
}

run();

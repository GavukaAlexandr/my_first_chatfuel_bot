import mongoose from "mongoose";
import mongooseIdPlugin from "./mongooseIdPlugin";

const dbOptions = {
  server: {
    socketOptions: {
        "keepAlive": 300000,
        "connectTimeoutMS": 30000
      }
  }
};

// mongoose.connect(
//   `mongodb://mongo:27017/ReminderDb`,dbOptions
// );
mongoose.connect( 'mongodb://mongo:27017/ReminderDb',
  {
    poolSize: 2,
    promiseLibrary: global.Promise
  }
);
// mongoose.Promise = global.Promise; // Plug native ES6 promises http://mongoosejs.com/docs/promises.html
mongoose.plugin(mongooseIdPlugin); // Applies plugin to all schemas.

const mongodbConnection = mongoose.connection;

mongodbConnection.on("error", error => {
  console.log("Error connecting to mongodb server.", error.message);
});

process.on("SIGINT", () => {
  mongodbConnection.close(() => {
    console.log("Disconnected from mongodb server through app termination.");
    process.exit(0);
  });
});

export default mongodbConnection;

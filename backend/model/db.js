const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri)
.then(() => {
  console.log("MongoDB successfully connected");
})
.catch((err) => {
  console.error("Connection error:", err);
});

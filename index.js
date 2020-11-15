const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminrouter = require('./routes/adminroute.js')

const app = express();
app.use(cors());
app.use(express.json());
const { PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE } = process.env;

const mongoUri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
const mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(mongoUri, mongoOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
    console.log("Database is up and running!");
});

app.use('/api/admin', adminrouter)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
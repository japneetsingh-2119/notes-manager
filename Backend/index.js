const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const noteRoutes = require('./routes/noteRoutes');
const {errorHandler} = require('./middleware/errorHandler')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())


mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.error("MongoDb Not Connected"))

app.use((req, res, next) => {
  console.log("👉 Request:", req.method, req.url);
  next();
});

app.use('/api/notes', noteRoutes)

app.get('/', (req,res) => {
    res.send("Notes manager api is working")
})


app.use(errorHandler);

app.listen(PORT, () => console.log("Server running"))

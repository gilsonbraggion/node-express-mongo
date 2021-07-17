const express = require('express');

const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
}

// using Middleware cors
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extendes: true}));

// Data Base Configuration
const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected sucessfully to DataBase!');
})
.catch(err => {
    console.log('Cannot connect do the database', err);
    process.exit();
});


// simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to Gilson Braggion Application.'});
});

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
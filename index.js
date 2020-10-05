const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const issueRoutes = require('./backend/routes/issue');

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(cors());
}
else{
    app.use(morgan('combined'));
}

mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost:27017/github-issues',{
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},() => {
    console.log('connected to DB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//ROUTES
app.use('/api', issueRoutes);


if (process.env.NODE_ENV === 'production') {
    //In case frontend is rendered from nodejs
    app.use(express.static('frontend/build'));

    //for all the client requests
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    });
}



app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
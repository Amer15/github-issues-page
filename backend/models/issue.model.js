const mongoose = require('mongoose');


const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 3,
        required: true,
        trim: true
    },
    url:{
        type: String,
        default: ''
    },
    issue: {
        type: String,
        min: 10,
        required: true,
        trim: true
    },
    postedBy: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        default: 'open'
    }
},
{timestamps: true}
);



module.exports = mongoose.model('Issue', IssueSchema);
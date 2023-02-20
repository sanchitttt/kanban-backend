const mongoose = require('mongoose');
const validator = require('validator');


const TasksSchema = new mongoose.Schema ({
    title : {
        type:String,trim:true
    },
    description : {
        type:String,trim:true
    },
    status: {
        type:String,trim:true
    },
    subtasks: [
        {
            title: {type:String,trim:true},
            isComplete : {type:Boolean}
        }
    ]
})

const ColumnSchema = new mongoose.Schema({
    name : {
        type:String,
        trim:true
    },
    tasks : [TasksSchema]
});

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique:true
    },
    columns: [ColumnSchema]
})

const BoardsSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        validate(value) {
            return validator.isEmail(value)
        }
    },
    boards: [BoardSchema]
})

const Board = mongoose.model('boards',BoardsSchema);

module.exports = Board;

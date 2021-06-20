const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    heading: {type: String, required: true},
    blog: { type:String , required: true},
    userID: {type: String, required: true, unique: true},
});

blogSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Blog', blogSchema);

const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const userSchema = moongose.Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
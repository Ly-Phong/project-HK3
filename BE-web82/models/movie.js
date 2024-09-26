const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const movieSchema = moongose.Schema({
    ID: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    introduce: {
        type: String,
        require: true
    }
});

const movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
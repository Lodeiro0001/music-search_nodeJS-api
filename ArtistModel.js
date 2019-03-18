const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArtistSchema = Schema(
    {
        _id: {type: Schema.ObjectId, auto: true},
        artist_id: Number,
        artist_name: String,
        artist_country: String,
        ranking: Number
    }
);

module.exports = mongoose.model('artists', ArtistSchema);

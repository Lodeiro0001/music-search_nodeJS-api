const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TrackSchema = Schema(
    {
        _id: {type: Schema.ObjectId, auto: true},
        track_id: Number,
        track_name: String,
        artist_name: String,
        ranking: Number
    }
);

module.exports = mongoose.model('tracks', TrackSchema);

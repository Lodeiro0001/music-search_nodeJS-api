const mongoose = require('mongoose');
const MusiXmatchController = require('./ApiController');
const express = require('express');
const PORT = 0;
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/artist/:name', MusiXmatchController.getArtist);
app.get('/tracks/:title', MusiXmatchController.getTracks);
app.get('/albums/:artist_id', MusiXmatchController.getArtistAlbums);
app.get('/albumtracks/:album_id', MusiXmatchController.getAlbumTracks);
app.get('/lirycs/:track_id', MusiXmatchController.getTrackLyrics);
app.get('/topartists/', MusiXmatchController.getTopArtists);
app.get('/toptracks/', MusiXmatchController.getTopTracks);

mongoose.connect('mongodb://urlServidorMongoDB', {useNewUrlParser: true, useFindAndModify: false}).then(
    () => {
        console.log('Conexión con MongoDB correcta');
        app.listen(PORT, () => {
            console.log('El servidor se arranco correctamente')
        })
    }, err => {
        console.log('Fallo en la base de datos:' + err)
    }
);

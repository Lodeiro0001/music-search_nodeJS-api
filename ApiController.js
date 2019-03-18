const music = require('musicmatch')({apikey: "key"});
const Artist = require('./ArtistModel');
const Track = require('./TrackModel');

function getArtist(req, res) {
    let artist = req.params.name;
    music.artistSearch({q_artist: artist, page_size: 10})
        .then(function (data) {
            let artist_list = data.message.body.artist_list;
            res.status(200).send(artist_list);
        }).catch(function (err) {
        res.status(404).send({action: 'get Artist', message: 'No se ha encontrado el artista. ERROR:' + err})
    })
}

function getTracks(req, res) {
    let track = req.params.title;
    music.trackSearch({q: track, page: 1, page_size: 10})
        .then(function (data) {
            let track_list = data.message.body.track_list;
            res.status(200).send(track_list);
        }).catch(function (err) {
        res.status(404).send({action: 'get Tracks', message: 'No se han encontrado tracks. ERROR:' + err})
    })
}


function getArtistAlbums(req, res) {
    let artist_id = req.params.artist_id;
    music.artistAlbums({artist_id: artist_id, s_release_date: "desc", g_album_name: 1})
        .then(function (data) {
            let album_list = data.message.body.album_list;
            let artist_id = album_list[0].album.artist_id;
            let artist_name = album_list[0].album.artist_name;
            updateTopArtist(artist_id, artist_name);
            res.status(200).send(album_list);
        }).catch(function (err) {
        res.status(404).send({action: 'get Artist Albums', message: 'No se han encontrado albums. ERROR:' + err})
    })
}


function getAlbumTracks(req, res) {
    let album_id = req.params.album_id;
    music.albumTracks({album_id: album_id, page: 1, page_size: 15})
        .then(function (data) {
            let track_list = data.message.body.track_list;
            res.status(200).send(track_list)
        }).catch(function (err) {
        res.status(404).send({action: 'get Album Tracks', message: 'No se han encontrado los tracks. ERROR:' + err})
    })
}

function getTrackLyrics(req, res) {
    let track_id = req.params.track_id;
    updateTopTracks(track_id);
    music.trackLyrics({track_id: track_id})
        .then(function (data) {
            if(data.message.body.lyrics){
                data.message.body.lyrics.lyrics_body = data.message.body.lyrics.lyrics_body.replace('\n\n******* This Lyrics is NOT for Commercial use *******\n(1409618284341)', '');
            }
            let lyrics = data.message.body.lyrics;
            res.status(200).send(lyrics)
        }).catch(function (err) {
        res.status(404).send({action: 'get Track Lyrics', message: 'No se ha encontrado la letra. ERROR:' + err})
    })
}

function getTopArtists(req, res) {
    Artist.find().sort('-ranking').limit(5).exec().then(
        artists => {
            if (!artists) {
                res.status(404).send({accion: 'get all', mensaje: 'No hay artistas en el Top'})
            } else {
                res.status(200).send({accion: 'get all', data: artists})
            }
        }
    ).catch(
        err => {
            res.status(500).send({accion: 'get all', mensaje: 'Problema al leer el Top de artistas:' + err})
        }
    )

}

function getTopTracks(req, res) {
    Track.find().sort('-ranking').limit(5).exec().then(
        artists => {
            if (!artists) {
                res.status(404).send({accion: 'get all', mensaje: 'No hay tracks en el Top'})
            } else {
                res.status(200).send({accion: 'get all', data: artists})
            }
        }
    ).catch(
        err => {
            res.status(500).send({accion: 'get all', mensaje: 'Problema al leer el Top de tracks:' + err})
        }
    )

}

function updateTopTracks(track_id) {
    Track.findOne({track_id: track_id}).then(
        track => {
            if (track) {
                track.ranking += 1;
                Track.findOneAndUpdate({track_id: track_id}, track).then().catch(err => console.error(err.message));
            } else {
                music.track({track_id: track_id}).then(
                    function (data) {
                        let track_api = data.message.body.track;
                        let track = new Track();
                        track.track_id = track_api.track_id;
                        track.track_name = track_api.track_name;
                        track.artist_name = track_api.artist_name;
                        track.ranking = 1;
                        track.save();
                    }).catch(
                    function (err) {
                        console.error(err.message);
                    });
            }
        },
        error => {
            console.error("Error guardando Track en el Top:\n", error.message)
        }
    );
}

function updateTopArtist(artist_id, artist_name) {
    Artist.findOne({artist_id: artist_id}).then(
        artist => {
            if (artist) {
                artist.ranking += 1;
                Artist.findOneAndUpdate({artist_id: artist_id}, artist).then().catch(err => console.error(err.message));
            } else {
                let artist = new Artist();
                artist.artist_id = artist_id;
                artist.artist_name = artist_name;
                artist.ranking = 1;
                artist.save();
            }
        },
        error => {
            console.error("Error guardando Artista en el Top:\n", error.message)
        }
    );
}

module.exports = {getArtist, getTracks, getArtistAlbums, getAlbumTracks, getTrackLyrics, getTopArtists, getTopTracks};

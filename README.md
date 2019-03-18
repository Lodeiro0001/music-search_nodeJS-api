# 🎼 musicSearch - API

Backend `NodeJS` que genera una API REST para el [frontend](https://github.com/Lodeiro0001/music-search_angular-frontend) del proyecto Stack MEAN. 
Se consulta [Musixmatch](https://developer.musixmatch.com/) para obtener los datos.

Se requiere una **base de datos MongoDB** donde se guardan los artistas y tracks consultados en la aplicación. 
De estos datos se obtiene el Top5.

## Endpoints (GET) 🏗️

- `/artist/:name`
  Devuele los artistas encontrados pasándole en la url un nombre.
- `/tracks/:title`
  Devuelve las canciones encontrada pasándole en la url un título.
- `/albums/:artist_id`
  Devuelve los álbumes del artista pasándole en la url la id del mismo.
- `/albumtracks/:album_id`:
  Devuelve los tracks de un álbum pasándole en la url la id de dicho álbum.
- `/lirycs/:track_id`:
  Devuelve la letra de un track pasándole en la url su id.
- `/topartists/`:
  Devuelve los 5 artistas más consultados en la aplicación.
- `/toptracks/`:
  Devuelve los 5 tracks más consultados en la aplicación.
  
Todos los datos devueltos por la API están en formato JSON.

## Modelos MongoDB 💾

- Artist

```js
{
        _id: {type: Schema.ObjectId, auto: true},
        artist_id: Number,
        artist_name: String,
        artist_country: String,
        ranking: Number
    }
```

- Track

```js
{
        _id: {type: Schema.ObjectId, auto: true},
        track_id: Number,
        track_name: String,
        artist_name: String,
        ranking: Number
    }
```

import when from 'when';
import { AlbumModel, AuthorModel, SongModel } from './Models';
import { ArrayToObject } from '../utils/Utils';


const delay = ms => obj => when.promise((resolve, reject) => setTimeout(() => resolve(obj), ms))

export default {
  search(value) {
    return AlbumModel
      .find({
        title: new RegExp(value, "gi")
      })
      .then(albums => {
        return albums;
      })
      .then(albums => AuthorModel
        .find({
          id: {
            $in: albums.map( album => "" + album.authorId )
          }
        })
        .then(authors => {
          const authorsObj = ArrayToObject(authors, 'id');
          albums.forEach(album => {
            album.author_name = authorsObj[album.authorId].name;
          })
          return albums;
        })
      )
      .then(delay(200))
  },

  getAlbumById(id) {
    return AlbumModel
      .findOne({ id })
      .then( album => AuthorModel
          .findOne({ "id": album.authorId })
          .then(author => ({ album, author }))
      )
      .then( data => SongModel
          .find({ "albumId": data.album.id })
          .then(songs => {
            return { ...data, songs }
          })
      )
  }
}

import when from 'when';
import { AlbumModel, AuthorModel, SoundModel } from './Models';
import { ArrayToObject } from '../utils/Utils';


const delay = ms => obj => when.promise((resolve, reject) => setTimeout(() => resolve(obj), ms))

export default {
  search(value) {
    return AlbumModel
      .find({
        title: new RegExp(value, "gi")
      })
      .then( albums => AuthorModel
        .find({
          id: {
            $in: albums.map( album => album.authorId )
          }
        })
        .then( authors => {
          const authorsObj = ArrayToObject(authors, 'id');
          albums.forEach( album => {
            album.author_name = authorsObj[album.authorId].name;
          })
          return albums;
        })
      )
      .then(delay(200))
  }
}

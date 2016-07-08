import DBInitialData from '../../DBInitialData';
import SimpleDB from "../lib/SimpleDB";

const models = {};

for( let modelName in DBInitialData ) {
  models[modelName] = SimpleDB.model({
    name: modelName,
    data: DBInitialData[modelName],
    forceInitialData: true
  })
}

const albums  = models["Album"].__data__;
const songs   = models["Song"].__data__;
const authors = models["Author"].__data__;

songs.forEach(song => {
  song["albumId"] = albums[song["albumId"]][models["Album"].primaryKey]
})

albums.forEach(album => {
  album["authorId"] = authors[album["authorId"]][models["Author"].primaryKey]
})

for( let modelName in models ) {
  exports[modelName + "Model"] = models[modelName]
}

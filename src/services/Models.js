import when from 'when';
import fakeModels from '../../fakeModels';
import { isPlainObj } from '../utils/Utils';

const models = {};


class Model {
  constructor(name, data) {
    this.__data = Array.isArray(data) ? data : [];
    this.name = name;
  }

  findOne(query) {
    return this.find(query)
      .then(results => results[0])
  }

  find(query) {
    return (new Query(this, query)).exec();
  }

  multi(query) {
    return new Query(this, query);
  }
}

class Query {
  constructor(model, query) {
    this.model = model;
    this.query = query || {};
    this.results = [];
  }

  equalTo(field, value) {
    this.query[field] = value;
    return this;
  }

  like(field, value) {
    this.query[field] = new Regex(value, "gi")
    return this;
  }

  filter(query, doc) {
    for ( let field in query ) {
      if (isPlainObj(query[field])) {
        let obj = query[field];
        if (obj["$in"]) {
          return obj["$in"].indexOf(doc[field]) > -1;
        }
        return false;
      }

      if (query[field] instanceof RegExp) {
        if (!query[field].test(doc[field]))
          return false;
      }else{
        if (query[field] != doc[field]) {
          return false;
        }
      }
    }
    return true;
  }

  exec() {
    const query = this.query
    const data = this.model.__data
    const filter = this.filter

    return when.promise((resolve, reject) => {
      resolve(data.filter((doc) => {
        return filter(query, doc)
      }))
    })
  }
}

for( let name in fakeModels ){
  exports[name + "Model"] = new Model(name, fakeModels[name])
}

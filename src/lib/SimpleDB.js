import when from 'when';
import { isPlainObj } from '../utils/Utils';

class SimpleDB {
  constructor(options) {
    this.key = options.key || "$simple-db";
    this._localStorage = options.localStorage === false ? false : true;
  }

  store() {
    this.models.forEach( this.storeModel )
  }

  storeModel(model) {
    if (!model) return false;
    const key = this.getModelKey(model.name);
    localStorage.setItem(key, JSON.stringify({ __data__: model.__data__}))
  }

  getModel(name) {
    const key = this.getModelKey(name);
    const value = localStorage.getItem(key);
    if (value) {
      let obj;
      try {
        obj = JSON.parse(value);
      } catch(e) {
        localStorage.removeItem(key)
        return null;
      }
      if (!isPlainObj(obj)){
        localStorage.removeItem(key)
        return null;
      }
      return new Model(name, obj.__data__)
    }
  }

  getModelKey(name) {
    return this.key + "/" + name;
  }

  model(name, data, forceInitialData, primaryKey) {
    let model = SimpleDBInstance.getModel(name);
    if (model){
      if (forceInitialData) {
        primaryKey = primaryKey || "id";
        const primaryKeysFound = data.map( obj => obj[primaryKey] )
        model.__data__ = model.__data__
          .filter(
            obj => primaryKeysFound.indexOf(obj[primaryKey]) < 0
          )
          .concat(data)
      }
    }
    return (new Model(name, data)).store();
  }
}

const SimpleDBInstance = new SimpleDB({
  localStorage: true
});

export default SimpleDBInstance;

export class Model {

  constructor(name, data) {
    this.__data__ = Array.isArray(data) ? data : [];
    this.name = name;
  }

  findOne(query) {
    return this.find(query)
      .then(results => results[0])
  }

  find(query) {
    return (new Query(this, query)).exec();
  }

  store() {
    SimpleDBInstance.storeModel(this);
    return this;
  }

  multi(query) {
    return new Query(this, query);
  }
}

export class Query {
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
    const data = this.model.__data__
    const filter = this.filter

    return when.promise((resolve, reject) => {
      resolve(data.filter((doc) => {
        return filter(query, doc)
      }))
    })
  }
}

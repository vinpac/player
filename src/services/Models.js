import DBInitialData from '../../DBInitialData';
import SimpleDB from "../lib/SimpleDB";

for( let modelName in DBInitialData ){
  exports[modelName + "Model"] = SimpleDB.model(modelName, DBInitialData[modelName], true)
}

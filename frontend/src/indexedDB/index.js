import Initial from './initial';

const indexedDb = indexedDB || webkitIndexedDB || mozIndexedDB || msIndexedDB;

function IndexedDB(name, version, callbackObject = {}) {
  IndexedDB.prototype.indexedDb = indexedDb;
  return new Initial(indexedDb, name, version, callbackObject);
}

IndexedDB.deleteDatabase = databaseName => {
  indexedDb.deleteDatabase(databaseName);
  console.log(`Deleted：${databaseName}`);
};

export default IndexedDB;

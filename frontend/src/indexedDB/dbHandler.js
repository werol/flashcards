import IndexedDB from "./index";


export const INDEXED_DB_HANDLER_MODULE = (function () {

  const dbName = 'datebase';
  const version = 1;

  return {
    initDb: function (objectStoreName, key){
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            resolve(true);
          },
          error: function(event) {
            reject(event.target.error);
          },
          upgradeneeded: function(event) {
            this.createObjectStore(objectStoreName, key);
            resolve(true);
          }
        });
      }).catch(error => {
        console.error(error);
      });
    },
    addData: function (objectStoreName, data) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(objectStoreName, true);
            store.add(data);
            this.close();
            resolve(true);
          }
        });
      });
    },
    putData: function (objectStoreName, data) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(objectStoreName, true);
            store.put(data);
            this.close();
            resolve(true);
          }
        });
      });
    },
    getAllData: function (objectStoreName) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const _this = this;
            const store = this.getObjectStore(objectStoreName);
            store.getAll(function(event){
              _this.close();
              resolve(event.target.result);
            });
          }
        });
      });
    },
    getData: function (objectStoreName, key) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const _this = this;
            const store = this.getObjectStore(objectStoreName);
            store.get(key, function(event){
              _this.close();
              resolve(event.target.result);
            });
          }
        });
      });
    },
    getAllKeys: function (objectStoreName) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const _this = this;
            const store = this.getObjectStore(objectStoreName);
            store.getAllKeys(function(event){
              _this.close();
              resolve(event.target.result);
            });
          }
        });
      });
    },
    deleteData: function (objectStoreName, key) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(objectStoreName, true);
            store.delete(key);
            this.close();
            resolve(true);
          }
        });
      });
    },
    clearData: function (objectStoreName){
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(objectStoreName, true);
            store.clear();
            this.close();
            resolve(true);
          }
        });
      });
    }
  };
})();

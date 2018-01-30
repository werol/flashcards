import IndexedDB from "./index";


export const INDEXED_DB_HANDLER_MODULE = (function () {

  const dbName = 'datebase';
  const version = 1;

  return {
    initDb: function (name, key){
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            resolve(true);
          },
          error: function(event) {
            reject(event.target.error);
          },
          upgradeneeded: function(event) {
            this.createObjectStore(name, key);
            resolve(true);
          }
        });
      }).catch(error => {
        console.error(error);
      });
    },
    addData: function (name, data) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(name, true);
            store.add(data);
            this.close();
            resolve(true);
          }
        });
      });
    },
    putData: function (name, data) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(name, true);
            store.put(data);
            this.close();
            resolve(true);
          }
        });
      });
    },
    getAllData: function (name) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const _this = this;
            const store = this.getObjectStore(name);
            store.getAll(function(event){
              _this.close();
              resolve(event.target.result);
            });
          }
        });
      });
    },
    getData: function (name, key) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const _this = this;
            const store = this.getObjectStore(name);
            store.get(key, function(event){
              _this.close();
              resolve(event.target.result);
            });
          }
        });
      });
    },
    getAllKeys: function (name) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const _this = this;
            const store = this.getObjectStore(name);
            store.getAllKeys(function(event){
              _this.close();
              resolve(event.target.result);
            });
          }
        });
      });
    },
    deleteData: function (name, key) {
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(name, true);
            store.delete(key);
            this.close();
            resolve(true);
          }
        });
      });
    },
    clearData: function (name){
      return new Promise((resolve, reject) => {
        IndexedDB(dbName, version, {
          success: function(event) {
            const store = this.getObjectStore(name, true);
            store.clear();
            this.close();
            resolve(true);
          }
        });
      });
    }
  };
})();

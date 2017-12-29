import IndexedDB from "./index";

const dbName = 'datebase';
const version = 1;

export function initDb(name, key){
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
}

export function addData(name, data) {
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
}

export function putData(name, data) {
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
}

export function getAllKeys(name) {
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
}

export function deleteData(name, value) {
  return new Promise((resolve, reject) => {
    IndexedDB(dbName, version, {
      success: function(event) {
        const store = this.getObjectStore(name, true);
        store.delete(value);
        this.close();
        resolve(true);
      }
    });
  });
}

export function clearData(name){
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

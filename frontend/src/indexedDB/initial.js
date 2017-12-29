import ObjectStore from './objectStore';

class Initial {

  constructor(indexedDb, name, version, callbackObject) {
    this.indexedDb = indexedDb;
    this.name = name;
    this.version = version;
    this.callbackObject = callbackObject;
    this.request = this.indexedDb.open(name, version);
    this.request.addEventListener('success', this.openSuccess.bind(this), false);
    this.request.addEventListener('error', this.openError.bind(this), false);
    this.request.addEventListener('upgradeneeded', this.openUpgradeneeded.bind(this), false);
  }

  openSuccess(event) {
    if(this.callbackObject.success) {
      this.dataBase = event.target.result;
      this.callbackObject.success.call(this, event);
    }
    console.log(`Opened:\nname: ${ this.name }\nversion: ${ this.version }`);
  }

  openError(event) {
    if(this.callbackObject.error) {
      console.error(event.target.error.message);
      this.callbackObject.error.call(this, event);
    }
    console.log(`Failed to open:\nname: ${ this.name }\nversion: ${ this.version }`);
  }

  openUpgradeneeded(event) {
    if(this.callbackObject.upgradeneeded) {
      this.dataBase = event.target.result;
      this.callbackObject.upgradeneeded.call(this, event);
    }
    console.log(`Updated version:\nname: ${ this.name }\nversion: ${ this.version }`);
  }

  close() {
    this.dataBase.close();
    this.dataBase = null;
    console.log(`Closed:\nname: ${ this.name }\nversion: ${ this.version }`);
  }

  hasObjectStore(objectStoreName) {
    return this.dataBase.objectStoreNames.contains(objectStoreName);
  }

  createObjectStore(objectStoreName, keyPath, indexArray) {
    if(!this.hasObjectStore(objectStoreName)) {
      const store = this.dataBase.createObjectStore(objectStoreName, {
        keyPath: keyPath
      });

      if(indexArray) {
        indexArray.forEach(item => store.createIndex(item.name, item.index))
      }
      console.log(`ObjectStore ${objectStoreName} has been created`);
    }
    else {
      console.warn(`ObjectStore ${objectStoreName} already exists`);
    }
    return this;
  }

  deleteObjectStore(objectStoreName) {
    if(this.hasObjectStore(objectStoreName)){
      this.dataBase.deleteObjectStore(objectStoreName);
      console.log(`Deleted：${objectStoreName}`);
    }else{
      console.warn(`ObjectStore ${objectStoreName} does not exist`)
    }

    return this;
  };

  getObjectStore(objectStoreName, writeAble = false) {
    return new ObjectStore(this.dataBase, objectStoreName, writeAble);
  };
}

export default Initial;

class ObjectStore {

  constructor(dataBase, objectStoreName, writable) {
    this.dataBase = dataBase;
    const isWritable = writable === true ? 'readwrite' : 'readonly';
    const transaction = this.dataBase.transaction(objectStoreName, isWritable);
    this.store = transaction.objectStore(objectStoreName);
    return this;
  }

  add(arg) {
    const data = arg instanceof Array ? arg : [arg];
    data.forEach(item => this.store.add(item));
    console.log('Data added successfully');
    return this;
  }

  put(arg) {
    const data = arg instanceof Array ? arg : [arg];
    data.forEach(item => this.store.put(item));
    console.log('Data updated successfully');
    return this;
  }

  delete(arg) {
    const data = arg instanceof Array ? arg : [arg];
    data.forEach(item => this.store.delete(item));
    console.log('Data deleted successfully');
    return this;
  };

  clear() {
    this.store.clear();
    console.log('Data cleared successfully');
    return this;
  };

  get(key, callback) {
    const value = this.store.get(key);
    const success = event => {
      if(callback) callback.call(this, event);
    };
    value.addEventListener('success', success, false);
    return this;
  }

  getAllKeys(callback) {
    const keys = this.store.getAllKeys();
    const success = event => {
      if(callback) callback.call(this, event);
    };
    keys.addEventListener('success', success, false);
    return this;
  }

  getAll(callback) {
    const objects = this.store.getAll();
    const success = event => {
      if(callback) callback.call(this, event);
    };
    objects.addEventListener('success', success, false);
    return this;
  }

}

export default ObjectStore;

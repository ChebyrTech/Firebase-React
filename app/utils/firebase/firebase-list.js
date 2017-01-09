import { firebaseDb } from './firebase';


export class FirebaseList {
  constructor(actions, modelClass) {
    this.actions = actions;
    this.ModelClass = modelClass;
  }

  get path() {
    return this.path;
  }

  set path(value) {
    this.path = value;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this.path)
        .push(value, (error) => (error ? reject(error) : resolve()));
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this.path}/${key}`)
        .remove((error) => (error ? reject(error) : resolve()));
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this.path}/${key}`)
        .update(value, (error) => (error ? reject(error) : resolve()));
    });
  }

  subscribe(emit) {
    const ref = firebaseDb.ref(this.path);
    let initialized = false;
    const list = [];

    ref.once('value', () => {
      initialized = true;
      emit(this.actions.onLoad(list));
    });

    ref.on('child_added', (snapshot) => {
      if (initialized) {
        emit(this.actions.onAdd(this.unwrapSnapshot(snapshot)));
      } else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    ref.on('child_changed', (snapshot) => {
      emit(this.actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    ref.on('child_removed', (snapshot) => {
      emit(this.actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    return () => ref.off();
  }

  unwrapSnapshot(snapshot) {
    const attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this.ModelClass(attrs);
  }
}

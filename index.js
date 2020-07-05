const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-memory'));

module.exports.query = async function query() {
  const db = new PouchDB('mydb', {adapter: 'memory'});

  await db.put({
    _id: '1',
    name: 'foo'
  })

  await db.put(createDoc());

  return db.query('my_index/by_name')
}

function createDoc() {
  return {
    _id: '_design/my_index',
    views: {
      by_name: {
        map: function (doc) { emit(doc.name); }.toString()
      }
    }
  }
}

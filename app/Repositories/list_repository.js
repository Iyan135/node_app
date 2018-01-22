'use strict';

let List = require('../Domains/list');

let ListRepository = function (db) {
    this.db = db;
};

ListRepository.prototype = {
  save: function (s, cb, errCb) {
      let db = this.db;
      let data = {no: s.no, nama: s.nama, jurusan: s.jurusan, umur: s.umur};
      let query = 'INSERT INTO list SET ?';
      db.query(query,data, (err,results) => {
         if(err){
             errCb(err);
         }
         cb(results);
      });
  },

  update: function (s, cb, errCb) {
      let db = this.db;
      let data = [s.nama, s.jurusan, s.umur, s.no];
      let query = 'UPDATE list SET nama = ?, jurusan = ?, umur = ?, WHERE no = ?';
      db.query(query,data, (err, results)=>{
          if(err){
              errCb(err);
          }
          cb(results);
      });
  },

  delete: function (no, cb, errCb) {
      let db = this.db;
      let query = "DELETE FROM list WHERE no = ?";
      db.query(query,[no], (err,results) => {
          if(err){
              errCb(err);
          }
          cb(results);
      });
  },

  findOne: function (no, cb, errCb) {
      let db = this.db;
      let query = "SELECT * FROM list WHERE no = ?";
      db.query(query,[no],(err, results, fields) => {
          if(err){
              errCb(err);
          }
          if(!results){
              cb(`Data Dengan No ${no}, tidak ditemukan`);
      }else{
              let s = results[0];
              let list = new List(s.no, s.nama, s.jurusan, s.umur);
              cb(list);
      }
      })
  },

  findAll: function (cb, errCb) {
      let db = this.db;
      let query = "SELECT * FROM list";
      db.query(query,(err, results, fields) =>{
        if (err) {
          errCb(err);
        }
        if(!results){
          cb(`Tabel List Kosong`);
        }else {
          let listArray = [];
          for(let i=0;i<results.length;i++){
            let s = results[i];
            let list = new List(s.no, s.nama, s.jurusan, s.umur);
            listArray.push(list);
          }
          cb(listArray);
        }
      });
  }
};

module.exports = ListRepository;

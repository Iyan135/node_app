'use strict';

let db = require('../Config/mysql_config');
let ListRepo = require('../Repositories/list_repository');
let List = require('../Domains/list');

let saveListShowForm = (req, res, next) =>{
  res.render('new_list', {'title': 'Add New List'});
}


let saveList = (req, res, next) => {
  if (!req.body) {
    next('Semua field harus diisi... ');
  }
  let data = req.body;
  let List = new list(data.no, data.nama, data.jurusan, parseInt(data.umur));
  let ListRepo = new ListRepo(db);
  ListRepo.save(List, result =>{
    res.redirect('/');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let updateListShowForm = (req, res, next) =>{
  if (!req.params) {
    next('parameter no Tidak ada');
  }
  let no = req.params.no;
  let ListRepo = new ListRepo(db);
  ListRepo.findOne(no, result =>{
    res.render('update_list', {'list':result, 'title': 'Update List'});
  }, err =>{
    if (err) {
      next(err);
    }
  });
};

let updateList = (req, res, next) =>{
  if(!req.body){
    next('semua field harus di isi');
  }
  let data = req.body;
  let list = new List(data.no, data.nama, data.jurusan, data.umur);
  let listRepo = new ListRepo(db);
  listRepo.update(list, result =>{
    res.redirect('/');
  }, err =>{
    if(err){
      next(err);
    }
  });
};

let deleteList = (req, res, next) =>{
  if(!req.params){
    next('parameter no tidak ada');
  }
  let no = req.params.no;
  let listRepo = new ListRepo(db);
  listRepo.delete(no, result =>{
    res.redirect('/');
  }, err =>{
    if (err) {
      next(err);
    }
  })
};

let getList = (req, res, next) =>{
  if(!req.params){
    next('parameter no tidak ada');
  }
  let no = req.params.no;
  let listRepo = new ListRepo(db);
  listRepo.findOne(no, result =>{
    res.render('list_detail', {'list': result, 'title': 'List Detail'});
  }, err =>{
    if (err) {
      next(err);
    }
  });
};

let getAllList = (req, res, next) =>{
  let listRepo = new ListRepo(db);
  listRepo.findAll(result =>{
    res.render('index', {'list': result, 'title': 'All List'});
  }, err =>{
    if (err) {
      next(err);
    }
  });
};

module.exports = {
  saveListShowForm:saveListShowForm,
  saveList:saveList,
  updateListShowForm:updateListShowForm,
  updateList:updateList,
  deleteList:deleteList,
  getList:getList,
  getAllList:getAllList
};

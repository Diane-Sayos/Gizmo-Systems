const express = require('express')
const path = require('path')
const app = express()
const { Student, Campus } = require('../db/db');
// body-parser
app.use(express.json());
// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});
//get all students
app.get('/api/students', async(req, res, next) => {
  try{
    res.send(await Student.findAll({
      order: [['lastName']]
    }));
  }
  catch(ex){
    next(ex)
  }
});
//get specific student
app.get('/api/students/:id', async(req, res, next) => {
  try{
    res.send(await Student.findByPk(req.params.id));
  }
  catch(ex){
    next(ex)
  }
});
//create new student
app.post('/api/students', async(req, res, next) => {
  try{
    res.status(201).send(await Student.create(req.body));
  }
  catch(ex){
    next(ex)
  }
});
//update specific student
app.put('/api/students/:id', async(req, res, next) => {
  try{
    const student = await Student.findByPk(req.params.id);
    if(req.body.campusId === 0 || req.body.campusId === ''){
      req.body.campusId = null;
      await student.update(req.body);
      res.status(201).send(student);
    } else {
      await student.update(req.body);
      res.status(201).send(student);
    }
  }
  catch(ex){
    next(ex)
  }
});
//delete specific student
app.delete('/api/students/:id', async(req, res, next) => {
  try{
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
});
//get all campuses
app.get('/api/campuses', async(req, res, next) => {
  try{
    res.send(await Campus.findAll({
      order: [['name']]
    }));
  }
  catch(ex){
    next(ex)
  }
});
//get a specific campus
app.get('/api/campuses/:id', async(req, res, next) => {
  try{
    res.send(await Campus.findByPk(req.params.id));
  }
  catch(ex){
    next(ex)
  }
});
//create new campus
app.post('/api/campuses', async(req, res, next) => {
  try{
    res.status(201).send(await Campus.create(req.body));
  }
  catch(ex){
    next(ex)
  }
});
//update specific campus
app.put('/api/campuses/:id', async(req, res, next) => {
  try{
    const campus = await Campus.findByPk(req.params.id);
    await campus.update(req.body);
    res.status(201).send(campus);
  }
  catch(ex){
    next(ex)
  }
});
//delete specific campus
app.delete('/api/campuses/:id', async(req, res, next) => {
  try{
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
});
//error handler
app.use((ex, req, res, next) => {
  console.log(ex);
  res.status(ex.status || 500).send({ ex });
});

module.exports = app;
const express = require('express') //מבקש את אקספרס
const app = express() //מפעיל את הפונקציה
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const {
  v4: uuidv4
} = require('uuid');
const url = require('url');
const {
  createCar,
  doubpleArr,
  deleteCar,
  showCarById,
  updateCar
} = require('./controllers/car_controller.js');
const {
  error
} = require('console');

app.use(bodyParser.json())

let cars = {};

fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
  }
  cars = JSON.stringify(data)
})

app.get('/', (req, res) => {
  res.send('hello world')
})

//הדפסת כל האובייקט על המסך
app.get(`/car`, (req, res) => {

  fs.readFile('./data.txt', 'utf8', (err, data) => {

    if (err) {
      console.error(err);
      res.status(500).send('Error occurred while reading the file.');
    } else {
      res.send(JSON.stringify(data))
      console.log(data)
    }
  })
})

//double the array
/*
app.post('/car/array', (req, res) => {
  let arr = req.body;
  let newarr = arr.map(item => {
    return item * 2
  })
  res.send(newarr); //תשובה
})
*/

app.post('/car/array', (req, res) => {
  doubpleArr(req, res)
})
/*<-- PATH BY ~ID~ -->*/

app.post('/car', (req, res) => { //שליחה מפוסטמן
  createCar(req, res);
});

app.get('/car/:id', (req, res) => {
  showCarById(req, res)
})       

app.delete('/car/:idremove', (req, res) => {
  deleteCar(req, res)
})

app.put('/car/:id', (req, res) => {
  updateCar(req, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}! `)
})

      // <--- get | post | put | delete --->

      //דרוש להתקין:
      //npm init
      //NodeMon
      //Express
      //body-parser
      //Postman
      //npm init
      //packageJson אומר שזה הבלופרינט של הפרוייקט שלנו
      //read write append create

    
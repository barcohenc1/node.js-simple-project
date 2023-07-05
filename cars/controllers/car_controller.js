const {
  v4: uuidv4
} = require('uuid');
const fs = require('fs');

const createCar = (req, res) => {
  const uuid = uuidv4();
  args = {
    ...req.body,
    id: uuid
  };
  const data = JSON.stringify(args) + "\r\n";
  console.log(data)
  fs.appendFile('./data.txt', data, err => {
    if (err) {
      console.error(err, "Failed writing to file")
    }
    res.send(args); //תשובה
  })
}

const doubpleArr = (req, res) => {
  let arr = req.body;
  let newarr = arr.map(item => item * 2)
  console.log(newarr)
  res.send(newarr); //תשובה
}

const deleteCar = (req, res) => {
  const req_id = req.params.idremove;
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.send('Error occurred while reading the file.');
    }

    const productsArray = data.split("\r\n");
    productsArray.pop()
    let objArr = productsArray.map(car => JSON.parse(car))
    const findTheCar = objArr.filter(product => product.id == req_id);

    if (findTheCar.length > 0) { //the issue is here!!!!
      
      objArr = objArr.filter(car => car.id !== req_id)

      res.send(`item removed : ${JSON.stringify(findTheCar[0])}`)
      let newArr = "";
      objArr.forEach(car => newArr += JSON.stringify(car) + "\r\n")
      fs.writeFile("data.txt", newArr, function (err) {
        if (err) {
          throw err;
        }
        console.log('Saved new server!');
      });
    } else {
      res.send("id is not exist! :/")
    }
  })
}

const showCarById = (req, res) => {
  const req_id = req.params.id;
  /* --------- לקיחת הקובץ --------- */
  fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.send('Error occurred while reading the file.');
    }

    const productsArray = data.split("\r\n");
    const filter = productsArray.filter(product => product.includes(req_id));
    console.log(productsArray)

    if (filter.length > 0) {
      res.send(filter[0]);
    } else {
      res.send("id is not founded")

    }
  });
}

const updateCar = (req, res) => {
  const req_id = req.params.id;
  const {
      brand_name,
      engine_size,
      category,
      km_per_liter,
      min_price,
      max_price,
      condition
  } = req.body;

  fs.readFile('./data.txt', 'utf-8', (err, data) => {
      if (err) {
          console.error(err)
          return res.send('Error while Reading.. ')
      }

      const carsArray = data.split("\r\n")
      carsArray.pop()

      const carsArrObj = carsArray.map(car => JSON.parse(car));
      const indexId = carsArrObj.findIndex(car => car.id === req_id);

      if (indexId !== -1) {
       //   res.send("ID Founded!")

          if (typeof brand_name !== 'undefined' && brand_name !== null) {
              carsArrObj[indexId].brand_name = brand_name;
          }
          if (typeof engine_size !== 'undefined' && engine_size !== null) {
              carsArrObj[indexId].engine_size = engine_size;
          }
          if (typeof category !== 'undefined' && category !== null) {
              carsArrObj[indexId].category = category;
          }
          if (typeof km_per_liter !== 'undefined' && km_per_liter !== null) {
              carsArrObj[indexId].km_per_liter = km_per_liter;
          }
          if (typeof min_price !== 'undefined' && min_price !== null) {
              carsArrObj[indexId].min_price = min_price;
          }
          if (typeof max_price !== 'undefined' && max_price !== null) {
              carsArrObj[indexId].vmax_price = max_price;
          }
          if (typeof condition !== 'undefined' && condition !== null) {
              carsArrObj[indexId].condition = condition;
          }

          let updatedCars = "";
          carsArrObj.forEach(car => updatedCars += (car + "\r\n"))

          fs.writeFile('./data.txt', updatedCars, function(err){
              if(err){
                  res.send("throw err")
                  throw (err)
              }
              res.send("File Written")
              console.log('Saved new server')
          })
      }
      else{
          res.send("ID's NOT EXISTS")
      }
  })
}





//דבר ראשון צריך למצוא אם קיים הID
//למצוא את האינדקס של הID 
//ואז להחליף את האובייקט במקום של האינדקס
module.exports = {
  createCar,
  doubpleArr,
  deleteCar,
  showCarById,
  updateCar
};
const {
    v4: uuidv4
} = require('uuid');
const fs = require('fs');


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

        const carsArray = data.split("\r\n");
        const carsArrObj = carsArray.forEach(car => JSON.parse(car));
        const indexId = carsArrObj.indexOf(req_id);

        if (indexId !== -1) {
            res.send("ID Founded!")

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
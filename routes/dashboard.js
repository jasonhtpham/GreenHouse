const express = require('express');
// const { check, validator, validationResult } = require('express-validator');
const bodyParser = require ('body-parser');


const router = express.Router();

// bodyParse setup
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const calcTotal=data=>{
   let totalInsects=0
    data.forEach(element => {
        totalInsects+=element.insectsAmount
        
    });
    return totalInsects
}

module.exports = params => {
    const {client} = params;

    router.get("/", async (req, res, next) => {
        
        try {
          //  await client.connect();
            let totalInsects=0;
            let greenhouseData = await client.db("greenhouse").collection("areas").find({}).toArray();
            if(greenhouseData.length>0){
                totalInsects=calcTotal(greenhouseData)
            }
            //console.log(greenhouseData)

            // greenhouseData.forEach(element => {
            //     let testTime = new Date(element.timeStamp * 100000000);
            //     console.log(testTime)
            // });

            return res.render('layout', {
                template: 'dashboard',
                greenhouseData,totalInsects
            })

        } catch (err) {
            console.log("Error on dashboard enpoint", err);
            return next(err);
        }

      });

    return router;
};
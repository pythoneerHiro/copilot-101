//Load express module with `require` directive
var express = require('express')
var Request = require("request")
var app = express()

const axios = require('axios');
const url = require("url");


var urlInventory = process.env.INVENTORY_URL || "http://inventory-svc.ecom-system.local:8081"
// urlInventory="http://localhost:8081"

 
//Define request response in root URL (/)
app.get('/*',  function (req, res) {

    var config = {
      method: 'get',
      url: urlInventory,
        headers:{},
    };
    let inventoryServiceRes='not processed';

    axios(config)
    .then(function (response) {
        inventoryServiceRes = response.data
        console.log(response.statusCode);
    })
    .catch(function (error) {
        inventoryServiceRes = error
      console.error("errer is",error);
    })
    .finally( ()=>{
        res.send("Order ..Recieved. Processing started...| " + inventoryServiceRes )
    }
    )
})

//Launch listening server on port 8080
app.listen(8080, function () {
  console.log('Order service listening on port 8080!')
})

const mongoose = require('mongoose')

const DBMS = mongoose.connect(process.env.URL)

if(DBMS){
    console.log('DataBase Connected Successful');
}else{
    console.log('DataBase Connection Error');
}

module.exports = DBMS
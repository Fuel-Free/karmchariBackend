const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  ProviderID : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Provider',
  },
  Subject :{
    type :String,
  },
  Text:{
    type :String,
  },
  Image : {
    type :String,
  },
})

ServiceSchema.set('timestamps', true)

module.exports = mongoose.model('Service', ServiceSchema)

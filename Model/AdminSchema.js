const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
      },
    Password : {
        type : String,
        required : true
    },
})

AdminSchema.set('timestamps', true)

module.exports = mongoose.model('Admin', AdminSchema)
// VDO 19  Booking  Model

const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    room : {
        type: String,required: true
    },
    roomid : {
        type: String,required: true
    },
    // totalamount : {
    //     type: Number,required: true
    // },
    userid:{
        type:String,
        required:true,
    },
    transcationId : {
        type: String,required: true
    },
    status : {
        type : String,required: true , default : 'booked'
    }
})

const bookingmodel = mongoose.model('bookings' , bookingSchema);

module.exports = bookingmodel
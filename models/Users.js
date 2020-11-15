const { model, Schema } = require('mongoose');


const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
})

module.exports = model("User", UserSchema);
const { model, Schema } = require('mongoose');

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adminkey: {
        type: String,
        default: () => {
            return Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)
        }
    },
    type: {
        type: String,
        default: "admin",
    }
})

module.exports = model("Admin", AdminSchema);
const { model, Schema } = require('mongoose');


const LoanTypeSchema = new Schema({
    loanname: {
        type: String,
        required: true,
    },
    maxvalue: {
        type: Number
    }
})

module.exports = model("LoanType", LoanTypeSchema);
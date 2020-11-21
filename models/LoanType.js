const { model, Schema } = require('mongoose');


const LoanTypeSchema = new Schema({
    loanname: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    maxloan: {
        type: Number,
        required: true
    },
    installments: {
        type: Number,
        required: true
    },
    mininstallmentfee: {
        type: Number,
        required: true
    },
    guarentor: {
        type: Boolean,
        default: false
    }

})

module.exports = model("LoanType", LoanTypeSchema);
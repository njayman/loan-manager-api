const { model, Schema } = require('mongoose');

const AuditSchema = new Schema({
    amount: {
        required: true,
        type: Number,
    },
    auditdate: {
        type: Date,
        default: Date.now
    }
})

const LoanSchema = new Schema({
    loanname: {
        type: String,
        required: true,
    },
    loancomment: {
        type: String,
    },
    installments: {
        type: Number,
        required: true
    },
    loanamount: {
        type: Number,
        required: true
    },
    mininstallmentfee: {
        type: Number,
        required: true
    },
    guarentorid: {
        type: String,
        default: "n/a"
    },
    loanpaidback: {
        default: 0
    },
    audits: [AuditSchema]
})

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
    },
    details: {
        type: String,
    },
    loans: {
        type: [LoanSchema]
    }
})

module.exports = model("User", UserSchema);
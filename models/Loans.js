const { model, Schema } = require('mongoose');

const AuditSchema = new Schema({
    auditamount: {
        type: Number,
        required: true
    },
    auditdate: {
        type: Date,
        default: Date.now
    }
})

const LoanSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    guarantor: {
        type: String,
    },
    loanuser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paidback: {
        type: Number,
        default: 0
    },
    issued: {
        type: Date,
        default: Date.now,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
    },
    audits: [AuditSchema]
})

module.exports = model("Loan", LoanSchema);
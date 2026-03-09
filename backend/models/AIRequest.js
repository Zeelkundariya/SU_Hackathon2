const mongoose = require("mongoose");

const AIRequestSchema = new mongoose.Schema({
    agentName: {
        type: String,
        required: true
    },
    requestType: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AIRequest", AIRequestSchema);

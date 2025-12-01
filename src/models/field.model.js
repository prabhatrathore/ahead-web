const mongoose = require('mongoose');

const nestedFieldSchema = new mongoose.Schema({
    label: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: [{ type: String }],
    validation: {
        min: Number,
        max: Number,
        regex: String,
    },
    order: Number
}, { _id: false });


const fieldSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
        required: true
    },
    label: { type: String, required: true },

    type: {
        type: String,
        enum: ["text", "textarea", "number", "email", "date", "checkbox", "radio", "select"],
        required: true
    },
    name: { type: String, required: true },
    required: { type: Boolean, default: false },

    options: [{ type: String }],

    validation: {
        min: Number,
        max: Number,
        regex: String
    },
    createdBy: { type: String },
    nestedFields: [nestedFieldSchema],

    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Field", fieldSchema);

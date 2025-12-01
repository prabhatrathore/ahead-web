const fieldModel = require('../models/field.model.js');
const formModel = require('../models/form.model.js');
const submissionModel = require('../models/submission.model.js');
const SubmissionModel = require("../models/submission.model.js")

exports.submitForm = async (req, res) => {
    try {
        const { formId, answers } = req.body;

        const form = await formModel.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        let fetchAllField = await fieldModel.find({ formId: formId }).lean()
        const formattedAnswers = [];

        for (let ans of answers) {
            if (ans.fieldId) {
                const field = fetchAllField.find((a) => a?._id.toString() == ans.fieldId);

                if (!field || field.formId.toString() !== formId) {
                    return res.status(400).json({
                        message: `Invalid fieldId: ${ans.fieldId}`
                    });
                }

                if (field.required && (ans.value === "" || ans.value == null)) {
                    return res.status(400).json({
                        message: `Field ${field.label} is required`
                    });
                }

                if (field.type === "number" && typeof ans.value !== "number") {
                    return res.status(400).json({
                        message: `Field ${field.label} must be number`
                    });
                }

                if (field.type === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(ans.value)) {
                        return res.status(400).json({
                            message: `Invalid email for field ${field.label}`
                        });
                    }
                }

                if (field.validation?.min && ans.value < field.validation.min) {
                    return res.status(400).json({
                        message: `${field.label} must be >= ${field.validation.min}`
                    });
                }
                if (field.validation?.max && ans.value > field.validation.max) {
                    return res.status(400).json({
                        message: `${field.label} must be <= ${field.validation.max}`
                    });
                }

                if (field.validation?.regex) {
                    const regex = new RegExp(field.validation.regex);
                    // console.log(regex, "gregex", 'field.validation.regex', field.validation.regex, "{{{", regex.test(ans.value), "SSS", ans.value)
                    if (!regex.test(ans.value)) {
                        return res.status(400).json({
                            message: `${field.label} does not match the required format`
                        });
                    }
                }
                formattedAnswers.push({
                    fieldId: field._id,
                    label: field.label,
                    name: field.name,
                    value: ans.value
                });
            }
            if (ans.parentFieldId) {
                const parent = fetchAllField.find(f => f._id.toString() === ans.parentFieldId);
                if (!parent) continue;

                const nested = parent.nestedFields.find(n => n.name === ans.name);
                if (!nested) continue;

                formattedAnswers.push({
                    parentFieldId: parent._id,
                    name: nested.name,
                    label: nested.label,
                    value: ans.value
                });
            }
        }

        const submission = await SubmissionModel.create({
            formId,
            answers: formattedAnswers
        });

        return res.status(200).json({
            message: "Form submitted successfully",
            submissionId: submission._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err?.message });
    }
};


exports.getAllForm = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        let skip = (page - 1) * limit;

        let get = await submissionModel.aggregate([
            {
                $lookup: {
                    from: "forms",
                    localField: "formId",
                    foreignField: "_id",
                    as: "formDetails"
                }
            },

            { $unwind: "$formDetails" },

            { $sort: { submittedAt: -1 } },

            { $skip: skip },
            { $limit: limit }
        ]);

        let total = await submissionModel.countDocuments();

        res.json({
            total,
            page,
            limit,
            data: get
        });
        return
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}
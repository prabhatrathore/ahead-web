const Joi = require("joi");

const answerItemSchema = Joi.object({
    fieldId: Joi.string().label("fieldId"),
    parentfieldId: Joi.string().label("parentfieldId"),

    value: Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.array().items(Joi.string(), Joi.number(), Joi.boolean())
    ).required().label("value")
});

const submissionSchema = Joi.object({
    formId: Joi.string().required().label("formId"),
    answers: Joi.array().items(answerItemSchema)
        .min(1)
        .required()
        .label("answers"),
})


module.exports = {
    submissionSchema,
};

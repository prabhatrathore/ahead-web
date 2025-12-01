const Joi = require("joi");

const nestedFieldSchema = Joi.object({
    label: Joi.string().required(),
    type: Joi.string().valid("text", "textarea", "number", "email", "date", "checkbox").required(),
    name: Joi.string().required(),
    required: Joi.boolean(),

    options: Joi.alternatives().conditional("type", {
        is: Joi.valid("checkbox", "radio", "select"),
        then: Joi.array().items(Joi.string()).min(1).required(),
        otherwise: Joi.valid(null).optional()
    }),
    validation: Joi.when("type", {
        is: Joi.valid("text", "textarea", "number", "email"),
        then: Joi.object({
            min: Joi.number().optional(),
            max: Joi.number().optional(),
            regex: Joi.string().optional()
        }).optional(),
        otherwise: Joi.valid(null).optional()
    }),

    order: Joi.number(),
});

const createFieldSchema = Joi.object({
    formId: Joi.string().required().label("formId"),
    label: Joi.string().required().label("label"),
    type: Joi.string()
        .valid("text", "textarea", "number", "email", "date", "checkbox", "radio", "select")
        .required().label("type"),
    name: Joi.string().required().label("name"),
    required: Joi.boolean().default(false),

    options: Joi.alternatives().conditional("type", {
        is: Joi.valid("checkbox", "radio", "select"),
        then: Joi.array().items(Joi.string()).min(1).required(),
        otherwise: Joi.valid(null).optional()
    }),

    validation: Joi.when("type", {
        is: Joi.valid("text", "textarea", "number", "email"),
        then: Joi.object({
            min: Joi.number().optional(),
            max: Joi.number().optional(),
            regex: Joi.string().optional()
        }).optional(),
        otherwise: Joi.valid(null).optional()
    }),

    nestedFields: Joi.array().items(nestedFieldSchema),

    order: Joi.number().default(0)
}).required().label("data");

const getFieldByIdSchema = Joi.object({
    formId: Joi.string().required().label("formId"),
}).required().label("data");

const updateFieldByIdSchema = Joi.object({
    id: Joi.string().required().label("fieldId"),
}).required().label("data");

const deleteFieldByIdSchema = Joi.object({
    id: Joi.string().required().label("fieldId"),
}).required().label("data");

module.exports = {
    createFieldSchema,getFieldByIdSchema,updateFieldByIdSchema  ,deleteFieldByIdSchema
};

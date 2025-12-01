const Joi = require('joi');

const formSchema = Joi.object({
    title: Joi.string().trim().min(2).max(50).required().label("title"),
    description: Joi.string().trim().min(20).max(500).required().label("description"),
}).required().label("data");


const updateFormSchema = Joi.object({
    id: Joi.string().trim().min(2).max(50).required().label("id"),
}).required().label("data");


const deleteFormSchema = Joi.object({
    id: Joi.string().trim().min(2).max(50).required().label("id"),
}).required().label("data");


module.exports = { formSchema,updateFormSchema ,deleteFormSchema}
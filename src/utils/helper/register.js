const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),

    email: Joi.string()
        .trim()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/)
        .message(
            'Password must contain uppercase, lowercase, number, and special character'
        )
        .required(),

    role: Joi.string()
        .valid('admin', 'user')
        .required(),
});


module.exports = { registerSchema }
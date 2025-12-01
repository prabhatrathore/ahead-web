const fieldService = require('../services/field.services.js');
const { createFieldSchema, getFieldByIdSchema, updateFieldByIdSchema, deleteFieldByIdSchema } = require('../utils/helper/field.js');

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
}

exports.create = async (req, res) => {
    try {
        let { error } = createFieldSchema.validate(req.body, options)
        if (error) {
            return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
        }
        await fieldService.createField(req, res);
    } catch (err) {
        return res.status(500).json({ message: err?.message })

    }
}

exports.getAll = async (req, res) => {
    try {
        let { error } = getFieldByIdSchema.validate(req.params, options)
        if (error) {
            return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
        }
        await fieldService.getFields(req, res);
    } catch (err) {
        return res.status(500).json({ message: err?.message })

    }
}

exports.update = async (req, res,) => {
    try {
        let { error } = updateFieldByIdSchema.validate(req.params, options)
        if (error) {
            return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
        }
        const updated = await fieldService.updateField(req, res);
    } catch (err) {
        return res.status(500).json({ message: err?.message })

    }
}

exports.delete = async (req, res, next) => {
    try {
        let { error } = deleteFieldByIdSchema.validate(req.params, options)
        if (error) {
            return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
        }
        await fieldService.deleteField(req, res);
    } catch (err) {
        return res.status(500).json({ message: err?.message })

    }
}


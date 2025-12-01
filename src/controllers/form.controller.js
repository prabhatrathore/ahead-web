const fieldModel = require('../models/field.model.js');
const Form = require('../models/form.model.js');
const { getForm, createForm, updateForm, deleteForm } = require('../services/form.services.js');
const { formSchema, updateFormSchema, deleteFormSchema } = require('../utils/helper/form.js');

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
}

exports.createForm = async (req, res) => {
  try {

    let { error } = formSchema.validate(req.body, options)
    if (error) {
      return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
    }
    await createForm(req, res)
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "fetcch data", data: forms, })
  } catch (error) {
    return res.status(500).json({ message: error?.message })

  }
}

exports.getForm = async (req, res) => {
  try {
    const data = await Form.findById(req.params.id).lean();
    if (!data) {
      return res.status(404).json({ message: "'Form not found'", statusCode: 404, success: false })
    }
    let allFieldData = await fieldModel?.find({ formId: req.params.id })
    // console.log(allFieldData, 'allFieldDataallFieldData')

    data.fieldData = allFieldData || []

    return res.status(200).json({ message: "get data", data: data, })
  } catch (error) {
    return res.status(500).json({ message: error?.message })

  }
}

exports.updateForm = async (req, res) => {
  try {
    let { error } = updateFormSchema.validate(req.params, options)
    if (error) {
      return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
    }
    await updateForm(req, res)
  } catch (error) {
    return res.status(500).json({ message: error?.message })

  }
}

exports.deleteForm = async (req, res) => {
  try {
    let { error } = deleteFormSchema.validate(req.params, options)
    if (error) {
      return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
    }
    deleteForm(req, res)
  } catch (error) {
    return res.status(500).json({ message: error?.message })

  }
}

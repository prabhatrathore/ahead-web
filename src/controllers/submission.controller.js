const { submitForm, getAllForm } = require('../services/submission.services.js');
const { submissionSchema } = require('../utils/helper/submission.js');

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
}

exports.submitForm = async (req, res) => {
  try {
    let { error } = submissionSchema.validate(req.body, options)
    if (error) {
      return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
    }
    await submitForm(req, res)
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}

exports.listSubmissions = async (req, res) => {
  try {
    await getAllForm(req, res)

  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }

}

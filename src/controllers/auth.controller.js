const service = require('../services/auth.services.js');
const { registerSchema } = require('../utils/helper/register.js');


const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
}

exports.register = async (req, res) => {
  // console.log(req.body, "req.bodyyyyy")
  try {

    let { error } = registerSchema.validate(req.body, options)
    if (error) {
      return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
    }
    await service.register(req, res);
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
};


exports.login = async (req, res) => {
  try {
    await service.login(req,res);
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}


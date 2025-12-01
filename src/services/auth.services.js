const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');


exports.register = async (req, res) => {
  try {
    let { name, email, role, password } = req.body

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400).json({ message: "Email already registered" })
      return
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, role: role || 'user' });

    let obj = { id: user._id, name: user.name, email: user.email, role: user.role }

    res.status(201).json({ message: "success", data: obj })
    return
  } catch (error) {
    console.log(error, "eee")
    res.status(500).json({ message: error?.message, })
    return
  }
};

exports.login = async (req, res) => {
  try {

    let { email, password } = req.body

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    let obj = { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }

    res.status(201).json({ message: "success", data: obj })
    return
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
};


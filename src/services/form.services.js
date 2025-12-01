const Form = require('../models/form.model.js');


exports.createForm = async (req, res) => {
    try {
        let { title, description } = req.body
        let userObj = req.user
        // console.log(userObj,'userObjuserObj')

        let obj = { title, description, createdBy: req.user.id }
        let findFormExist = await Form.findOne({ title, createdBy: userObj.id })

        // console.log(findFormExist,"findform")
        // return
        if (findFormExist && findFormExist.title) {
            return res.status(400).json({ message: "Form name must be unique" })
        }

        await Form.create(obj);
        return res.status(201).json({ message: "Add form success" })

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        console.log(forms, "formsss")
    } catch (error) {
        return res.status(500).json({ message: error?.message })

    }
}

exports.getForm = async (req, res) => {
    try {
        const f = await Form.findById(req.params.id);
    } catch (error) {
        return res.status(500).json({ message: error?.message })

    }
}

exports.updateForm = async (req, res) => {
    try {
        let { id } = req.params

        const find = await Form.findByIdAndUpdate(id, req.body, { new: true });

        if (!find) {
            return res.status(404).json({ message: 'Form not found' })
        }

        return res.status(200).json({ message: 'Form updated', data: find })

    } catch (error) {
        return res.status(500).json({ message: error?.message })

    }
}

exports.deleteForm = async (req, res) => {
    try {
        let { id } = req.params

        const find = await Form.findByIdAndDelete(id);

        if (!find) {
            return res.status(404).json({ message: 'Form not found' })
        }
        return res.status(200).json({ message: 'Form deleted' })

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

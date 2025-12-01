const Field = require('../models/field.model.js');
const formModel = require('../models/form.model.js');


exports.createField = async (req, res) => {
    try {
        let checkformObj = await formModel?.findById(req.body.formId)
        if (!checkformObj) {
            return res.status(400).json({ message: "form not found" })
        }
        const exists = await Field.findOne({ formId: req.body.formId, name: req.body.name });
        if (exists) {
            return res.status(400).json({ message: "field already exist" })
        }
        req.body.createdBy = req.user.id
        await Field.create(req.body);
        return res.status(201).json({ message: "field create success" })

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

exports.getFields = async (req, res) => {
    try {
        let get = await Field.find({ formId: req.params.formId }).sort({ order: 1 });
        return res.status(200).json({ message: "fetch data", data: get })
    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

exports.updateField = async (req, res) => {
    try {

        const field = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!field) {
            return res.status(404).json({ message: "Field not found" })
        }
        return res.status(200).json({ message: "Field updated success" })
    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

exports.deleteField = async (req, res) => {
    try {
        const field = await Field.findByIdAndDelete(req.params.id);
        if (!field) {
            return res.status(404).json({ message: "Field not found" })
        }
        return res.status(200).json({ message: "field delete success" })
    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}



// async function getFields() {
//     try {
//         let get = await Field.find().sort({ order: 1 });
//         for (let le of get) {
//             // await Field.findByIdAndDelete(le._id)
//         }
//         console.log(get, 'getgetgetgetg  field')
//         // return res.status(500).json({ message: "fetch data", data: get })
//     } catch (error) {
//         // return res.status(500).json({ message: error?.message })
//     }
// }
// getFields()
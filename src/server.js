const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes.js');

const formRoutes = require('./routes/form.routes.js');
const submissionRoutes = require('./routes/submission.routes.js');
const fieldRoutes = require('./routes/field.routes.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/fields', fieldRoutes);


const PORT = process.env.PORT || 5000;

(async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    } catch (err) {
        console.error('Failed to start:', err);
        process.exit(1);
    }
})();

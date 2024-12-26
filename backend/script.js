const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors=require('cors');
const connectDatabase = require('./config/db');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const eventsRoutes =  require('./routes/events')
const registrationsRoutes = require('./routes/registrations')
const feedbacksRoutes =  require('./routes/feedbacks')
const photosRoutes = require('./routes/photos')
const winnersRoutes = require('./routes/winners')
const app = express();
dotenv.config({path: path.join(__dirname, 'config' ,'config.env')})

app.use(bodyParser.json());
app.use(cors({ origin : process.env.ORIGIN, credentials : true }));
connectDatabase();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/registrations', registrationsRoutes);
app.use('/api/feedbacks', feedbacksRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/winners', winnersRoutes);

app.listen(process.env.PORT, process.env.IP_ADDRESS, () => {
    console.log(`Server listening to Port ${process.env.PORT}`);
})
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use('/oauth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

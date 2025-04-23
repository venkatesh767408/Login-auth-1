const bcrypt = require('bcrypt');
const Usermodel = require('../model/users');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Usermodel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successfully",
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'Authentication failed. Check email and password',
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: 'Authentication failed. Check email and password',
                success: false
            });
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email: user.email,
            name: user.name
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};

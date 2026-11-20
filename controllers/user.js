const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');

module.exports.registerUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.email.includes("@")) {
            return res.status(400).send({ message: "Invalid email format" });
        }

        if (!req.body.password || req.body.password.length < 8) {
            return res.status(400).send({ message: "Password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        const result = await newUser.save();

        return res.status(201).send({
            message: "Registered successfully"
        });
    } catch (error) {
        return auth.errorHandler(error, req, res);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.email.includes("@") || !req.body.email.includes(".com")) {
            return res.status(400).send({ message: "Invalid email format" });
        }

        const result = await User.findOne({ email: req.body.email });

        if (!result) {
            return res.status(404).send({ message: "No email found" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, result.password);

        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "Incorrect email or password" });
        }

        return res.status(200).send({
            access: auth.createAccessToken(result)
        });
    } catch (error) {
        return auth.errorHandler(error, req, res);
    }
};

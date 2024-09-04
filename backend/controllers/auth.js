const { loginUser ,registerUser } = require('../service/auth');

const login = async (req,res) => {
    try {
        const user = await  loginUser(req.body);
        res.status(200).send(user.token);
    } catch (err) {
        if (err.message === "User not Found") {
            return res.status(404).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err.message === "All input is required") {
            return res.status(400).send(err.message);
        }
        if (err.message === "User already exists. Please login") {
            return res.status(409).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { login,register };

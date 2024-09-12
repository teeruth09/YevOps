const { fetchProfile, updateProfile } = require('../service/profile');

const getProfile = async (req,res) => {
    try {
        const profile = await fetchProfile(req);
        res.status(200).send(profile);
    } catch (err) {
        if (err.message === "User not Found") {
            return res.status(404).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const putProfile = async (req,res) => {
    try {
        const profile = await updateProfile(req);
        res.status(200).send(profile);
    } catch (err) {
        if (err.message === "User not Found") {
            return res.status(404).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { getProfile, putProfile };
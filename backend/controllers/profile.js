const { fetchProfile, updateProfile, getAllShopProfile, getShopIdProfile } = require('../service/profile');

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

const getAllShops = async (req,res) =>{
    try{
        const profile =  await getAllShopProfile();
        res.status(200).send(profile);
    }catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: err.message || 'Error retrieving shops' });
    }
}

const getShopProfile = async (req,res) =>{
    try{
        const profile = await getShopIdProfile(req);
        res.status(200).send(profile);
        console.log(profile)
    }catch(err){
        if (err.message === "Shop not Found") {
            return res.status(404).send(err.message);
        }
        else if (err.message === "Keyword is required") {
            return res.status(400).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { getProfile, putProfile, getAllShops, getShopProfile };
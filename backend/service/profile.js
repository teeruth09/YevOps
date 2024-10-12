const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const ClientSize = require('../models/clientSize');
const Shop = require('../models/shop');
const config = process.env;


const fetchProfile = async (req) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required');
        }

        const { user_id } = jwt.verify(token, config.TOKEN_KEY);

        let user = await Client.findById(user_id);
        // let userSizes = await ClientSize.find({ clientId: user_id });

        if (!user) {
            user = await Shop.findById(user_id);
        }

        if (!user) {
            throw new Error("User not Found");
        }

        const profile = {
            username: user.username,
            address: user.address,
        };

        if (user.role === "client") {
            Object.assign(profile, {
                firstname: user.firstname,
                lastname: user.lastname,
                gender: user.gender,
                birthdate: user.birthdate,
                phone: user.phone,
                // clientSize: user.clientSize,
                imageProfile : user.imageProfile
            });
            // If the user has a clientSize ID, fetch the associated client size details
            if (user.clientSize) {
                const clientSize = await ClientSize.findById(user.clientSize._id);
                if (clientSize) {
                    // Add the client size details to the profile
                    Object.assign(profile, {
                        clientSize: {
                            _id: clientSize._id,
                            shirtLength: clientSize.shirtLength,
                            chestSize: clientSize.chestSize,
                            waistline: clientSize.waistline,
                            hip: clientSize.hip,
                            waistShirt: clientSize.waistShirt,
                            hipShirt: clientSize.hipShirt,
                            thigh: clientSize.thigh,
                            crotch: clientSize.crotch,
                            shoulder: clientSize.shoulder,
                            armLength: clientSize.armLength,
                            calf: clientSize.calf,
                            tipLeg: clientSize.tipLeg,
                            legLength: clientSize.legLength,
                            upperArm: clientSize.upperArm
                        }
                    });
                }
            } 
        }else if (user.role === "shop") {
            Object.assign(profile, {
                shopName: user.shopName,
                shopDescription: user.shopDescription,
                location: user.location,
                phone: user.phone,
                imageProfile: user.imageProfile
            });
        }
        return profile;
    } catch (err) {
        throw new Error(err.message || "Error fetching profile");
    }
};

const updateProfile = async (req) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required');
        }

        const { user_id } = jwt.verify(token, config.TOKEN_KEY);

        let user = await Client.findById(user_id);
        let userSizes = await ClientSize.find({ clientId: user_id });

        if (!user) {
            user = await Shop.findById(user_id);
        }

        if (!user) {
            throw new Error("User not Found");
        }

        const updatedFields = {
            address: req.body.address 
        };

        if (user.role === "client") {
            await user.updateOne({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                gender: req.body.gender ,
                birthdate: req.body.birthdate ,
            });
            // Update client size details
            const clientSizeId = user.clientSize?._id; // Use the clientSize ID from the user's profile
            if (clientSizeId) {
                // Find the client size by ID
                const clientSize = await ClientSize.findById(clientSizeId);
                if (clientSize) {
                    // Update the client size fields
                    await clientSize.updateOne({
                        shirtLength: req.body.shirtLength,
                        chestSize: req.body.chestSize,
                        waistline: req.body.waistline,
                        hip: req.body.hip,
                        waistShirt: req.body.waistShirt,
                        hipShirt: req.body.hipShirt,
                        thigh: req.body.thigh,
                        crotch: req.body.crotch,
                        shoulder: req.body.shoulder,
                        armLength: req.body.armLength,
                        calf: req.body.calf,
                        tipLeg: req.body.tipLeg,
                        legLength: req.body.legLength,
                        upperArm: req.body.upperArm
                    });
                } else {
                    throw new Error("ClientSize not found");
                }
            }

        } else if (user.role === "shop") {
            await user.updateOne({
                shopName: req.body.shopName ,
                shopDescription: req.body.shopDescription ,
                location: req.body.location,
                phone: req.body.phone,
                genre: req.body.genre,
            });
            
        }

        await user.updateOne(updatedFields);
        console.log(user)

        return await fetchProfile(req); 
    } catch (err) {
        throw new Error(err.message || "Error updating profile");
    }
};

const getAllShopProfile = async () =>{
    try{
        const shops = await Shop.find({shopDescription: {$ne:null}})
        return shops
    }catch(err){
        throw new Error(err.message || 'Error retrieving users');
    }
}

const getShopIdProfile = async (req) =>{
    try{
        let shop_id = req.params.id;
        const shop = await Shop.findById(shop_id);

        if (!shop) {
            throw new Error("Shop not Found");
        }
        return shop;

    }catch(err){
        throw new Error(err.message || 'Error retrieving users');
    }
}



module.exports = { fetchProfile, updateProfile, getAllShopProfile, getShopIdProfile };
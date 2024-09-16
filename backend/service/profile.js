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
        let userSizes = await ClientSize.find({ clientId: user_id });

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
                userSizes: userSizes
            });


        } else if (user.role === "shop") {
            Object.assign(profile, {
                shopName: user.shopName,
                shopDescription: user.shopDescription,
                location: user.location,
                phone: user.phone,
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

            // const clientSizeId = req.body.clientSizeId;
            // if (!clientSizeId) {
            //     throw new Error("ClientSize ID is required");
            // }

            // const clientSize = await ClientSize.findOne({ _id: clientSizeId, clientId: user_id });
            // if (!clientSize) {
            //     throw new Error("ClientSize not found");
            // }

            // await clientSize.updateOne({
            //     shirtLength: req.body.shirtLength,
            //     chestSize: req.body.chestSize,
            //     waistline: req.body.waistline,
            //     hip: req.body.hip,
            //     waistShirt: req.body.waistShirt,
            //     hipShirt: req.body.hipShirt,
            //     thigh: req.body.thigh,
            //     crotch: req.body.crotch,
            //     shoulder: req.body.shoulder,
            //     armLength: req.body.armLength,
            //     calf: req.body.calf,
            //     tipLeg: req.body.tipLeg,
            //     legLength: req.body.legLength,
            //     upperArm: req.body.upperArm
            // });

        } else if (user.role === "shop") {
            await user.updateOne({
                shopName: req.body.shopName ,
                shopDescription: req.body.shopDescription ,
                location: req.body.location,
                phone: req.body.phone
            });
            
        }

        await user.updateOne(updatedFields);
        console.log(user)

        return await fetchProfile(req); 
    } catch (err) {
        throw new Error(err.message || "Error updating profile");
    }
};

module.exports = { fetchProfile, updateProfile };

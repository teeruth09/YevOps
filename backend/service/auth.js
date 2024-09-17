const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const Shop = require('../models/shop');


const loginUser = async (userData) => {
    const { email, password } = userData;

    if (!(email && password)) {
        throw new Error("All input is required");
    }

    let user = await Client.findOne({ email });

    if (!user) {
        user = await Shop.findOne({ email });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "3h" }
        );

        return {
            role: user.role,  // Use the role property from the user object
            token: token,
        };
    } else {
        throw new Error("Incorrect Email or Password");
    }
};

const registerClient = async (userData) => {
    const { firstname, lastname, email, password, gender, birthdate, idCardNumber, phone, address, role, username, imageProfile} = userData;

    if (!(email && password && firstname && lastname && gender && birthdate && idCardNumber && phone && address && role && username)) {
        throw new Error("All input is required");
    }

    const clientCheck = [
        { key: 'email', value: email },
        { key: 'id_card', value: idCardNumber },
        { key: 'phone', value: phone },
        { key: 'name', value: username }
    ];

    for (const check of clientCheck) {
        const existingClient = await Client.findOne({ [check.key]: check.value });
        if (existingClient) {
            switch (check.key) {
                case 'email':
                    throw new Error("This Email is already used");
                case 'id_card':
                    throw new Error("This ID card is already used");
                case 'phone':
                    throw new Error("This phone number is already used");
                case 'name':
                    throw new Error("This username is already used");
                default:
                    throw new Error("Unknown field error");
            }
        }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newClient = {
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        role,
        address,
        username,
        gender,
        birthdate,
        idCardNumber,
        phone,
        imageProfile,
    };


    const client = await Client.create(newClient);

    const token = jwt.sign(
        { user_id: client._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );

    client.token = token;
    return client;
};

const registerShop = async (userData) => {
    const { firstname, lastname, email, password, gender, birthdate, idCardNumber, phone, address, role, username, shopDescription, location, imageProfile } = userData;

    if (!(email && password && firstname && lastname && gender && birthdate && idCardNumber && phone && address && role && username && shopDescription && location)) {
        throw new Error("All input is required");
    }

    const shopCheck = [
        { key: 'email', value: email },
        { key: 'id_card', value: idCardNumber },
        { key: 'phone', value: phone },
        { key: 'name', value: username }
    ];

    for (const check of shopCheck) {
        const existingShop = await Shop.findOne({ [check.key]: check.value });
        if (existingShop) {
            switch (check.key) {
                case 'email':
                    throw new Error("This Email is already used");
                case 'id_card':
                    throw new Error("This ID card is already used");
                case 'phone':
                    throw new Error("This phone number is already used");
                case 'name':
                    throw new Error("This username is already used");
                default:
                    throw new Error("Unknown field error");
            }
        }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newShop = {
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        role,
        address,
        username,
        shopName: username,
        shopDescription,
        location,
        phone,
        gender,
        birthdate,
        idCardNumber,
        imageProfile,
    };


    const shop = await Shop.create(newShop);

    const token = jwt.sign(
        { user_id: shop._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );

    shop.token = token;
    return shop;
};

module.exports = { loginUser, registerClient, registerShop };
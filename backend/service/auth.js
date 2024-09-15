const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDetail = require('../models/userDetail');
const ShopDetail = require('../models/shopDetail');

const loginUser = async (userData) => {
    const { email, password } = userData;

    if (!(email && password)) {
        throw new Error("All input is required");
    }

    const user = await User.findOne({ email }).populate('userDetails shopDetails');

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

const registerUser = async (userData) => {
    const { first_name, last_name, email, password, gender, dob, id_card, phone, address, role, name} = userData;

    if (!(email && password && first_name && last_name && gender && dob && id_card && phone && address && role && name)) {
        throw new Error("All input is required");
    }

    const userCheck = [
        { key: 'email', value: email },
        { key: 'id_card', value: id_card },
        { key: 'phone', value: phone },
        { key: 'name', value: name }
    ];

    for (const check of userCheck) {
        const existingUser = await User.findOne({ [check.key]: check.value });
        if (existingUser) {
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

    const newUser = {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        role,
        address,
        name
    };


    const userDetails = await UserDetail.create({
        gender,
        dob,
        id_card,
        phone,
    });

    newUser.userDetails = userDetails._id; 


    const user = await User.create(newUser);

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );

    user.token = token;
    return user;
};

const registerShop = async (userData) => {
    const { first_name, last_name, email, password, gender, dob, id_card, phone, address, role, name, shop_desc, shop_loca } = userData;

    if (!(email && password && first_name && last_name && gender && dob && id_card && phone && address && role && name && shop_desc && shop_loca)) {
        throw new Error("All input is required");
    }

    const userCheck = [
        { key: 'email', value: email },
        { key: 'id_card', value: id_card },
        { key: 'phone', value: phone },
        { key: 'name', value: name }
    ];

    for (const check of userCheck) {
        const existingUser = await User.findOne({ [check.key]: check.value });
        if (existingUser) {
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

    const newUser = {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        role,
        address,
        name
    };


    const shopDetails = await ShopDetail.create({
        shop_name: name,
        shop_desc,
        shop_loca,
        phone,
    });

    newUser.shopDetails = shopDetails._id; 


    const user = await User.create(newUser);

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );

    user.token = token;
    return user;
};

module.exports = { loginUser, registerUser, registerShop };
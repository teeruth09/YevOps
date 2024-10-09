const ClientSize = require('../models/clientSize');

// Function to get a client size by ID
const getClientSizeById = async (req) => {
    try {
        let size_id = req.params.id;
        const clientSize = await ClientSize.findById(size_id);
        if (!clientSize) {
            throw new Error('ClientSize not found');
        }
        return clientSize;
    } catch (error) {
        throw error; // Let the controller handle the error
    }
};

module.exports = {getClientSizeById};

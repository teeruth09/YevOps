const {getClientSizeById} = require("../service/clientSize")
// Controller function to get a client size by ID
const getClientSizeController = async (req, res) => {
    try {
        const clientSize = await getClientSizeById(req);
        res.status(200).send(clientSize);
        // console.log(clientSize)
    } catch (error) {
        if (error.message === 'ClientSize not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = {getClientSizeController};

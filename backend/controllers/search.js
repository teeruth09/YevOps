const { searchName, searchFilter } = require('../service/search');

const search = async (req,res) => {
    try {
        const result = await searchName(req);
        res.status(200).send(result);
    } catch (err) {
        if (err.message === "No Shop Found") {
            return res.status(404).send(err.message);
        }
        else if (err.message === "Keyword is required") {
            return res.status(400).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const filter = async (req,res) => {
    try {
        const result = await searchFilter(req);
        res.status(200).send(result);
    } catch (err) {
        if (err.message === "No Shop Found") {
            return res.status(404).send(err.message);
        }
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { search, filter };
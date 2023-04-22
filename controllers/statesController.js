const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.state = data }
}

const getAllStates = (req, res) => {
    res.json(data.states)
}

const getState = (req, res) => {

    const toUpper = (req.params.state).toUpperCase();

    const state = data.states.find(state => state.code === (toUpper));
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json(state);
}

module.exports = {
    getAllStates,
    getState
}
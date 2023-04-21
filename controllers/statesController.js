const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.state = data }
}

const getAllStates = (req, res) => {
    res.json(data.states)
}

module.exports = {
    getAllStates
}
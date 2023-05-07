const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.state = data }
    //contig: function () {}
}

const getAllStates = (req, res) => {

    switch (req.query.contig) {
        //Contiguous means the lower 48 and not HI and AK
        case "true":
            response = data.states.filter(state => state.code !== "HI" && state.code !== "AK");
            res.json(response);
            break;

        case "false":
            response = data.states.filter(state => state.code == "HI" || state.code == "AK");
            res.json(response);
            break;
        default:
            res.json(data.states)

    }


}

const getStateCapital = (req, res) => {
    const toUpper = (req.params.state).toUpperCase();
    const state = data.states.find(state => state.code === (toUpper));
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    response = {
        "state": state.state,
        "capital": state.capital_city
    }
    res.json(response);
}

const getStateNickname = (req, res) => {
    const toUpper = (req.params.state).toUpperCase();
    const state = data.states.find(state => state.code === (toUpper));
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    response = {
        "state": state.state,
        "nickname": state.nickname
    }
    res.json(response);
}

const getStatePop = (req, res) => {
    //Find State
    const toUpper = (req.params.state).toUpperCase();
    const state = data.states.find(state => state.code === (toUpper));
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    response = {
        "state": state.state,
        "population": state.population.toLocaleString()
    }
    res.json(response);
}

const getStateAdmission = (req, res) => {
    //Find State
    const toUpper = (req.params.state).toUpperCase();
    const state = data.states.find(state => state.code === (toUpper));
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    response = {
        "state": state.state,
        "admitted": state.admission_date
    }
    res.json(response);
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
    getState,
    getStateCapital,
    getStateNickname,
    getStatePop,
    getStateAdmission
}
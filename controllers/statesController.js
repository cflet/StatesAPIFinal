const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.state = data }
    //contig: function () {}
}


const State = require('../model/State');

const createState = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'Check this - missing info' });
    }

    try {
        const result = await State.create({
            stateCode: req.body.stateCode,
            funfacts: req.body.funfacts
        });

        res.status(201).json(result);

    } catch (err) {
        console.error(err);
    }
}


const postState = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required' });
    }

    if (!Array.isArray(req.body.funfacts)) {
        return res.status(400).json({
            'message': 'State fun facts value must be an array'
        });
    }

    const bodyToUpper = (req.body.stateCode).toUpperCase();

    const funfacts = (req.body.funfacts);

    const newState = await State.findOneAndUpdate(
        { stateCode: bodyToUpper },
        {
            $push:
                { funfacts: { $each: funfacts } }
        },
        {
            new: true
        }

    );

    res.json(newState);



}



const getAllStates = async (req, res) => {



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

const getState = async (req, res) => {
    const toUpper = (req.params.state).toUpperCase();
    const state = data.states.find(state => state.code === (toUpper));
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }

    const getState = await State.findOne({ stateCode: toUpper }, 'funfacts').exec();


    if (getState) {
        const funfact = { 'funfacts': getState.funfacts };
        const response = { ...state, ...funfact };
        res.json(response);
    }

    res.json(state);


}










module.exports = {
    getAllStates,
    getState,
    getStateCapital,
    getStateNickname,
    getStatePop,
    getStateAdmission,
    createState,
    postState
}
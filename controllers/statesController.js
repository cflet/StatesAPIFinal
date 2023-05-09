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


// const postState = async (req, res) => {
//     if (!req?.body?.stateCode || !req?.body?.funfacts) {
//         return res.status(400).json({ 'message': 'Check this - missing info' });
//     }

//     console.log(req.body.funfacts);

//     const state = await State.findOne({ stateCode: req.body.stateCode }).exec();

//     if (!state) {
//         return res.status(204).json({ "message": `No state matches stateCode ${req.body.stateCode}.` });
//     }

//     if (req.body?.funfacts) state.funfacts.push(req.body.funfacts);

//     const result = await state.save(done);
//     res.json(result);

// }

const postState = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'Check this - missing info' });
    }


    const funfacts = (req.body.funfacts);
    console.log(funfacts);

    const state = await State.findOneAndUpdate(
        { stateCode: req.body.stateCode },
        {
            $push:
                { funfacts: { $each: funfacts } }
        },
        {
            new: true
        }

    );

    res.json(state);



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
    getStateAdmission,
    createState,
    postState
}
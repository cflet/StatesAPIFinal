const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');


router.route('/')
    .get(statesController.getAllStates)
router.route('/:state/capital')
    .get(statesController.getStateCapital)
router.route('/:state/nickname')
    .get(statesController.getStateNickname)
router.route('/:state/population')
    .get(statesController.getStatePop)
router.route('/:state/admission')
    .get(statesController.getStateAdmission)
router.route('/:state')
    .get(statesController.getState)
router.route('/:state/create')
    .post(statesController.createState)
router.route('/:state/funfact')
    .get(statesController.getFunfact)
    .post(statesController.postState)
    .patch(statesController.patchState)
    .delete(statesController.deleteState)
    ;


module.exports = router;
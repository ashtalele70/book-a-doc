const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();


router.get('/getUser', async (req, res) => {
	const {id} = {...req.query};
	const userRef =  await firestore.collection('users').doc(id).get();
	return res.status(200).json({id: userRef.id, ...userRef.data()});
})

router.get('/getDoctor', async (req, res) => {

	const {id} = {...req.query};
	const doctorRef =  await firestore.collection('doctors').doc(id).get();
	return res.status(200).json({id: doctorRef.id, ...doctorRef.data()});
	
})

router.get('/getPatient', async (req, res) => {

	const {id} = {...req.query};
	const patientRef =  await firestore.collection('patients').doc(id).get();
	return res.status(200).json({id: patientRef.id, ...patientRef.data()});
	
})


module.exports = router;
const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();


router.post('/registerPatient', async (req, res) => {
	const usersRef = firestore.collection('users');
	const {credential, email, isPatient} = {...req.body};
	await usersRef.doc(credential.user.uid).set({email, isPatient, isAdmin: false});
	return res.status(200).json('Successful');
})

router.post('/patientDetails', async (req, res) => {
	const {userId, firstname, lastname, dob, gender} = {...req.body};
	firestore.collection('patients').doc(userId).set({
		firstname, lastname, dob, gender
	})
	return res.status(200).json('Successful');
})


module.exports = router;
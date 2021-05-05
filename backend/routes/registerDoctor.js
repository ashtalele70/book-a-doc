const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();


router.post('/registerDoctor', async (req, res) => {
	const usersRef = firestore.collection('users');
	const {credential, email, isPatient} = {...req.body};
	await usersRef.doc(credential.user.uid).set({email, isPatient, isAdmin: false, isVerified: false});
	return res.status(200).json('Successful');
})

router.post('/doctorDetails', async (req, res) => {
	const {userId, firstname, lastname, gender, phoneNumber, npiNumber, specialties, educations, languages} = {...req.body};
	await firestore.collection('doctors').doc(userId).set({
		userId: userId,
		firstname: firstname,
		lastname: lastname,
		gender: gender,
		phoneNumber: phoneNumber,
		npiNumber: npiNumber,
		specialties: specialties,
		educations: educations,
		languages: languages
	  })
	return res.status(200).json('Successful');
})


module.exports = router;
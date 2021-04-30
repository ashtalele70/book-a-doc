const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();


router.post('/addFeedback', async (req, res) => {
	const {userId, date,  patientID, review, rating} = {...req.body};
	await firestore
	.collection("doctors")
	.doc(userId)
	.collection("reviews")
	.add({
	  date,
	  patientID,
	  review,
	  rating
	})
	return res.status(200).json('Successful');
})

module.exports = router;
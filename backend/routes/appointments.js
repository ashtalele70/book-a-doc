const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();


router.get('/getUser', async (req, res) => {
	const {id} = {...req.query};
	const userRef =  await firestore.collection('users').doc(id).get();
	return res.status(200).json({id: userRef.id, ...userRef.data()});
})



module.exports = router;
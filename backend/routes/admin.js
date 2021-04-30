const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();


router.get('/getEntries', async (req, res) => {
	let entries = []
	const docRef = await firestore
      .collection("doctors")
      //.where("isVerified", "==","1" )
      .get();

	  docRef.forEach((doc) => {
		let doctorInfo = {
            id: doc.id,
            info: doc.data(),
          };
		  entries.push(doctorInfo);
	  })
	  return res.status(200).json(entries);
})

router.post('/approve', async (req, res) => {
	const {id} = {...req.body};
	await firestore
      .collection("doctors")
      .doc(id)
      .update({
        isVerified: "2",
      })
	
	  return res.status(200).json("Updated");
})

router.post('/reject', async (req, res) => {
	const {id} = {...req.body};
	await firestore
      .collection("doctors")
      .doc(id)
      .update({
        isVerified: "3",
      })
	
	  return res.status(200).json("Updated");
})


module.exports = router;
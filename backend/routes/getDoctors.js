const express = require('express');
const {firestore} = require('../firebase')
const router = express.Router();
const data = require('../data/conditionSpecialtyMap')


router.get('/getDoctors', async (req, res) => {
	const doctorRef  = await firestore.collection("doctors").get();
	const {searchText} = {...req.body};
	const specialties = data[searchText];
	let doctors = [], times = [], appointments = [], reviews = [];

	doctorRef.forEach((doc) => {
		if (
		  doc
			.data()
			.specialties.some((specialty) => specialties.indexOf(specialty) >= 0)
		) {
		  let doctor = {
			id: doc.id,
			info: doc.data(),
		  };
		  doctors.push(doctor);
		}
	  });
  
	  for (let doctor of doctors) {
		const timeslotRef = await firestore
		  .collection("doctors/" + doctor.id + "/timeslots")
		  .get();
		let timeslots = [];
		timeslotRef.forEach((doc) => {
		  let timehhmm = doc.data().time.split(":");
		  var d = new Date();
		  d.setHours(timehhmm[0], timehhmm[1], 0, 0);
		  timeslots.push(d);
		});
		timeslots.sort();
		times.push(timeslots);
  
		const appointmentRef = await firestore
		  .collection("doctors/" + doctor.id + "/appointments")
		  .get();
		let apts = [];
		appointmentRef.forEach((doc) => {
		  apts.push(doc.data().date.seconds);
		});
		appointments.push(apts);
  
		const reviewRef = await firestore
		  .collection("doctors/" + doctor.id + "/reviews")
		  .get();
		let reviewData = [];
		reviewRef.forEach((doc) => {
		  reviewData.push(doc.data());
		});
		reviews.push(reviewData);
	  }
	return res.status(200).json({doctors, times, appointments, reviews});
})

module.exports = router;
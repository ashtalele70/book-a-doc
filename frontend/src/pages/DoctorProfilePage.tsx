import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonModal,
  IonList,
  IonTextarea,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { auth, firestore } from "../firebase";
import { User, toUser } from "../models/user";
import { useHistory } from "react-router-dom";
import { addCircle } from "ionicons/icons";
import axios from "axios";
import { rooturl } from "../config";
import { Helmet } from "react-helmet";
import { remove } from "ionicons/icons";

const DoctorProfilePage: React.FC = () => {
  const { userId } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState<User>();
  const [specialties, setSpecialties] = useState([]);
  const [education, setEducation] = useState("");
  const [educations, setEducations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const history = useHistory();
  const [slotModal, setSlotModal] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [fromTimeHH, setFromTimeHH] = useState(0);
  const [fromTimeMM, setFromTimeMM] = useState(0);
  const [toTimeHH, setToTimeHH] = useState(0);
  const [toTimeMM, setToTimeMM] = useState(0);
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState<string>("male");
  
  const validate = async () => {
	if(firstName == "") {
		alert("Enter first name")
		return false;
	}

	if(lastName == "") {
		alert("Enter last name")
		return false;
	}

	if(gender == "") {
		alert("Enter gender")
		return false;
	}

	if(about == "") {
		alert("Enter about")
		return false;
	}

	if(specialties.length == 0) {
		alert("Enter specialties")
		return false;
	}
	if(languages.length == 0) {
		alert("Enter languages")
		return false;
	}

	if(phoneNumber == "") {
		alert("Enter phone number")
		return false;
	} else {

		if(!(validatePhoneNumber(phoneNumber))) {
			alert("Enter valid phone number format")
			return false;
		}
	}
	if(npiNumber == "") {
		alert("Enter NPI number")
		return false;
	} else {
		if(!(/^\d{10}$/.test(npiNumber))) {
			alert("Enter valid NPI number format")
			return false;
		}
	}

	if(slots.length == 0) {
		alert("Enter time slots")
		return false;
	}

	if(educations.length == 0) {
		alert("Enter education")
		return false;
	}

	return true;
	
  }

  const validatePhoneNumber = (input_str) => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
  }

  const handleSaveDetails = async () => {
	  if(await validate()) {
		const userData = {
			userId: userId,
			firstname: firstName,
			lastname: lastName,
			gender: gender,
			phoneNumber: phoneNumber,
			npiNumber: npiNumber,
			specialties: specialties,
			educations: educations,
			languages: languages,
			about: about
		  };
		  axios.post(rooturl + "/doctorDetails", userData).then((res) => {
			if (res.status === 200) {
			  console.log("Saved:");
        auth.signOut();
			  history.push("/loginDoctor");
			}
		  });
	  
		  if (slots.length > 0) {
			slots.map((slot) => {
			  function parseTime(s) {
				var c = s.split(":");
				return parseInt(c[0]) * 60 + parseInt(c[1]);
			  }
	  
			  function convertHours(mins) {
				var hour = Math.floor(mins / 60);
				mins = mins % 60;
				var converted = pad(hour, 2) + ":" + pad(mins, 2);
				return converted;
			  }
	  
			  function pad(str, max) {
				str = str.toString();
				return str.length < max ? pad("0" + str, max) : str;
			  }
	  
			  function calculate_time_slot(start_time, end_time, interval) {
				var i, formatted_time;
				var time_slots = new Array();
				for (var i = start_time; i <= end_time; i = i + interval) {
				  formatted_time = convertHours(i);
				  time_slots.push(formatted_time);
				}
				return time_slots;
			  }
	  
			  var start_time = parseTime(slot.from),
				end_time = parseTime(slot.to),
				interval = 30;
	  
			  var times_ara = calculate_time_slot(start_time, end_time, interval);
	  
			  times_ara.forEach((timeSlot) => {
				firestore
				  .collection("doctors")
				  .doc(userId)
				  .collection("timeslots")
				  .add({
					time: timeSlot,
				  });
			  });
			});
		  }
	  }
    
  };

  const addSlot = () => {
	  if((toTimeHH < 0 || toTimeHH > 24) || (fromTimeHH < 0 || fromTimeHH > 24) ||
	  !(toTimeMM ==  0 || toTimeMM == 30) ||
	  !(fromTimeMM ==  0 || fromTimeMM == 30)) 
	{
		alert("Please enter correct time range")
	  }else if(toTimeHH <= fromTimeHH) {
		  if(((toTimeHH == fromTimeHH) && (toTimeMM == fromTimeHH))
		 	|| (toTimeMM <= fromTimeMM)
		  ) 
		alert("From time should be lesser than To time")
	  } else {
		setSlotModal(false);
		setSlots(
		  slots.concat({
			from: fromTimeHH + ":" + fromTimeMM,
			to: toTimeHH + ":" + toTimeMM,
		  })
		);
		setFromTimeHH(0);
		setFromTimeMM(0);
		setToTimeHH(0);
		setToTimeMM(0);

	  }
   
  };

  const removeSlot = (slo) => {
	setSlots(slots.filter(item => item !== slo));
  }

  const addEducation = () => {
	if(education != "") {
		setEducationModal(false);
		setEducations(educations.concat(education));
		setEducation("");
	} else {
		alert("Education cannot be blank")
	}
    
  };

  const removeEducation = (edu) => {
    setEducations(educations.filter(item => item !== edu));
  }

  useEffect(() => {
    let userData = new URLSearchParams();
    userData.set("id", userId);

    axios.get(rooturl + "/getUser?" + userData.toString()).then((res) => {
      if (res.status === 200) {
        // console.log(res);
        setUser(toUser(res.data));
      }
    });
  }, []);

  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      <IonHeader>
        <IonToolbar>
          <IonTitle color="warning" className="ion-float-left">Create an account</IonTitle>
          <IonTitle color="success" className="ion-float-right">Hello, {sessionStorage.getItem('firstname')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={user?.email} readonly />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">First Name</IonLabel>
                <IonInput
                  value={firstName}
                  onIonChange={(event) => setFirstName(event.detail.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Last Name</IonLabel>
                <IonInput
                  value={lastName}
                  onIonChange={(event) => setLastName(event.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonRadioGroup
                value={gender}
                onIonChange={(e) => setGender(e.detail.value)}
              >
                <IonLabel>Gender</IonLabel>

                <IonItem>
                  <IonLabel>Female</IonLabel>
                  <IonRadio value="female" />
                </IonItem>

                <IonItem>
                  <IonLabel>Male</IonLabel>
                  <IonRadio value="male" />
                </IonItem>
              </IonRadioGroup>
            </IonCol>
          </IonRow>
          <IonRow>
			  <IonCol>
			  <IonItem>
			  	<IonLabel position="fixed">About</IonLabel>
				<IonTextarea 
					value={about}
					onIonChange={(event) => setAbout(event.detail.value)}
				></IonTextarea>
			  </IonItem>
			  </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Primary Specialty</IonLabel>
                <IonSelect
                  value={specialties}
                  multiple={true}
                  cancelText="Cancel"
                  okText="Confirm"
                  onIonChange={(e) => setSpecialties(e.detail.value)}
                >
                  {/* <IonSelectOption selected="" value="Primary Specialty">Primary Specialty</IonSelectOption> */}
                  <IonSelectOption value="Acupuncturist">
                    Acupuncturist
                  </IonSelectOption>
                  <IonSelectOption value="Allergist">Allergist</IonSelectOption>
                  <IonSelectOption value="Anesthesiologist">
                    Anesthesiologist
                  </IonSelectOption>
                  <IonSelectOption value="Audiologist">
                    Audiologist
                  </IonSelectOption>
                  <IonSelectOption value="Bariatric Physician">
                    Bariatric Physician
                  </IonSelectOption>
                  <IonSelectOption value="Cardiac Electrophysiologist">
                    Cardiac Electrophysiologist
                  </IonSelectOption>
                  <IonSelectOption value="Cardiologist">
                    Cardiologist
                  </IonSelectOption>
                  <IonSelectOption value="Cardiothoracic Surgeon">
                    Cardiothoracic Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Chiropractor">
                    Chiropractor
                  </IonSelectOption>
                  <IonSelectOption value="Colorectal Surgeon">
                    Colorectal Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Dentist">Dentist</IonSelectOption>
                  <IonSelectOption value="Dermatologist">
                    Dermatologist
                  </IonSelectOption>
                  <IonSelectOption value="Dietitian">Dietitian</IonSelectOption>
                  <IonSelectOption value="Ear, Nose &amp; Throat Doctor">
                    Ear, Nose &amp; Throat Doctor
                  </IonSelectOption>
                  <IonSelectOption value="Emergency Medicine Physician">
                    Emergency Medicine Physician
                  </IonSelectOption>
                  <IonSelectOption value="Endocrinologist">
                    Endocrinologist
                  </IonSelectOption>
                  <IonSelectOption value="Endodontist">
                    Endodontist
                  </IonSelectOption>
                  <IonSelectOption value="Family Physician">
                    Family Physician
                  </IonSelectOption>
                  <IonSelectOption value="Gastroenterologist">
                    Gastroenterologist
                  </IonSelectOption>
                  <IonSelectOption value="Geneticist">
                    Geneticist
                  </IonSelectOption>
                  <IonSelectOption value="Geriatrician">
                    Geriatrician
                  </IonSelectOption>
                  <IonSelectOption value="Hand Surgeon">
                    Hand Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Hematologist">
                    Hematologist
                  </IonSelectOption>
                  <IonSelectOption value="Immunologist">
                    Immunologist
                  </IonSelectOption>
                  <IonSelectOption value="Infectious Disease Specialist">
                    Infectious Disease Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Integrative Health Medicine Specialist">
                    Integrative Health Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Internist">Internist</IonSelectOption>
                  <IonSelectOption value="Medical Ethicist">
                    Medical Ethicist
                  </IonSelectOption>
                  <IonSelectOption value="Microbiologist">
                    Microbiologist
                  </IonSelectOption>
                  <IonSelectOption value="Midwife">Midwife</IonSelectOption>
                  <IonSelectOption value="Naturopathic Doctor">
                    Naturopathic Doctor
                  </IonSelectOption>
                  <IonSelectOption value="Nephrologist">
                    Nephrologist
                  </IonSelectOption>
                  <IonSelectOption value="Neurologist">
                    Neurologist
                  </IonSelectOption>
                  <IonSelectOption value="Neuropsychiatrist">
                    Neuropsychiatrist
                  </IonSelectOption>
                  <IonSelectOption value="Neurosurgeon">
                    Neurosurgeon
                  </IonSelectOption>
                  <IonSelectOption value="Nurse Practitioner">
                    Nurse Practitioner
                  </IonSelectOption>
                  <IonSelectOption value="Nutritionist">
                    Nutritionist
                  </IonSelectOption>
                  <IonSelectOption value="OB-GYN">OB-GYN</IonSelectOption>
                  <IonSelectOption value="Occupational Medicine Specialist">
                    Occupational Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Oncologist">
                    Oncologist
                  </IonSelectOption>
                  <IonSelectOption value="Ophthalmologist">
                    Ophthalmologist
                  </IonSelectOption>
                  <IonSelectOption value="Optometrist">
                    Optometrist
                  </IonSelectOption>
                  <IonSelectOption value="Oral Surgeon">
                    Oral Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Orthodontist">
                    Orthodontist
                  </IonSelectOption>
                  <IonSelectOption value="Orthopedic Surgeon">
                    Orthopedic Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Pain Management Specialist">
                    Pain Management Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Pathologist">
                    Pathologist
                  </IonSelectOption>
                  <IonSelectOption value="Pediatric Dentist">
                    Pediatric Dentist
                  </IonSelectOption>
                  <IonSelectOption value="Pediatrician">
                    Pediatrician
                  </IonSelectOption>
                  <IonSelectOption value="Periodontist">
                    Periodontist
                  </IonSelectOption>
                  <IonSelectOption value="Physiatrist">
                    Physiatrist
                  </IonSelectOption>
                  <IonSelectOption value="Physical Therapist">
                    Physical Therapist
                  </IonSelectOption>
                  <IonSelectOption value="Physician Assistant">
                    Physician Assistant
                  </IonSelectOption>
                  <IonSelectOption value="Plastic Surgeon">
                    Plastic Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Podiatrist">
                    Podiatrist
                  </IonSelectOption>
                  <IonSelectOption value="Preventive Medicine Specialist">
                    Preventive Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Primary Care Doctor">
                    Primary Care Doctor
                  </IonSelectOption>
                  <IonSelectOption value="Prosthodontist">
                    Prosthodontist
                  </IonSelectOption>
                  <IonSelectOption value="Psychiatrist">
                    Psychiatrist
                  </IonSelectOption>
                  <IonSelectOption value="Psychologist">
                    Psychologist
                  </IonSelectOption>
                  <IonSelectOption value="Psychosomatic Medicine Specialist">
                    Psychosomatic Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Psychotherapist">
                    Psychotherapist
                  </IonSelectOption>
                  <IonSelectOption value="Pulmonologist">
                    Pulmonologist
                  </IonSelectOption>
                  <IonSelectOption value="Radiation Oncologist">
                    Radiation Oncologist
                  </IonSelectOption>
                  <IonSelectOption value="Radiologist">
                    Radiologist
                  </IonSelectOption>
                  <IonSelectOption value="Reproductive Endocrinologist">
                    Reproductive Endocrinologist
                  </IonSelectOption>
                  <IonSelectOption value="Rheumatologist">
                    Rheumatologist
                  </IonSelectOption>
                  <IonSelectOption value="Sleep Medicine Specialist">
                    Sleep Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Sports Medicine Specialist">
                    Sports Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Surgeon">Surgeon</IonSelectOption>
                  <IonSelectOption value="Surgical Oncologist">
                    Surgical Oncologist
                  </IonSelectOption>
                  <IonSelectOption value="Travel Medicine Specialist">
                    Travel Medicine Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Urgent Care Specialist<">
                    Urgent Care Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Urological Surgeon">
                    Urological Surgeon
                  </IonSelectOption>
                  <IonSelectOption value="Urologist">Urologist</IonSelectOption>
                  <IonSelectOption value="Vascular Surgeon">
                    Vascular Surgeon
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Spoken Languages</IonLabel>
                <IonSelect
                  value={languages}
                  multiple={true}
                  cancelText="Cancel"
                  okText="Confirm"
                  onIonChange={(e) => setLanguages(e.detail.value)}
                >
                  <IonSelectOption value="English">English</IonSelectOption>
                  <IonSelectOption value="Spanish">Spanish</IonSelectOption>
                  <IonSelectOption value="Hindi">Hindi</IonSelectOption>
                  <IonSelectOption value="Telugu">Telugu</IonSelectOption>
                  <IonSelectOption value="Marathi">Marathi</IonSelectOption>
                  <IonSelectOption value="Tamil">Tamil</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Contact No.</IonLabel>
				
                <IonInput
                  value={phoneNumber}
                  onIonChange={(event) => setPhoneNumber(event.detail.value)}
                />
              </IonItem>
			  <small>Format: XXX-XXX-XXXX</small>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">NPI No.
				</IonLabel>
				
                <IonInput
                  value={npiNumber}
                  onIonChange={(event) => setNpiNumber(event.detail.value)}
                />
              </IonItem>
			  <small>
			  * The NPI (National Provider Identifier) Number is a 10-digit numerical identifier used to identify an individual provider or a health care entity
			  </small>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonButton onClick={() => setSlotModal(true)}>
              <IonIcon icon={addCircle} />
              <IonLabel>Add slot</IonLabel>
            </IonButton>
            <IonButton onClick={() => setEducationModal(true)}>
              <IonIcon icon={addCircle} />
              <IonLabel>Add Education</IonLabel>
            </IonButton>
          </IonRow>
          <IonRow>
            {educations && educations.length > 0 && (
              <IonCol>
                <IonList>
                  <IonLabel position="fixed">Education</IonLabel>
                  {educations.map((edu) => (
					  <>
                    <IonItem key={edu}>
                      <IonLabel>{edu}</IonLabel>
					  <IonButton slot="end" onClick={() => removeEducation(edu)}>
							<IonIcon icon={remove} />
					  </IonButton>
                    </IonItem>
					
					</>
                  ))}
                </IonList>
              </IonCol>
            )}
            {slots && slots.length > 0 && (
              <IonCol>
                <IonList>
                  <IonLabel position="stacked">Time Slots</IonLabel>
                  {slots.map((slot) => (
                    <IonItem key={slot}>
                      <IonLabel>
                        {slot.from} - {slot.to}
                      </IonLabel>
					  <IonButton slot="end" onClick={() => removeSlot(slot)}>
							<IonIcon icon={remove} />
					  </IonButton>
                    </IonItem>
                  ))}
                </IonList>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <IonButton expand="block" onClick={handleSaveDetails}>
          Submit Details
        </IonButton>

        <IonModal isOpen={slotModal}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">From Time</IonLabel>
                  <IonLabel position="fixed">HH</IonLabel>
                  <IonInput
                    type="number"
                    value={fromTimeHH}
                    onIonChange={(event) =>
                      setFromTimeHH(Number(event.detail.value))
                    }
                  />
                  <IonLabel position="fixed">MM</IonLabel>
                  <IonInput
                    type="number"
                    value={fromTimeMM}
                    onIonChange={(event) =>
                      setFromTimeMM(Number(event.detail.value))
                    }
                  />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">To Time</IonLabel>
                  <IonLabel position="fixed">HH</IonLabel>
                  <IonInput
                    type="number"
                    value={toTimeHH}
                    onIonChange={(event) =>
                      setToTimeHH(Number(event.detail.value))
                    }
                  />
                  <IonLabel position="fixed">MM</IonLabel>
                  <IonInput
                    type="number"
                    value={toTimeMM}
                    onIonChange={(event) =>
                      setToTimeMM(Number(event.detail.value))
                    }
                  />
                </IonItem>
              </IonCol>
            </IonRow>
			<IonRow>
				HH should be between 0 - 24
			</IonRow>
			<IonRow>
				MM should 0, 30
			</IonRow>
            <IonRow>
              <IonCol>
                <IonButton onClick={addSlot}>Add</IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={() => setSlotModal(false)}>
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>

        <IonModal isOpen={educationModal}>
		
          <IonGrid>
		  <IonLabel position="fixed">
                  Education(Degree, University)
                </IonLabel>
            <IonRow>
              <IonItem>
                
                <IonInput
                  value={education}
                  onIonChange={(event) => setEducation(event.detail.value)}
                />
              </IonItem>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton onClick={addEducation}>Add</IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={() => setEducationModal(false)}>
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default DoctorProfilePage;

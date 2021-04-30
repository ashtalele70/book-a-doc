import firebase from 'firebase/app';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  email: string;
  isPatient: boolean;
  isAdmin: boolean;
}

export function toUser(doc: any): User {
  return { ...doc } as User;
}

export function toUserFire(doc: firebase.firestore.DocumentSnapshot): User {
	return { id: doc.id, ...doc.data() } as User;
}
  
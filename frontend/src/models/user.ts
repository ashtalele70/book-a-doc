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

export function toUser(doc: firebase.firestore.DocumentSnapshot): User {
  return { id: doc.id, ...doc.data() } as User;
}

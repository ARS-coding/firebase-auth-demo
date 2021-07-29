import { firestore } from "../firebase";

export function setUserDocument(docTitle, docData) {
    firestore.collection("users").doc(docTitle).set(docData);
}
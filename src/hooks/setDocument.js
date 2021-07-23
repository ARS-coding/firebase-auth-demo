import { firestore } from "../firebase";

export function setDocument(docTitle, docData) {
    firestore.collection("users").doc(docTitle).set(docData);
}
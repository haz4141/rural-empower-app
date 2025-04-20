// src/classes/AuthManager.js
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import User from "./User";

class AuthManager {
  async signIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    return new User(firebaseUser.uid, firebaseUser.email);
  }

  async signUp(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    return new User(firebaseUser.uid, firebaseUser.email);
  }
}

export default new AuthManager();

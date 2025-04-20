// src/classes/User.js
class User {
   constructor(uid, email) {
     this.uid = uid;
     this.email = email;
   }
 
   greet() {
     return `Hello, ${this.email}!`;
   }
 
   getUserInfo() {
     return {
       uid: this.uid,
       email: this.email,
     };
   }
 }
 
 export default User;
 
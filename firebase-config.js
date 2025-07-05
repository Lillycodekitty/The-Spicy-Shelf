// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0D0JTSLLRv0pNUHrZwv7Wqu6ATCbWfDY",
  authDomain: "the-spicy-shelf.firebaseapp.com",
  projectId: "the-spicy-shelf",
  storageBucket: "the-spicy-shelf.firebasestorage.app",
  messagingSenderId: "1068936230419",
  appId: "1:1068936230419:web:0d30101d04ef91a63a31e6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth reference
const auth = firebase.auth();

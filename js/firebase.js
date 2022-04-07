const firebaseConfig = {
    apiKey: "AIzaSyDtF1q1vlIaS4EksIPHY2VeQOSFmjSoHHI",
    authDomain: "ilearn-7629c.firebaseapp.com",
    databaseURL: "https://ilearn-7629c-default-rtdb.firebaseio.com",
    projectId: "ilearn-7629c",
    storageBucket: "ilearn-7629c.appspot.com",
    messagingSenderId: "378249969862",
    appId: "1:378249969862:web:3ce54177ee96f6871617c7",
    measurementId: "G-84YD2XPDKB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const getRandId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();

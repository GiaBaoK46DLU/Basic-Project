import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/databaseURL";

const firebaseConfig = {
    apiKey: "AIzaSyDI09lEJixtb7EiR4JFMNvVnt2z_AZUWyE",
    authDomain: "qlda-web.firebaseapp.com",
    databaseURL: "https://qlda-web-default-rtdb.firebaseio.com",
    projectId: "qlda-web",
    storageBucket: "qlda-web.appspot.com",
    messagingSenderId: "157395622878",
    appId: "1:157395622878:web:4703e2a5618c6a1e5f9b4f",
    measurementId: "G-JE2TRNHKTM"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

  function writeUserData(userId, name, phone, email)
  {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    set(reference, {
      username: name,
      phone: phone,
      email: email
    });
  }

  writeUserData("Gb1, GiaBao, 091231123, dllg@gmail.com");
    
const firebaseConfig = {
    apiKey: "AIzaSyDI09lEJixtb7EiR4JFMNvVnt2z_AZUWyE",
    authDomain: "qlda-web.firebaseapp.com",
    databaseURL: "https://qlda-web-default-rtdb.firebaseio.com",
    projectId: "qlda-web",
    storageBucket: "qlda-web.firebasestorage.app",
    messagingSenderId: "157395622878",
    appId: "1:157395622878:web:4703e2a5618c6a1e5f9b4f",
    measurementId: "G-JE2TRNHKTM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const form = document.getElementById('myForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const ten = document.getElementById('ten-de-tai').value;
    const mota = document.getElementById('mo-ta').value;
    const sinhvien = document.getElementById('sinh-vien').value;
    const thamkhao = document.getElementById('tham-khao').value;
    const lienhe = document.getElementById('lien-he').value;
    const dangky = document.getElementById('dang-ky').value;
    // Tạo một đối tượng dữ liệu
    const newData = {
        ten: ten,
        mota: mota,
        sinhvien: sinhvien,
        thamkhao: thamkhao,
        lienhe: lienhe,
        dangky: dangky
    };

    // Thêm dữ liệu vào Realtime Database
    db.collection('DeTaiTungGV').add(newData)
    .then((docRef) => {
      console.log("Thêm thành công với: ", docRef.id);
    })
    .catch((error) => {
      console.error("Thêm thất bại: ", error);   

    });
    });
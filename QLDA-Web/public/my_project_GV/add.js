// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase configuration
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        console.log("Form submitted...");

        const ten = document.getElementById('ten-de-tai').value;
        const motaRaw = document.getElementById('mo-ta').value;
        const sinhvien = document.getElementById('sinh-vien').value;
        const thamkhao = document.getElementById('tham-khao').value;
        const dangkyRaw = document.getElementById('dang-ky').value;

        if (!ten || !motaRaw) {
            alert("Vui lòng điền đầy đủ thông tin Tên đề tài và Mô tả!");
            return;
        }

        const mota = motaRaw.split('\n').filter(line => line.trim() !== ""); 
        const dangky = dangkyRaw.split('\n').filter(line => line.trim() !== ""); 
        const soLuongSV = parseInt(sinhvien, 10); 
        if (isNaN(soLuongSV)) {
            alert("Số lượng sinh viên phải là một số hợp lệ.");
            return;
        }

        const newData = {
            Ten: ten,
            MoTa: mota,
            SoLuongSV: soLuongSV,
            TaiLieuTK: thamkhao,
            SVDK: dangky,
        };

        try {
          const docRef = await addDoc(collection(db, 'DeTaiTungGV'), newData);
          console.log("Document written with ID: ", docRef.id);
          alert("Thêm đề tài thành công!");
          const modal = document.querySelector(".modal");
          modal.classList.add("hide");
          window.location.reload();
      } catch (error) {
          console.error("Error adding document: ", error);
          alert("Thêm đề tài thất bại, vui lòng thử lại.");
      }
    });
});

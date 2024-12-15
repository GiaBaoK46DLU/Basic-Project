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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        console.log("Form submitted...");

        // Retrieve input values
        const ten = document.getElementById('ten-de-tai').value;
        const motaRaw = document.getElementById('mo-ta').value;
        const sinhvien = document.getElementById('sinh-vien').value;
        const thamkhao = document.getElementById('tham-khao').value;
        const dangkyRaw = document.getElementById('dang-ky').value;

        // Validate required fields
        if (!ten || !motaRaw) {
            alert("Vui lòng điền đầy đủ thông tin Tên đề tài và Mô tả!");
            return;
        }

        // Convert inputs to match Firestore field types
        const mota = motaRaw.split('\n').filter(line => line.trim() !== ""); // Convert to string array
        const dangky = dangkyRaw.split('\n').filter(line => line.trim() !== ""); // Convert to string array
        const soLuongSV = parseInt(sinhvien, 10); // Convert to number

        if (isNaN(soLuongSV)) {
            alert("Số lượng sinh viên phải là một số hợp lệ.");
            return;
        }

        // Data to save
        const newData = {
            Ten: ten,
            MoTa: mota,
            SoLuongSV: soLuongSV,
            TaiLieuTK: thamkhao,
            SVDK: dangky,
        };

        try {
          // Add data to Firestore
          const docRef = await addDoc(collection(db, 'DeTaiTungGV'), newData);
          console.log("Document written with ID: ", docRef.id);
          
          // Show success message
          alert("Thêm đề tài thành công!");

          // Close the modal by removing the 'hide' class
          const modal = document.querySelector(".modal");
          modal.classList.add("hide"); // Or use 'modal.style.display = "none"'

          // Reload the page to refresh the table in my_project_GV.js
          window.location.reload();
      } catch (error) {
          console.error("Error adding document: ", error);
          alert("Thêm đề tài thất bại, vui lòng thử lại.");
      }
    });
});

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // Cấu hình Firebase
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
// Hiển thị/ẩn mật khẩu
$(document).ready(function() {
    $('.password-toggle').click(function() {
        const passwordInput = $(this).siblings('input'); // Lấy input liền kề
        const icon = $(this).children('i'); // Lấy biểu tượng bên trong
        
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text'); // Hiển thị mật khẩu
            icon.removeClass('fa-eye').addClass('fa-eye-slash'); // Chuyển sang icon 'ẩn'
        } else {
            passwordInput.attr('type', 'password'); // Ẩn mật khẩu
            icon.removeClass('fa-eye-slash').addClass('fa-eye'); // Chuyển sang icon 'hiển thị'
        }
    });
});

// Đăng nhập bằng email/password

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Firestore reference
  const db = firebase.firestore();
  
  // Handle login form submission
  document.getElementById("form-login").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    try {
      // Fetch GiangVien and SinhVien collections from Firestore
      const giangVienDoc = await db.collection("Account").doc("GiangVien").get();
      const sinhVienDoc = await db.collection("Account").doc("SinhVien").get();
  
      let isAuthenticated = false;
      let redirectPage = "";
  
      // Check GiangVien accounts
      if (giangVienDoc.exists) {
        const giangVienData = giangVienDoc.data();
        Object.keys(giangVienData).forEach((key) => {
          const account = giangVienData[key].mapValue.fields;
          if (
            account.TaiKhoan.stringValue === email &&
            account.MatKhau.stringValue === password
          ) {
            isAuthenticated = true;
            redirectPage = "tttk.html";
          }
        });
      }
  
      // Check SinhVien accounts
      if (!isAuthenticated && sinhVienDoc.exists) {
        const sinhVienData = sinhVienDoc.data();
        Object.keys(sinhVienData).forEach((key) => {
          const account = sinhVienData[key].mapValue.fields;
          if (
            account.TaiKhoan.stringValue === email &&
            account.MatKhau.stringValue === password
          ) {
            isAuthenticated = true;
            redirectPage = "tttk.html";
          }
        });
      }
  
      if (isAuthenticated) {
        alert("Đăng nhập thành công!");
        // Redirect to the respective page
        window.location.href = redirectPage;
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập: ", error);
      alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau!");
    }
  });
  
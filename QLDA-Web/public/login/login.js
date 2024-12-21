// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc // Thêm getDoc vào import
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Xử lý sự kiện đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Ngăn trình duyệt gửi form mặc định

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      // Lấy tài liệu GiangVien
      const giangVienDoc = await getDoc(doc(db, "Account", "GiangVien"));

      if (giangVienDoc.exists()) {
        const giangVienData = giangVienDoc.data();

        // Kiểm tra từng tài khoản trong danh sách
        for (const gvKey in giangVienData) {
          const { TaiKhoan, MatKhau } = giangVienData[gvKey];
          
          // So sánh tài khoản và mật khẩu
          if (email === TaiKhoan && password === MatKhau) {
            window.location.href = "../account_info_GV/account_info_GV.html";
            return;
          }
        }
      }

      // Lấy tài liệu SinhVien
      const sinhVienDoc = await getDoc(doc(db, "Account", "SinhVien"));
      

      if (sinhVienDoc.exists()) {
        const sinhVienData = sinhVienDoc.data();
        for (const svKey in sinhVienData) {
          const { TaiKhoan, MatKhau } =sinhVienData[svKey];

          if (email === TaiKhoan && password === MatKhau) {
            window.location.href = "../account_info_SV/account_info_SV.html";
            return;
          }
        }
      }

      // Nếu không tìm thấy tài khoản phù hợp
      alert("Tài khoản hoặc mật khẩu không đúng!");
    } catch (error) {
      console.error("Lỗi khi truy cập Firestore:", error);
      alert("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }
  });
});

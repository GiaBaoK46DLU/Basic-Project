import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Cấu hình Firebase (Thay thế bằng thông tin Firebase project của bạn)
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
const auth = getAuth(app);

// Xử lý đăng nhập bằng Google
const googleLoginBtn = document.querySelector(".google-login");
googleLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("User signed in with Google:", user);
      // Xử lý logic sau khi đăng nhập thành công (ví dụ: chuyển hướng)
    })
    .catch((error) => {
      console.error("Google sign-in error:", error);
      // Xử lý lỗi đăng nhập
    });
});

// Xử lý đăng nhập bằng email/password
const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in with email/password:", user);
      // Xử lý logic sau khi đăng nhập thành công (ví dụ: chuyển hướng)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in with email/password:", errorCode, errorMessage);
      // Xử lý lỗi đăng nhập (ví dụ: hiển thị thông báo lỗi)
    });
});

// Chức năng hiển thị/ẩn mật khẩu
const passwordToggle = document.querySelector(".password-toggle");
const passwordInput = document.getElementById("password");

passwordToggle.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  passwordToggle.querySelector("i").classList.toggle("fa-eye-slash");
});

// Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Người dùng đã đăng nhập
    console.log("User is signed in:", user);
    // ... xử lý logic khi người dùng đã đăng nhập
  } else {
    // Người dùng chưa đăng nhập
    console.log("User is signed out");
    // ... xử lý logic khi người dùng chưa đăng nhập
  }
});
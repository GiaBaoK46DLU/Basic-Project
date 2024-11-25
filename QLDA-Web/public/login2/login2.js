// import { initializeApp } from "firebase/app";
// import { 
//     getAuth, 
//     GoogleAuthProvider, 
//     signInWithPopup, 
//     signInWithEmailAndPassword, 
//     onAuthStateChanged 
// } from "firebase/auth";

// // Cấu hình Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyDI09lEJixtb7EiR4JFMNvVnt2z_AZUWyE",
//     authDomain: "qlda-web.firebaseapp.com",
//     databaseURL: "https://qlda-web-default-rtdb.firebaseio.com",
//     projectId: "qlda-web",
//     storageBucket: "qlda-web.firebasestorage.app",
//     messagingSenderId: "157395622878",
//     appId: "1:157395622878:web:4703e2a5618c6a1e5f9b4f",
//     measurementId: "G-JE2TRNHKTM"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Đăng nhập bằng Google
const googleLoginBtn = document.querySelector('.google-login');
googleLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("User signed in with Google:", user);
        })
        .catch((error) => {
            console.error("Google sign-in error:", error);
        });
});

// Đăng nhập bằng email/password
const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in with email/password:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in with email/password:", errorCode, errorMessage);
        });
});

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


// Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
    } else {
        console.log("User is signed out");
    }
});

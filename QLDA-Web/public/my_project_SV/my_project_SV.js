import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI09lEJixtb7EiR4JFMNvVnt2z_AZUWyE",
  authDomain: "qlda-web.firebaseapp.com",
  projectId: "qlda-web",
  storageBucket: "qlda-web.firebasestorage.app",
  messagingSenderId: "157395622878",
  appId: "1:157395622878:web:4703e2a5618c6a1e5f9b4f",
  measurementId: "G-JE2TRNHKTM"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the document ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('id');

// Display the docId in the HTML element with id 'docIdDisplay'
if (docId) {
    // Fetch the document data from Firestore using the document ID
    const docRef = doc(db, "DeTai", docId);  // 'DeTai' is the collection name
    const docSnap = await getDoc(docRef);  // Fetch the document

    if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Ensure data is available and use default values if not
        document.getElementById('ten').textContent = data.Ten || "Tên không có sẵn";
        document.getElementById('moTa').innerHTML = data.MoTa && Array.isArray(data.MoTa) ? data.MoTa.join("<br>") : "Mô tả không có sẵn"; // If MoTa is an array
        document.getElementById('soLuongSV').innerHTML = data.SoLuongSV || "Chưa có thông tin số lượng sinh viên"; // Default value if undefined
        document.getElementById('taiLieuTK').innerHTML = data.TaiLieuTK || "Chưa có thông tin tài liệu tham khảo"; // Default value if undefined
        document.getElementById('gvhd').innerHTML = data.GVHD || "Chưa có giảng viên hướng dẫn"; // Default value if undefined

        // If SVDK exists, format it similarly
        if (data.SVDK && data.SVDK.length > 0) {
            document.getElementById('svdk').innerHTML = data.SVDK.join("<br>");
        } else {
            document.getElementById('svdk').textContent = "(Trống)";
        }
    } else {
        console.log("No such document found!");
    }
} else {
    console.log('Document ID not found in URL.');
}


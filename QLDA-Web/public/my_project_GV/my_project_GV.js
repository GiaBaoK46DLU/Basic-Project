import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

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

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async function() {
    const querySnapshot = await getDocs(collection(db, "DeTaiTungGV")); // Fetch data from Firestore collection
    const tableContent = document.querySelector(".table-content");

    // Check if querySnapshot has documents
    if (!querySnapshot.empty) {
        let count = 1; // Start counting from 1

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Ensure data is available
            if (data) {
                const ten = data.Ten || "Chưa có tên";
                const moTa = data.MoTa ? data.MoTa.join("<br>") : "Chưa có mô tả";  // Convert array to HTML with line breaks
                const soLuongSV = data.SoLuongSV || "Chưa có số lượng";  // Default value if undefined
                const taiLieuTK = data.TaiLieuTK || "Chưa có tài liệu"; // Default value if undefined

                // Format SVDK content
                let svdkContent = "(Trống)";
                if (data.SVDK && Array.isArray(data.SVDK) && data.SVDK.length > 0) {
                    svdkContent = data.SVDK.join("<br>");
                }

                // Create a new row for the table
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${count}</td> <!-- Using count instead of index -->
                    <td>${ten}</td>
                    <td>${moTa}</td>
                    <td>${soLuongSV}</td>
                    <td>${taiLieuTK}</td>
                    <td class="status">${svdkContent}</td>
                    <td class="button-group">
                        <button class="details-btn">Xem chi tiết</button>
                        <button class="details-btn">Chỉnh sửa</button>
                        <button class="details-btn">Xóa</button>
                    </td>   
                `;

                // Append the row to the table
                tableContent.appendChild(row);

                // Increment the count for the next row
                count++;
            }
        });
    } else {
        console.log("No documents found in the collection.");
    }
});


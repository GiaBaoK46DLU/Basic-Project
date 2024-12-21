// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

// Lắng nghe sự kiện thay đổi trên dropdown
document.getElementById("loaiNamHoc").addEventListener("change", function (e) {
    const selectedType = e.target.value; // Giá trị được chọn
    fetchAndDisplayData(selectedType);  // Gọi hàm hiển thị dữ liệu
});

// Hàm truy vấn Firestore và hiển thị dữ liệu
async function fetchAndDisplayData(loaiNam) {
    try {
        // Truy vấn dữ liệu từ Firestore
        const q = query(
            collection(db, "DeTaiTungGV"), 
            where("NamHoc", "==", loaiNam)
        );
        const querySnapshot = await getDocs(q);

        // Xóa nội dung cũ trong bảng
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = ""; // Reset bảng

        if (!querySnapshot.empty) {
            let count = 1; // Đếm số thứ tự

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                if (data) {
                    // Định nghĩa giá trị các trường dữ liệu
                    const ten = data.Ten || "Chưa có tên";
                    const moTa = data.MoTa ? data.MoTa.join("<br>") : "Chưa có mô tả";
                    const soLuongSV = data.SoLuongSV || "Chưa có số lượng";
                    const taiLieuTK = data.TaiLieuTK || "Chưa có tài liệu";
                    const loaiDoAn = data.LoaiDoAn || "Chưa có loại đồ án";

                    // Format SVDK content
                    let svdkContent = "(Trống)";
                    if (data.SVDK && Array.isArray(data.SVDK) && data.SVDK.length > 0) {
                        svdkContent = data.SVDK.join("<br>");
                    }

                    // Tạo hàng mới trong bảng
                    const row = `
                        <tr>
                            <td>${count}</td>
                            <td>${ten}</td>
                            <td>${moTa}</td>
                            <td>${soLuongSV}</td>
                            <td>${taiLieuTK}</td>
                            <td>${loaiDoAn}</td>
                            <td>${svdkContent}</td>
                            <td><button class="details-btn">Xem chi tiết</button></td>
                        </tr>
                    `;

                    // Thêm hàng vào bảng
                    tableBody.insertAdjacentHTML("beforeend", row);

                    // Tăng số thứ tự
                    count++;
                }
            });
        } else {
            // Nếu không có dữ liệu trả về
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">Không có dữ liệu phù hợp.</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
    }
}

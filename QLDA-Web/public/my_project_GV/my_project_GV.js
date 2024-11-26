document.addEventListener("DOMContentLoaded", async function() {
    const apiUrl = "https://firestore.googleapis.com/v1/projects/qlda-web/databases/(default)/documents/DeTaiTungGV";

    // Fetch data from Firestore
    const response = await fetch(apiUrl);
    const data = await response.json();
    const documents = data.documents;

    // Select the table body where rows will be inserted
    const tableContent = document.querySelector(".table-content");

    // Iterate through each document and create a table row
    documents.forEach((doc, index) => {
        const fields = doc.fields;

        // Get individual fields
        const ten = fields.Ten.stringValue;
        const moTaArray = fields.MoTa.arrayValue.values.map(value => value.stringValue);
        const moTa = moTaArray.join("<br>");  // Convert to HTML with line breaks
        const soLuongSV = fields.SoLuongSV.integerValue;
        const taiLieuTK = fields.TaiLieuTK.stringValue;

        // Check and format SVDK array
        let svdkContent = "(Trống)";
        if (fields.SVDK.arrayValue.values && fields.SVDK.arrayValue.values.length > 0) {
            svdkContent = fields.SVDK.arrayValue.values
                .map(student => {
                    const studentFields = student.mapValue.fields;
                    return `${studentFields.MSSV.stringValue} - ${studentFields.Ten.stringValue}`;
                })
                .join("<br>"); // Line breaks for each student
        }

        // Create a new row for each document
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${ten}</td>
            <td>${moTa}</td>
            <td>${soLuongSV}</td>
            <td>${taiLieuTK}</td>
            <td class="status">${svdkContent}</td>
            <td class="button-group">
                <button class="details-btn">Xem chi tiết</button>
            </td>
        `;

        // Append the row to the table
        tableContent.appendChild(row);
    });
});


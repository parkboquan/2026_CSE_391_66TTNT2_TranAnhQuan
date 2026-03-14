
const students = [
    { id: 1, name: "Trương Tuấn Tú", score: 9.0, rank: "Giỏi" },
    { id: 2, name: "Phùng Thanh Độ", score: 6.5, rank: "Khá" },
    { id: 3, name: "Nguyễn Nam Văn", score: 4.0, rank: "Yếu" },
    { id: 4, name: "Tần Thủy Hoàng", score: 7.5, rank: "Khá" },
    { id: 5, name: "Ngô Văn Kiệt", score: 5.5, rank: "Trung bình" },
    { id: 6, name: "Trương Bích Ái", score: 8.5, rank: "Giỏi" }
];

let currentSearch = "";
let currentRank = "Tất cả";
let sortDirection = "";

const searchInput = document.getElementById("searchInput");
const rankFilter = document.getElementById("rankFilter");
const sortScoreBtn = document.getElementById("sortScoreBtn");
const sortIcon = document.getElementById("sortIcon");
const tableBody = document.getElementById("studentTableBody");

function renderTable(dataToRender) {
    tableBody.innerHTML = "";

    if (dataToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="no-results">Không có kết quả</td></tr>`;
        return;
    }

    for (let i = 0; i < dataToRender.length; i++) {
        const student = dataToRender[i];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.rank}</td>
        `;
        tableBody.appendChild(tr);
    }
}

function applyFilters() {
    let filteredStudents = [...students];

    if (currentSearch !== "") {
        filteredStudents = filteredStudents.filter(function(student) {
            return student.name.toLowerCase().includes(currentSearch.toLowerCase());
        });
    }

    if (currentRank !== "Tất cả") {
        filteredStudents = filteredStudents.filter(function(student) {
            return student.rank === currentRank;
        });
    }

    if (sortDirection === "asc") {
        filteredStudents.sort((a, b) => a.score - b.score);
        sortIcon.textContent = "▲";
    } else if (sortDirection === "desc") {
        filteredStudents.sort((a, b) => b.score - a.score);
        sortIcon.textContent = "▼";
    } else {
        sortIcon.textContent = "";
    }

    renderTable(filteredStudents);
}


searchInput.addEventListener("input", function() {
    currentSearch = this.value.trim();
    applyFilters();
});

rankFilter.addEventListener("change", function() {
    currentRank = this.value;
    applyFilters();
});

sortScoreBtn.addEventListener("click", function() {
    if (sortDirection === "" || sortDirection === "desc") {
        sortDirection = "asc";
    } else {
        sortDirection = "desc";
    }
    applyFilters();
});

applyFilters();
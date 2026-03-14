let danhSachSV = [];

const inputHoTen = document.getElementById('hoTen');
const inputDiem = document.getElementById('diem');
const btnThem = document.getElementById('btnThem');
const tbody = document.getElementById('bangSinhVien');
const spanTongSV = document.getElementById('tongSV');
const spanDiemTB = document.getElementById('diemTB');

function xepLoai(diem) {
    if (diem >= 8.5) return "Giỏi";
    if (diem >= 7.0) return "Khá";
    if (diem >= 5.0) return "Trung bình";
    return "Yếu";
}

function renderTable() {
    tbody.innerHTML = '';
    
    let tongDiem = 0;

    danhSachSV.forEach((sv, index) => {
        const tr = document.createElement('tr');
        
        if (sv.diem < 5.0) {
            tr.classList.add('bg-yellow');
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.hoTen}</td>
            <td>${sv.diem.toFixed(1)}</td>
            <td>${sv.xepLoai}</td>
            <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
        `;
        tbody.appendChild(tr);

        tongDiem += sv.diem;
    });

    const tongSV = danhSachSV.length;
    spanTongSV.textContent = tongSV;
    
    const diemTB = tongSV > 0 ? (tongDiem / tongSV) : 0;
    spanDiemTB.textContent = diemTB.toFixed(2);
}

function themSinhVien() {
    const hoTen = inputHoTen.value.trim();
    const diemStr = inputDiem.value.trim();
    const diem = parseFloat(diemStr);

    if (hoTen === "") {
        alert("Vui lòng nhập họ tên sinh viên!");
        return;
    }
    if (diemStr === "" || isNaN(diem) || diem < 0 || diem > 10) {
        alert("Vui lòng nhập điểm hợp lệ (từ 0 đến 10)!");
        return;
    }

    danhSachSV.push({
        hoTen: hoTen,
        diem: diem,
        xepLoai: xepLoai(diem)
    });

    renderTable();

    inputHoTen.value = '';
    inputDiem.value = '';
    inputHoTen.focus();
}

btnThem.addEventListener('click', themSinhVien);

inputDiem.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        themSinhVien();
    }
});

tbody.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const indexCuaNut = e.target.getAttribute('data-index');
        
        danhSachSV.splice(indexCuaNut, 1);
        
        renderTable();
    }
});
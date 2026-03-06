console.log("Hello from JavaScript!");
let name = "Quan";
let yearOfBirth = 2006;
let currentYear = 2026;
let age = currentYear - yearOfBirth;

console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.");
let score = 6;
if (score >= 8) {
    console.log("Giỏi");
}
else if (score >= 6.5) {
    console.log("Khá");
}
else if (score >= 5) {
    console.log("Trung bình");
}
else {
    console.log("Yếu");
}
function tinhDiemTrungBinh(diem1, diem2, diem3) {
    let avg = (diem1 + diem2 + diem3) / 3;
    return avg;
}
function xepLoai(avg) {
    if (avg >= 8) {
        return "Giỏi";
    } else if (avg >= 6.5) {
        return "Khá";
    } else if (avg >= 5) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}
function kiemTraTuoi(age) {
    if (age >= 18) {
        return "Đủ 18 tuổi";
    }
    else {        return "Chưa đủ 18 tuổi";
    }
}
const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");

btnHello.addEventListener("click", function () {
  statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";
});
const btnRed = document.getElementById("btnRed");

btnRed.addEventListener("click", function () {
  // TODO: Đổi màu nền trang thành đỏ
  document.body.style.backgroundColor = "red";
});
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

nameInput.addEventListener("input", function () {
  const value = nameInput.value;
  greeting.textContent = "Xin chào, " + value + "!";
});
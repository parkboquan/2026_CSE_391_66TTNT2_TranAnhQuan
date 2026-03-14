function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.innerText = message;
    errorElement.style.display = 'block';
    if (inputElement) inputElement.classList.add('is-invalid');
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.innerText = '';
    errorElement.style.display = 'none';
    if (inputElement) inputElement.classList.remove('is-invalid');
}

function validateFullname() {
    const value = document.getElementById('fullname').value.trim();
    // Dùng \p{L} để hỗ trợ cả tiếng Việt có dấu
    const regex = /^[\p{L}\s]{3,}$/u; 
    
    if (!value) {
        showError('fullname', 'Họ và tên không được để trống.');
        return false;
    } else if (!regex.test(value)) {
        showError('fullname', 'Họ tên phải >= 3 ký tự và chỉ chứa chữ cái.');
        return false;
    }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const value = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value) {
        showError('email', 'Email không được để trống.');
        return false;
    } else if (!regex.test(value)) {
        showError('email', 'Email không đúng định dạng.');
        return false;
    }
    clearError('email');
    return true;
}

function validatePhone() {
    const value = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    
    if (!value) {
        showError('phone', 'Số điện thoại không được để trống.');
        return false;
    } else if (!regex.test(value)) {
        showError('phone', 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.');
        return false;
    }
    clearError('phone');
    return true;
}

function validatePassword() {
    const value = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    
    if (!value) {
        showError('password', 'Mật khẩu không được để trống.');
        return false;
    } else if (!regex.test(value)) {
        showError('password', 'Mật khẩu phải >= 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số.');
        return false;
    }
    clearError('password');
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!confirmPassword) {
        showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.');
        return false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp.');
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const genders = document.getElementsByName('gender');
    let isChecked = false;
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            isChecked = true;
            break;
        }
    }
    
    if (!isChecked) {
        showError('gender', 'Vui lòng chọn giới tính.');
        return false;
    }
    clearError('gender');
    return true;
}

function validateTerms() {
    const isChecked = document.getElementById('terms').checked;
    
    if (!isChecked) {
        showError('terms', 'Bạn phải đồng ý với các điều khoản.');
        return false;
    }
    clearError('terms');
    return true;
}

const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];

fields.forEach(field => {
    const inputElement = document.getElementById(field);
    
    // Validate khi blur (rời khỏi ô)
    inputElement.addEventListener('blur', () => {
        // Gọi hàm validate tương ứng dựa trên tên trường
        if (field === 'fullname') validateFullname();
        if (field === 'email') validateEmail();
        if (field === 'phone') validatePhone();
        if (field === 'password') validatePassword();
        if (field === 'confirmPassword') validateConfirmPassword();
    });

    // Xóa lỗi khi bắt đầu nhập lại
    inputElement.addEventListener('input', () => {
        clearError(field);
    });
});

document.getElementsByName('gender').forEach(radio => {
    radio.addEventListener('change', () => clearError('gender'));
});
document.getElementById('terms').addEventListener('change', () => clearError('terms'));


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn form reload trang


    const isValid = validateFullname() 
                  & validateEmail() 
                  & validatePhone() 
                  & validatePassword() 
                  & validateConfirmPassword() 
                  & validateGender() 
                  & validateTerms();

    if (isValid === 1) {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('successMessage').classList.remove('hidden');
        
        const name = document.getElementById('fullname').value.trim();
        document.getElementById('successName').innerText = name;
    }
});
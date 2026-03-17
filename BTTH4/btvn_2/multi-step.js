function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.innerText = '';
    errorElement.style.display = 'none';
}

function validateStep1() {
    let isValid = true;
    
    const name = document.getElementById('fullname').value.trim();
    if (!name) { 
        showError('fullname', 'Vui lòng nhập họ và tên.'); 
        isValid = false; 
    } else { clearError('fullname'); }

    const dob = document.getElementById('dob').value;
    if (!dob) { 
        showError('dob', 'Vui lòng chọn ngày sinh.'); 
        isValid = false; 
    } else { clearError('dob'); }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) { 
        showError('gender', 'Vui lòng chọn giới tính.'); 
        isValid = false; 
    } else { clearError('gender'); }

    return isValid;
}

function validateStep2() {
    let isValid = true;
    
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Email không được để trống.');
        isValid = false;
    } else if (!emailRegex.test(email)) { 
        showError('email', 'Email không đúng định dạng.'); 
        isValid = false; 
    } else { clearError('email'); }

    const password = document.getElementById('password').value;
    if (password.length < 6) { 
        showError('password', 'Mật khẩu phải từ 6 ký tự trở lên.'); 
        isValid = false; 
    } else { clearError('password'); }

    const confirm = document.getElementById('confirmPassword').value;
    if (!confirm) {
        showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.');
        isValid = false;
    } else if (confirm !== password) { 
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp.'); 
        isValid = false; 
    } else { clearError('confirmPassword'); }

    return isValid;
}

function goToStep(stepNumber) {
    if (stepNumber === 2 && !validateStep1()) return;
    if (stepNumber === 3 && !validateStep2()) return;

    if (stepNumber === 3) {
        populateSummary();
    }

    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    document.getElementById(`step${stepNumber}`).classList.add('active');

    updateProgressBar(stepNumber);
}

function updateProgressBar(currentStep) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');

    progressSteps.forEach((el, index) => {
        if (index < currentStep) el.classList.add('active');
        else el.classList.remove('active');
    });

    progressLines.forEach((el, index) => {
        if (index < currentStep - 1) el.classList.add('active');
        else el.classList.remove('active');
    });
}

function populateSummary() {
    document.getElementById('sumName').innerText = document.getElementById('fullname').value.trim();
    
    const dobValue = document.getElementById('dob').value;
    if (dobValue) {
        const [year, month, day] = dobValue.split('-');
        document.getElementById('sumDob').innerText = `${day}/${month}/${year}`;
    }
    
    const genderElement = document.querySelector('input[name="gender"]:checked');
    if (genderElement) {
        document.getElementById('sumGender').innerText = genderElement.value;
    }
    
    document.getElementById('sumEmail').innerText = document.getElementById('email').value.trim();
}

document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    this.classList.add('hidden');
    document.querySelector('.progress-container').classList.add('hidden');
    document.querySelector('.progress-labels').classList.add('hidden');
    
    document.getElementById('successMessage').classList.remove('hidden');
});
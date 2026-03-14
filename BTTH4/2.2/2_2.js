// Bảng giá sản phẩm
const prices = {
    "ao_thun": 150000,
    "quan_jean": 250000,
    "giay_the_thao": 500000
};

const form = document.getElementById('orderForm');
const product = document.getElementById('product');
const quantity = document.getElementById('quantity');
const deliveryDate = document.getElementById('deliveryDate');
const address = document.getElementById('address');
const notes = document.getElementById('notes');
const notesCount = document.getElementById('notesCount');
const totalPriceDisplay = document.getElementById('totalPriceDisplay');

const confirmModal = document.getElementById('confirmModal');
const btnCancel = document.getElementById('btnCancel');
const btnConfirm = document.getElementById('btnConfirm');

// Hàm tiện ích: Hiện/Ẩn lỗi
function showError(inputElement, errorElementId, show) {
    const errorEl = document.getElementById(errorElementId);
    if (show) {
        inputElement.classList.add('input-error');
        errorEl.style.display = 'block';
    } else {
        inputElement.classList.remove('input-error');
        errorEl.style.display = 'none';
    }
}

function validateProduct() {
    const isValid = product.value !== "";
    showError(product, 'productError', !isValid);
    return isValid;
}

function validateQuantity() {
    const val = parseInt(quantity.value);
    const isValid = !isNaN(val) && val >= 1 && val <= 99;
    showError(quantity, 'quantityError', !isValid);
    return isValid;
}

function validateDate() {
    if (!deliveryDate.value) {
        showError(deliveryDate, 'dateError', true);
        return false;
    }
    
    const selectedDate = new Date(deliveryDate.value);
    selectedDate.setHours(0, 0, 0, 0); 
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    const isValid = selectedDate >= today && selectedDate <= maxDate;
    showError(deliveryDate, 'dateError', !isValid);
    return isValid;
}

function validateAddress() {
    const isValid = address.value.trim().length >= 10;
    showError(address, 'addressError', !isValid);
    return isValid;
}

function validateNotes() {
    const isValid = notes.value.length <= 200;
    showError(notes, 'notesError', !isValid);
    return isValid;
}

function validatePayment() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    let isChecked = false;
    paymentMethods.forEach(radio => {
        if (radio.checked) isChecked = true;
    });
    
    const errorEl = document.getElementById('paymentError');
    errorEl.style.display = isChecked ? 'none' : 'block';
    return isChecked;
}

function calculateTotal() {
    const price = prices[product.value] || 0;
    const qty = parseInt(quantity.value) || 0;
    const total = price * qty;
    
    totalPriceDisplay.textContent = total.toLocaleString('vi-VN') + " VNĐ";
    return total;
}

product.addEventListener('change', () => { validateProduct(); calculateTotal(); });
quantity.addEventListener('input', () => { validateQuantity(); calculateTotal(); });
deliveryDate.addEventListener('input', validateDate);
address.addEventListener('input', validateAddress);
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', validatePayment);
});

product.addEventListener('blur', validateProduct);
quantity.addEventListener('blur', validateQuantity);
deliveryDate.addEventListener('blur', validateDate);
address.addEventListener('blur', validateAddress);
notes.addEventListener('blur', validateNotes);

notes.addEventListener('input', () => {
    const len = notes.value.length;
    notesCount.textContent = `${len}/200`;
    
    if (len > 200) {
        notesCount.classList.add('exceeded');
    } else {
        notesCount.classList.remove('exceeded');
    }
    validateNotes();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isProductValid = validateProduct();
    const isQuantityValid = validateQuantity();
    const isDateValid = validateDate();
    const isAddressValid = validateAddress();
    const isNotesValid = validateNotes();
    const isPaymentValid = validatePayment();

    if (isProductValid && isQuantityValid && isDateValid && isAddressValid && isNotesValid && isPaymentValid) {
        const productName = product.options[product.selectedIndex].text;
        
        const dateObj = new Date(deliveryDate.value);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

        document.getElementById('summaryProduct').textContent = productName;
        document.getElementById('summaryQuantity').textContent = quantity.value;
        document.getElementById('summaryDate').textContent = formattedDate;
        document.getElementById('summaryTotal').textContent = calculateTotal().toLocaleString('vi-VN') + " VNĐ";

        confirmModal.style.display = 'flex';
    }
});

btnCancel.addEventListener('click', () => {
    confirmModal.style.display = 'none';
});

btnConfirm.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    alert("🎉 Đặt hàng thành công!");
    form.reset();
    calculateTotal();
    notesCount.textContent = "0/200";
    notesCount.classList.remove('exceeded');
});

calculateTotal();
const loginBtn = document.getElementById('loginBtn');
const loginModalElement = document.getElementById('loginModal');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');
const btnText = document.querySelector('.btn-text');
const loadingIcon = document.getElementById('loadingIcon');
const modalTitle = document.getElementById('modalTitle');
const firstIcon = document.getElementById('firstIcon');
const secondIcon = document.getElementById('secondIcon');
const forgotPasswordLink = document.getElementById('forgotPassword');

const loginModal = new bootstrap.Modal(loginModalElement);


let isChangePasswordMode = false;
let currentPassword = 'admin';

function clearErrors() {
    usernameError.classList.add('d-none');
    usernameError.textContent = '';
    passwordError.classList.add('d-none');
    passwordError.textContent = '';
    successMessage.classList.add('d-none');
    successMessage.textContent = '';
}

function switchToChangePasswordMode() {
    isChangePasswordMode = true;
    modalTitle.textContent = 'Change Password';
    usernameInput.placeholder = 'Old Password';
    usernameInput.type = 'password';
    passwordInput.placeholder = 'New Password';
    btnText.textContent = 'Save';
    firstIcon.className = 'fas fa-lock text-dark';
    secondIcon.className = 'fas fa-key text-dark';
    forgotPasswordLink.textContent = 'Back to Login';
    clearErrors();
    usernameInput.value = '';
    passwordInput.value = '';
}

function switchToLoginMode() {
    isChangePasswordMode = false;
    modalTitle.textContent = 'Member Login';
    usernameInput.placeholder = 'Username';
    usernameInput.type = 'text';
    passwordInput.placeholder = 'Password';
    btnText.textContent = 'Login';
    firstIcon.className = 'fas fa-user text-dark';
    secondIcon.className = 'fas fa-lock text-dark';
    forgotPasswordLink.textContent = 'Forgot Password?';
    clearErrors();
    usernameInput.value = '';
    passwordInput.value = '';
}

loginModalElement.addEventListener('show.bs.modal', function() {
    switchToLoginMode();
});

loginModalElement.addEventListener('hide.bs.modal', function() {
    clearErrors();
    switchToLoginMode();
});

forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (isChangePasswordMode) {
        switchToLoginMode();
        return;
    }
    switchToChangePasswordMode();
});

loginSubmitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const firstValue = usernameInput.value.trim();
    const secondValue = passwordInput.value.trim();
    
    clearErrors();
    
    if (isChangePasswordMode) {
        const oldPassword = firstValue;
        const newPassword = secondValue;
        let hasError = false;
        if (!oldPassword) {
            usernameError.textContent = 'Bắt buộc nhập';
            usernameError.classList.remove('d-none');
            hasError = true;
        }
        
        if (!newPassword) {
            passwordError.textContent = 'Bắt buộc nhập';
            passwordError.classList.remove('d-none');
            hasError = true;
        }
        
        if (hasError) return;
        
        if (oldPassword !== currentPassword) {
            usernameError.textContent = 'Password không đúng';
            usernameError.classList.remove('d-none');
            return;
        }
        
        if (newPassword === oldPassword) {
            passwordError.textContent = 'Mật khẩu mới không được trùng mật khẩu cũ';
            passwordError.classList.remove('d-none');
            return;
        }
 
        btnText.classList.add('d-none');
        loadingIcon.classList.remove('d-none');
        loginSubmitBtn.disabled = true;
        
        setTimeout(function() {
            currentPassword = newPassword;
            switchToLoginMode();
            successMessage.textContent = 'Bạn đã đổi mật khẩu thành công';
            successMessage.classList.remove('d-none');
            btnText.classList.remove('d-none');
            loadingIcon.classList.add('d-none');
            loginSubmitBtn.disabled = false;
        }, 500);
        
    } else {
        const username = firstValue;
        const password = secondValue;
        let hasError = false;
        if (!username) {
            usernameError.textContent = 'Bắt buộc nhập';
            usernameError.classList.remove('d-none');
            hasError = true;
        }
        
        if (!password) {
            passwordError.textContent = 'Bắt buộc nhập';
            passwordError.classList.remove('d-none');
            hasError = true;
        }
        
        if (hasError) return;
        btnText.classList.add('d-none');
        loadingIcon.classList.remove('d-none');
        loginSubmitBtn.disabled = true;
        setTimeout(function() {
            if (username === 'admin' && password === currentPassword) {
                loginModal.hide();
                loginBtn.textContent = 'Đăng nhập thành công';
                loginBtn.classList.remove('btn-primary');
                loginBtn.classList.add('btn-success');
                usernameInput.value = '';
                passwordInput.value = '';
            } else {
                passwordError.textContent = 'Tài khoản hoặc mật khẩu không đúng';
                passwordError.classList.remove('d-none');
            }
            btnText.classList.remove('d-none');
            loadingIcon.classList.add('d-none');
            loginSubmitBtn.disabled = false;
        }, 500); 
    }
});

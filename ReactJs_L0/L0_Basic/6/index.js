const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

loginBtn.addEventListener('click', function() {
    loginModal.classList.add('show');
    usernameInput.value = '';
    passwordInput.value = '';
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
});

closeBtn.addEventListener('click', function() {
    loginModal.classList.remove('show');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        loginModal.classList.remove('show');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
});

loginSubmitBtn.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    
    if (!username || !password) {
        errorMessage.textContent = 'Vui lòng nhập đầy đủ thông tin';
        errorMessage.style.display = 'block';
        errorMessage.style.color = '#ff0000';
        return;
    }
    
    const btnText = loginSubmitBtn.querySelector('.btn-text');
    const loadingIcon = loginSubmitBtn.querySelector('.loading-icon');
    
    btnText.style.display = 'none';
    loadingIcon.style.display = 'inline-block';
    loginSubmitBtn.disabled = true;
    
    setTimeout(function() {
        if (username === 'admin' && password === 'admin') {
            loginModal.classList.remove('show');
            loginBtn.textContent = 'Đăng nhập thành công';
            loginBtn.style.backgroundColor = '#28a745';
            
            usernameInput.value = '';
            passwordInput.value = '';
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
        } else {
            errorMessage.textContent = 'Tài khoản hoặc mật khẩu không đúng';
            errorMessage.style.display = 'block';
            errorMessage.style.color = '#ff0000';
        }
        btnText.style.display = 'inline';
        loadingIcon.style.display = 'none';
        loginSubmitBtn.disabled = false;
    }, 500); 
});

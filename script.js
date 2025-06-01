let lastScrollTop = 0;
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const categories = document.querySelectorAll('.category');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        header.style.top = "-80px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

menuToggle.addEventListener('click', function() {
    if (sideMenu.style.right === "0px") {
        sideMenu.style.right = "-250px";
    } else {
        sideMenu.style.right = "0px";
    }
});

categories.forEach(cat => {
    cat.addEventListener('click', function() {
        cat.classList.toggle('open');
    });
});

// Modal Login
const openLoginModal = document.getElementById('openLoginModal');
const modalLogin = document.getElementById('modalLogin');
const modalClose = document.getElementById('modalClose');
const modalTabs = document.querySelectorAll('.modal-tab');
const forms = document.querySelectorAll('form');

openLoginModal.addEventListener('click', () => {
    modalLogin.style.display = 'flex';
});

modalClose.addEventListener('click', () => {
    modalLogin.style.display = 'none';
});

modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        modalTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        forms.forEach(form => form.classList.remove('active'));
        document.getElementById('form' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)).classList.add('active');
    });
});

const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const error = document.getElementById('registerError');

    if (password !== confirmPassword) {
        error.textContent = "Senhas não conferem!";
        return;
    }

    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    error.textContent = "Cadastro realizado com sucesso!";
});

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const error = document.getElementById('loginError');

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.email !== email || user.password !== password) {
        error.textContent = "E-mail ou senha incorretos!";
    } else {
        error.textContent = "Login realizado com sucesso!";
    }
});

const showAlert = (type, msg) => {
    hideAlert();

    const icons = {
        success: '✔️',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    };

    const markup = `
        <div class="alert alert--${type} animate-slide-in">
            <span class="alert__icon">${icons[type] || icons.info}</span>
            <span class="alert__msg">${msg}</span>
            <span class="alert__close-btn">&times;</span>
        </div>`;

    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

    document.querySelector('.alert__close-btn').addEventListener('click', hideAlert);

    window.setTimeout(hideAlert, 5000);
};

const hideAlert = () => {
    const alert = document.querySelector('.alert');
    if (alert) {
        alert.classList.add('animate-bounce-out');
        setTimeout(() => alert.remove(), 700); // Adjusted for bounce-out animation duration
    }
};

document.querySelector('.form--sign').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const password = document.getElementById('password').value;

    sign(email, password, name, passwordConfirm);
});

const sign = async (email, password, name, passwordConfirm) => {
    try {
        const response = await axios.post(
            '/api/v1/users/signup',
            {email, password, name, passwordConfirm},
            {withCredentials: true}
        );

        const result = response.data;

        if (result.status === 'success') {
            showAlert('success', 'Sign Up successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
            
        } else {
            showAlert('error', result.message || 'An error occurred');
        }
    } catch (error) {
        showAlert('error', error.response?.data?.message || 'An error occurred');
    }
};

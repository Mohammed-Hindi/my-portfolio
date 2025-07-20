window.addEventListener("scroll", animation);

function animation() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowhight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;

        if (revealtop < windowhight) {
            reveals[i].classList.add("active");
        }
        else {
            reveals[i].classList.remove("active");
        }
    }
}
const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // منع الإرسال الافتراضي

    clearErrors();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let valid = true;

    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        valid = false;
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        valid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email');
        valid = false;
    }

    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        valid = false;
    }

    // ✅ استدعاء التنبيه إذا كل شيء صحيح
    if (valid) {
        showBootstrapAlert('The form has been sent successfully', 'success');
        form.reset(); // مسح البيانات بعد الإرسال
    }
});

function showError(input, message) {
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = message;
}

function clearErrors() {
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.nextElementSibling.textContent = '';
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showBootstrapAlert(message, type = 'success') {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    alertPlaceholder.innerHTML = '';
    alertPlaceholder.append(wrapper);
}

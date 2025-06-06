// Panel and form switching
const colorPanel = document.getElementById('colorPanel');
const togglePanelLink = document.getElementById('togglePanelLink');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const formsWrapper = document.querySelector('.forms-wrapper');
let panelCoversSignIn = false;

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const navMenu = document.getElementById('navMenu');
const navList = document.getElementById('navList');

// Password visibility toggle (text buttons)
function togglePasswordVisibility(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (toggle && input) {
    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Hide' : 'Show';
    });
  }
}

togglePasswordVisibility('toggleSignInPassword', 'signInPassword');
togglePasswordVisibility('toggleSignUpPassword', 'signUpPassword');
togglePasswordVisibility('toggleSignUpConfirmPassword', 'signUpConfirmPassword');

// Password visibility toggle (icon-based)
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('ri-eye-off-line', 'ri-eye-line');
    } else {
      input.type = 'password';
      icon.classList.replace('ri-eye-line', 'ri-eye-off-line');
    }
  });
});

// Update panel state
function updatePanelState() {
  const title = document.getElementById('panelTitle');
  const description = document.getElementById('panelDescription');

  if (panelCoversSignIn) {
    colorPanel.style.left = window.innerWidth <= 768 ? '0' : '0';
    title.textContent = "Create Your Account";
    description.textContent = "Join us today and start your journey toward better health and care.";
    togglePanelLink.textContent = "Sign In Now";
    if (window.innerWidth <= 768) {
      formsWrapper.classList.add('active');
    }
  } else {
    colorPanel.style.left = window.innerWidth <= 768 ? '0' : '350px';
    title.textContent = "Welcome Back!";
    description.textContent = "To stay connected with us, please log in using your personal info.";
    togglePanelLink.textContent = "Create Account";
    if (window.innerWidth <= 768) {
      formsWrapper.classList.remove('active');
    }
  }
}

colorPanel.style.left = window.innerWidth <= 768 ? '0' : '350px';
updatePanelState();

togglePanelLink.addEventListener('click', e => {
  e.preventDefault();
  panelCoversSignIn = !panelCoversSignIn;
  updatePanelState();
});

// Resize behavior
window.addEventListener('resize', () => {
  updatePanelState();
});

// Hamburger menu toggle
hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.add('flex');
  navList.classList.add('flex');
});

closeBtn.addEventListener('click', () => {
  navMenu.classList.remove('flex');
  navList.classList.remove('flex');
});

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function setError(input, message) {
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains('error-message')) {
    errorDiv.textContent = message;
  }
}

// Form submission validation - Sign In
signInForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  const emailInput = signInForm.email;
  const passwordInput = signInForm.password;

  setError(emailInput, '');
  setError(passwordInput, '');

  if (!emailInput.value.trim()) {
    setError(emailInput, 'Email is required');
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    setError(emailInput, 'Invalid email');
    valid = false;
  }

  if (!passwordInput.value) {
    setError(passwordInput, 'Password is required');
    valid = false;
  }

  if (valid) {
    alert('Signed In (demo)');
    signInForm.reset();
  }
});

// Form submission validation - Sign Up
signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  const emailInput = signUpForm.email;
  const passwordInput = signUpForm.password;
  const confirmInput = signUpForm.confirmPassword;

  setError(emailInput, '');
  setError(passwordInput, '');
  setError(confirmInput, '');

  if (!emailInput.value.trim()) {
    setError(emailInput, 'Email is required');
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    setError(emailInput, 'Invalid email');
    valid = false;
  }

  if (!passwordInput.value) {
    setError(passwordInput, 'Password is required');
    valid = false;
  }

  if (!confirmInput.value) {
    setError(confirmInput, 'Confirm password is required');
    valid = false;
  }

  if (passwordInput.value !== confirmInput.value) {
    setError(confirmInput, 'Passwords do not match');
    valid = false;
  }

  if (valid) {
    alert('Signed Up (demo)');
    signUpForm.reset();
    if (panelCoversSignIn) {
      panelCoversSignIn = false;
      updatePanelState();
    }
  }
});

// Forgot password
document.getElementById('forgotPasswordLink').addEventListener('click', e => {
  e.preventDefault();
  alert('Forgot password not implemented in this demo.');
});

// Auto-focus on first input of sign-in form
window.addEventListener('load', () => {
  signInForm.querySelector('input').focus();
});

// Sliding form panel logic (for desktop)
const formSlider = document.getElementById('formSlider');
const slideToSignUp = document.getElementById('slideToSignUp');
const textToSignUp = document.getElementById('textToSignUp');
const textToSignIn = document.getElementById('textToSignIn');

if (formSlider) {
  slideToSignUp?.addEventListener('click', () => {
    formSlider.style.transform = 'translateX(-50%)';
  });

  textToSignUp?.addEventListener('click', () => {
    formSlider.style.transform = 'translateX(-50%)';
  });

  textToSignIn?.addEventListener('click', () => {
    formSlider.style.transform = 'translateX(0)';
  });
}

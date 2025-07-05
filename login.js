const emailInput = document.getElementById('emailInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  loginError.textContent = '';

  if (!email || !validateEmail(email)) {
    loginError.textContent = 'Please enter a valid email address, princess.';
    return;
  }

  auth.signInWithEmailLink(email, window.location.href)
    .then(() => {
      localStorage.setItem('emailForSignIn', email);
      alert('Email sent! Check your inbox to complete sign-in.');
    })
    .catch(error => {
      loginError.textContent = error.message;
    });
});

// Simple email validation
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Check if this is sign-in via email link
window.addEventListener('load', () => {
  if (auth.isSignInWithEmailLink(window.location.href)) {
    let email = localStorage.getItem('emailForSignIn');
    if (!email) {
      email = prompt('Please provide your email for confirmation, princess:');
    }
    auth.signInWithEmailLink(email, window.location.href)
      .then(() => {
        localStorage.removeItem('emailForSignIn');
        window.location.href = 'bookshelf.html';
      })
      .catch(error => {
        loginError.textContent = error.message;
      });
  }
});
// Get the elements
const emailInput = document.getElementById('emailInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

// Step 1: Send sign-in link
loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();

  if (!email || !validateEmail(email)) {
    loginError.textContent = 'Please enter a valid email, princess.';
    return;
  }

  const actionCodeSettings = {
    url: 'https://lillycodekitty.github.io/The-Spicy-Shelf/bookshelf.html',
    handleCodeInApp: true
  };

  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      localStorage.setItem('emailForSignIn', email);
      alert('Check your email, kitten. The magic login link is waiting for you.');
    })
    .catch(error => {
      loginError.textContent = error.message;
    });
});

// Step 2: Complete sign-in when email link is clicked
window.addEventListener('load', () => {
  if (auth.isSignInWithEmailLink(window.location.href)) {
    let email = localStorage.getItem('emailForSignIn');
    if (!email) {
      email = prompt('Enter your email again to confirm, baby:');
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

// Helper: validate email
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

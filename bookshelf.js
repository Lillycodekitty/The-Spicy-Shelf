// Grab elements
const addBookBtn = document.getElementById('addBookBtn');
const bookModal = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveBookBtn = document.getElementById('saveBookBtn');
const bookshelf = document.getElementById('bookshelf');

const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');

settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.remove('hidden');
});

closeSettingsBtn.addEventListener('click', () => {
  settingsPanel.classList.add('hidden');
});

let books = [];

// Show modal on "+" click
addBookBtn.addEventListener('click', () => {
  bookModal.classList.remove('hidden');
});

// Hide modal on cancel
closeModalBtn.addEventListener('click', () => {
  bookModal.classList.add('hidden');
});

// Save book on "Save"
saveBookBtn.addEventListener('click', () => {
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  const spice = parseInt(document.getElementById('spiceRating').value);
  const rating = parseInt(document.getElementById('bookRating').value);
  const quote = document.getElementById('favoriteQuote').value.trim();
  const link = document.getElementById('goodreadsLink').value.trim();
  const imageFile = document.getElementById('bookImage').files[0];

  if (!title || !author) {
    alert("Title and author are required, princess.");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const imageSrc = imageFile ? reader.result : '';
    const book = {
      id: Date.now(),
      title,
      author,
      spice,
      rating,
      quote,
      link,
      image: imageSrc
    };

    books.push(book);
    saveBooks();
    renderBooks();
    clearForm();
    bookModal.classList.add('hidden');
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onloadend();
  }
});

// Settings button toggle
settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.remove('hidden');
});

closeSettingsBtn.addEventListener('click', () => {
  settingsPanel.classList.add('hidden');
});

// Render all books on the shelf
function renderBooks() {
  bookshelf.innerHTML = '';
  const booksPerShelf = 6;
  for (let i = 0; i < books.length; i += booksPerShelf) {
    const shelf = document.createElement('div');
    shelf.classList.add('shelf-row');
    const slice = books.slice(i, i + booksPerShelf);
    slice.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');

    card.innerHTML = `
      ${book.image ? `<img src="${book.image}" alt="Cover" />` : ''}
      <h3>${book.title}</h3>
      <p><em>${book.author}</em></p>
      <p>🔥 ${book.spice || '-'} | ⭐ ${book.rating || '-'}</p>
      ${book.quote ? `<blockquote>${book.quote}</blockquote>` : ''}
      ${book.link ? `<a href="${book.link}" target="_blank">Goodreads</a>` : ''}
    `;

    shelf.appendChild(card);
  });
    bookshelf.appendChild(shelf);
  }
}

// Save books to localStorage
function saveBooks() {
  localStorage.setItem('spicyBooks', JSON.stringify(books));
}

// Load books from localStorage on page load
function loadBooks() {
  const saved = localStorage.getItem('spicyBooks');
  if (saved) {
    books = JSON.parse(saved);
  }
  renderBooks();
}

// Clear form inputs
function clearForm() {
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('spiceRating').value = '';
  document.getElementById('bookRating').value = '';
  document.getElementById('favoriteQuote').value = '';
  document.getElementById('goodreadsLink').value = '';
  document.getElementById('bookImage').value = '';
}

// Initialize
loadBooks();
  const saved = localStorage.getItem('spicyBooks');
  if (saved) {
    books = JSON.parse(saved);
  }
  renderBooks();


// Clear form inputs
function clearForm() {
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('spiceRating').value = '';
  document.getElementById('bookRating').value = '';
  document.getElementById('favoriteQuote').value = '';
  document.getElementById('goodreadsLink').value = '';
  document.getElementById('bookImage').value = '';
}

// Initialize
loadBooks();


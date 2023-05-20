const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modalBackground');
const addBook = document.getElementById('addBook');
const closeBtn = document.querySelector('.close');

let myLibrary = [];

function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  const titleElement = document.createElement('h3');
  const authorElement = document.createElement('p');
  const pageCountElement = document.createElement('p');
  const isReadElement = document.createElement('input');
  const isReadLabel = document.createElement('label');

  bookCard.classList.add('book-card');
  titleElement.textContent = book.title;
  authorElement.textContent = book.author;
  pageCountElement.textContent = book.pageCount;
  isReadElement.type = 'checkbox';
  isReadElement.checked = book.isRead;
  isReadLabel.textContent = 'Read';

  isReadLabel.appendChild(isReadElement);

  bookCard.appendChild(titleElement);
  bookCard.appendChild(authorElement);
  bookCard.appendChild(pageCountElement);
  bookCard.appendChild(isReadLabel);

  return bookCard;
}

const gridContainer = document.querySelector('.grid-container');

function displayBooks(library) {
  // Clear the gridContainer to prevent duplicates
  gridContainer.innerHTML = '';

  library.forEach((book) => {
    const bookCard = createBookCard(book);
    gridContainer.appendChild(bookCard);
  });
}

const testBook = new Book('The Hobbit', 'J.R.R. Tolkien', 294, false);
const testBook2 = new Book('Cool Title', 'Unknown', 323, true);
const testBook3 = new Book('Cool Title', 'Unknown', 323, true);
const testBook4 = new Book('Cool Title', 'Unknown', 323, true);

addBookToLibrary(testBook);
addBookToLibrary(testBook2);
addBookToLibrary(testBook3);
addBookToLibrary(testBook4);
displayBooks(myLibrary);

addBook.addEventListener('click', () => {
  modalBackground.style.display = 'block';
  modal.style.display = 'block';
  setTimeout(() => {
    modalBackground.classList.add('modal-open');
    modal.classList.add('modal-open');
  }, 0);
});

function closeModal() {
  modalBackground.classList.remove('modal-open');
  modal.classList.remove('modal-open');
  modalBackground.style.display = 'none';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 200);
}

closeBtn.addEventListener('click', () => {
  closeModal();
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Handle form submission
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pageCount = document.getElementById('pageCount').value;
  const isRead = document.getElementById('isRead').checked;

  const book = new Book(title, author, pageCount, isRead);

  addBookToLibrary(book);
  closeModal();
  document.getElementById('bookForm').reset();
  displayBooks(myLibrary);
});

const modal = document.getElementById('modal');
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
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

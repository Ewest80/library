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

function createBookCard(book, index) {
  const bookCard = document.createElement('div');
  const titleElement = document.createElement('h3');
  const authorElement = document.createElement('p');
  const pageCountElement = document.createElement('p');
  const bookInteraction = document.createElement('div');
  const isReadElement = document.createElement('input');
  const isReadLabel = document.createElement('label');
  const delBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  titleElement.textContent = book.title;
  authorElement.textContent = book.author;
  pageCountElement.textContent = book.pageCount + ' pages';

  bookInteraction.classList.add('book-interaction');
  isReadElement.setAttribute('id', 'isReadInput');
  isReadElement.type = 'checkbox';
  isReadElement.checked = book.isRead;
  isReadLabel.textContent = 'Read';
  delBtn.classList.add('red-background');
  delBtn.textContent = 'Remove Book';

  isReadLabel.appendChild(isReadElement);

  bookCard.appendChild(titleElement);
  bookCard.appendChild(authorElement);
  bookCard.appendChild(pageCountElement);
  bookInteraction.appendChild(isReadLabel);
  bookInteraction.appendChild(delBtn);
  bookCard.appendChild(bookInteraction);

  // Updates library info display
  isReadElement.addEventListener('change', () => {
    book.isRead = isReadElement.checked;
    updateLibraryInfo(myLibrary);
  });

  // Deletes book from library and updates display
  delBtn.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
    updateLibraryInfo(myLibrary);
  });

  return bookCard;
}

const gridContainer = document.querySelector('.grid-container');

function displayBooks(library) {
  // Clear the gridContainer to prevent duplicates
  gridContainer.innerHTML = '';

  library.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    gridContainer.appendChild(bookCard);
  });
}

// Test data
const testBook = new Book('The Hobbit', 'J.R.R. Tolkien', 294, false);
const testBook2 = new Book("The Hobbit's Revenge", 'J.R.R. Jr.', 295, true);

addBookToLibrary(testBook);
addBookToLibrary(testBook2);
displayBooks(myLibrary);

// Modal opening and closing
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
  updateLibraryInfo(myLibrary);
});

function updateLibraryInfo(library) {
  const totalBooks = document.getElementById('books');
  const booksRead = document.getElementById('booksRead');
  const totalPages = document.getElementById('totalPages');
  const pagesRead = document.getElementById('pagesRead');
  let booksReadCounter = 0;
  let pagesReadCounter = 0;
  let totalPagesCounter = 0;

  library.forEach((book) => {
    totalPagesCounter += +book.pageCount;

    if (book.isRead) {
      booksReadCounter++;
      pagesReadCounter += +book.pageCount;
    }
  });

  totalBooks.textContent = library.length;
  booksRead.textContent = booksReadCounter;
  totalPages.textContent = totalPagesCounter;
  pagesRead.textContent = pagesReadCounter;
}

updateLibraryInfo(myLibrary);

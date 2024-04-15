// Open Dialog to add new Book
const addBook = document.querySelector('.add-book');
const modal = document.querySelector('.book-dialog');

addBook.addEventListener('click', () => {
    modal.showModal();
});

const myLibrary = [];

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
    bookCard.classList.add('book-card');
    bookCard.dataset.index = index;

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = book.author;

    const pageCount = document.createElement('p');
    pageCount.textContent = book.pageCount + ' pages';

    const bookCardActions = document.createElement('div');
    bookCardActions.classList.add('book-card-actions');

    const bookReadCheckbox = document.createElement('input');
    bookReadCheckbox.type = 'checkbox';
    bookReadCheckbox.checked = book.isRead;

    const booksReadLabel = document.createElement('label');
    booksReadLabel.textContent = 'Read';

    const deleteBook = document.createElement('img');
    deleteBook.src = 'images/trash-can-outline.svg';
    deleteBook.alt = 'Delete Book';
    deleteBook.classList.add('delete-book');

    const isReadToggle = document.createElement('div');
    isReadToggle.classList.add('is-read-toggle');

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pageCount);

    booksReadLabel.appendChild(bookReadCheckbox);
    isReadToggle.appendChild(booksReadLabel);

    bookCardActions.appendChild(isReadToggle);
    bookCardActions.appendChild(deleteBook);

    bookCard.appendChild(bookCardActions);

    return bookCard;
}

const bookDisplay = document.querySelector('#bookDisplay');

// Listen for click events on the read checkbox and delete book icon
bookDisplay.addEventListener('click', (e) => {
    let bookIndex;
    let bookCard;
    if (e.target.type === 'checkbox') {
        bookCard = e.target.closest('.book-card');
        bookIndex = bookCard.dataset.index;
        myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead;
        updateLibraryInfo(myLibrary);
    }
    else if (e.target.classList.contains('delete-book')) {
        bookCard = e.target.closest('.book-card');
        bookIndex = +bookCard.dataset.index;
        myLibrary.splice(bookIndex, 1);
        displayBooks(myLibrary);
        updateLibraryInfo(myLibrary);
    }
});

function displayBooks(library) {
    // Clear the book display
    bookDisplay.textContent = '';

    const bookCards = library.map((book, index) => createBookCard(book, index));
    bookDisplay.append(...bookCards);
}

// Test data
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Hobbit 2', 'J.R.R. Jr.', 296, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks(myLibrary);

// Handle form submission
const bookForm = document.querySelector('#bookForm');
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pageCount = document.querySelector('#pageCount').value;
    const isRead = document.querySelector('#isRead').checked;

    const newBook = new Book(title, author, pageCount, isRead);
    addBookToLibrary(newBook);
    bookForm.reset();
    displayBooks(myLibrary);
    updateLibraryInfo(myLibrary);
    modal.close();
});

function updateLibraryInfo(library) {
    const totalBooks = document.querySelector('#books');
    const booksRead = document.querySelector('#booksRead');
    const totalPages = document.querySelector('#totalPages');
    const pagesRead = document.querySelector('#pagesRead');
    let booksReadCounter = 0;
    let pagesReadCounter = 0;
    let totalPagesCounter = 0;

    library.forEach(book => {
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

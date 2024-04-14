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
    bookCard.setAttribute('data-index', index);

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
    bookReadCheckbox.id = 'bookRead';
    bookReadCheckbox.checked = book.isRead;

    const booksReadLabel = document.createElement('label');
    booksReadLabel.textContent = 'Read';
    booksReadLabel.htmlFor = 'bookRead';

    const deleteBook = document.createElement('img');
    deleteBook.src = '/images/trash-can-outline.svg';
    deleteBook.alt = 'Delete Book';
    deleteBook.id = 'deleteBook';

    const isReadToggle = document.createElement('div');
    isReadToggle.classList.add('is-read-toggle');

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pageCount);

    isReadToggle.appendChild(booksReadLabel);
    isReadToggle.appendChild(bookReadCheckbox);

    bookCardActions.appendChild(isReadToggle);
    bookCardActions.appendChild(deleteBook);

    bookCard.appendChild(bookCardActions);

    return bookCard;
}

const bookDisplay = document.querySelector('#bookDisplay');

bookDisplay.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox' || e.target.tagName === 'label') {
        // Get the index of the book in the library, I know there is a better way to do this
        const bookIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead;
        console.log(myLibrary[bookIndex].isRead);
    }
});

bookDisplay.addEventListener('click', (e) => {
    if (e.target.id === 'deleteBook') {
        const bookIndex = +e.target.parentElement.parentElement.getAttribute('data-index');
        myLibrary.splice(bookIndex, 1);
        displayBooks(myLibrary);
    }
});

function displayBooks(library) {
    // Clear the book display
    bookDisplay.innerHTML = '';

    library.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        bookDisplay.appendChild(bookCard);
    });
}

// Test data
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks(myLibrary);


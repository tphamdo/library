const newBookButton = document.querySelector("#addBookBtn");
const dialog = document.querySelector(".dialog");
const newBookForm = document.querySelector("#newBookForm");
const booksContainer = document.querySelector(".books-container");
const overlay = document.querySelector(".overlay");
const trashCanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>`
const myLibrary = [
    new Book("Breath: The New Science of a Lost Art", "James Nestor", 304, read=true),
    new Book("Meditations", "Marcus Aurelius", 146, read=true),
    new Book("Writing An Interpreter In Go", "Thorsten Bell", 264, read=true),
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read? "Read" : "Not Read Yet"}`;
    }
}

Book.prototype.createBookCard = function(index) {
    const div = document.createElement('div');
    div.classList.add("book-card");
    div.setAttribute("data-index", index);
    return div;
}

Book.prototype.createTitle = function() {
    const title = document.createElement('p');
    title.classList.add("title");
    title.textContent = `"${this.title}"`
    return title;
};

Book.prototype.createByAuthor = function() {
    const by = document.createElement('p');
    by.classList.add("author");
    by.textContent = `${this.author}`;
    return by;
}

Book.prototype.createPages = function() {
    const pages = document.createElement('p');
    pages.classList.add("pages");
    pages.textContent = `${this.pages} pages`;
    return pages;
}

Book.prototype.createReadDiv = function() {
    const div = document.createElement('div');
    const readText = this.createReadText();
    const readButton = this.createReadButton();
    div.classList.add("read-container");
    div.appendChild(readButton);
    div.appendChild(readText);
    return div;
}

Book.prototype.createReadText = function() {
    const read = document.createElement('p');
    read.classList.add("read");
    read.textContent = `${this.read? "Read" : "Not Read"}`;
    return read;
}

Book.prototype.createReadButton = function() {
    const input = document.createElement('input');
    input.classList.add("readButton");
    input.setAttribute("type", "checkbox");
    input.setAttribute("checked", this.read);
    input.onclick = toggleRead;
    return input;
}

Book.prototype.render = function(index) {
    const bookCard = this.createBookCard();
    const title = this.createTitle();
    const byAuthor = this.createByAuthor();
    const pages = this.createPages();
    const readDiv = this.createReadDiv();
    const deleteButton = createDeleteButton(index);

    bookCard.appendChild(title);
    bookCard.appendChild(byAuthor);
    bookCard.appendChild(pages);
    bookCard.appendChild(readDiv);
    bookCard.appendChild(deleteButton);

    booksContainer.appendChild(bookCard);
}

function createDeleteButton(index) {
    const div = document.createElement('div');
    div.classList.add("delete-container");
    div.innerHTML = trashCanSvg;

    let svg = div.childNodes[0];
    svg.classList.add("delete");
    svg.setAttribute("aria-label", "delete");
    svg.setAttribute("data-index", index);
    svg.addEventListener('click', deleteBook);

    return div;
}

function deleteBook(event) {
    let index = event.currentTarget.dataset.index;

    booksContainer.removeChild(booksContainer.childNodes[index]);

    for (let i=index; i<booksContainer.childElementCount; ++i) {
        let bookCard = booksContainer.childNodes[i];
        let deleteDiv = bookCard.childNodes[bookCard.childNodes.length - 1];
        let deleteButton = deleteDiv.childNodes[0];

        deleteButton.dataset.index -= 1;
    }
    
    myLibrary.splice(index, 1);
}

function toggleRead(event) {
    if (event.target.nextSibling) {
        let oldText = event.target.nextSibling.textContent;
        let newText = oldText === "Read" ? "Not Read" : "Read";
        event.target.nextSibling.textContent = newText;
    }
}

myLibrary.forEach((book, index) => {
    book.render(index);
});

function addBookToLibrary(book) {
    myLibrary.push(book);
    book.render(myLibrary.length-1);
}

function closeAddBookDialog() {
    dialog.classList.remove("active");
    overlay.classList.remove("active");
}

newBookForm.addEventListener('submit', (event) => {
    event.preventDefault()

    title = newBookForm.elements['title'].value;
    author = newBookForm.elements['author'].value;
    pages = newBookForm.elements['pages'].value;
    read = newBookForm.elements['read'].checked;

    let book = new Book(title, author, pages, read); 
    addBookToLibrary(book);
    
    closeAddBookDialog();
});

newBookButton.addEventListener('click', () => {
    dialog.classList.add("active");
    overlay.classList.add("active");
});

overlay.onclick = closeAddBookDialog

const newBookButton = document.querySelector("#addBookBtn");
const dialog = document.querySelector(".dialog");
const newBookForm = document.querySelector("#newBookForm");
const booksContainer = document.querySelector(".books-container");
const overlay = document.querySelector(".overlay");
const trashCanSvgPath = `<path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>`
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

    // const svgContainer = document.createElement('div');
    // div.classList.add("svg-container");
    // const svg = document.createElement('svg');
    // svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    // svg.setAttribute("height", "24");
    // svg.setAttribute("width", "24");
    // svg.setAttribute("viewBox", "0 0 24 24");
    // svg.setAttribute("fill", "none");
    // svg.setAttribute("stroke", "currentColor");
    // svg.setAttribute("stroke-width", "2");
    // svg.setAttribute("stroke-linecap", "round");
    // svg.setAttribute("stroke-linecap", "round");
    // svg.classList.add("delete-icon");
    // svg.setAttribute("aria-label", "delete");
    // svg.setAttribute("data-index", index);
    // svg.innerHTML = trashCanSvgPath2;
    // svg.addEventListener('click', deleteBook);
    
    div.innerHTML = trashCanSvg;

    let svg = div.childNodes[0];
    svg.classList.add("delete");
    svg.setAttribute("aria-label", "delete");
    svg.setAttribute("data-index", index);
    svg.addEventListener('click', deleteBook);
//<svg height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    // div.appendChild(svgContainer)
    // div.innerHTML = svg;
    // const deleteButton = document.createElement('button');
    // deleteButton.classList.add("delete");
    // deleteButton.setAttribute("aria-label", "delete");
    // deleteButton.setAttribute("data-index", index);
    // deleteButton.textContent = "X";
    // deleteButton.addEventListener('click', deleteBook);
    // div.appendChild(deleteButton)
    return div;
}
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>

function deleteBook(event) {
    let index = event.currentTarget.dataset.index;

    // console.log(event.currentTarget);
    // console.log(event.target);
    // console.log(index);
    booksContainer.removeChild(booksContainer.childNodes[index]);

    for (let i=index; i<booksContainer.childElementCount; ++i) {
        let bookCard = booksContainer.childNodes[i];
        let deleteDiv = bookCard.childNodes[bookCard.childNodes.length - 1];
        // console.log(deleteDiv);
        let deleteButton = deleteDiv.childNodes[0];
        // console.log(deleteButton);

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

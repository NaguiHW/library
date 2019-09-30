class Book{
  constructor(title, author, pages, read){
    this.title = title
    this.autor = author;
    this.pages = pages;
    this.read = read;
  }
}

class UI {
  static displayBooks(){
      const books = Store.getBooks();
      books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr')
      row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.read}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
  }
  static deleteBook(el) {
      if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
      }
  }
  static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      setTimeout(() => document.querySelector('.alert').remove(), 4000);
  }
  static clearFields(){
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pages').value = '';
      document.querySelector('#read').checked = null;
  }
}

class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

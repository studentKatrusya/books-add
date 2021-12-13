import book from "./books.js";

const root = document.querySelector("#root");

const firstDiv = document.createElement("div");
firstDiv.classList.add("div1");

const secondDiv = document.createElement("div");
secondDiv.classList.add("div2");

const header = document.createElement("h1");
header.textContent = "Our Books";

const list = document.createElement("ul");
list.classList.add("list");

const text = document.createElement("p");
const button = document.createElement("button");
button.classList.add("btn-add", 'btn');
button.textContent = "Add book";


root.append(firstDiv, secondDiv);
firstDiv.append(header, list, button);
const renderItem = document.querySelector(".div2");
const listElem = document.querySelector(".list");
localStorage.setItem("books", JSON.stringify(book));
const addBtn = document.querySelector(".btn-add");

addBtn.addEventListener("click", addBook);

function renderList() {
  const bookItem = JSON.parse(localStorage.getItem("books"));
  listElem.innerHTML = bookItem
    .map(
      (elem) => `<li id ="${elem.id}">
          <p class = "description">${elem.title}</p>
          <div class='wrapper'>
            <button class="edit btn">Edit</button>
            <button class="delete btn">Delete</button>
          </div>
        </li>`
    )
    .join("");

  const discription = document.querySelectorAll("p");
  const btnEdit = document.querySelectorAll(".edit");
  const btnDel = document.querySelectorAll(".delete");

  discription.forEach((elem) => elem.addEventListener("click", renderPrev));
  btnEdit.forEach((elem) => elem.addEventListener("click", editBook));
  btnDel.forEach((elem) => elem.addEventListener("click", deletBook));
}

function renderPrev(event) {
  const textDesc = event.currentTarget.textContent;
  const bookItem = JSON.parse(localStorage.getItem("books"));

  const currentBook = bookItem.find((elem) => elem.title === textDesc);
  renderItem.innerHTML = renderMarkup(currentBook);
}

function renderMarkup(book) {
  // <div class='wrapper-render'>
  // </div>
  return `    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <p>${book.plot}</p>
    <img class = "book-image" src = ${book.img}>`;
}

function editBook(event) {
  const elemId = event.currentTarget.parentNode.id;
  const bookItem = JSON.parse(localStorage.getItem("books"));

  const newList = bookItem.find((element) => element.id === elemId);


  secondDiv.innerHTML = renderFormMarkup(newList);

  const inputAll = document.querySelectorAll("input");
  inputAll.forEach((el) => el.addEventListener("change", onInputValue)); // добавляем слушателя на input
  function onInputValue(e) {
    newList[e.target.name] = e.target.value; // переписываем полученый объект (полученый при нажатии на кнопку Edit)
  }

  const saveForm = document.querySelector(".form"); // ссылка на форму
  saveForm.addEventListener("submit", onUpdateBook); // вешаем слушатель


  // Осталось дописать логику перезаписи данных. При нажатии на кнопку Edit.
  // Данные из формы нужно записать в объект из локал стореджа и обновить их в списке и показать в secondDiv обновленные данные.

  // ===========================================
  function onUpdateBook(e) {
    e.preventDefault();

    if (
      newList.title === "" ||
      newList.img === "" ||
      newList.author === "" ||
      newList.plot === ""
    ) {
      alert("Все поля должны быть заполнены!");
      return;
    }

    localStorage.setItem("books", JSON.stringify(bookItem)); // добавляем в локал сторедж обновленный массив
    renderList(); // обновляем список книг

    renderItem.innerHTML = renderMarkup(newList); // показываем привью с изменениями
    setTimeout(() => alert("Книга добавлена!"), 300);  // показываем сообщене

  }
  // =======================================================
}

function renderFormMarkup(book) {
  return `<form class='form'>
    <label>
      <input type='text' placeholder='Автор' name='author' value='${book.author}'>
    </label>
    <label>
      <input type='text' placeholder='Заголовок' name='title' value='${book.title}'>
    </label>
    <label>
      <input type='text' placeholder='Ссылка' name='img' value='${book.img}'>
    </label>
    <label>
      <input type='text' placeholder='Описание' name='plot' value='${book.plot}'>
    </label>
    <button type='submit' class='btn-save'>Save</button>
  </form>`;
}

function addBook() {
  const newBook = {
    id: `${Date.now()}`,
    title: "",
    img: "",
    author: "",
    plot: "",
  };


  secondDiv.innerHTML = renderFormMarkup(newBook);

  const inputAll = document.querySelectorAll("input");
  inputAll.forEach((el) => el.addEventListener("change", onInputValue));
  const saveForm = document.querySelector(".form");
  saveForm.addEventListener("submit", onAddbook);

  function onAddbook(e) {
    e.preventDefault();

    if (
      newBook.title === "" ||
      newBook.img === "" ||
      newBook.author === "" ||
      newBook.plot === ""
    ) {
      alert("Все поля должны быть заполнены!");
      return;
    }

    const booksStorage = JSON.parse(localStorage.getItem("books"));
    booksStorage.push(newBook);
    localStorage.setItem("books", JSON.stringify(booksStorage));
    renderList();

    renderItem.innerHTML = renderMarkup(newBook);
    setTimeout(() => alert("Книга добавлена!"), 300);
  }

  function onInputValue(e) {
    newBook[e.target.name] = e.target.value;
  }
}

function deletBook(event) {
  const elemId = event.currentTarget.parentNode.id;
  const findHeader = event.currentTarget.parentNode.firstElementChild;
  const secondContent = secondDiv.firstElementChild.textContent;

  console.log(elemId);

  const bookItem = JSON.parse(localStorage.getItem("books"));
  const newList = bookItem.filter((element) => element.id !== elemId);
  localStorage.setItem("books", JSON.stringify(newList));

  list.innerHTML = "";

  if (findHeader.textContent === secondContent) {
    secondDiv.innerHTML = "";
  }

  renderList();
}
renderList();

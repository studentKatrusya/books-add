import book from "./books.js";

const root = document.querySelector("#root");

const firstDiv = document.createElement("div");
firstDiv.classList.add("div1");
const secondDiv = document.createElement("div");
secondDiv.classList.add("div2");
const header = document.createElement("h1");
const list = document.createElement("ul");
list.classList.add("list");
const text = document.createElement("p");
const button = document.createElement("button");
button.classList.add("btn-add");
button.textContent = "Add book";
header.textContent = "Our Books";

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
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
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
  return `<h2>${book.title}</h2>
  <h3>${book.author}</h3>
   <img class = "book-image" src = ${book.img}>
  <p>${book.plot}</p>`;
}

function editBook(event) {
  const elemId = event.currentTarget.parentNode.id;

  const bookItem = JSON.parse(localStorage.getItem("books"));
  const newList = bookItem.find((element) => element.id === elemId);

  // ???????????????? ???????????????? ???????????? ???????????????????? ????????????. ?????? ?????????????? ???? ???????????? Edit.
  // ???????????? ???? ?????????? ?????????? ???????????????? ?? ???????????? ???? ?????????? ???????????????? ?? ???????????????? ???? ?? ???????????? ?? ???????????????? ?? secondDiv ?????????????????????? ????????????.

  secondDiv.innerHTML = renderFormMarkup(newList);

  const saveForm = document.querySelector(".form");
  saveForm.addEventListener("submit", onUpdateBook);

  function onUpdateBook() {}
}

function renderFormMarkup(book) {
  return `<form class='form'>
    <label>
      <input type='text' placeholder='??????????' name='author' value='${book.author}'>
    </label>
    <label>
      <input type='text' placeholder='??????????????????' name='title' value='${book.title}'>
    </label>
    <label>
      <input type='text' placeholder='????????????' name='img' value='${book.img}'>
    </label>
    <label>
      <input type='text' placeholder='????????????????' name='plot' value='${book.plot}'>
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

  renderFormMarkup(newBook);

  secondDiv.innerHTML = newForm;

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
      alert("?????? ???????? ???????????? ???????? ??????????????????!");
      return;
    }

    const booksStorage = JSON.parse(localStorage.getItem("books"));

    booksStorage.push(newBook);

    localStorage.setItem("books", JSON.stringify(booksStorage));
    renderList();

    renderItem.innerHTML = renderMarkup(newBook);
    setTimeout(() => alert("?????????? ??????????????????!"), 300);
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
  console.log("newlist", newList);
  localStorage.setItem("books", JSON.stringify(newList));

  list.innerHTML = "";

  if (findHeader.textContent === secondContent) {
    secondDiv.innerHTML = "";
  }

  renderList();
}
renderList();

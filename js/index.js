
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");

// 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';

    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
  
    fetch(url)
    .then(res => res.json())
    .then (data => displaySearchResult(data.docs));

}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (docs.length === 0 ) {
        errorDiv.innerText = "No Search Result Found";
      } else {
        errorDiv.innerText = "";
      }

   docs.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100">
        <img height= "300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top book-img" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-title">${book.author_name}</h6>
            <p class="card-body fw-light">${book.first_publish_year}</p>
        </div>
    </div>
    `;
    searchResult.appendChild(div);
   })
}
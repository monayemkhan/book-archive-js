
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");

// 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';

    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty!";
        return;
    }

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
  
    fetch(url)
    .then(res => res.json())
    .then((data) => {
    // spinnner and showing data
        setTimeout(() => {
          spinner.classList.add("d-none");
          displaySearchResult(data.docs);
        },
        1000);
    })

    .finally(() => {
        searchField.value = "";
    });

}


const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (docs.length === 0 ) {
        errorDiv.innerText = "No Search Result Found!";
      } else {
        errorDiv.innerText = "";
    }

    docs.forEach(book => {
    //Author Check 
    const isValid = validCheck => {
        if (validCheck !== undefined) {
            return validCheck;
        } 
        else {
            return "Not Found";
        }
    }
    
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100">
        <img height= "300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top book-img" alt="...">
        <div class="card-body">
            <h4 class="card-title">${book.title}</h4>
            <h6 class="card-title">Author: ${isValid(book.author_name)}</h6>
            <p class="card-body fw-light">First Published: ${isValid(book.first_publish_year)}</p>
        </div>
    </div>
    `;
    searchResult.appendChild(div);
   })
}
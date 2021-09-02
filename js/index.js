// Get the Elements 
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");
const filterData = document.getElementById("found-result");


// Search the results 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clare input field 
    searchField.value = '';
    // error input field
    if (searchText === "") {
        errorDiv.innerText = "Search field can't be empty!";
        return;
    }

    // book search link 
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // spinner remove data
    spinner.classList.remove("d-none");
    fetch(url)
    .then(res => res.json())
    .then((data) => {
    // spinner and showing data
        setTimeout(() => {
          spinner.classList.add("d-none");
          displaySearchResult(data);
        },
        1000);
    })
    .finally(() => {
        searchField.value = "";
    });

}

//show the books results
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    filterData.innerText = "";
    // get result found
    if (books.docs.length === 0) {
        errorDiv.innerText = "No Search Result Found";
    } else if(books.docs.length >= 30) {
        errorDiv.innerText = "";
        books.docs.length = 30;
        filterData.innerText = `Showing ${books.docs.length} results of ${books.numFound}`
    }else if(books.docs.length <= 30)  {
        errorDiv.innerText = "";
        filterData.innerText = `Showing ${books.docs.length} results of ${books.numFound}`
    }

    // forEach the arry of results 
    books.docs.forEach(book => {
    //Author valid Check 
    const isValid = validCheck => {
        if (validCheck !== undefined) {
            return validCheck;
        } 
        else {
            return "Not Found";
        }
    }
    
    // create search result div
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
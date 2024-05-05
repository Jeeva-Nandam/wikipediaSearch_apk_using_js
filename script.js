let searchResultsContainer = document.getElementById("searchResults");
let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResults(searchItems) {
    // Creating Result Item
        let resultItemEl = document.createElement("div");
        resultItemEl.classList.add("result-item");
        searchResultsContainer.appendChild(resultItemEl);
    // Creating title Element
        let {link, title, description} = searchItems;
        let titleEl = document.createElement("a");
        titleEl.href = link;
        titleEl.textContent = title;
        titleEl.target = "_blank";
        titleEl.classList.add("result-title");
        resultItemEl.appendChild(titleEl);
    // Creating Break Element
        let breakEl1 = document.createElement("br");
        resultItemEl.appendChild(breakEl1);
    // Creating URL Element
        let urlEl = document.createElement("a");
        urlEl.href = link;
        urlEl.textContent = link;
        urlEl.target = "_blank";
        urlEl.classList.add("result-url");
        resultItemEl.appendChild(urlEl);
    // Creating Break Element
        let breakEl2 = document.createElement("br");
        resultItemEl.appendChild(breakEl2);
    // Creating Description Element
        let descriptionEl = document.createElement("p");
        descriptionEl.textContent = description;
        descriptionEl.classList.add("link-description");
        resultItemEl.appendChild(descriptionEl);

}


function displayResults(search_results) {
    // let searchItems = search_results[0];
    spinnerEl.classList.toggle("d-none");
    for (let searchItems of search_results) {
        // console.log(searchItems);
        createAndAppendResults(searchItems);
    }
}

// step 1 : Getting User input
function wikipediaSearch(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsContainer.textContent = "";
        let search = searchInputEl.value;
        // step 2: making HTTP request
        // URL : https://apis.ccbp.in/wiki-search?search=""
        let url = "https://apis.ccbp.in/wiki-search?search=" + search;
        let option = {
            method: "GET"
        };
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                // console.log(jsondata);
                let {
                    search_results
                } = jsondata; // search_results is a object in output
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", wikipediaSearch);
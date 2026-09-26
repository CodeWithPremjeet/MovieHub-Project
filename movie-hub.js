
const form = document.querySelector("#form");
const formInput = document.querySelector("#formInput");
const movieList = document.querySelector("#movies-list");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let moviesName = formInput.value.trim();

    if (!moviesName) {
        return;
    }
    searchMovies(moviesName);
})

async function searchMovies(movieName) {
    movieList.innerHTML = `<div class="loader"></div>`;
    let response = await fetch(`http://www.omdbapi.com/?apikey=ea8359f2&s=${encodeURIComponent(movieName)}`);
    let data = await response.json();

    console.log(data);
    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieList.innerHTML = "<p>Movie Not Found...</p>"
    }

}
function displayMovies(data) {
    movieList.innerHTML = "";
    data.forEach((movie) => {
        let div = document.createElement("div");
        div.setAttribute("class", "movie-card")
        div.dataset.imdbID = movie.imdbID;
        div.innerHTML =
            `<div>
                <img src=${movie.Poster} alt="#">
            </div>
            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
            </div>`;

        movieList.append(div);
    });
};

movieList.addEventListener("click", (e) => {
    e.stopPropagation();

    let movie = e.target.closest(".movie-card");
    let id = movie.dataset.imdbID;
    location.href = `movie-detail.html?id=${id}`;
});
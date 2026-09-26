
const moviedetails = document.querySelector("#movie-details");

const params = new URLSearchParams(location.search);
const imdbID = params.get("id");
console.log(imdbID);

if (imdbID) {
    searchMovie(imdbID);
}

async function searchMovie(imdbID) {

    let response = await fetch(`https://www.omdbapi.com/?apikey=ea8359f2&i=${imdbID}&plot=full`);
    let data = await response.json();

    console.log(data);

    if (data.Response === "True") {
        displayMovieDetails(data);
    } else {
        // 
    }

}

function displayMovieDetails(data) {
    moviedetails.innerHTML = `<div>
            <img src=${data.Poster} alt="">
        </div>

        <div>
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>imdb : ${data.imdbRating}/10</p>
            </section>
            <div>
                <p>Overview Plot</p>
                <p>${data.Plot}</p>
            </div>
            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p>Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>
            <div>
                <p>Actors</p>
                <p>${data.Actors}</p>
            </div>
            <div>
                <section>
                    <p>Language</p>
                    <p>${data.Language}</p>
                </section>
                <section>
                    <p>Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>
        </div>`
}
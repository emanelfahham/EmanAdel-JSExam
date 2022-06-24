const apiKey = '6d1b5667232d91ab2a0410c07391e5e1';
const baseUrl = 'https://api.themoviedb.org/3/movie/';

let movieData = [];
let searchedMoviesLocally = [];
let dataType = 'now_playing';

// Selectors:
let listItemsAnchor = Array.from(document.querySelectorAll('li a[data-target]'));
const searchfromDBInput = document.querySelector('#searchfromDB');
const SearchfromLocalDataInput = document.querySelector('#SearchfromLocalData');

// get data from api function
async function getMovie(){
    let result;
    if(dataType == 'trending'){
        result = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
    } else {
        result = await fetch(`${baseUrl}${dataType}?api_key=${apiKey}&language=en-US&page=1`)
    }
        const data = await result.json();
        movieData = data.results;
        displayResults(movieData)
}

// Display Results of search
function displayResults(moviesArray){
    let html = ``;
    for (let i = 0 ; i < moviesArray.length; i++){
        html += `<div class="col-lg-4 col-md-6">
                   <div class="p-4">
                     <figure class="position-relative overflow-hidden">
                        <img src="https://image.tmdb.org/t/p/w500${moviesArray[i].poster_path}" class="w-100" alt="image">
                        <div class="imgOverlay py-5 px-2">
                            <p class="movieTitle">${moviesArray[i].original_title}</p>
                            <p>${moviesArray[i].overview}</p>
                            <p>Rate: ${moviesArray[i].vote_average}</p>
                            <p>${moviesArray[i].release_date}</p>
                        </div>
                    </figure>
                   </div>
                </div>`
    }
    document.querySelector('.movieResults').innerHTML = html;
}

$(document).ready(function () {
    // on document load => sidebr is closed
    const sideBarWidth = $('#sideBar').innerWidth();
    $('#sideBar').css('left', -sideBarWidth);
    // function to toggle sidebar:
    $('#toggleSideBar').click(function () { 
        $(this).toggleClass('fa-times fa-align-justify');
        if($('#sideBar').css('left') == '0px'){
            $('#sideBar').animate({left: - sideBarWidth},500, function(){
            });
        } else {
            $('#sideBar').animate({left: 0},500,function(){
            });
        }  
    });
});

// loop on list a to get different movie types
for( let i = 0; i < listItemsAnchor.length; i++){
    listItemsAnchor[i].addEventListener('click', function(e){
        $('body, html').animate({scrollTop: 0 },500)
        dataType = this.dataset.target;
        getMovie();
})
}

// Move to contact us section:
$('li a').eq(5).click(function (e) { 
    let elementOffset = $('.contactUsSection').offset().top;
    $('body, html').animate({scrollTop: elementOffset },500)
});

// Search fromDB function
async function searchMovies(e){
    let result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.value}&page=1&include_adult=false`);
    let data = await result.json();
    movieData = data.results;
    displayResults(movieData)
}

function searchLocally(e){
    const searchTerm = this.value;
    for (movie of movieData){
        if ((movie.original_title).includes(searchTerm)){
            searchedMoviesLocally.push(movie);
            displayResults(searchedMoviesLocally)
            console.log(searchedMoviesLocally)
        }
    }
}

searchfromDBInput.addEventListener('keyup', searchMovies);
SearchfromLocalDataInput.addEventListener('keyup', searchLocally);
getMovie();



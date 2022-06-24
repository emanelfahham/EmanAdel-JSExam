const apiKey = '6d1b5667232d91ab2a0410c07391e5e1';
const baseUrl = 'https://api.themoviedb.org/3/movie/';

let movieData = [];
let dataType = 'now_playing';

// Selectors:
let listItemsAnchor = Array.from(document.querySelectorAll('li a[data-target]'));

async function getMovie(){
    const result = await fetch(`${baseUrl}${dataType}?api_key=${apiKey}&language=en-US&page=1`)
    const data = await result.json();
    movieData = data.results;
    displayResults()
}

function displayResults(){
    let html = ``;
    for (let i = 0 ; i < movieData.length; i++){
        html += `<div class="col-lg-4 col-md-6">
                   <div class="p-4">
                     <figure class="position-relative overflow-hidden">
                        <img src="https://image.tmdb.org/t/p/w500${movieData[i].poster_path}" class="w-100" alt="image">
                        <div class="imgOverlay py-5 px-2">
                            <p class="movieTitle">${movieData[i].original_title}</p>
                            <p>${movieData[i].overview}</p>
                            <p>Rate: ${movieData[i].vote_average}</p>
                            <p>${movieData[i].release_date}</p>
                        </div>
                    </figure>
                   </div>
                </div>`
    }
    document.querySelector('.movieResults').innerHTML = html;
}

$(document).ready(function () {
    const sideBarWidth = $('#sideBar').innerWidth();
    $('#sideBar').css('left', -sideBarWidth);

    $('#toggleSideBar').click(function () { 
        $(this).toggleClass('fa-times fa-align-justify');
        if($('#sideBar').css('left') == '0px'){
            $('#sideBar').animate({left: - sideBarWidth},500);
        } else {
            $('#sideBar').animate({left: 0},500);
        }  
    });
});

for( let i = 0; i < listItemsAnchor.length; i++){
    listItemsAnchor[i].addEventListener('click', function(e){
        dataType = this.dataset.target;
        getMovie();
})
}
getMovie();

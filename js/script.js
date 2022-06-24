// Movie Section:
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
    $('li').animate({opacity:0, paddingTop:"700px"}, 0);

    // function to toggle sidebar:
    $('#toggleSideBar').click(function () { 
        $(this).toggleClass('fa-times fa-align-justify');
        if($('#sideBar').css('left') == '0px'){
            $('#sideBar').animate({left: - sideBarWidth},500);
            $('li').animate({opacity:0, paddingTop:"700px"}, 0);
        } else {
             $('#sideBar').animate({left: 0},500, function(){
                $('li').eq(0).animate({opacity:1, paddingTop:"10px"}, 500, function(){
                    $('li').eq(1).animate({opacity:1, paddingTop:"10px"},600,function(){
                        $('li').eq(2).animate({opacity:1, paddingTop:"10px"},650,function(){
                            $('li').eq(3).animate({opacity:1, paddingTop:"10px"},700,function(){
                                $('li').eq(4).animate({opacity:1, paddingTop:"10px"},700, function(){
                                    $('li').eq(5).animate({opacity:1, paddingTop:"10px"},700)
                                })
                            })
                        })
                    })
                })
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
// function to search locally
function searchLocally(){
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


// contact Section:
const nameRegx =/^[a-z]{2,}$/i;
const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const ageRegex = /^[1-9][0-9]$/;
const passRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
const nameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const ageInput = document.querySelector('#age');
const passInput = document.querySelector('#password');
const confirmPassInput = document.querySelector('#confirmPassword');
const usernameErrorDiv = document.querySelector('.usernameErrorDiv');
const emailErrorDiv = document.querySelector('.emailErrorDiv');
const phoneErrorDiv = document.querySelector('.phoneErrorDiv');
const AgeErrorDiv = document.querySelector('.AgeErrorDiv');
const passErrorDiv = document.querySelector('.passErrorDiv');
const confirmPassErrorDiv = document.querySelector('.confirmPassErrorDiv');
const submitBtn = document.querySelector('button');
const contactUsSection = document.querySelector('.contactUsSection');
function validateUserName(e){
    if(nameRegx.test(nameInput.value)){
        usernameErrorDiv.style.display = 'none';
        return true
    } else {
        usernameErrorDiv.style.display = 'block';
        return false;
    }
}
function validateEmail(){
    if(emailRegex.test(emailInput.value)){
        emailErrorDiv.style.display = 'none';
        return true
    } else {
        emailErrorDiv.style.display = 'block';
        return false;
    }
}
function validatePhone(){
    if(phoneRegex.test(phoneInput.value)){
        phoneErrorDiv.style.display = 'none';
        return true
    } else {
        phoneErrorDiv.style.display = 'block';
        return false;
    }
}
function validateAge(){
    if(ageRegex.test(ageInput.value)){
        AgeErrorDiv.style.display = 'none';
        return true
    } else {
        AgeErrorDiv.style.display = 'block';
        return false;
    }
}
function validatePassword(){
    if(passRegex.test(passInput.value)){
        passErrorDiv.style.display = 'none';
        return true
    } else {
        passErrorDiv.style.display = 'block';
        return false;
    }
}

function validateConfirmPass(){
    if (passInput.value == this.value){
        confirmPassErrorDiv.style.display = 'none';
        return true;
    } else {
        confirmPassErrorDiv.style.display = 'block';
        return false;
    }
}

function checkToSubmit(){
    if( validateUserName() && validateEmail() && validatePhone() && validateAge() && validatePassword() && validateConfirmPass()){
        submitBtn.classList.remove('disabled')
    } else {
        return false
    }
}
nameInput.addEventListener('keyup', validateUserName );
emailInput.addEventListener('keyup', validateEmail );
phoneInput.addEventListener('keyup', validatePhone );
ageInput.addEventListener('keyup', validateAge);
passInput.addEventListener('keyup', validatePassword);
confirmPassInput.addEventListener('keyup', validateConfirmPass)
contactUsSection.addEventListener('click', checkToSubmit)

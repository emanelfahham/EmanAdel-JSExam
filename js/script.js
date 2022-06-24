const apiKey = '6d1b5667232d91ab2a0410c07391e5e1';
const baseUrl = 'https://api.themoviedb.org/3/movie/';

let movieData = [];
let searchedMoviesLocally = [];
let dataType = 'now_playing';
const nameRegx = /^[a-z]{3,}$/gi;
const phoneRegex = /^(01)(0|1|2|5)[0-9]{8}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
                    $('li').eq(1).animate({opacity:1, paddingTop:"10px"},500,function(){
                        $('li').eq(2).animate({opacity:1, paddingTop:"10px"},500,function(){
                            $('li').eq(3).animate({opacity:1, paddingTop:"10px"},500,function(){
                                $('li').eq(4).animate({opacity:1, paddingTop:"10px"},500, function(){
                                    $('li').eq(5).animate({opacity:1, paddingTop:"10px"},500)
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





let userName=document.getElementById("name"),userEmail=document.getElementById("email"),userPhone=document.getElementById("phone"),userAge=document.getElementById("age"),userPassword=document.getElementById("password"),userRePassword=document.getElementById("rePassword"),userNameAlert=document.getElementById("namealert"),userEmailAlert=document.getElementById("emailalert"),userPhoneAlert=document.getElementById("phonealert"),userAgeAlert=document.getElementById("agealert"),userpasswordAlert=document.getElementById("passwordalert"),userRepasswordAlert=document.getElementById("repasswordalert");function userNameValid(){return 1==/^[a-zA-Z0-9]+$/.test(userName.value)?(userNameAlert.style.display="none",!0):(userNameAlert.style.display="block",!1)}function userEmailValid(){return 1==/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userEmail.value)?(userEmailAlert.style.display="none",!0):(userEmailAlert.style.display="block",!1)}function userPhoneValid(){return 1==/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)?(userPhoneAlert.style.display="none",!0):(userPhoneAlert.style.display="block",!1)}function userAgeValid(){return 1==/^[1-9][0-9]?$|^100$/.test(userAge.value)?(userAgeAlert.style.display="none",!0):(userAgeAlert.style.display="block",console.log("dkldkdlkdlk"),!1)}function userPasswordValid(){return 1==/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)?(userpasswordAlert.style.display="none",!0):(userpasswordAlert.style.display="block",!1)}function userRePasswordValid(){return userPassword.value==userRePassword.value?(userRepasswordAlert.style.display="none",!0):(userRepasswordAlert.style.display="block",!1)}userAgeAlert.style.display="none",userName.addEventListener("keyup",userNameValid),userEmail.addEventListener("keyup",userEmailValid),userPhone.addEventListener("keyup",userPhoneValid),userAge.addEventListener("keyup",userAgeValid),userPassword.addEventListener("keyup",userPasswordValid),userRePassword.addEventListener("keyup",userRePasswordValid),document.getElementById("contact").addEventListener("click",function(){userNameValid()&&userEmailValid()&&userPhoneValid()&&userAgeValid()&&userPasswordValid()&&userRePasswordValid()?document.getElementById("submitBtn").disabled=!1:document.getElementById("submitBtn").disabled=!0});
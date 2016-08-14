/* ********************************************************************************\
*    Date : 14/08/2016                                                             *
*	 Creator : Adilson Adao Capaia                                                 *
*    Country : France                                                              *
*    Nationality: Angolan                                                          *
*    Project : Movie search OMDb                                                   *
\**********************************************************************************/




//------------------------------------Request data from the OMDb API to display movie information-----------------------------------



// Event handler to the search button
$("#submit").click(function(event){
  event.preventDefault();
  //get the value or text in the input search field
  var $inputSearch =$("#search").val();
  var $inputYear =$("#year").val()||"";
  /* 
    omdbOptions object is for configurations to the OMDB API, This statement has the goal to research any movie in one category and year
    IF no year is specified, then de default is empty string, it will search any movie in that category or "title"
  */
  var omdbOptions={
    s:$inputSearch,
    y:$inputYear
  };
  // function that handle the response from the OMDB site
  function handlerData(data) {
    // ------------------------------Display search results on the page---------------------------
    
    // variable that hold the html to display later on the page
    var movieHTML ='';
  
    if(data.Response=="True"){
      // iterate each array in the search propriety "Search", create each li element and display the elements to the page

      $.each(data.Search, function(i,movie){
        movieHTML += '<li>';
        movieHTML += '<div class="poster-wrap">';
        if(movie.Poster =="N/A"){
          movieHTML += '<i class="material-icons poster-placeholder">crop_original</i>';
        }else{
          movieHTML += '<img class="movie-poster" src="' + movie.Poster + '"> </div>';
        }
        movieHTML += '<span class="movie-title">' + movie.Title  + '</span>';
        movieHTML += '<span class="movie-year">' + movie.Year + '</span> </li>';
      
      });
      //display the movies to the page
      $("#movies").html(movieHTML);
      
    }else{
      // if no result found then display that
      movieHTML +='<li class="no-movies">';
      movieHTML +='<i class="material-icons icon-help">help_outline</i>No movies found that match: [search form value].</li>';
      $("#movies").html(movieHTML);
    }
    
  }// END handlerData
  
  // send a request and handle the response 
  $.getJSON("http://www.omdbapi.com/?",omdbOptions, handlerData);
 
  
});


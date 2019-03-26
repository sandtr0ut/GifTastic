$(document).ready(function () {
  
  var nameArray = [
    "George Washington", "Benjamin Franklin", "Abraham Lincoln", "Helen Keller", "John F Kennedy", "Martin Luther King, Jr", "Franklin D. Roosevelt", "Albert Einstein", "John F. Kennedy", "Robert F. Kennedy", "Thomas Jefferson", "Thomas Alva Edison", "Frederick Douglass", "Susan B. Anthony", "Theodore Roosevelt", "Henry Ford", "Bill Gates", "Steve Jobs", "Jesse Owens", "Jackie Robinson", "Howard Hughes", "Amelia Earhart", "Andrew Carnegie", "Barack Obama", "Mark Twain", "Joseph Smith, Jr.", "J.P. Morgan", "Neil Armstrong", "Malcolm X", "John Glenn", "Bob Dylan", "Billie Jean King", "Chuck Yeager", "Elvis Presley", "Ernest Hemingway", "Marilyn Monroe", "Muhammad Ali", "Jimi Hendrix", "Hugh Hefner"
  ];
  
  // Function to Display Images on name-button Clicks
  function displayImages() {
    
    var VIP = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZQlhsr3WWOlLaitiQkikLDYzzfYU6tci&q=" + VIP + "&limit=10&offset=0&rating=G&lang=en";
    
    // ajax call for the click event
    $.ajax({
      type: "method",
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      // create an array with the 10 responses
      var results = response.data;
      
      // loop through each result
      for (let j = 0; j < results.length; j++) {
            
    
      // create new div element for images
      var imageDiv = $("<div class='images'>");
      
      // store rating info
      var rating = results[j].rating;
      
      // create p-element to display rating
      var ratingDisplay = $("<p>").text("Rating: " + rating);
      
      // create an image tag
      var VIPimg = $("<img>");
      
      // give the image a src attribute
      VIPimg.attr("src", results[j].images.fixed_width.url);
      
      // append the displayed image and rating to the image div
      imageDiv.append(VIPimg);
      imageDiv.append(ratingDisplay);
      
      // put the whole shootin' match in the image area
      //   ...on top of any previous images
      $("#image-area").prepend(imageDiv);
    }
  });
}
  // Function to Display Buttons
  //  >> runs:
  //    - on load
  //    - on refresh
  //    - anytime changes are made to the nameArray
  function displayButtons() {
    
  //  >> clears button-area and generates/re-generates
      $("#button-area").empty();
      
  //     a button for every item in the nameArray
      for (let i = 0; i < nameArray.length; i++) {
        var arr = nameArray[i];
        
        // creates the button element
        var mkBut = $("<button>");
        
        // adds the name-button class to each
        mkBut.addClass("name-button");
        
        // adds name attribute to each
        mkBut.attr("data-name", arr);
        
        // adds text to each
        mkBut.text(arr);
        
        // adds the buttons to the button-area div
        $("#button-area").append(mkBut);
        
      }
  }
  
  displayButtons();
  
  // Click Event and Function for Adding VIPs
  $("#add-button").on("click", function(event) {
    event.preventDefault();
    
    // get value from text input, sans white space
    var VIP = $("#newButton-input").val().trim();
    
    // push the new VIP name into the nameArray
    nameArray.push(VIP);
    
    // refresh the entire button display
    displayButtons();
    
    // clear the newButton-input field
    $("#newButton-input").val("");
    
  })
  
  // Click Event for Name Buttons
  $(document).on("click", ".name-button", displayImages);
  
  
});

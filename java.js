$(document).ready(function() {

	var animalArray = ["Dog", "Cat", "Snake", "Ferret", "Badger", "Panda", "Hippo", "Bearded Dragon", "Platypus", "Kangaroo"];
	const APIKEY = '4d0ff61f03864199b4b4722d7cc074e4';


	function materializeButtons() {
		$('#giphyButtons').html("");
		for (var i = 0; i<animalArray.length; i ++) {
			 var currentButton = $('<input type="button" class="btn btn-default btn-md searchButton" value="' + animalArray[i] + '"/>');
			$('#giphyButtons').append(currentButton);
		}
	}
	function pullData(search){
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + APIKEY;
		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
 	        var results = response.data;
 	        var gifDiv = $("<div class='item'>");
            var SearchImage = $("<img>");
            var whichGif = randomGiphy(results);
            SearchImage.attr("src", results[whichGif].images.fixed_height_still.url);
            SearchImage.attr("data-temp", results[whichGif].images.fixed_height.url);
            SearchImage.addClass("gif")
            var rating = results[whichGif].rating;
            var p = $("<p>").text("Rating: " + rating);
            gifDiv.append(p);
            gifDiv.append(SearchImage);
			$("#Giphy-container").prepend(gifDiv);
        });
	}
	function randomGiphy(){
		var random = Math.floor(Math.random() * (25));
		return random;		
	};



	$(document).on("click",".searchButton",function(){
		pullData(this.value);

	});
	$(document).on("click",".gif",function(){
		var temp = $(this).data('temp');
		this.attr("data-temp", this.src);
		this.src = temp;
		console.log(this.temp);
		console.log(this.src);
		console.log(temp)

	});


	$('#submit').on("click", function(){
		var newSearch = $("#searchTerm").val().trim();
		console.log(newSearch);
		var currentButton = $('<input type="button"  class="btn btn-default btn-md searchButton" value="' + newSearch + '"/>');
		console.log(currentButton);
		$('#giphyButtons').append(currentButton);
	});


	materializeButtons();


});


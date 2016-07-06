$(document).ready(function() {

	var simplecastEpisodesURL = 'https://accesscontrolalloworiginall.herokuapp.com/https://api.simplecast.com/v1/podcasts/31/episodes.json?api_key=sc_7U1bdMrzYcYS_jBupCBEfA';
	
	var config = {
	    apiKey: "AIzaSyBh3UnVPUaEBoUIXK3IdbB2EXlJA9yiBhw",
	    authDomain: "randomcast-35423.firebaseapp.com",
	    databaseURL: "https://randomcast-35423.firebaseio.com",
	    storageBucket: ""
	};

	firebase.initializeApp(config);

	var firebaseDB = firebase.database();
	var episodesInFirebase = firebaseDB.ref('episodes');
	

	function getRandomEpisode() {
		$.getJSON(simplecastEpisodesURL, function(data) {
	   		// Get single episode from data
	   		var episode = data[Math.floor(Math.random() * data.length)];
	   		var simplecastPlayerUrl = 'https://accesscontrolalloworiginall.herokuapp.com/https://api.simplecast.com/v1/podcasts/31/episodes/' + episode.id + '/embed.json?api_key=sc_7U1bdMrzYcYS_jBupCBEfA';
		   	
	   		// Get Fields
		   	var $title = $('.title');
		   	var $description = $('.description');
		   	var $thumbnail = $('.thumbnail');

		   	// Clear all fields
		   	$title.text('');
		   	$description.text('');
		   	$thumbnail.attr('src', '');

		   	// Add content to fields
		   	$title.append(episode.title);
		   	$description.append(episode.description);
		   	$thumbnail.attr('src', episode.images.thumb);

		   	$.getJSON(simplecastPlayerUrl, function(data) {
		   		var $player = $('.player');

		   		// Clear Player
		   		$player.html('');

		   		$player.append(data.html.dark);
		   	});
	   	});
	}

	getRandomEpisode();

	$('.get-new-episode').on('click', function() {
		getRandomEpisode();
	})
});



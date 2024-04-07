$(document).ready(function() {
    // Function to create HTML elements for places
    function createPlaceElement(place) {
        var article = $('<article>');
        var titleBox = $('<div>').addClass('title_box');
        var title = $('<h2>').text(place.name);
        var price = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
        var information = $('<div>').addClass('information');
        var maxGuest = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
        var numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
        var numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
        var description = $('<div>').addClass('description').text(place.description);

        titleBox.append(title, price);
        information.append(maxGuest, numberRooms, numberBathrooms);
        article.append(titleBox, information, description);

        return article;
    }

    // Request places data from the API endpoint
    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        contentType: "application/json",
        data: JSON.stringify({}), // Empty dictionary as requested
        success: function(response) {
            // Loop through the response and create place elements
            response.forEach(function(place) {
                var placeElement = createPlaceElement(place);
                $('.places').append(placeElement);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching places:", error);
        }
    });
});

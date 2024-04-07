$(document).ready(function() {
    // Variable to store Amenity IDs
    var amenitiesChecked = {};

    // Function to update the h4 tag with checked amenities
    function updateAmenities() {
        var checkedAmenities = Object.values(amenitiesChecked);
        if (checkedAmenities.length > 0) {
            $('#amenities h4').text(checkedAmenities.join(', '));
        } else {
            $('#amenities h4').text('None');
        }
    }

    // Event listener for changes on each input checkbox tag 
    $('input[type="checkbox"]').change(function() {
        var amenityId = $(this).attr('data-id');
        if ($(this).is(':checked')) {
            amenitiesChecked[amenityId] = $(this).attr('data-name');
        } else {
            delete amenitiesChecked[amenityId];
        }
        updateAmenities();
    });
});
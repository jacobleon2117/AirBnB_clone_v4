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

    // Function to update API status
    function updateAPIStatus() {
        $.ajax({
            type: "GET",
            url: "http://0.0.0.0:5001/api/v1/status/",
            success: function(response) {
                if (response.status === "OK") {
                    $('#api_status').addClass('available');
                } else {
                    $('#api_status').removeClass('available');
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching API status:", error);
            }
        });
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

    // Initial call to update API status
    updateAPIStatus();

    // Periodically update API status every 10 seconds
    setInterval(updateAPIStatus, 10000);
});

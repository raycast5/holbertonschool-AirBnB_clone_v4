const amenityDict = {};
$(() => {
  $(':checkbox').change(function() {
    if (this.checked) {
        amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
        delete amenityDict[$(this).data('id')];
    }
    if ($.isEmptyObject(amenityDict)) {
        $('.amenities h4').html('&nbsp');
    } else {
        $('.amenities h4').text(Object.values(amenityDict).join(', '));
    }
  });
});
  
$(':checkbox').css('margin-right', '10px');
$.get('http://0.0.0.0:5002/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
});
  
$.ajax({
  url : 'http://0.0.0.0:5002/api/v1/places_search',
  type : 'POST', 
  data : '{}',
  dataType : 'json',
  contentType : 'application/json',
  success: (data) => {
    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      const guests = ((place.max_guest === 1) ? ' Guest' : ' Guests');
      const rooms = ((place.number_rooms === 1) ? ' Bedroom' : ' Bedrooms');
      const bathrooms = ((place.number_bathrooms === 1) ? ' Bathroom' : ' Bathrooms')

      $('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night +
      '</div></div><div class="information"><div class="max_guest">' + place.max_guest + guests + '</div><div class="number_rooms">' +
      place.number_rooms + rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + bathrooms + '</div></div><div class="description">' + place.description + '</div></article>')
    };
  }
});


$(() => {
  $(':button').click( function() {
    $.ajax({
      url : 'http://0.0.0.0:5002/api/v1/places_search',
      type : 'POST', 
      dataType : 'json',
      data : JSON.stringify({ amenities: Object.keys(amenityDict) }),
      contentType : 'application/json; charset=utf-8',
      success: (data) => {
        $('.places').empty();
        for (const place of Object.values(data)) {
          const guests = ((place.max_guest === 1) ? ' Guest' : ' Guests');
          const rooms = ((place.number_rooms === 1) ? ' Bedroom' : ' Bedrooms');
          const bathrooms = ((place.number_bathrooms === 1) ? ' Bathroom' : ' Bathrooms')
      
          $('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night +
          '</div></div><div class="information"><div class="max_guest">' + place.max_guest + guests + '</div><div class="number_rooms">' +
          place.number_rooms + rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + bathrooms + '</div></div><div class="description">' + place.description + '</div></article>')
        };
      }
    });
  });
});

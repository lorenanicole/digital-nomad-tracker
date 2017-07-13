var firebaseUrl = $('#firebase').attr('url');
var myDataRef = new Firebase(firebaseUrl);
var usersRef = myDataRef.child('users').push();

const messageIds = ['#nameInput', '#locationInput', '#contactInput', '#startDateInput', '#endDateInput'];

$('#submit').click(function(e)  {
  e.preventDefault();
 
  var personData = {};

  _.each(messageIds, function(id) {
    var property = id.replace('#','').replace('Input', '');
    personData[property] = $(id).val(); 
    $(id).val('');
  });

  var getLatLongRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ encodeURIComponent(personData.location) + '&key={SET_KEY}';

  $.getJSON(getLatLongRequest, function(data) {
    var results = data.results[0];
    if (results.geometry === undefined) {
      personData['coordinates'] = {lat: -25.363, lng: 131.044}; // Default
    } else {  
      personData['coordinates'] = {lat: results.geometry.location.lat, 
                                   long: results.geometry.location.lng}
    }

    usersRef.set(personData);

  });
     
});

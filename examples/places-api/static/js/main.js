'use strict';

const endpointURL = 'http://localhost:9001/api/';

const data = {
  place: '',
  title: ''
};




  var app = () => new Vue({
    el: '#app',
    methods: {
      setTitle: function (event) {
        event.preventDefault();
        this.title = this.place;
        axios.post('http://localhost:9001/api/places/everything/'+this.place).then(response => {
          document.getElementById('content').innerHTML = JSON.stringify(response.data, null, 2);

          const location = response.data.locations && response.data.locations[0] && response.data.locations[0].geometry.location;

          async function initMap() {
            var uluru = {lat:14.626 , lng: -90.527};
            return await axios.get(endpointURL + 'config');
          }

          initMap().then(response => {
            const config = response.data.config;
            var position = {lat: config.latitude, lng: config.longitude};
            console.log(position);
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 8,
              center: position
            });
            var marker = new google.maps.Marker({
              location,
              map: map
            });
          });
        });


      }
    },
    data
  });


'use strict';



const data = {
  place: '',
  title: ''
};

var app = new Vue({
  el: '#app',
  methods: {
    setTitle: function (event) {
      event.preventDefault();
      this.title = this.place;
      axios.post('http://localhost:9001/api/places/everything/'+this.place).then(response => {
        document.getElementById('content').innerHTML = JSON.stringify(response.data, null, 2);
      });
    }
  },
  data
});


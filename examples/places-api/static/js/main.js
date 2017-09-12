'use strict';

axios.post('http://localhost:9001/api/places/everything/Volcan Acatenango').then(response => {
  document.getElementById('content').innerHTML = JSON.stringify(response.data, null, 2);
});
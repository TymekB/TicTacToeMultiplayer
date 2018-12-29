let express = require('express');
let app = express();
let port = process.env.PORT || 5000;

let server = app.listen(port, function(){
   console.log('listening on ' + port);
});

app.use(express.static('public'));

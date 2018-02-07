const express = require('express');
const app = express();
app.use(express.static('public'));

const transforme_en_tableau = (listeJSON) => {

  let trace = '<table>';

  for (let elm of listeJSON){

    for (let p in elm) { 

      trace += '<tr><th>' + p + '</th>';
      trace += '<th>' + elm[p] + '</th></tr>'; 

    } 

      trace += '<tr><th>&nbsp</th></tr>';

  }

  trace += '</table>';
  return trace;
  //console.log(trace);

}

////////////////////////////////////////////////// Route /html/01_form.htm
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "01_form.htm" );
})
////////////////////////////////////////////////// Route /
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})
////////////////////////////////////////////////// Route /traiter_get
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel: req.query.courriel
 };
 
//console.log(reponse);
//res.end(JSON.stringify(reponse));

let fs = require('fs');
  fs.appendFile('public/data/membres.txt', ',' + JSON.stringify(reponse), (err) => {
  if (err) throw err;
     console.log('Sauvegardé');
});

/*
let fs = require('fs');
fs.readFile('public/data/membres.txt', 'utf8', (err, data) => {
 if (err) throw err;
 //let obj = JSON.parse(data);
 console.log(JSON.parse(data));


});
*/




console.log(reponse);
 res.end(JSON.stringify(reponse));
})
/////////////////////////////////////// Route : membres
app.get('/membres', (req,res) => {
/*
    res.sendFile( __dirname + "/public/data/" + "membres.txt" );
    console.log(res);

*/
    let fs = require('fs');
    fs.readFile('public/data/membres.txt', 'utf8', (err, data) => {

     if (err) throw err;
     let listeMembres = JSON.parse('[' + data + ']');

     console.log(listeMembres);

     res.end(transforme_en_tableau(listeMembres));
      
      //res.send(data);

    });



})


var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
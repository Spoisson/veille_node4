const express = require('express');
const app = express();
app.use(express.static('public'));

const transforme_en_tableau = (listeJSON) => {

  let trace = '<table>';
  let donnees = '';
  let entete = '';

  for (let elm of listeJSON){

    //trace += '<tr><th>' + p + '</th>';
    entete = '<tr>';
    donnees += '<tr>';

    for (let p in elm) { 

      entete += '<th>' + p + '</th>';
      donnees += '<td>' + elm[p] + '</td>'; 

    } 

    entete += '</tr>';
    donnees += '</tr>';

  }

  trace += entete + donnees + '</table>';
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
 //res.end('<h1>Accueil</h1>')
 res.sendFile( __dirname + "/public/html/" + "index.htm" );
})
////////////////////////////////////////////////// Route /traiter_get
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

let idDernierMembre = 0;

    let fs = require('fs');
    fs.readFile('public/data/membres.txt', 'utf8', (err, data) => {

     if (err) throw err;
     let listeMembres = JSON.parse('[' + data + ']');

     idDernierMembre = listeMembres[listeMembres.length - 1].id;

      // on utilise l'objet req.query pour récupérer les données GET
     let reponse = {
     prenom:req.query.prenom,
     nom:req.query.nom,
     telephone:req.query.telephone,
     courriel: req.query.courriel,
     id: idDernierMembre + 1
     };

     //console.log(reponse);
    //res.end(JSON.stringify(reponse));

      fs.appendFile('public/data/membres.txt', ',' + JSON.stringify(reponse), (err) => {
        if (err) throw err;
           console.log('Sauvegardé');
       });

      console.log(reponse);
      res.end(JSON.stringify(reponse));

  });

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

     console.log(listeMembres[listeMembres.length - 1].id);
     res.writeHead(200, {"Content-Type": "text/html"});
     res.write('<link rel="stylesheet" type="text/css" href="../public/css/normalize.css"><link rel="stylesheet" type="text/css" href="../css/style.css">');
     res.end(transforme_en_tableau(listeMembres));
      
      //res.send(data);

    });

 //res.sendFile( __dirname + "/public/html/" + "index.htm" );

})


var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
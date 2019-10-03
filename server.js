const express = require('express');
const app = express();

app.use(express.static('static_files'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('DB/wabc.db');



app.get('/allusers', (req, res) => {
  db.all('SELECT * FROM person', (err,rows)=>{
    console.log(rows+"1");
    const allUsernames = rows.map(e=>e.username);
    // console.log(allUsernames);
    res.send(rows);
  });
  // console.log('allUsernames is:', allUsernames);
  // res.send(allUsernames);
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.post('/users',(req, res)=>{
  console.log(req.body+"2");
  console.log(req.body.username+"3");

  db.run(
    'INSERT INTO person(username, password, email) VALUES ($username, $password, $email)',
    {
      $username : req.body.username,
      $password : req.body.password,
      $email : req.body.email
    },
    (err) =>{
      if(err){
        res.send({message : 'error in app.post("users")'});
      }
      else{
        res.send({message : 'successfully run app.post("users")'});
      }
    }
  );
});


app.post('/photoSrc',(req, res)=>{
  console.log(req.body+"4");

  db.run(
    'INSERT INTO photo(src, personId, title, description) VALUES ($src, $personId, $title, $description)',
    {
      $src : req.body.src,
      $personId : req.body.personId,
      $title : req.body.title,
      $description : req.body.description
    },
    (err) =>{
      if(err){
        res.send({message : 'error in app.post("users")'});
      }
      else{
        res.send({message : 'successfully run app.post("users")'});
      }
    }
  );
});










app.get('/username/:username', (req, res) => {
  const nameToLookup = req.params.username; // matches ':userid' above
  db.all(
    'SELECT * FROM person WHERE username = $username',
    {
      $username : nameToLookup
    },
    (err, rows)=>{
      console.log(rows+"6");
      if(rows.length > 0){
        res.send(rows[0]);
      }
      else{
        res.send({});
      }
    }
  );
});


app.get('/photoSrc/:username/:password', (req, res) => {
  const nameToLookup = req.params.username;
  const passwordToLookup = req.params.password;
  db.all(
    'SELECT photo.src AS profileName, a.username, a.email, a.src, a.title, a.description FROM (SELECT person.profileId, person.username, person.email, photo.src, photo.title, photo.description FROM person JOIN photo ON person.id = photo.personId WHERE username = $username AND password = $password ORDER BY photo.id DESC) AS a JOIN photo ON a.profileId = photo.id',
    {
      $username : nameToLookup,
      $password : passwordToLookup
    },
    (err, rows)=>{

      var l = rows.length;

      if(l >= 4){
        var p = {a:rows[0], b:rows[1], c:rows[2], d:rows[3]};
      }
      else if(l == 3){
        var p = {a:rows[0], b:rows[1], c:rows[2], d:{}};
      }
      else if(l == 2){
        var p = {a:rows[0], b:rows[1], c:{}, d:{}};
      }
      else if(l == 1){
        var p = {a:rows[0], b:{}, c:{}, d:{}};
      }
      else {
        var p = {a:{}, b:{}, c:{}, d:{}};
      }
      res.send(p);
    }
  );
});

app.get('/photoSrc', (req, res) => {

  db.all(
    'SELECT src FROM photo ORDER BY id DESC',
    {},
    (err, rows)=>{

      if(rows.length > 0){

        var p = {a:rows[0], b:rows[1], c:rows[2], d:rows[3], e:rows[4], f:rows[5]};
        res.send(p);
      }
      else{
        res.send({});
      }
    }
  );
});




app.get('/email/:email', (req, res) => {
  const emailToLookup = req.params.email;
  db.all(
    'SELECT * FROM person WHERE email = $email',
    {
      $email : emailToLookup
    },
    (err, rows)=>{
      console.log(rows+"7");
      if(rows.length > 0){
        res.send(rows[0]);
      }
      else{
        res.send({});
      }
    }
  );
});


app.get('/photo/:photo', (req, res) => {
  const photoToLookup = req.params.photo;
  db.all(
    'SELECT * FROM photo WHERE src = $photo',
    {
      $photo : photoToLookup
    },
    (err, rows)=>{
      console.log(rows+"8");
      if(rows.length > 0){
        res.send(rows[0]);
      }
      else{
        res.send({});
      }
    }
  );
});

// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});

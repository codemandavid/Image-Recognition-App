const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const Signin = require('./controllers/signin');
const Profile = require('./controllers/profile') 
const Image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'hagios',
	  database : 'smartbrain'
	}
  });
  


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res)=> {res.send(database.users);})

app.post('/signin',(req, res) => {Signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req,res) => {
	const { email, name, password} = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash :hash,
			email: email
		})
		.into ('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email : loginEmail[0],
				name : name,
				joined : new Date()	
			})
			. then(user => {
				res.json(user[0]);
			})

		})
		.then(trx.commit)
		.catch(trx.rollback)
	})

	. catch(err =>
		res.status(400).json('unable to register'))
	
})

app.get('/profile/:id',(req, res) => { Profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { Image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { Image.handleApiCall(req, res,)})





app.listen(3000, ()=> {
	console.log('app is running ');
});

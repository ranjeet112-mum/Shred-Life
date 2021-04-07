const express = require('express');
require('./../db/mongoose');
const app = express();
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const registeration = require('./../db/model/registeration');
// const feedback = require('./../db/model/feedbacks');
const enrols = require('./../db/model/enrollment');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const feedbacks = require('./../db/model/feedbacks');

const publicDirectory = path.join(__dirname,'../public');
const viewPath= path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

const port = process.env.PORT || 8000;

app.set('view engine','hbs');
app.use(bodyParser.urlencoded());
app.use(express.static(publicDirectory));
app.set('views', viewPath);
app.use(bodyParser.json());/// very important for json parsing
hbs.registerPartials(partialsPath);
app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    
}))
app.use(bodyParser.urlencoded({
    extended: true
  }));


// mongoose model



app.get('/program',(req,res) => {
    // console.log('here in program!');
    // res.send("hello program")
    res.render('program')
})
app.get('/video',(req,res) => {
    // console.log('here in program!');
    // res.send("hello program")
    res.render('video')
})
app.get('/calender',(req,res) => {
    console.log('here in program!');
    res.render("calender");
})
app.get('/enrol',(req,res) => {
    console.log(req.session.username,req.query.id)
    jwt.verify(req.cookies.authenticationToken,'qwerty',(err,decode) => {
        // console.log(err , decode);
        if(err){
            // res.render('index')
        } else if(decode) {
            // res.render('home',{user:})
            const enrol = new enrols({username:decode.username,program:req.query.id});
            
            enrol.save().then((err) => {
                res.redirect('/')
    })
        }
    })
    
})
app.get('/help',(req,res) => {
    res.render('help');
})
app.get('/feedback',(req,res) => {
    // console.log(req.query.email , req.query.feedback);
    const feedback = new feedbacks({email:req.query.email , feedback:req.query.feedback})
    feedback.save().then(() => {
        res.redirect('/');
    })
})

app.get("",(req,res)=>{    


    if(!req.cookies.authenticationToken) {
        res.render('index')
    } else {
        jwt.verify(req.cookies.authenticationToken,'qwerty',(err,decode) => {
            // console.log(err , decode);
            if(err){
                res.render('index')
            } else if(decode) {
                res.render('home',{user:decode.username})
            }
        })
    }
    
});

app.post("/register",(req,res) => {
    const user = new registeration(req.body);
    
   
    user.save().then((err)=>{
        console.log(err);

        
    }).catch((err)=>{
        res.send({
            err: 'username is not available'
        })
    }) 
    

    
});

app.get("/authenticate",(req,res)=>{
    registeration.findOne({username : req.query.username ,password: req.query.password},function(err,user) {

        if(err){
            res.statusCode(500)
        }
        if(user) {
            req.session.username = req.query.username;
            const userJson = {
                fname : user.fname,
                lname: user.lname,
                email: user.email,
                username: user.username
            }
            let token = jwt.sign(userJson,"qwerty");
            res.cookie('authenticationToken',token);
            
            
            res.redirect('/homepage')
        } else {
            res.send({
                err:'No such user found!',
            })
        }
    })
})

app.get('/logout',(req,res) =>{
    res.clearCookie('authenticationToken')
    res.redirect('/')
})

app.get("/homepage",(req,res) => {
    res.render('home',{user:req.session.username})
})

// port
app.listen(port,()=> {
    console.log('server is up at ', port);

})

//commit tesst

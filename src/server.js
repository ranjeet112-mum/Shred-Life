const express = require('express');
require('./../db/mongoose');
const app = express();
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const registeration = require('./../db/model/registeration')
const cookieParser = require('cookie-parser');


const publicDirectory = path.join(__dirname,'../public');
const viewPath= path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

const port = process.env.PORT || 4000;

app.set('view engine','hbs');
app.use(bodyParser.urlencoded())
app.use(express.static(publicDirectory))
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.set('views', viewPath);
app.use(bodyParser.json());/// very important for json parsing
hbs.registerPartials(partialsPath);
app.use(cookieParser())
app.use(express.json())

// mongoose model



// const username;
// const pass;
// routes
app.get("",(req,res)=>{    
    res.render('index')
              
              
    // if(k){
    //     console.log('welcome user');
    // };
    // console.log(req.cookies);
    
});
app.post("/register",(req,res) => {
    const user = new registeration(req.body);
    
    console.log(user);
    
    user.save().then((err)=>{
        // res.send({mes:'saved succeessfully'})
        // res.redirect('/homepage')
        // console.log('redirect called');
        console.log(err);
    }).catch((err)=>{
        // res.send({mes:'saved succeessfully'})
        // res.redirect('/homepage')
        // console.log('redirect called');
        console.log(err.keyValue);
        res.send({
            err: 'username is not available'
        })
    })

    
    // res.send(req.body)
});
app.get("/register",(req,res)=>{
    res.send('hey there ')
})

app.get("/homepage",(req,res) => {
    res.render('home')
})

app.post("/setuser",(req,res) => {
    res.cookie("username","Ranjit");
    res.redirect('/')

})

app.get("/getuser",(req,res) => {
    // res.cookie("username","Ranjit");
    // res.redirect('/')
    let k = registeration.find({name: req.cookies.username})
            //   console.log(k);
            res.json(k)

    

})

// port
app.listen(port,()=> {
    console.log('server is up at ', port);

})

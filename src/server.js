const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose')


const publicDirectory = path.join(__dirname,'../public');
const viewPath= path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

const port = process.env.PORT || 4000;

app.set('view engine','hbs');
app.use(express.static(publicDirectory))
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// mongoose model




// routes
app.get('/',(req,res)=>{    
    res.render('index')
    
});

// port
app.listen(port,()=> {
    console.log('server is up at ', port);

})

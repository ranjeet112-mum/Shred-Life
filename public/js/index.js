// const { response } = require("express");

function toggle() {
    const popup_box = document.querySelector("#invisible");
    const popup_box2 = document.querySelector("#loginvisible");
    if(popup_box2.className != "login-invisible" ) popup_box2.className = "login-invisible"

    if(popup_box.className === "signup-invisible" ) popup_box.className += " visible";
    else   popup_box.className = "signup-invisible"
}
function loggle() {
    const popup_box = document.querySelector("#loginvisible");
    const popup_box2 = document.querySelector("#invisible");
    if(popup_box2.className != "signup-invisible" ) popup_box2.className = "signup-invisible" 


    if(popup_box.className === "login-invisible" ) popup_box.className += " visible";
    else   popup_box.className = "login-invisible"
}
function cancelFromwithin() {
    const popup_box = document.querySelector("#invisible");
    popup_box.className = "signup-invisible"
    const inputs = document.querySelectorAll('.input')
    console.log(inputs);
    inputs.forEach(element => {
        element.value='';
    });
    document.querySelector('.notvalid').innerText = '';
    document.querySelector('#meswithin').innerText = '';  
}
function cancelFromlogin() {
    const popup_box = document.querySelector("#loginvisible");
    popup_box.className = "login-invisible"
    const inputs = document.querySelectorAll('.input')
    console.log(inputs);
    inputs.forEach(element => {
        element.value='';
    });
    document.querySelector('.notvalid').innerText = '';
    document.querySelector('#meswithin').innerText = '';  
}
function register(e) {
    e.preventDefault();
    
    const fname = e.target.elements.fname.value;
    const lname = e.target.elements.lname.value;
    const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.psswd.value;
    const repsswd = e.target.elements.repsswd.value;
    console.log(password,'tesT',repsswd);
    if((password === repsswd && email.includes('@',0) && email.includes('.',0))) {
        console.log('fetch');
        fetch('/register',{
            method: "POST", 
            body: JSON.stringify({ 
                fname:fname,
                lname:lname,
                email:email,
                username:username, 
                password:password
            }), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
         response.json().then(data => {
             if(data.err){
                 document.querySelector('.notvalid').innerText = '❌';
                 console.log('here');
             }
         })   
         
    })
    
    }
    else{
        document.querySelector('.meswithin').innerText = '❌ Please Fill the credentials(passwords , Email) properly';
        console.log('not fetch');
        
    }
    console.log('out fetch');
}


function authenticate(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.psswd.value;
    
    const url = `/authenticate?username=${username}&password=${password}`
    console.log(url);
        fetch(url,{redirect: 'follow'})
        .then(response => {
            
            
            if (response.redirected) {
                window.location.href = response.url;
            }

            response.json().then((data) => {
            if(data.err){
                document.querySelector('#hell').innerText = 'Wrong pair of Credential! Please try again '
                // console.log('triggered');
            }

        })
        }
)
}

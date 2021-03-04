function toggle() {
    const popup_box = document.querySelector("#invisible");
    if(popup_box.className === "signup-invisible" ) popup_box.className += " visible";
    else   popup_box.className = "signup-invisible"
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
function register(e) {
    e.preventDefault();
    // console.log(e.target.elements.fname.value);
    const fname = e.target.elements.fname.value;
    const lname = e.target.elements.lname.value;
    const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.psswd.value;
    const repsswd = e.target.elements.repsswd.value;
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
             }
         })   
         
    })
        // .then(console.log('success');)
    }
    else{
        document.querySelector('#meswithin').innerText = '❌ Please Fill the credentials(passwords , Email) properly';
        
    }
}






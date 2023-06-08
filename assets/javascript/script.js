let url = 'http://localhost:4000/login';

let loginProcess = async () => {

    //data
    let email = document.querySelector('input[name=email]');
    let password = document.querySelector('input[name=password]');
    let form = document.querySelector('.form');

    const formData = new FormData(form);
    let data = Object.fromEntries(formData);
    
    //making my request
    let request = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });

    request = await request.json();
    console.log(request);

    //saving token
    if(request.token){
        localStorage.setItem('token',request.token);
        localStorage.setItem('userName',request.userName);
        window.location.href = './index.html';
    }

    //erros
    const deleteError = (element)=>{
        if(element.parentElement.querySelector('.error')){
            element.parentElement.querySelector('.error').remove();
        }
    }

    deleteError(email);
    deleteError(password);

    if(request.email){
        setTimeout(()=>{
            let error = document.createElement('div');
            error.innerHTML = request.email.msg;
            error.style.color = 'red';
            error.style.fontSize = '17px';
            error.classList.add('error');
            email.parentElement.append(error);
           },300)
    }
    if(request.password){
        setTimeout(()=>{
            let error = document.createElement('div');
            error.innerHTML = request.password.msg;
            error.style.color = 'red';
            error.style.fontSize = '17px';
            error.classList.add('error');
            password.parentElement.append(error);
           },300)
    }
    if(request.error){
        
       setTimeout(()=>{
        let error = document.createElement('div');
        error.innerHTML = request.error;
        error.style.color = 'red';
        error.style.fontSize = '17px';
        error.classList.add('error');
        password.parentElement.append(error);
       },300)
    }

   password.addEventListener('click',()=>deleteError(password));
   email.addEventListener('click',()=>deleteError(email));
   
}



let btn = document.querySelector('button');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    loginProcess();
});


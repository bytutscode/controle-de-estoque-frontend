


let form = document.querySelector('#signupform');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const deleteError = (element)=>{
        if(element.parentElement.querySelector('.error')){
            element.parentElement.querySelector('.error').remove();
        }
    }

    let passwordMatch = form.querySelector('input[id=password2]').value === form.querySelector('input[id=password]').value;

    if(passwordMatch){
        let formData = new FormData(form);
        formData.append('token', localStorage.getItem('token'));
        let data = Object.fromEntries(formData);
        let position = data.position == '2'?'ADM':'seller';
        data.position = position;
        signUp(data);
    } else{
        setTimeout(()=>{
            let error = document.createElement('div');
            error.innerHTML = 'As senhas não são iguais!';
            error.style.color = 'red';
            error.style.fontSize = '17px';
            error.classList.add('error');
            error.classList.add('position-absolute');
            document.querySelector('#password2').parentElement.append(error);
            document.querySelector('#password2').parentElement.addEventListener('click',()=>{deleteError(error)})
           },300)
    }

   
})

async function signUp(formData) {
    let url = 'http://localhost:4000/cadastrar';
    let request = await fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    let response = await request.json();
    console.log(response)
    if (request.status === 200) {
        alertMensage('Usuário criado com sucesso!', 'success');
        document.querySelectorAll('input').forEach((e)=>{
            if(e.getAttribute('name') == 'name'){
                e.focus();
            }
            e.value='';
        });
        
    } else {
        alertMensage(response.error, 'error');
    }
};
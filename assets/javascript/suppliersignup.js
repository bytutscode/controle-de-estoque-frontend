// adding event for submit on our form
let supplierForm = document.querySelector('#supplierform');

supplierForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let form = document.querySelector('#supplierform');
    supplierRegister(form);
})


//
const supplierRegister = async (form)=>{
    let formData = new FormData(form);
    formData.append('token', localStorage.getItem('token'));
    let data = Object.fromEntries(formData);
   
    const request = await fetch(`${base}/fornecedor/cadastrar`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    let response = await request.json();

    if(request.status === 200){
        alertMensage(response.success,'success');
    } else {
        alertMensage(response.error,'error');
    }
}
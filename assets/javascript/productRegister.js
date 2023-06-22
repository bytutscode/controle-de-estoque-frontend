const productRegister = async (form) => {
    let formData = new FormData(form);
    formData.append('token', localStorage.getItem('token'));


    let data = Object.fromEntries(formData);
    
    const request = await fetch(`${base}/produtos/cadastrar`, {
        method: 'POST',
        body: formData
    });
    let response = await request.json();

    if (response.error) {
        if (typeof response.error === 'string') {
            alertMensage(response.error, 'error');
        } else {
            let erromsg = '';
            for (let i in response.error) {
                erromsg += `${response.error[i].msg} </br>`;
            }
            alertMensage(erromsg, 'error');
        }

    }
    else if (request.status === 200) {
        alertMensage('Produto adicionado com sucesso', 'success');
    } else {
        alertMensage(response.error, 'error');
    }
}

let supplierForm = document.querySelector('#productForm');

supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = document.querySelector('#productForm');
    productRegister(form);
})
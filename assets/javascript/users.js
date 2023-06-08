


const getAll = async () => {

    let token = localStorage.getItem('token');
    let request = await fetch(`http://localhost:4000?token=${encodeURIComponent(token)}`);
    if (request.status != 403) {
        request = await request.json();
        let deleteURL = `${base}/delete`;
        setItems(request,deleteURL,'users','users');
    } else {
        let response = await request.json();
        document.querySelector('body section .container').innerHTML = `<h2 class="text-light mt-3">${response.error}</h2>`;
        if(!token){
            window.location.href = './login.html';
        }
    }

}
getAll();






async function editUser(user, element) {
    let alterations = {};
    let name = element.querySelector('input[id=name]').value;
    let email = element.querySelector('input[id=email]').value;
    let select = element.querySelector('select').value;

    if (name != user.name) {
        alterations.name = name;
    }
    if (email != user.email) {
        alterations.email = email
    }
    if (select != user.position) {
        alterations.position = select;
    }

    alterations.token = localStorage.getItem('token');

    let request = await fetch(`${base}/editarusuario/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alterations)
    });
    let response = await request.json();

    if (request.status != 200) {
        alertMensage(response.error, 'error');
    } else {
        alertMensage(response.success, 'success');
    }
}















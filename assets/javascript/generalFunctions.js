const base = 'http://localhost:4000';

const hasToken = () => {
    let token = localStorage.getItem('token');

    if (!token) {
        location.href = './login.html';
    }
}
hasToken();

const logout = () => {
    localStorage.clear();
    location.href = './login.html'
}
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', logout);


const setUserName = () => {
    let userName = localStorage.getItem('userName');
    document.querySelector('#username').innerHTML = userName;
}
setUserName();

const alertMensage = (msg, type) => {
    let shower;

    const removeAlert = (shower) => {
        shower.classList.remove('show');

    }

    switch (type) {
        case 'error': shower = document.querySelector('#alerts .alert-danger');
            break;
        case 'success': shower = document.querySelector('#alerts .alert-success');
            break;
    }
    shower.querySelector('div').innerHTML = msg;
    shower.classList.add('show');

    setTimeout(() => removeAlert(shower), 4000);
}


const setItems = async (response, url, container, type) => {


    document.querySelector(`ul#${container}`).innerHTML = '';

    

    
    response.map(item => {
        //filling the model with every item's info
        let element;

        switch (type) {
            case 'users':
                element = document.querySelector('.modeluser').cloneNode(true);
                element.querySelector('#id').innerHTML = item.id;
                element.querySelector('input[id=name]').value = item.name;
                element.querySelector('input[id=email]').value = item.email;
                element.classList.remove('d-none');
                element.querySelector('select').value = item.position;
                break;

            case 'suppliers':
                element = document.querySelector('.modelsupplier').cloneNode(true);
                element.querySelector('#id').innerHTML = item.id;
                element.querySelector('input[id=name]').value = item.name;
                element.querySelector('input[id=email]').value = item.email;
                element.querySelector('input[id=tel]').value = item.phone;
                element.querySelector('input[id=products]').value = item.total_products;
                element.querySelector('input[id=uniqueproducts]').value = item.unique_products;
                element.querySelector('input[id=deliverytime]').value = item.delivery_time;
                element.querySelector('input[id=deliverytime]').value = item.delivery_time;
                element.querySelector('input[id=notes]').value = item.note;
                element.classList.remove('d-none');
                break;
        }


        // adding the item to our list of item
        document.querySelector(`ul#${container}`).append(element);


        // making the inputs editable using an event of edit and save
        element.querySelector('.edit').addEventListener('click', () => {

            if (element.querySelector('.edit').innerHTML == 'Editar') {
                element.querySelector('.edit').innerHTML = 'Salvar';
                element.querySelector('.edit').classList.remove('btn-outline-primary');
                element.querySelector('.edit').classList.add('btn-outline-success');
                let itemInfo = element.querySelectorAll('input');
                let itemInfoS = element.querySelectorAll('select');

                itemInfo.forEach(e => e.removeAttribute('disabled'));
                itemInfoS.forEach(e => e.removeAttribute('disabled'));
                itemInfo[0].focus();
            } else {
                element.querySelector('.edit').innerHTML = 'Editar';
                let itemInfo = element.querySelectorAll('input');
                let itemInfoS = element.querySelectorAll('select');
                element.querySelector('.edit').classList.add('btn-outline-primary');
                element.querySelector('.edit').classList.remove('btn-outline-success');

                itemInfo.forEach(e => e.setAttribute('disabled', true));
                itemInfoS.forEach(e => e.setAttribute('disabled', true));

               switch(type){
                case 'users':
                    editUser(item, element);
                break;
                case 'suppliers':
                    editSupplier(item,element);
                break;
               }

            }

        });

        //making the delete button work 
        element.querySelector('.delete').addEventListener('click', () => {

            document.querySelector('#areyousureLabel span').innerHTML = item.name;

            let deleteButton = document.querySelector('#areyousure button.delete');

            //deleting item from our data base
            url += `/${item.id}`
            deleteButton.addEventListener('click', () => { deleteItem(element, url) });
        })
    });

}

const search = async () => {

    let query = document.querySelector('#search input[name=search]').value;
    let url = '';
    let deleteurl ='';
    let container = '';
    let type = document.querySelector('#search input[name=search]').getAttribute('data-typeSearch');
    

    switch(type){

        case 'users':
            url = `${base}/user`;
            container = 'users';
            deleteurl = `${base}/delete`;
        break;
        case 'suppliers':
            url = `${base}/fornecedor/fornecedores`;
            container = 'suppliers';
            deleteurl = `${base}/fornecedor/deletar`;
        break;

    }

    let token = localStorage.getItem('token');
    let request = await fetch(`${url}/${query}?token=${encodeURIComponent(token)}`);
    let response = await request.json();
    console.log(response)
    if (request.status == 200) {

       

        setItems(response, deleteurl,container,type);
    } else {
        document.querySelector(`ul#${container}`).innerHTML = `<h2>${response.error}</h2>`;
    }
}
let searchForm = document.querySelector('#search');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    

    search();
});




async function deleteItem(element, url) {

    let request = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: localStorage.getItem('token') }) });
    let response = await request.json();
    console.log(response)
    if (request.status !== 200) {
        alertMensage(response.error, 'error');
    } else {
        alertMensage(response.success, 'success')
        element.remove();
    }

};
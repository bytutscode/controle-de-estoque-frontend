const base = 'http://localhost:4000';

const hasToken = () => {
    let token = localStorage.getItem('token');

    if (!token) {
        location.href = './login.html';
    }
}
hasToken();

const hasConnectionWithDB = async ()=>{
    try{
        let request = await fetch(`${base}/ping`);
    }catch(error){
        document.querySelector('body main').innerHTML = "<h1 class=\"text-danger text-center mt-5\">Não há uma conexão com banco de dados!</h1>"
    }
   
}
hasConnectionWithDB();

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
        shower.classList.add('d-none');
    }

    switch (type) {
        case 'error': shower = document.querySelector('#alerts .alert-danger');
            break;
        case 'success': shower = document.querySelector('#alerts .alert-success');
            break;
    }
    shower.querySelector('div').innerHTML = msg;
    shower.classList.remove('d-none');
    shower.classList.add('show');

    setTimeout(() => removeAlert(shower), 4000);
}


const setItems = async (response, url, container, type) => {


    document.querySelector(`ul#${container}`).innerHTML = '';

    if (type === 'products' || type === 'outofstock') {
        document.querySelector(`ul#${container}`).innerHTML = '<div class="row "></div>';
    }


    response.map(item => {
        //filling the modal with every item's info
        let element;
        
        switch (type) {
            case 'users':
                element = document.querySelector('.modaluser').cloneNode(true);
                element.querySelector('#id').innerHTML = item.id;
                element.querySelector('input[id=name]').value = item.name;
                element.querySelector('input[id=email]').value = item.email;
                element.classList.remove('d-none');
                element.querySelector('select').value = item.position;
                break;

            case 'suppliers':
                element = document.querySelector('.modalsupplier').cloneNode(true);
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

            case 'products':
                element = document.querySelector('.modalproduct').cloneNode(true);
                element.querySelector('#id').innerHTML = item.id;
                element.querySelector('input[id=name]').value = item.name;
                element.querySelector('img').setAttribute('src', item.media);
                element.querySelector('#productname').innerHTML = item.name;
                element.querySelector('input[id=description]').value = item.description;
                element.querySelector('input[id=category]').value = item.category;
                element.querySelector('input[id=supplierid]').value = item.supplier_id;
                element.querySelector('input[id=price]').value = item.price.toFixed(2);
                element.querySelector('input[id=quantity]').value = item.quantity;
                element.querySelector('input[id=minquantity]').value = item.min_quantity;
                element.querySelector('input[id=maxquantity]').value = item.max_quantity;
                element.querySelector('input[id=reorder]').value = item.reorder_quantity;
                element.querySelector('input[id=note]').value = item.note;

                element.querySelector('.collapseproduct').setAttribute('id', item.id);
                break;

            case 'outofstock':
                element = document.querySelector('.modalproduct').cloneNode(true);
                element.querySelector('#id').innerHTML = item.id;
                element.querySelector('input[id=name]').value = item.name;
                element.querySelector('img').setAttribute('src', item.media);
                element.querySelector('#productname').innerHTML = item.name;
                element.querySelector('input[id=description]').value = item.description;
                element.querySelector('input[id=category]').value = item.category;
                element.querySelector('input[id=supplierid]').value = item.supplier_id;
                element.querySelector('input[id=price]').value = item.price.toFixed(2);
                element.querySelector('input[id=quantity]').value = item.quantity;
                element.querySelector('input[id=minquantity]').value = item.min_quantity;
                element.querySelector('input[id=maxquantity]').value = item.max_quantity;
                element.querySelector('input[id=reorder]').value = item.reorder_quantity;
                element.querySelector('input[id=note]').value = item.note;
                element.querySelector('.collapseproduct').setAttribute('id', item.id);
            break;

            case 'historic':
                element = document.createElement('li');
                element.classList.add('list-group-item','alert','alert-secondary', 'mt-2');
               
                let date = new Date(item.date);
                date = date.toLocaleString();
                element.innerHTML = `<h5 class="text-primary">${item.user_name} - ${date.slice(0,17)}</h5>`;
                element.innerHTML += item.action;
            break;

            case 'sales':
                element = document.createElement('li');
                element.classList.add('list-group-item','alert','alert-secondary', 'mt-2');
               
                let dateSale = new Date(item.date);
                dateSale = dateSale.setDate(dateSale.getDate()+1);
                dateSale = new Date(dateSale);
                
                dateSale = dateSale.toLocaleString();
                element.innerHTML = `<h5 class="text-primary text-center mb-2">${dateSale.slice(0,10)}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">ID da venda: ${item.id}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">ID do vendedor: ${item.seller_id}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">ID do produto: ${item.product_id}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">Quantidade: ${item.sold_quantity}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">Preço no estoque: ${item.product_price}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">Preço vendido: ${item.sold_price}</h5>`;
                element.innerHTML += `<h5 class="text-secondary">Total da venda: R$${item.total.toFixed(2)}</h5>`;
            break;
        }


        // adding the item to our list of item
        if (type === 'products' || type === 'outofstock') {
            document.querySelector(`ul#${container} .row`).append(element);
        } else {
            document.querySelector(`ul#${container}`).append(element);
        }


        // making the inputs editable using an event of edit and save
        if(type === 'historic' || type === 'sales'){
            return;
        }

        element.querySelector('.edit').addEventListener('click', () => {
            
            if (type === 'products' || type === 'outofstock') {
                
                let details = element.querySelector('.collapseproduct').cloneNode(true);


                details.classList.remove('d-none');
                document.querySelector('#modaldetails').querySelector('.modal-body').innerHTML = '';
                document.querySelector('#modaldetails').querySelector('.modal-body').append(details);

             
            }

            else if (element.querySelector('.edit').innerHTML == 'Editar') {
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

                switch (type) {
                    case 'users':
                        editUser(item, element);
                        break;
                    case 'suppliers':
                        editSupplier(item, element);
                        break;
                }

            }

        });

        if (type === 'products' ) {

            element.querySelector('button.sell').addEventListener('click', () => {
                let infoModel = document.querySelector('#modalsell');

                let price = infoModel.querySelector('input[name=soldprice]');
                let quantity = infoModel.querySelector('input[name=quantity]');

                price.value = item.price.toFixed(2);
                quantity.value = 1;
                document.querySelector('#modalsell .confirm').setAttribute('onclick', `sellProduct(${item.id},${price.value})`);
            });

        }


        //making the delete button work 
        element.querySelector('.delete').addEventListener('click', () => {

            document.querySelector('#areyousureLabel span').innerHTML = item.name;

            let deleteButton = document.querySelector('#areyousure button.delete');

            //deleting item from our data base
            url += `/${item.id}`
            deleteButton.addEventListener('click', () => { deleteItem(element, url) });
        })
    });

    if(type === 'products' || type === 'outofstock'){

        editBtn = document.querySelector('.editproduct');
                editBtn.innerHTML = 'Editar';
                editBtn.addEventListener('click', () => {
                    console.log('lap')
                    let allInputs = document.querySelectorAll('#modaldetails input');

                    let idProduct = document.querySelector('#modaldetails .collapseproduct').getAttribute('id');

                    if(editBtn.innerHTML === 'Editar') {

                        allInputs.forEach(e => {
                            e.removeAttribute('disabled');
                        });

                        allInputs[0].focus();
                        editBtn.innerHTML = 'Salvar';
                        editBtn.setAttribute('data-bs-target',"#modaldetails");
                        editBtn.setAttribute('data-bs-toggle',"modal");

                    } else {

                        allInputs.forEach(e => {
                            e.setAttribute('disabled', true);
                        });
                        
                        editBtn.innerHTML = 'Editar';
                        editBtn.removeAttribute('data-bs-target');
                        editBtn.removeAttribute('data-bs-toggle');
                        editProduct(idProduct);
                    }
                  
                });

                // set id on sell function onclick
                
           if(type === 'products'){

            document.querySelector('button.sellproduct').addEventListener('click', () => {
                let infoModel = document.querySelector('#modalsell');
                let price = infoModel.querySelector('input[name=soldprice]');
                let quantity = infoModel.querySelector('input[name=quantity]');
                let id = document.querySelector('#modaldetails #id').innerHTML;
                console.log(id)

                price.value = document.querySelector('#modaldetails #price').value;
                quantity.value = 1;
                document.querySelector('#modalsell .confirm').setAttribute('onclick', `sellProduct(${id},${price.value})`);
            });

           }
    }

        

}

const search = async () => {

    let query = document.querySelector('#search input[name=search]').value;
    let url = '';
    let deleteurl = '';
    let container = '';
    let type = document.querySelector('#search input[name=search]').getAttribute('data-typeSearch');

    if(query === ''){
        return;
    }


    switch (type) {

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
        case 'products':
            url = `${base}/produtos/produto`;
            container = 'products';
            deleteurl = `${base}/produtos/deletar`;
        break;
        default:
            localStorage.setItem('searchQuery', query);
            location.href = './products.html'
    }

   
    let token = localStorage.getItem('token');
    let request = await fetch(`${url}/${query}?token=${encodeURIComponent(token)}`);
    let response = await request.json();
    console.log(response)
    if (request.status == 200) {
        setItems(response, deleteurl, container, type);
    } else {
        document.querySelector(`ul#${container}`).innerHTML = `<h2 class="text-light">${response.error}</h2>`;
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
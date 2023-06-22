
const getAll = async (pag) => {

    //making request and sending the necessary token

    let token = localStorage.getItem('token');
    let request = await fetch(`http://localhost:4000/produtos/${pag}?token=${encodeURIComponent(token)}`);

    //handling with the request response
    if (request.status != 403) {
        request = await request.json();


        //setting the pagination
        let pagsQuantity = Math.ceil(request.total / 12);
        let pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        window.scrollTo({
            top:0,
            left:0,
            behavior:'instant'
        });

        for(let i =1; i <= pagsQuantity; i++){
            let pagN = i;
            pagination.innerHTML += `<li class="page-item" role="button" aria-current="page">
            <span class="page-link" onclick="getAll(${pagN - 1})">${i}</span>
          </li>`;
            let allPags = pagination.querySelectorAll('li');
                allPags.forEach((l,idx)=>{
                    if((idx) === pag){
                        l.classList.add('active')
                    }
                    if(!pag){
                        allPags[0].classList.add('active')
                    }
                })
        }


        //putting a general function to set our product and providing the url to delete a product
        let deleteURL = `${base}/produtos/deletar`;
        setItems(request.products,deleteURL,'products','products');
    } else {
        let response = await request.json();

        document.querySelector('body section .container').innerHTML = `<h2 class="text-light mt-3">${response.error}</h2>`;
        if(!token){
            window.location.href = './login.html';
        }
    }

}


if(localStorage.getItem('searchQuery')){
    document.querySelector('#search input[name=search]').value = localStorage.getItem('searchQuery');
    setTimeout(search,50);
    localStorage.removeItem('searchQuery');
} else {
    getAll();
}

const sellProduct= async(id,price)=>{
    let quantity = document.querySelector('#modalsell input[name=quantity]').value;
    //making the request with the necessary params
    let request = await fetch(`${base}/produtos/vender/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('token'),price, quantity })
    });
    let response = await request.json();

    //handling with the request response
    if(request.status === 200){
        alertMensage(response.success,'success');
        document.querySelector(`.collapseproduct[id='${id}'] #quantity`).value -= quantity;
    } else {
        alertMensage(response.error, 'error');
    }
}




async function editProduct(productID) {

    // getting all alterations 
    let alterations = {};
    let modalDetails = document.querySelector('#modaldetails');
    let name = modalDetails.querySelector('input[id=name]').value;
    let description = modalDetails.querySelector('input[id=description]').value;
    let category = modalDetails.querySelector('input[id=category]').value;
    let supplier = modalDetails.querySelector('input[id=supplierid]').value;
    let price = modalDetails.querySelector('input[id=price]').value;
    let quantity = modalDetails.querySelector('input[id=quantity]').value;
    let min= modalDetails.querySelector('input[id=minquantity]').value;
    let max = modalDetails.querySelector('input[id=maxquantity]').value;
    let reorder = modalDetails.querySelector('input[id=reorder]').value;
    let note = modalDetails.querySelector('input[id=note]').value;


    // putting them into an object
    alterations.name = name;
    alterations.description = description;
    alterations.category = category;
    alterations.supplier = supplier;
    alterations.price = price;
    alterations.quantity = quantity;
    alterations.min_quantity = min;
    alterations.max_quantity = max;
    alterations.reorder_quantity = reorder;
    alterations.note = note;
    alterations.token = localStorage.getItem('token');


    //making the request to edit the selected product
    let request = await fetch(`${base}/produtos/editar/${productID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alterations)
    });
    let response = await request.json();
    // handling with the request response
    if (request.status != 200) {
        alertMensage(response.error, 'error');
    } else {
        alertMensage(response.success, 'success');
        location.reload();
    }
}



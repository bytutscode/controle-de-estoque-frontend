
const getOutStock = async () => {

    //making request and sending the necessary token

    let token = localStorage.getItem('token');
    let request = await fetch(`http://localhost:4000/produtos/acabando?token=${encodeURIComponent(token)}`);
    //handling with the request response

    if (request.status === 200) {
        request = await request.json();

        //putting a general function to set our product and providing the url to delete a product
        let deleteURL = `${base}/produtos/deletar`;
        if(request.length > 0){
            setItems(request,deleteURL,'outofstock','outofstock');
        } else {
            document.querySelector('body section .container').innerHTML = `<h2 class="text-light mt-3">${request.msg}</h2>`;
        }
        
    } else {
        let response = await request.json();

        document.querySelector('body section .container').innerHTML = `<h2 class="text-light mt-3">${response.msg}</h2>`;
        if(!token){
            window.location.href = './login.html';
        }
    }

}
getOutStock();

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

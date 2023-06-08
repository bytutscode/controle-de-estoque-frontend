const getSuppliers = async () => {
    let request = await fetch(`${base}/fornecedor/fornecedores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('token') })
    });

    if (request.status === 200) {
        let response = await request.json();
        let deleteUrl = `${base}/fornecedor/deletar`
        setItems(response, deleteUrl, 'suppliers', 'suppliers');
    }
}

getSuppliers();


async function editSupplier(Supplier, element) {
    let alterations = {};
    let name = element.querySelector('input[id=name]').value;
    let email = element.querySelector('input[id=email]').value;
    let phone = element.querySelector('input[id=tel]').value;
    let products = element.querySelector('input[id=products]').value;
    let unique = element.querySelector('input[id=uniqueproducts]').value;
    let delivery = element.querySelector('input[id=deliverytime]').value;
    let note = element.querySelector('input[id=notes]').value;



    alterations.name = name;
    alterations.email = email;
    alterations.phone = phone;
    alterations.products = products;
    alterations.unique = unique;
    alterations.delivery = delivery;
    alterations.note = note;


    alterations.token = localStorage.getItem('token');

    let request = await fetch(`${base}/fornecedor/editar/${Supplier.id}`, {
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
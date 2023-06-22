
const getAll = async () => {

    //making request and sending the necessary token

    let token = localStorage.getItem('token');
    let request = await fetch(`http://localhost:4000/historico?token=${encodeURIComponent(token)}`);

    //handling with the request response
    if (request.status != 403) {
        request = await request.json();
        //putting a general function to set our product and providing the url to delete a product
        let deleteURL = `${base}/historico/deletar`;
        setItems(request,deleteURL,'historic','historic');
    } else {
        let response = await request.json();

        document.querySelector('body section .container').innerHTML = `<h2 class="text-light mt-3">${response.error}</h2>`;
        if(!token){
            window.location.href = './login.html';
        }
    }

}
getAll();
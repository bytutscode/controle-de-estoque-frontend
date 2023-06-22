
const getAll = async (pag) => {

    //making request and sending the necessary token

    let token = localStorage.getItem('token');
    let request = await fetch(`http://localhost:4000/vendas/${pag}?token=${encodeURIComponent(token)}`);
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
        let deleteURL = `${base}/vendas/deletar`;
        setItems(request.sales,deleteURL,'sales','sales');
    } else {
        let response = await request.json();

        document.querySelector('body section .container').innerHTML = `<h2 class="text-light mt-3">${response.error}</h2>`;
        if(!token){
            window.location.href = './login.html';
        }
    }

}
getAll(0);
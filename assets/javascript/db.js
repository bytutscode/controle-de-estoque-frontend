
const getDashBoard = async ()=>{
    let request = await fetch(`${base}/dashboard?token=${encodeURIComponent(localStorage.getItem('token'))}`);
    if(request.status === 200){
        let response = await request.json();


        // filling the received info into the HTML
        document.querySelector('#sales').innerHTML = response.salesCount;
        document.querySelector('#invoicing').innerHTML = response.total.toFixed(2);
        document.querySelector('#unique').innerHTML = response.totalProducts;
        document.querySelector('#totalProducts').innerHTML = response.totalUnityAll;
        document.querySelector('#minstock').innerHTML = response.minStock;
        document.querySelector('#totalMerch').innerHTML = response.merchInMoney.toFixed(2);

        //products

        let bestSeller = document.querySelector('#bestSeller');
        let moreProfit = document.querySelector('#bestProfit');

        bestSeller.querySelector('img').setAttribute('src',response.bestSeller.media);
        bestSeller.querySelector('.productName').innerHTML = response.bestSeller.name;
        bestSeller.querySelector('.productPrice').innerHTML = response.bestSeller.price.toFixed(2);
        bestSeller.querySelector('.soldProducts').innerHTML = response.totalSalesBestSeller;
        bestSeller.querySelector('.productStock').innerHTML = response.bestSeller.quantity;
        bestSeller.querySelector('.productInvoicing').innerHTML = response.invoicingBestSeller.toFixed(2);

        moreProfit.querySelector('img').setAttribute('src',response.moreProfitable.media);
        moreProfit.querySelector('.productName').innerHTML = response.moreProfitable.name;
        moreProfit.querySelector('.productPrice').innerHTML = response.moreProfitable.price.toFixed(2);
        moreProfit.querySelector('.soldProducts').innerHTML = response.totalSalesMoreProfitable;
        moreProfit.querySelector('.productStock').innerHTML = response.moreProfitable.quantity;
        moreProfit.querySelector('.productInvoicing').innerHTML = response.higherRevenue.toFixed(2);
    }
}
getDashBoard();


getByPeriod = async (period)=>{

    let request = await fetch(`${base}/dashboard?token=${encodeURIComponent(localStorage.getItem('token'))}&period=${encodeURIComponent(period)}`);

    if(request.status === 200){
        let response = await request.json();
        // filling the received info into the HTML
        document.querySelector('#sales').innerHTML = response.salesCount;
        document.querySelector('#invoicing').innerHTML = response.total.toFixed(2);
    }
}

let select = document.querySelector('#period');
select.addEventListener('change',()=>{
    getByPeriod(select.value);
})
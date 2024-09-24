//product-1
const tpTotal = document.querySelector('#tp-total');
const tpPlusbtn = document.querySelector('#tp-plus-btn');
const tpMinusbtn = document.querySelector('#tp-minus-btn');
let tpPrice = document.querySelector('#tp-price');
let mycaTP = (Number(tpTotal?.value) || 0) * 169500;
let countTP = 1;
tpPlusbtn.addEventListener('click', function(){
    tpTotal.value = Number(tpTotal.value) + 1;
    countTP = tpTotal.value
    tpPrice.innerHTML = '$' + (Number(tpTotal.value) * 169500);
    mycaTP = Number(tpTotal.value) * 169500;
    total()
    // console.log(tpTotal.value);
})
tpMinusbtn.addEventListener('click', function(){
    if (tpTotal.value < 2) {
        alert('最低需選擇一個行程');
    }else{
        tpTotal.value = Number(tpTotal.value) - 1;
        countTP = tpTotal.value
        tpPrice.innerHTML = '$' + (Number(tpTotal.value) * 169500);
        mycaTP = Number(tpTotal.value) * 169500;
        total()
        // console.log(tpTotal.value); 
    }
    
})
//product-2  可以不加選
const ftTotal = document.querySelector('#ft-total');
const ftPlusbtn = document.querySelector('#ft-plus-btn');
const ftMinusbtn = document.querySelector('#ft-minus-btn');
let ftPrice = document.querySelector('#ft-price');
let countFT = 1;
let mycaFT = Number(ftTotal.value) * 35000;
ftPlusbtn.addEventListener('click', function(){
    ftTotal.value = Number(ftTotal.value) + 1;
    countFT = ftTotal.value
    ftPrice.innerHTML = '$' + (Number(ftTotal.value) * 35000);
    mycaFT = Number(ftTotal.value) * 35000;
    total()
})
ftMinusbtn.addEventListener('click', function(){
    if (ftTotal.value < 1) {
        return
    }
    ftTotal.value = Number(ftTotal.value) - 1;
    countFT = ftTotal.value
    ftPrice.innerHTML = '$' + (Number(ftTotal.value) * 35000);
    mycaFT = Number(ftTotal.value) * 35000;
    total()
})
//product-3  可以不加選
const acTotal = document.querySelector('#ac-total');
const acPlusbtn = document.querySelector('#ac-plus-btn');
const acMinusbtn = document.querySelector('#ac-minus-btn');
let acPrice = document.querySelector('#ac-price');
let countAC = 1;
let mycaAC = Number(acTotal.value) * 6000; 
acPlusbtn.addEventListener('click', function(){
    acTotal.value = Number(acTotal.value) + 1;
    countAC = acTotal.value
    acPrice.innerHTML = '$' + (Number(acTotal.value) * 6000);
    mycaAC = Number(acTotal.value) * 6000;
    total()
})
acMinusbtn.addEventListener('click', function(){
    
    if (acTotal.value < 1) {
        return
    }
    acTotal.value = Number(acTotal.value) - 1;
    countAC = acTotal.value
    acPrice.innerHTML = '$' + (Number(acTotal.value) * 6000);
    mycaAC = Number(acTotal.value) * 6000;
    total()
})

//小結


const deliveryFee = document.querySelector('#delivery-fee');
function total(){
    const totalAmount = document.querySelector('#total-amount');
    totalAmount.innerHTML = Number(countTP) + Number(countFT) + Number(countAC);
    const productPrice = document.querySelector('#product-price');
    const totalPrice = document.querySelector('#total-price');
    productPrice.innerHTML = `$`+(Number(mycaTP) + Number(mycaFT) + Number(mycaAC));
    totalPrice.innerHTML= `$`+(Number(mycaTP) + Number(mycaFT) + Number(mycaAC) + 60);
}

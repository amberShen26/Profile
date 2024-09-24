const customerInfo = {
    name: '',
    phone: '',
    email: '',
    fullAddress: {
        city: '',
        postCode: '',
        address: '',
    }
}
const inputName = document.querySelector('#exampleInputName');
inputName.addEventListener('input', function(){
    customerInfo.name = inputName.value
    // console.log(customerInfo);
})
const inputPhone = document.querySelector('#exampleInputPhone');
inputPhone.addEventListener('input', function(){
    customerInfo.phone = inputPhone.value
    // console.log(customerInfo);
})
const inputEmail = document.querySelector('#exampleInputEmail1');
inputEmail.addEventListener('input', function(){
    customerInfo.email = inputEmail.value
    // console.log(customerInfo);
})
const inputCity = document.querySelector('#exampleInputCity');
inputCity.addEventListener('input', function(){
    customerInfo.fullAddress.city = inputCity.value
    // console.log(customerInfo);
})
const inputPostCode = document.querySelector('#exampleInputPostCode');
inputPostCode.addEventListener('input', function(){
    customerInfo.fullAddress.postCode = inputPostCode.value
    // console.log(customerInfo);
})
const inputAddress = document.querySelector('#exampleInputAddress');
inputAddress.addEventListener('input', function(){
    customerInfo.fullAddress.address = inputAddress.value
    // console.log(customerInfo);
})
function addListeccustomer(){
    if (customerInfo.name === ''){
        alert('請填寫姓名');
        return false;
    }else if (customerInfo.phone === ''){
        alert('請填寫電話');
        return false;
    }else if (customerInfo.email === ''){
        alert('請填寫Email');
        return false;
    }else if (customerInfo.fullAddress.city === ''){
        alert('請填寫城市');
        return false;
    }else if (customerInfo.fullAddress.postCode === ''){
        alert('請填寫郵遞區號');
        return false;
    }else if (customerInfo.fullAddress.address === ''){
        alert('請填寫地址');
        return false;
    }
    return true
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', function(event){
            //先禁止默認自動跳轉 要等到符合下面條件 才會跳轉到下一頁
    event.preventDefault();
    if (addListeccustomer()){
        //將頁面跳轉到指定的連結
        window.location.href = './finishpage.html'
    }
})
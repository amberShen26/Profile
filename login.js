const signINbtn = document.querySelector('#sign-in-btn');
signINbtn.addEventListener('click', () => {
    // 如果沒有輸入帳號就點擊，跳出警告
    if (document.querySelector('#exampleInputEmail1').value === '') {
        alert('請輸入帳號');
        return;
    }
    // 如果沒有輸入密碼就點擊，跳出警告
    else if (document.querySelector('#exampleInputPassword1').value === '') {
        alert('請輸入密碼');
        return;
    }
    else{
        window.location.href = './shoppingcar.html';
    }   
})
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('.list');
const itemInput = document.querySelector('#item-input');
let editIndex = -1;
// 存進todolist的有1.事情 2.是否完成(預設為未完成)
// let todolist = [{ thing: '倒垃圾(範例)', finish: false },];
let todolist = [];
addBtn.addEventListener('click', function () {
    if (editIndex === -1) {    //如果editIndex等於-1，表示非編輯狀態，執行if下方的動作(unshift:從頭新增)
        todolist.unshift({ thing: itemInput.value, finish: false });
    } else {
        todolist[editIndex].thing = itemInput.value;
        editIndex = -1;  //恢復成預設值
    }
    // JSON.stringify()  將陣列轉換成字串
    localStorage.setItem('todolist', JSON.stringify(todolist));
    console.log(JSON.stringify(todolist));
    itemInput.value = '';
    refreshTab();
})
// 頁面載入時讀取localStorage中的todolist
window.addEventListener('load', function () {
    const storedTodolist = localStorage.getItem('todolist');
    if (storedTodolist) {
        todolist = JSON.parse(storedTodolist);
        console.log(todolist);
        refreshTab();
    }
});
function render(todolist) {
    document.querySelector('.list').innerHTML = '';
    todolist.forEach((item, index) => {        //item.finish的值如果是true，則class為finished，否則為notyet
        list.innerHTML += `<li class="item" ` + (item.finish ? 'finished' : 'notyet') + `>
                            <label class="checkbox">                                             
                                <input data-index="${index}" type="checkbox" class="done-input" ` + (item.finish ? 'checked' : '') + `>
                                <span class="content">${item.thing}</span>
                            </label>
                            <button type="button" class="edit-btn" title="編輯項目" aria-label="編輯項目按鈕" data-index="${index}">X</button>
                            <button type="button" class="delete-btn" title="刪除項目" aria-label="刪除項目按鈕" data-index="${index}">X</button>
                        </li>`;                       //item.finish ? 'checked' : '' finish為true時，則為checked，否則為''(預設為false)
    });
    countthings();
}
// 初始渲染
render(todolist);
// 計算待完成
function countthings() {
    //用filter篩選出item.finish為false的事項
    const count = todolist.filter(item=> !item.finish).length;
    document.querySelector('#show-count').innerHTML = `${count}個待完成項目`;
}
// 刪除
list.addEventListener('click', function (e) {
    const target = e.target;  //找到被點擊的元素(要編輯、刪除、完成/未完成)
    if (target.classList.contains('delete-btn')) {
        // 先將被點擊元素的內容取出來
        const content = target.parentNode.querySelector('.content').innerText;
        // 強制回到tab全部
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[0].classList.add('active');
        // 刷新畫面
        refreshTab();
        deltBtn(content);         
    }
})
function deltBtn(content){
    // 在全部tab情況下，用filter篩選出被點擊的內容所在的index
    const index = todolist.findIndex(item => item.thing === content);
    todolist.splice(index, 1);
    render(todolist);
    localStorage.setItem('todolist', JSON.stringify(todolist));   
}
// 清空
const clearAllbtn = document.querySelector('#clear-all-btn');
clearAllbtn.addEventListener('click', function () {
    list.innerHTML = '';   //將畫面清空
    todolist.splice(0, todolist.length);  //待處理陣列清空
    // 第二個清空方法: todolist.length = 0;
    // 第三個清空方法: 假設一開始用let來宣告todolist，這時候可以直接todolist = [];
    render(todolist);
    localStorage.setItem('todolist', JSON.stringify(todolist));
});

// 編輯
list.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('edit-btn')) {
        // 這邊抓事項的值出來(如果在這邊先抓出來，那假設在tab為待處理的時候，data-index為1，
        // 但是在全部tab時，data-index可能為3，此時進行更新後，todolist[editIndex]會去抓取todolist[1]的事項並進行更新
        // 但是真正需要更新的事項其實是在todolist[3]，這時就會修改到錯誤的事項
        const content = target.parentNode.querySelector('.content').innerText;
        itemInput.value = content;
        // 強制讓tab回到全部(這樣才可以顯示全部的todolist，此時的data-index會是完整的)
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[0].classList.add('active');
        // 要先回到全部的tab，這時候的data-index會是以全部的事項下去排0,1,2... ，這樣去抓資料才會是抓到正確的事項
        // 刷新tab
        refreshTab();
        // 找到完整的todolist並用filter篩選出該事項
        const newindex = todolist.findIndex(item => item.thing === content);
        editIndex = newindex;
    }
})

// 被標示成已完成or 未完成
list.addEventListener('click', function (e) {
    const target = e.target;  //找到被點擊的元素(要編輯、刪除、完成/未完成)
    if (target.classList.contains('done-input')) { 
        const index = target.dataset.index;
        const item = todolist[index];
        item.finish = target.checked;
        localStorage.setItem('todolist', JSON.stringify(todolist));
        // 現在假設在待完成tab中，只要該事項被勾選就會顯示在已完成tab，會自動從待完成tab刪除，不用等人為切換tab才會刷新畫面
        refreshTab();
    }
})

// 篩選
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
    tab.addEventListener('click', function (e) {
        // 先把active標籤刪除(因為不知道在哪個tab，所以全部run一次)
        tabs.forEach(tab => tab.classList.remove('active'));
        // 被點擊的tab加上active標籤
        e.target.classList.add('active');
        if (e.target.innerText === '待完成') {
            // todolist用filter篩選出finish為false的事項
            render(todolist.filter(item => !item.finish));
        } else if (e.target.innerText === '已完成') {
            render(todolist.filter(item => item.finish));
        } else {
            render(todolist);
        }
    });
});
// 判斷目前在哪個tab，此時不用切換tab，找到active標籤的內容就可以了
function refreshTab() {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab.innerText === '待完成') {
        render(todolist.filter(item => !item.finish));
    } else if (activeTab.innerText === '已完成') {
        render(todolist.filter(item => item.finish));
    } else {
        render(todolist);
    }
}
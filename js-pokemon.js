function getData(guessWho){
    const url = `https://pokeapi.co/api/v2/pokemon/${guessWho}`
    fetch(url)
        .then (response => response.json())
        .then(data => {
            // console.log(data)
            render(data)
        })
        .catch(error => alert('請輸入正確的編號或英文名稱'))
}
const searchInput = document.querySelector('.search-input')  //輸入框
const searchBtn = document.querySelector('#search-btn')   
//picture
const pokemonImg = document.querySelector('#pokemon-img')
//pokemon id and name
const pokemonWho = document.querySelector('#pokemon-name')
function render(data){
                                           //toUpperCase() 轉大寫                slice(1) 去掉index[1] 第一個字
    pokemonWho.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    if (data.sprites.front_shiny !== null) {
        pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`
    } else if(data.sprites.back_shiny !== null) {
        pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${data.id}.png`
    }else if(data.sprites.front_default !== null) {
        pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    }else{
        pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`
      }
}

searchBtn.addEventListener('click', function(){
    const guessWho = searchInput.value
    if(guessWho === '' || guessWho > 1025){
        alert('請輸入正確的編號或英文名稱')
    }
    else{
        getData(guessWho)
    }
    searchInput.value = ''
})
// getData(25)  //raichu 測試  kleavor



let elBookList = document.querySelector('.book__list') 
let elImg = document.querySelector('.img')
let elName = document.querySelector('.name')
let elPrice = document.querySelector('.price')
function fnPost(e){
    e.preventDefault()

    let book = {
        name: e.target.name.value,
        img: e.target.img.value,
        price: e.target.price.value,
    }
    fetch('https://65b0c61ed16d31d11bdd370b.mockapi.io/books', {
        method:'POST',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(book)
    })
    .then(res=> res.json())
    .then(data=> console.log(data))
    
}
  fnGet()
   function fnGet(){
    fetch('https://65b0c61ed16d31d11bdd370b.mockapi.io/books')
    .then(res=> res.json())
    .then(data=> {
      window.localStorage.setItem('data', JSON.stringify(data))  
      fnRender(data)
    } )
   }

    function fnRender(data){
        elBookList.innerHTML = ''
      data.map((item)=> {
          let newLi = document.createElement('li')
          newLi.innerHTML = `
          <div class="card" style="width: 18rem;">
    <img src="${item.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text"></p>
      <a href="#" class="btn btn-primary">${item.price}</a>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fnSetId(${item.id})" class="btn btn-info"><i class="bi bi-pen"></i><button>
      <button onclick="fnDelete(${item.id})" class="btn btn-danger"><i class="bi bi-trash"></i><button>
      </div>
  </div>
          `
        elBookList.appendChild(newLi)
    })
}
function fnSetId(id){
    console.log(id);
    window.localStorage.setItem('id', id)
    let locData = JSON.parse(window.localStorage.getItem('data'))
    let item = locData.find(i=> i.id == id);
    elImg.value = item.img
    elName.value = item.name
    elPrice.value = item.price

}

    function fnDelete(id){
        console.log(id);
        fetch(`https://65b0c61ed16d31d11bdd370b.mockapi.io/books/${id}`, {
            method:'DELETE',
            headers:{'content-type': 'application/json'},
           
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
        .then(()=> fnGet())
    
    }
    

    function fnUpdate(e){
        e.preventDefault()
            let book = {
                name: e.target.name.value,
                img: e.target.img.value,
                price: e.target.price.value,
            }

            fetch(`https://65b0c61ed16d31d11bdd370b.mockapi.io/books/${window.localStorage.getItem('id')}`, {
                method:'PUt',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(book)
            })
            .then(res=> res.json())
            .then(data=> console.log(data))
            
            .then(()=> fnGet())
            
    }
let productos = [
    {
        id: 1,
        img: "img/naruto.jpg",
        nombre: "Naruto",
        precio: 600,


    },
    {
        id: 2,
        img: "img/csm.png",
        nombre: "Chainsaw man",
        precio: 400,


    },
    {
        id: 3,
        img: "img/Gantzvol1.jpg",
        nombre: "Gantz",
        precio: 550,



    },
    {
        id: 4,
        img: `img/kk.jpg`,
        nombre: "Kingdom",
        precio: 500,


    },
    {
        id: 5,
        img: `img/sola.jpg`,
        nombre: "Solanin",
        precio: 450,


    },
    {
        id: 6,
        img: `img/pluto.jpg`,
        nombre: "Pluto",
        precio: 700,


    },
    {
        id: 7,
        img: `img/Volume_01.jpg`,
        nombre: "Tokyo ghoul",
        precio: 499,


    },
    {
        id: 8,
        img: `img/monster.jpg`,
        nombre: "Monster",
        precio: 500,


    },
]

const contenidoDelCarrito = document.querySelector(`#carrito`)



$(document).ready(() => {


    let html = ""
    for (const producto of productos) {
        html += `<div class="card">
            <img class="mangasImg" src="${producto.img}">
            <p class="tituloManga">${producto.nombre}</p>
            <p class="precioManga">$ ${producto.precio}</p>
            <button id="${producto.id}" class="agregarACarrito">Agregar a carrito</button>
        
        
        </div>`
        $(`#container`).html(html)


    }




    //Agregar carrito
    $(`.agregarACarrito`).click((event) => {
        const boton = event.target;
        const data = boton.closest(`.card`)

        const tituloManga = data.querySelector(`.tituloManga`).textContent
        const precioManga = data.querySelector(`.precioManga`).textContent
        

        añadirACarrito(tituloManga, precioManga)
       
   
        let productosArray=JSON.parse(localStorage.getItem(`productosArray`)) || []
        productosArray.push(tituloManga)
        //convierto array en json
        let productosArrayJSON=JSON.stringify(productosArray)
        //guardo json
        localStorage.setItem(`productosArray`,productosArrayJSON)
    

        //mostrar productos
        document.addEventListener(`DOMContentLoaded`,(event)=>{
            let productosObjArray=JSON.parse(localStorage.getItem(`productosArray`))
            productosObjArray.forEach(function(arrayElement){
                añadirACarrito(arrayElement)
            })
        })
    
       
    

    })

  


    // if (localStorage.getItem(`carrito`)) {
    //     carrito = JSON.parse(localStorage.getItem(`carrito`))
    //     añadirACarrito(tituloManga, precioManga)
    // }



})

const añadirACarrito = (tituloManga, precioManga, imagenManga) => {

    //Aumentar cantidad y que no se repita el producto

    const tituloItem = document.getElementsByClassName(`shoppingCartItemTitle`)
    for (let i = 0; i < tituloItem.length; i++) {
        if (tituloItem[i].innerText === tituloManga) {
            let elementoCantidad = tituloItem[i].parentElement.parentElement.parentElement.querySelector(
                `.shoppingCartItemQuantity`)
            elementoCantidad.value++
            carritoTotalPrecio()

            return;

        }

    }

    $(`#carrito`).append(`
 
    <div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
         
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${tituloManga}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${precioManga}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
    </div>
  `)

    // localStorage.setItem(`carrito`, JSON.stringify(carrito))
    


    
    //Sacar del carrito 
    $(`.buttonDelete`).click((event) => {

        const click = event.target;
        click.closest(`.shoppingCartItem`).remove()
        carritoTotalPrecio()
    })
    //Aumentar productos 
    $(`.shoppingCartItemQuantity`).change((event) => {
        const cantidad = event.target
        if (cantidad.value <= 0) {
            cantidad.value = 1;
        }
        carritoTotalPrecio()
    })

    carritoTotalPrecio()
   


}

//Funcion carrito
function carritoTotalPrecio() {
    let total = 0
    const shoppingCartTotal = document.querySelector(`.precioTotal`)
    const shoppingCartItem = document.querySelectorAll(`.shoppingCartItem`)
    shoppingCartItem.forEach(element => {
        const precioShoppingCart = element.querySelector(`.shoppingCartItemPrice`)

        const textPrecio = Number(precioShoppingCart.textContent.replace(`$`, ``))
        const cantidadShoppingCar = document.querySelector(`.shoppingCartItemQuantity`);
        const textCantidad = Number(cantidadShoppingCar.value)

        total = total + textPrecio * textCantidad;

    })
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`

   

}

//Boton comprar

$(`.botonCarritoTotal`).click(() => {
    contenidoDelCarrito.innerHTML = ""
    carritoTotalPrecio()


})




//footer


$(".footer").append(`<footer class="footer">
<div class="nombreFooter">
    <p>Venta Mangas</p>


</div>

<div class="infoFooter">
    <p>Gracias por visitarnos</p>


</div>`)
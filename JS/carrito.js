const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) =>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌ </span>
     `;
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () =>  {
            if(product.cantidad !== 1){
            product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () =>  {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", ()=> {
            eliminarProducto(product.id);
        });



        // let eliminar = document.createElement("span");
        // eliminar.innerText = "❌";
        // eliminar.className = "delete-product";
        // carritoContent.append(eliminar);

        // eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + (parseFloat(el.precio * el.cantidad) || 0), 0);

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: ${total} $
    <button id=compra> Comprar </button>`;
    modalContainer.append(totalBuying);
    document.getElementById("compra").addEventListener("click", function() {
        Swal.fire({
            title: "Muchas Gracias!",
            text: "Su compra fue realizada con exito!",
            icon: "success",
            confirmButtonText: "Entendido"
          });
    })
};


verCarrito.addEventListener("click", pintarCarrito);

/** ELIMINAR PRODUCTO */

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

/** CONTADOR DEL CARRITO */

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length

    localStorage.setItem("carritoLenght", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem(carritoLength));
};

carritoCounter();
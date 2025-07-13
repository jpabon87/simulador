// PRODUCTOS

//alert("¡Este es un mensaje de alerta!");

const accionesProductos = [
    //Colombia
    {
        id: "ecopetrol",
        titulo: "Ecopetrol",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Colombia",
            id:"colombia"
        },
        precio:1000
    },
    {
        id: "exito",
        titulo: "Exito",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Colombia",
            id:"colombia"
        },
        precio:1000
    },
     {
        id: "grupoargos",
        titulo: "GrupoArgos",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Colombia",
            id:"colombia"
        },
        precio:1000
    },
     {
        id: "terpel",
        titulo: "Terpel",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Colombia",
            id:"colombia"
        },
        precio:1000
    },
    //Global
    {
        id: "uber",
        titulo: "Uber",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Global",
            id:"global"
        },
        precio:1200
    },
     {
        id: "apple",
        titulo: "Apple",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Global",
            id:"global"
        },
        precio:1200
    },
     {
        id: "nike",
        titulo: "Nike",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Global",
            id:"global"
        },
        precio:1200
    },
     {
        id: "nubank",
        titulo: "Nubank",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"Global",
            id:"global"
        },
        precio:1200
    },

    //ETF
     {
        id: "sharesbitcoin",
        titulo: "SharesBitcoin",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"ETF",
            id:"etf"
        },
        precio:5000
    },
    {
        id: "icolcap",
        titulo: "Icolcap",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"ETF",
            id:"etf"
        },
        precio:10000
    },
    {
        id: "vanguard",
        titulo: "Vanguard",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"ETF",
            id:"etf"
        },
        precio:2500
    },
    {
        id: "goldetc",
        titulo: "GoldETC",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"ETF",
            id:"etf"
        },
        precio:2000
    },
    {
        id: "coresyp500",
        titulo: "CoreS&P500",
        imagen: "https://saaeuecpprdpecp.blob.core.windows.net/web/esp/manual-de-identidad/images/imggrupo.png",
        categoria:{
            nombre:"ETF",
            id:"etf"
        },
        precio:3400
    },
];


const contenedorAcciones = document.querySelector("#contenedor-acciones-id");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector('#titulo-principal');
const numeritoElement = document.querySelector("#numerito"); 

function cargarProductos(productosElegidos){
    contenedorAcciones.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                <img class="accion-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="acciones-detalles">
                    <h3 class="accion-titulo">${producto.titulo}</h3>
                    <p class="accion-precio">${producto.precio}</p>
                    <button class="accion-agregar" id="${producto.id}">Agregar</button>
                </div>
        `;
        contenedorAcciones.append(div);
    })

   
    actualizarBotonesAgregar();
}


cargarProductos(accionesProductos);


botonesCategorias.forEach (boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const idBoton = e.currentTarget.id;

        if (idBoton !== "todos"){
            const productosFiltrados = accionesProductos.filter(producto => producto.categoria.id === idBoton);
            tituloPrincipal.innerText = e.currentTarget.textContent.trim();
            cargarProductos(productosFiltrados); 
        } else {
            tituloPrincipal.innerText = "Todas las acciones";
            cargarProductos(accionesProductos); 
        }
    });
});


function actualizarBotonesAgregar(){
    const accionAgregarBotones = document.querySelectorAll(".accion-agregar");

    accionAgregarBotones.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


const productosEnCarrito = []; 


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;

    const productoAgregado = accionesProductos.find(producto => producto.id === idBoton);

    if (!productoAgregado) {
        console.error("Error: Producto con ID", idBoton, "no encontrado en accionesProductos.");
        return; 
    }

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito(); 
}


function actualizarNumerito(){
    let totalCantidad = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0 );
    
    if (numeritoElement) { 
        numeritoElement.innerText = totalCantidad;
    }
}
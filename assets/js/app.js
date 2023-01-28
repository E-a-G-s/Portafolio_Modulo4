/*--Definimos nuestras constantes---*/
//En items mostramos nuestras cards
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
//aca ingreso a los datos de micard
const templateCard = document.getElementById("templateCard").content;
const templateFooter = document.getElementById("templateFooter").content;
const templateCarrito = document.getElementById("templateCarrito").content;
const fragment = document.createDocumentFragment();

let carrito = {};

//Se ejecuta la info del fetch
document.addEventListener("DOMContentLoaded", () => {
  fetchApi();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    getCarrito();
  }
});
/* aca detectamos el click que le haremos al boton  */
cards.addEventListener("click", (event) => {
  addCarrito(event);
});

items.addEventListener("click", (event) => {
  buttons(event);
});

//Hacemos llamado a mi api propia de productos
const fetchApi = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    // console.log(data);
    mostrarCards(data);
  } catch (err) {
    // console.log("Error en llamado a Api", err);
  }
};

/*--Funcion para mostrar mis card---*/
const mostrarCards = (data) => {
  // console.log(data);
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.name;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard.querySelector("img").setAttribute("src", producto.img);
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

/*--Funcion para obtener el elemento del boton---*/
//El addCarrito es el evento del boton
const addCarrito = (event) => {
  //console.log(event.target);
  /*Consulto si contiene el elemento que hago click con true o false*/
  if (event.target.classList.contains("btn-dark")) {
    //Aca accedo al div del card
    setCarrito(event.target.parentElement);
  }
  //Nos sirve para detener otro evento que se haga en nuestro item donde estan las card
  event.stopPropagation();
};

/* Funcion para manipular nuestro objeto */
const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    name: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
    descuento: 10000,
  };

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };

  //console.log(producto);
  getCarrito();
};

/* Funcion Para mostrar los datos seleccionado de las card en el carrito*/
//items se deja vacio para que no se repita
const getCarrito = () => {
  Object.values(carrito).forEach((producto) => {
    items.innerHTML = "";
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelector(".titulo").textContent = producto.name;
    templateCarrito.querySelector(".cantidad").textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-dark ").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-light ").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-success ").dataset.id = producto.id;

    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  getfooter();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

/* Modificamos nuestro total de venta, se reinicia para que no se sobre escriba */
const getfooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = ` <th scope="row" colspan="5"><h3> Carrito vacío ! </h3> </th>`;
    return;
  }
  //Sumando las cantidades de los productos y sumar totales
  const nCantidad = Object.values(carrito).reduce(
    (acu, { cantidad }) => acu + cantidad,
    0
  );
  const precio = Object.values(carrito).reduce(
    (acu, { cantidad, precio }) => acu + cantidad * precio,
    0
  );

  templateFooter.querySelector(".cantidadFooter").textContent = nCantidad;
  templateFooter.querySelector(".totalFooter").textContent = precio;
  document.querySelector("#cantidad-productos").innerText = nCantidad;
  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  /* Boton Vaciar el carrito */
  const btnVaciar = document.getElementById("vaciarCarrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    getCarrito();
  });
};

const buttons = (event) => {
  if (event.target.classList.contains("btn-dark")) {
    const producto = carrito[event.target.dataset.id];

    producto.cantidad++;
    carrito[event.target.dataset.id] = { ...producto };
    getCarrito();
  }
  if (event.target.classList.contains("btn-light")) {
    const producto = carrito[event.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) delete carrito[event.target.dataset.id];
    getCarrito();
  }
  if (event.target.classList.contains("btn-success")) {
    const producto = carrito[event.target.dataset.id];

    producto.precio - 10;

    getCarrito();
  }

  event.stopPropagation();
};

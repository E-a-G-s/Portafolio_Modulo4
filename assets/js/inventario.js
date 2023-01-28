let productosStorage = JSON.parse(localStorage.getItem("productos")) || [];

class Producto {
  constructor(
    id,
    nombre = "",
    descripcion = "Sin descripción",
    precio = 999999,
    stock = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
  }

  getProducts() {
    productosStorage = productosStorage =
      JSON.parse(localStorage.getItem("productos")) || [];
    return productosStorage;
  }
  getProduct() {
    productosStorage = JSON.parse(localStorage.getItem("productos")) || [];
    return productosStorage.find((producto) => producto.id == this.id);
  }
  deleteProduct() {
    productosStorage = JSON.parse(localStorage.getItem("productos")) || [];
    productosStorage = productosStorage.filter(
      (producto) => producto.id != this.id
    );
    localStorage.setItem("productos", JSON.stringify(productosStorage));
    return productosStorage;
  }
  updateProduct() {
    productosStorage = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = productosStorage.find((producto) => producto.id == this.id);
    producto.nombre = this.nombre;
    producto.descripcion = this.descripcion;
    producto.precio = this.precio;
    producto.stock = this.stock;
    localStorage.setItem("productos", JSON.stringify(productosStorage));
    return producto;
  }
  addProduct() {
    productosStorage = JSON.parse(localStorage.getItem("productos")) || [];
    productosStorage.push({
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock,
    });
    localStorage.setItem("productos", JSON.stringify(productosStorage));
    return productosStorage;
  }
}

function cargarTabla(listaProductos) {
  let cuerpoTabla = document.querySelector(
    ".section_mantenedor_productos tbody"
  );
  cuerpoTabla.innerHTML = "";

  let acumuladorFilas = "";
  listaProductos.forEach((producto) => {
    acumuladorFilas += `
                <tr>
                    <th scope="row" id="idTh">${producto.id}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                  
               
                </tr>
        `;
  });
  cuerpoTabla.innerHTML = acumuladorFilas;
}

function buscarProducto(id) {
  let producto = new Producto(id);
  return producto.getProduct();
}

crud_form.addEventListener("submit", (event) => {
  event.preventDefault();
});

//funcion que capture evento del input crud_id

let inputId = document.getElementById("crud_id");
inputId.addEventListener("change", (event) => {
  event.preventDefault();
  let id = inputId.value;
  let producto = buscarProducto(id);
  if (producto) {
    crud_nombre.value = producto.nombre;
    crud_descripcion.value = producto.descripcion;
    crud_precio.value = producto.precio;
    crud_stock.value = producto.stock;
  } else {
    crud_nombre.value = "";
    crud_descripcion.value = "";
    crud_precio.value = 0;
    crud_stock.value = 0;
  }
});

//AGREGAR PRODUCTOS
document.getElementById("btn-agregar").addEventListener("click", (event) => {
  event.preventDefault();
  let id = crud_id.value;
  let nombre = crud_nombre.value;
  let descripcion = crud_descripcion.value;
  let precio = crud_precio.value;
  let stock = crud_stock.value;

  let nuevoProducto = new Producto(id, nombre, descripcion, precio, stock);
  if (nuevoProducto.getProduct()) {
    Swal.fire({
      icon: "error",
      title: "Ya existe un producto con dicho ID",
      text: "Ingrese un ID distinto",
    });
  } else {
    nuevoProducto.addProduct();
    cargarTabla(nuevoProducto.getProducts());

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Productos Agregado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    crud_id.value = "";
    crud_nombre.value = "";
    crud_descripcion.value = "";
    crud_precio.value = "";
    crud_stock.value = "";
  }
});

//ELIMINAR PRODUCTOS
document.getElementById("btn-eliminar").addEventListener("click", (event) => {
  event.preventDefault();
  let id = crud_id.value;

  let producto = new Producto(id);
  if (producto.getProduct()) {
    Swal.fire({
      title: "Está seguro que quiere eliminar el producto?",
      text: "ID :" + producto.id,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        producto.deleteProduct();
        cargarTabla(producto.getProducts());
        Swal.fire("Eliminado!", "Producto eliminado correctamente", "success");

        crud_id.value = "";
        crud_nombre.value = "";
        crud_descripcion.value = "";
        crud_precio.value = "";
        crud_stock.value = "";
      }
    });

    /*  if (respuesta) {
      producto.deleteProduct();
      cargarTabla(producto.getProducts());
    } */
  } else {
    Swal.fire({
      icon: "warning",
      title: "El producto que intenta eliminar no existe",
    });
  }
});

//MODIFICAR PRODUCTOS

document.getElementById("btn-modificar").addEventListener("click", (event) => {
  console.log("hola");
  event.preventDefault();
  let id = crud_id.value;
  let nombre = crud_nombre.value;
  let descripcion = crud_descripcion.value;
  let precio = crud_precio.value;
  let stock = crud_stock.value;

  let producto = new Producto(id, nombre, descripcion, precio, stock);
  if (producto.getProduct()) {
    producto.updateProduct();
    cargarTabla(producto.getProducts());
  } else {
    Swal.fire({
      icon: "warning",
      title: "El producto que intenta modificar no existe",
    });
  }
});

function main() {
  let productosStorage = JSON.parse(localStorage.getItem("productos"));
  if (!productosStorage) {
    productosStorage = productos;
    localStorage.setItem("productos", JSON.stringify(productosStorage));
  }

  cargarTabla(productosStorage);
}

main();

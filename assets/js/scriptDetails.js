const producto = document.getElementById("producto");
const query = new URLSearchParams(window.location.search);
const params = query.get("name");
console.log(params);

//Se ejecuta la info del fetch
document.addEventListener("DOMContentLoaded", () => {
  fetchApi();
});

//Hacemos llamado a mi api propia de productos
const fetchApi = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    const filtroData = data.filter((producto) => producto.name === params);

    detailsCard(filtroData);
  } catch (err) {
    console.log("Error en llamado a Api", err);
  }
};

const detailsCard = (data) => {
  const result = data.some((el) => el.seccion === "maquina");
  if (result) {
    let elementos = "";
    data.forEach((producto) => {
      elementos += `
    <div class="row mt-5 mb-5">
    <article class="card col-4 m-auto" style="width: 30rem";>
    <img src="${producto.img2}" alt="${producto.name}" class="imgHover" >
    <div class="card-content text-center">
    <center> <h2>${producto.titulo}</h2></center> 
   
      <p>
        <b>Peso: ${producto.peso}</b>
      </p>
      <p>
        <b>Color: ${producto.color}</b>
      </p>
      <p>
        <b>Fabricacion: ${producto.fabricacion}</b>
      </p>
      <spam><u>Detalles</u></spam>
      <p>${producto.informacion}</p>
     
      <p>Precio: ${producto.precio}</p>
      
      <div class="mb-5">
      <a type="button" class="btn btn-info" href="./comprar.html">Comprar</a>
      </div>
    
    </div>
  </article>
    </div>
  
  `;
    });
    producto.innerHTML = elementos;
  } else {
    let elementos = "";
    data.forEach((producto) => {
      elementos += `
    <div class="row mt-5 mb-5">
    <article class="card col-4 m-auto" style="width: 30rem";>
    <img src="${producto.img2}" alt="${producto.name}" class="imgHover" >
    <div class="card-content text-center">
    <center> <h2>${producto.titulo}</h2></center> 
    <hr class="text-black" />
           <p>
        <b>Marca: ${producto.marca}</b>
      </p>
      <p>
        <b>Material: ${producto.material}</b>
      </p>
      <spam><u>Detalles</u></spam>
      <p>${producto.informacion}</p>
   
      <p>Precio: ${producto.precio}</p>
      <div class="mb-5">
      <a type="button" class="btn btn-info" href="./comprar.html">Comprar</a>
      </div>
    
 
    </div>
  </article>
    </div>
 

  `;
    });
    producto.innerHTML = elementos;
  }
};

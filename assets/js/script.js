/* Script para direccionar los Link del nav */
$(document).ready(function () {
  let iraLink = $(".desplazar");

  iraLink.click(function (event) {
    event.preventDefault();
    $("body, html").animate(
      {
        scrollTop: $(this.hash).offset().top,
      },
      1500
    );
  });
});

//Se ejecuta la info del fetch
document.addEventListener("DOMContentLoaded", () => {
  fetchApi();
});

//Hacemos llamado a mi api propia de productos
const fetchApi = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    // console.log(data);
    mostrarCardsMaquina(data);
    mostrarCardsTintas(data);
  } catch (err) {
    console.log("Error en llamado a Api", err);
  }
};

const mostrarCardsMaquina = (data) => {
  let acumulador = "";
  const result = data.filter((el) => el.id < 4);

  result.forEach((product) => {
    let template = ` 
      
      <div class="card cardMaquina " style="width: 15rem">
      <img
        src="${product.img}"
        class="card-img-top imgMaquina"
        alt="..."
      />
      <div class="card-body ">
        <h5 class="card-title text-center">
          ${product.titulo}
        </h5>
        <hr />
        <p class="text-center">${product.precio}</p>
        <br />
        <a
        href="./detailsCards.html?name=${product.name}"
   
       
          class="btn btn-dark  "
        
          >Detalles</a
        >
        <a type="button" class="btn btn-info" href="./comprar.html">Comprar</a>
      </div>
    </div>
      
      `;
    acumulador += template;
  });
  document.querySelector(".sectionCardsMaquina").innerHTML = acumulador;
};

const mostrarCardsTintas = (data) => {
  let acumulador = "";
  const result = data.filter((el) => el.id > 3);

  result.forEach((product) => {
    let template = ` 
      
    <div class="card cardMaquina " style="width: 15rem">
    <img
      src="${product.img}"
      class="card-img-top imgMaquina"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title text-center">
        ${product.titulo}
      </h5>
      <hr />
      <p class="text-center">${product.precio}</p>
      <br />
      <a
        href="./detailsCards.html?name=${product.name}"
      
        
        class="btn btn-dark  "            
        >Detalles</a
      >
      <a type="button" class="btn btn-info" href="./comprar.html">Comprar</a>
    </div>
  </div>
      
      `;
    acumulador += template;
  });
  document.querySelector(".sectionCardsTintas").innerHTML = acumulador;
};

/* document.querySelector(".sectionCardsTintas .btn-dark"); */

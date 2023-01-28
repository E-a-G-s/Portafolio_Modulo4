const usuarios = [
  {
    nombre: "user",
    password: "123456",
  },
];

const ingreso = () => {
  const user1 = document.getElementById("user").value;
  const password1 = document.getElementById("password").value;

  usuarios.forEach((user) => {
    window.location = "../../inventario.html";
    if (user1 === user.nombre && password1 === user.password) {
      alert("Usuario Correcto");
    } else {
      alert(" Usuario Incorrecto!");
    }
  });
};

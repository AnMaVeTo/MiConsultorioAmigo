const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usernameValue = username.value;
  const passwordValue = password.value;

  fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log(data.usuario);
        localStorage.setItem("username", data.usuario.username);
        localStorage.setItem("idMedico", data.usuario.idMedico);
        console.log(data);
        localStorage.setItem("rol", data.rol.nombre);
        if (data.rol.nombre === "Administrador") {
          window.location.href = "/admin/index.html";
        } else if (data.rol.nombre === "Secretaria") {
          window.location.href = "/secretaria/index.html";
        } else if (data.rol.nombre === "Medico") {
          window.location.href = "/medico/index.html";
        }
      } else {
        errorMessage.textContent = data.message;
        errorMessage.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const userRole = localStorage.rol;
if (userRole === undefined) {
  window.location.href = "/login.html";
} else if (userRole === "Medico") {
  window.location.href = "/medico/index.html";
} else if (userRole === "Secretaria") {
  window.location.href = "/secretaria/index.html";
}

document.querySelector("#logout-tab").addEventListener("click", () => {
  localStorage.removeItem("rol");
  window.location.href = "../login.html";
});

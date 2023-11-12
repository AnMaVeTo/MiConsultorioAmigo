const userRole = localStorage.rol;
console.log(userRole);
if (userRole === undefined) {
  window.location.href = "/login.html";
} else if (userRole === "Administrador") {
  window.location.href = "/admin/index.html";
} else if (userRole === "Secretaria") {
  window.location.href = "/secretaria/index.html";
}

document.querySelector("#logout-tab").addEventListener("click", () => {
  localStorage.removeItem("rol");
  window.location.href = "../login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  let roles = [];
  let Usuarios = [];
  let medicos = [];

  const btnCreate = document.querySelector("#create-user");

  btnCreate.addEventListener("click", () => {
    document.querySelector("#create-user-form").style.display = "block";
  });

  async function fetchRoles() {
    try {
      const response = await fetch("http://localhost:8080/rol/listar");
      roles = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de roles:", error);
    }
  }

  async function fetchMedicos() {
    try {
      const response = await fetch("http://localhost:8080/medico/listar");
      medicos = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de roles:", error);
    }
  }

  async function fetchUsuarios() {
    try {
      const response = await fetch("http://localhost:8080/usuario/listar");
      Usuarios = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de usuarios:", error);
    }
  }

  fetchUsuarios()
    .then(() => fetchRoles())
    .then(() => fetchMedicos())
    .then(usuarios);

  function usuarios() {
    const userTableBody = document.querySelector("#user-table-body");
    userTableBody.innerHTML = "";
    let userIdG = null;

    const updateForm = document.querySelector("#edit-user-form");
    const usernameInput = document.querySelector("#edit-user-name");
    const passwordInput = document.querySelector("#edit-user-password");
    const roleIdInput = document.querySelector("#edit-user-role");
    const medicoInput = document.querySelector("#edit-user-medico");

    const createForm = document.querySelector("#create-user-form");
    const usernameInputC = document.querySelector("#create-user-name");
    const passwordInputC = document.querySelector("#create-user-password");
    const roleIdInputC = document.querySelector("#create-user-role");
    const medicoInputC = document.querySelector("#create-user-medico");

    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userId = userIdG;
      const username = usernameInput.value;
      const password = passwordInput.value;
      const roleId = roleIdInput.value;
      const medico = medicoInput.value;

      fetch(`http://localhost:8080/usuario/actualizar/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          username: username,
          password: password,
          rol: roleId,
          idMeico: medico,
        }),
      }).then(() => window.location.reload());
      console.log("Enviar datos al servidor:", {
        userId,
        username,
        password,
        roleId,
        medico,
      });
    });

    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = usernameInputC.value;
      const password = passwordInputC.value;
      const roleId = roleIdInputC.value;
      const medico = medicoInputC.value;

      fetch(`http://localhost:8080/usuario/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          rol: roleId,
          idMeico: medico,
        }),
      }).then(() => window.location.reload());
      console.log("Enviar datos al servidor:", {
        username,
        password,
        roleId,
        medico,
      });
    });

    Usuarios.forEach((user) => {
      const userRole =
        roles.find((rol) => rol.id === user.rol)?.nombre || "Rol no encontrado";
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${userRole}</td>
        <td>
        <div style="display:flex; gap: 10px">
          <button class="btn btn-primary update-user" data-id="${user.id}" data-toggle="modal"
          data-target="#editarUsuario">Actualizar</button>
          <button class="btn btn-danger delete-user" data-id="${user.id}">Eliminar</button>
        </div>
        </td>
      `;
      userTableBody.appendChild(row);
    });

    const updateButtons = document.querySelectorAll(".update-user");
    updateButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.getAttribute("data-id");
        const selectedUser = Usuarios.find((user) => user.id == userId);
        userIdG = selectedUser.id;

        usernameInput.value = selectedUser.username;
        passwordInput.value = "";
        roleIdInput.value = selectedUser.rol;

        updateForm.style.display = "block";
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-user");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.getAttribute("data-id");

        fetch(`http://localhost:8080/usuario/eliminar/${userId}`, {
          method: "DELETE",
        }).then(() => window.location.reload());
      });
    });

    const select = document.querySelector("#edit-user-role");
    roles.forEach((rol) => {
      const option = document.createElement("option");
      option.value = rol.id;
      option.text = rol.nombre;
      select.appendChild(option);
    });

    const selectCreate = document.querySelector("#create-user-role");
    roles.forEach((rol) => {
      const option = document.createElement("option");
      option.value = rol.id;
      option.text = rol.nombre;
      selectCreate.appendChild(option);
    });

    roleIdInput.addEventListener("change", (event) => {
      if (roleIdInput.value == 3) {
        const select = document.querySelector("#edit-user-medico");
        select.style.display = "block";
        medicos.forEach((medico) => {
          const option = document.createElement("option");
          option.value = medico.id;
          option.text = medico.nombre;
          select.appendChild(option);
        });
      }
    });

    roleIdInputC.addEventListener("change", (event) => {
      if (roleIdInputC.value == 3) {
        const selectCreateMedico = document.querySelector(
          "#create-user-medico"
        );
        selectCreateMedico.style.display = "block";
        medicos.forEach((medico) => {
          const option = document.createElement("option");
          option.value = medico.id;
          option.text = medico.nombre;
          selectCreateMedico.appendChild(option);
        });
      }
    });
  }
});

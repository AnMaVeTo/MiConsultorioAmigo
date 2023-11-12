document.addEventListener("DOMContentLoaded", function () {
  let especialidades = [];
  let medicos = [];

  const btnCreate = document.querySelector("#create-medico");

  btnCreate.addEventListener("click", () => {
    document.querySelector("#create-doctor-form").style.display = "block";
  });

  async function fetchespecialidades() {
    try {
      const response = await fetch("http://localhost:8080/especialidad/listar");
      especialidades = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de especialidades:", error);
    }
  }

  async function fetchMedicos() {
    try {
      const response = await fetch("http://localhost:8080/medico/listar");
      medicos = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de Medicos:", error);
    }
  }

  fetchMedicos()
    .then(() => fetchespecialidades())
    .then(Medicos);

  function Medicos() {
    const doctorTableBody = document.querySelector("#doctor-table-body");
    doctorTableBody.innerHTML = "";
    let medicoId = null;

    const updateForm = document.querySelector("#edit-doctor-form");
    const nameInput = document.querySelector("#edit-doctor-name");
    const emailInput = document.querySelector("#edit-doctor-email");
    const consultorioInput = document.querySelector("#edit-doctor-consultorio");
    const especialidadInput = document.querySelector(
      "#edit-doctor-especialidad"
    );
    const celularInput = document.querySelector("#edit-doctor-celular");

    const createForm = document.querySelector("#doctor-create-form");
    console.log(createForm);
    const nameInputC = document.querySelector("#create-doctor-name");
    const emailInputC = document.querySelector("#create-doctor-email");
    const consultorioInputC = document.querySelector(
      "#create-doctor-consultorio"
    );
    const especialidadInputC = document.querySelector(
      "#create-doctor-especialidad"
    );
    const celularInputC = document.querySelector("#create-doctor-celular");

    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userId = medicoId;
      const name = nameInput.value;
      const email = emailInput.value;
      const consultorio = consultorioInput.value;
      const especialidad = especialidadInput.value;
      const celular = celularInput.value;

      fetch(`http://localhost:8080/medico/actualizar/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          email: email,
          consultorio: consultorio,
          especialidad: especialidad,
          celular: celular,
        }),
      }).then(() => window.location.reload());
      console.log("Enviar datos al servidor:", {
        userId,
      });
    });

    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = nameInputC.value;
      const email = emailInputC.value;
      const consultorio = consultorioInputC.value;
      const especialidad = especialidadInputC.value;
      const celular = celularInputC.value;

      fetch(`http://localhost:8080/medico/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          email: email,
          consultorio: consultorio,
          especialidad: especialidad,
          celular: celular,
        }),
      }).then(() => window.location.reload());
      console.log("Enviar datos al servidor:", {
        name,
        email,
        consultorio,
        especialidad,
        celular,
      });
    });

    medicos.forEach((medico) => {
      const medicoEspecialidad =
        especialidades.find((espe) => espe.id === medico.especialidad)
          ?.nombre || "Especialidad no encontrado";
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${medico.id}</td>
          <td>${medico.nombre}</td>
          <td>${medicoEspecialidad}</td>
          <td>${medico.email}</td>
          <td>${medico.consultorio}</td>
          <td>${medico.celular}</td>
          <td>
          <div style="display:flex; gap: 10px">
            <button class="btn btn-primary update-medico" data-id="${medico.id}" data-toggle="modal"
            data-target="#editarMedico">Actualizar</button>
            <button class="btn btn-danger delete-medico" data-id="${medico.id}">Eliminar</button>
          </div>
          </td>
        `;
      doctorTableBody.appendChild(row);
    });

    const updateButtons = document.querySelectorAll(".update-medico");
    updateButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.getAttribute("data-id");
        const selectedUser = medicos.find((medico) => medico.id == userId);
        medicoId = selectedUser.id;

        nameInput.value = selectedUser.nombre;
        emailInput.value = selectedUser.email;
        consultorioInput.value = selectedUser.consultorio;
        especialidadInput.value = selectedUser.especialidad;
        celularInput.value = selectedUser.celular;

        updateForm.style.display = "block";
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-medico");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.getAttribute("data-id");
        console.log("Eliminar usuario:", userId);

        fetch(`http://localhost:8080/medico/eliminar/${userId}`, {
          method: "DELETE",
        }).then(() => window.location.reload());
      });
    });

    const select = document.querySelector("#edit-doctor-especialidad");
    especialidades.forEach((esp) => {
      const option = document.createElement("option");
      option.value = esp.id;
      option.text = esp.nombre;
      select.appendChild(option);
    });

    const selectCreate = document.querySelector("#create-doctor-especialidad");
    especialidades.forEach((esp) => {
      const option = document.createElement("option");
      option.value = esp.id;
      option.text = esp.nombre;
      selectCreate.appendChild(option);
    });
  }
});

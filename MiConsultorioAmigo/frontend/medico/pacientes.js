document.addEventListener("DOMContentLoaded", function () {
  let pacientes = [];

  async function fetchPacientes() {
    try {
      const response = await fetch("http://localhost:8080/paciente/listar");
      pacientes = await response.json();
      console.log(pacientes);
    } catch (error) {
      console.error("Error al cargar la lista de Medicos:", error);
    }
  }

  fetchPacientes().then(() => {
    Pacientes();
  });

  function Pacientes() {
    const pacientesTableBody = document.querySelector("#pacientes-table-body");
    pacientesTableBody.innerHTML = "";
    let pacienteId = null;

    const updateForm = document.querySelector("#edit-pacientes-form");
    const nombreInput = document.querySelector("#edit-pacientes-name");
    const apellidoInput = document.querySelector("#edit-pacientes-apellido");
    const generoInput = document.querySelector("#edit-pacientes-genero");
    const emailInput = document.querySelector("#edit-pacientes-email");
    const celularInput = document.querySelector("#edit-pacientes-celular");
    const fechaNacimientoInput = document.querySelector(
      "#edit-pacientes-fechaNacimiento"
    );
    const direccionInput = document.querySelector("#edit-pacientes-direccion");
    const historiaClinicaInput = document.querySelector(
      "#edit-pacientes-historiaClinica"
    );
    const medicamentosInput = document.querySelector(
      "#edit-pacientes-medicamentos"
    );

    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userId = pacienteId;
      const nombre = nombreInput.value;
      const apellido = apellidoInput.value;
      const genero = generoInput.value;
      const email = emailInput.value;
      const celular = celularInput.value;
      const fechaNacimiento = fechaNacimientoInput.value;
      const direccion = direccionInput.value;
      const historiaClinica = historiaClinicaInput.value;
      const medicamentos = medicamentosInput.value;

      fetch(`http://localhost:8080/paciente/actualizar/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          genero: genero,
          email: email,
          celular: celular,
          fechaNacimiento: fechaNacimiento,
          direccion: direccion,
          historiaClinica: historiaClinica,
          medicamentos: medicamentos,
        }),
      }).then(() => window.location.reload());
      console.log("Enviar datos al servidor:", {
        userId,
        nombre,
        apellido,
        genero,
        email,
        celular,
        fechaNacimiento,
        direccion,
        historiaClinica,
        medicamentos,
      });
    });

    pacientes.forEach((paciente) => {
      console.log(paciente);
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${paciente.id}</td>
              <td>${paciente.nombre}</td>
              <td>${paciente.apellido}</td>
              <td>${paciente.genero}</td>
              <td>${paciente.celular}</td>
              <td>${paciente.direccion}</td>
              <td>${paciente.email}</td>
              <td>${new Date(paciente.fechaNacimiento).toLocaleString()}</td>
              <td>${paciente.historiaClinica}</td>
              <td>${paciente.medicamentos}</td>
              <td>
              <div style="display:flex; gap: 10px">
                <button class="btn btn-primary update-paciente" data-id="${
                  paciente.id
                }" data-toggle="modal"
                data-target="#editarPaciente">Actualizar</button>
              </div>
              </td>
            `;
      pacientesTableBody.appendChild(row);
    });

    const updateButtons = document.querySelectorAll(".update-paciente");
    updateButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const userId = event.target.getAttribute("data-id");
        const selectedPaciente = pacientes.find(
          (paciente) => paciente.id == userId
        );

        console.log(userId);
        pacienteId = selectedPaciente.id;

        nombreInput.value = selectedPaciente.nombre;
        apellidoInput.value = selectedPaciente.apellido;
        generoInput.value = selectedPaciente.genero;
        emailInput.value = selectedPaciente.email;
        celularInput.value = selectedPaciente.celular;
        fechaNacimientoInput.value = new Date(selectedPaciente.fechaNacimiento)
          .toISOString()
          .slice(0, 16);
        direccionInput.value = selectedPaciente.direccion;
        historiaClinicaInput.value = selectedPaciente.historiaClinica;
        medicamentosInput.value = selectedPaciente.medicamentos;

        updateForm.style.display = "block";
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let medicos = [];
  let pacientes = [];
  let citas = [];

  async function fetchMedicos() {
    try {
      const response = await fetch("http://localhost:8080/medico/listar");
      medicos = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de especialidades:", error);
    }
  }

  async function fetchPacientes() {
    try {
      const response = await fetch("http://localhost:8080/paciente/listar");
      pacientes = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de Medicos:", error);
    }
  }

  async function fetchCitas() {
    try {
      const response = await fetch("http://localhost:8080/cita/listar");
      citas = await response.json();
    } catch (error) {
      console.error("Error al cargar la lista de Medicos:", error);
    }
  }

  fetchCitas()
    .then(() => fetchMedicos())
    .then(() => fetchPacientes())
    .then(Citas);

  function Citas() {
    const citasTableBody = document.querySelector("#citas-table-body");
    citasTableBody.innerHTML = "";
    let citaId = null;

    const updateForm = document.querySelector("#edit-citas-form");
    const estadoInput = document.querySelector("#edit-citas-estado");
    const fechaInput = document.querySelector("#edit-citas-fecha");
    const medicoInput = document.querySelector("#edit-citas-medico");
    const pacienteInput = document.querySelector("#edit-citas-paciente");
    const duracionInput = document.querySelector("#edit-citas-duracion");
    const comentariosInput = document.querySelector("#edit-citas-comentarios");
    const motivoInput = document.querySelector("#edit-citas-motivo");

    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userId = citaId;
      const estado = estadoInput.value;
      const fecha = fechaInput.value;
      const medico = medicoInput.value;
      const paciente = pacienteInput.value;
      const duracion = duracionInput.value;
      const comentarios = comentariosInput.value;
      const motivo = motivoInput.value;

      fetch(`http://localhost:8080/cita/actualizar/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: estado,
          fechaHora: fecha,
          idMedico: medico,
          idPaciente: paciente,
          duracion: duracion,
          comentarios: comentarios,
          motivo: motivo,
        }),
      }).then(() => window.location.reload());
      console.log("Enviar datos al servidor:", {
        userId,
        estado,
        fecha,
        medico,
        paciente,
        duracion,
        comentarios,
        motivo,
      });
    });

    citas.forEach((cita) => {
      if (cita.idMedico == localStorage.idMedico) {
        const citaMedico =
          medicos.find((espe) => espe.id === cita.idMedico)?.nombre ||
          "medico no encontrado";
        const citaPaciente =
          pacientes.find((espe) => espe.id === cita.idPaciente)?.nombre ||
          "paciente no encontrado";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cita.id}</td>
            <td>${cita.estado}</td>
            <td>${new Date(cita.fechaHora).toLocaleString()}</td> 
            <td>${citaMedico}</td>
            <td>${citaPaciente}</td>
            <td>${cita.duracion}</td>
            <td>${cita.comentarios}</td>
            <td>${cita.motivo}</td>
            <td>
            <div style="display:flex; gap: 10px">
              <button class="btn btn-primary update-cita" data-id="${
                cita.id
              }" data-toggle="modal"
              data-target="#editarCita">Actualizar</button>
              <button class="btn btn-danger delete-cita" data-id="${
                cita.id
              }">Eliminar</button>
              </div>
            </td>
          `;
        citasTableBody.appendChild(row);
      }
    });

    const updateButtons = document.querySelectorAll(".update-cita");
    updateButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const userId = event.target.getAttribute("data-id");
        const selectedCita = citas.find((cita) => cita.id == userId);
        citaId = selectedCita.id;

        estadoInput.value = selectedCita.estado;
        fechaInput.value = new Date(selectedCita.fechaHora)
          .toISOString()
          .slice(0, 16);
        medicoInput.value = selectedCita.idMedico;
        pacienteInput.value = selectedCita.idPaciente;
        duracionInput.value = selectedCita.duracion;
        comentariosInput.value = selectedCita.comentarios;
        motivoInput.value = selectedCita.motivo;

        updateForm.style.display = "block";
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-cita");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.getAttribute("data-id");
        console.log("Eliminar usuario:", userId);

        fetch(`http://localhost:8080/cita/eliminar/${userId}`, {
          method: "DELETE",
        }).then(() => window.location.reload());
      });
    });

    const selectMedico = document.querySelector("#edit-citas-medico");
    medicos.forEach((esp) => {
      const option = document.createElement("option");
      option.value = esp.id;
      option.text = esp.nombre;
      selectMedico.appendChild(option);
    });

    const selectPaciente = document.querySelector("#edit-citas-paciente");
    pacientes.forEach((esp) => {
      const option = document.createElement("option");
      option.value = esp.id;
      option.text = esp.nombre;
      selectPaciente.appendChild(option);
    });
  }
});

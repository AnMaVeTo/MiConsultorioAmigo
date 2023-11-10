$(document).ready(function () {
  // Cargar datos iniciales al abrir la página
  loadUserData();
  loadDoctorData();
  loadAppointmentData();
  loadPacientesData();

  // Definir las funciones para cargar los datos de cada pestaña
  function loadUserData() {
    fetch("http://localhost:8080/usuario/listar")
      .then((response) => response.json())
      .then((data) => {
        const userTableBody = document.getElementById("user-table-body");
        userTableBody.innerHTML = "";

        data.forEach((user) => {
          // Realiza una solicitud para obtener el rol de este usuario
          fetch(`http://localhost:8080/rol/listar/${user.rol}`)
            .then((response) => response.json())
            .then((rol) => {
              const userRole = rol.nombre;

              const row = document.createElement("tr");
              row.innerHTML = `
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${userRole}</td>
                            <td>
                                <button class="btn btn-primary update-user" data-id="${user.id}">Actualizar</button>
                                <button class="btn btn-danger delete-user" data-id="${user.id}">Eliminar</button>
                            </td>
                        `;
              userTableBody.appendChild(row);
            })
            .catch((error) =>
              console.error("Error al cargar el rol de usuario:", error)
            );
        });
      })
      .catch((error) =>
        console.error("Error al cargar datos de usuarios:", error)
      );
  }

  $(document).ready(function () {
    // Asociar evento de clic para el botón "Actualizar" del usuario
    $(document).on("click", ".update-user", function () {
      const userId = $(this).data("id");

      // Mostrar el formulario de edición
      $("#edit-user-form").show();

      const userRoleSelect = $("#edit-user-role");
      console.log("hola");
      // Realizar una solicitud para obtener la lista de roles
      fetch("http://localhost:8080/rol/listar")
        .then((response) => response.json())
        .then((roles) => {
          // Limpiar el <select> de roles
          userRoleSelect.empty();

          // Agregar una opción vacía por defecto
          userRoleSelect.append(
            $("<option>", {
              value: "",
              text: "Seleccionar un rol",
            })
          );

          // Agregar opciones para cada rol
          roles.forEach((rol) => {
            userRoleSelect.append(
              $("<option>", {
                value: rol.id, // Asigna el valor del ID del rol
                text: rol.nombre, // Muestra el nombre del rol
              })
            );
          });
        })
        .catch((error) => {
          console.error("Error al cargar la lista de roles:", error);
        });

      // Asociar evento de envío del formulario
      $("#user-edit-form").on("submit", function (event) {
        event.preventDefault();

        // Obtener los datos editados del formulario
        const editedUserName = $("#edit-user-name").val();
        const editedUserEmail = $("#edit-user-email").val();

        // Crear un objeto con los datos editados
        const editedUserData = {
          username: editedUserName,
          password: editedUserEmail,
          rol: userRoleSelect.val(),
        };

        // Realizar una solicitud al servidor para actualizar el usuario
        fetch(`http://localhost:8080/usuario/actualizar/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUserData),
        })
          .then((response) => {
            if (response.ok) {
              // Actualización exitosa, puedes ocultar el formulario de edición y recargar los datos
              $("#edit-user-form").hide();
              loadUserData();
            } else {
              console.error("Error al actualizar el usuario");
            }
          })
          .catch((error) => {
            console.error("Error al actualizar el usuario:", error);
          });
      });
    });

    // Asociar evento de clic para el botón "Eliminar" del usuario
    $(document).on("click", ".delete-user", function () {
      const userId = $(this).data("id");

      fetch(`http://localhost:8080/usuario/eliminar/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Eliminación exitosa, puedes ocultar el formulario de edición y recargar los datos
            $("#edit-user-form").hide();
            loadUserData();
          } else {
            console.error("Error al eliminar el usuario");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error);
        });
    });
  });

  function loadDoctorData() {
    fetch("http://localhost:8080/medico/listar")
      .then((response) => response.json())
      .then((data) => {
        const doctorTableBody = document.getElementById("doctor-table-body");
        doctorTableBody.innerHTML = "";

        data.forEach((doctor) => {
          fetch(
            `http://localhost:8080/especialidad/listar/${doctor.especialidad}`
          )
            .then((response) => response.json())
            .then((especialidad) => {
              console.log(especialidad);
              const especialidadName = especialidad.nombre;

              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${doctor.id}</td>
                <td>${doctor.nombre}</td>
                <td>${doctor.email}</td>
                <td>${doctor.consultorio}</td>
                <td>${especialidadName}</td>
                <td>${doctor.celular}</td>
                <td>
                    <button class="btn btn-primary update-doctor" data-id="${doctor.id}">Actualizar</button>
                    <button class="btn btn-danger delete-doctor" data-id="${doctor.id}">Eliminar</button>
                </td>
              `;
              doctorTableBody.appendChild(row);
            })
            .catch((error) =>
              console.error("Error al cargar el rol de usuario:", error)
            );
        });
      })
      .catch((error) =>
        console.error("Error al cargar datos de médicos:", error)
      );
  }

  // Asociar evento de clic para el botón "Actualizar" del médico
  $(document).on("click", ".update-doctor", function () {
    const doctorId = $(this).data("id");
    // Mostrar el formulario de edición del médico
    $("#edit-doctor-form").show();

    const userEspecialidadSelect = $("#edit-medico-especialidad");
    // Realizar una solicitud para obtener la lista de roles
    fetch("http://localhost:8080/especialidad/listar")
      .then((response) => response.json())
      .then((especialidad) => {
        // Limpiar el <select> de especialidad
        userEspecialidadSelect.empty();

        // Agregar una opción vacía por defecto
        userEspecialidadSelect.append(
          $("<option>", {
            value: "",
            text: "Seleccionar un rol",
          })
        );

        // Agregar opciones para cada rol
        especialidad.forEach((especialidad) => {
          userEspecialidadSelect.append(
            $("<option>", {
              value: especialidad.id,
              text: especialidad.nombre,
            })
          );
        });
      })
      .catch((error) => {
        console.error("Error al cargar la lista de roles:", error);
      });

    // Asociar evento de envío del formulario
    $("#doctor-edit-form").on("submit", function (event) {
      event.preventDefault();

      // Obtener los datos editados del formulario
      const editedDoctorName = $("#edit-doctor-name").val();
      const editedDoctorEmail = $("#edit-doctor-email").val();
      const editedDoctorConsultorio = $("#edit-doctor-consultorio").val();
      const editedDoctorEspecialidad = $("#edit-doctor-especialidad").val();
      const editedDoctorCelular = $("#edit-doctor-celular").val();

      // Crear un objeto con los datos editados del médico
      const editedDoctorData = {
        nombre: editedDoctorName,
        email: editedDoctorEmail,
        consultorio: editedDoctorConsultorio,
        especialidad: editedDoctorEspecialidad,
        celular: editedDoctorCelular,
      };

      // Realizar una solicitud al servidor para actualizar el médico
      fetch(`http://localhost:8080/medico/actualizar/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDoctorData),
      })
        .then((response) => {
          if (response.ok) {
            // Actualización exitosa, puedes ocultar el formulario de edición y recargar los datos
            $("#edit-doctor-form").hide();
            loadDoctorData();
          } else {
            console.error("Error al actualizar el médico");
          }
        })
        .catch((error) => {
          console.error("Error al actualizar el médico:", error);
        });
    });
  });

  // Asociar evento de clic para el botón "Eliminar" del médico
  $(document).on("click", ".delete-doctor", function () {
    const doctorId = $(this).data("id");
    fetch(`http://localhost:8080/medico/eliminar/${doctorId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Eliminación exitosa, puedes ocultar el formulario de edición y recargar los datos
          $("#edit-medico-form").hide();
          loadDoctorData();
        } else {
          console.error("Error al eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  });

  function loadAppointmentData() {
    fetch("http://localhost:8080/cita/listar")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Aquí puedes actualizar la tabla de citas con los datos obtenidos en 'data'
        // Asumiendo que tienes una tabla con id 'appointment-table-body':
        const appointmentTableBody = document.getElementById(
          "appointment-table-body"
        );
        appointmentTableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((appointment) => {
          // Realiza solicitudes para obtener información de médico y paciente
          Promise.all([
            fetch(
              `http://localhost:8080/medico/listar/${appointment.idMedico}`
            ).then((response) => response.json()),
            fetch(
              `http://localhost:8080/paciente/listar/${appointment.idPaciente}`
            ).then((response) => response.json()),
          ])
            .then(([medico, paciente]) => {
              console.log(medico);
              //   console.log(paciente);
              const row = document.createElement("tr");
              row.innerHTML = `
              <td>${appointment.id}</td>
              <td>${medico.nombre}</td>
              <td>${paciente.nombre}</td>
              <td>${appointment.motivo}</td>
              <td>${appointment.fechaHora}</td>
              <td>${appointment.estado}</td>
              <td>${appointment.duracion}</td>
              <td>${appointment.comentarios}</td>
              <td>
                <button class="btn btn-primary update-appointment" data-id="${appointment.id}">Actualizar</button>
                <button class="btn btn-danger delete-appointment" data-id="${appointment.id}">Eliminar</button>
              </td>
            `;
              appointmentTableBody.appendChild(row);
            })
            .catch((error) => {
              console.error("Error al cargar datos de citas:", error);
            });
        });
      })
      .catch((error) =>
        console.error("Error al cargar datos de citas:", error)
      );
  }

  $(document).on("click", ".update-appointment", function () {
    const appointmentId = $(this).data("id");
    console.log(appointmentId);
    // Mostrar el formulario de edición
    $("#edit-appointment-form").show();

    // Rellenar el formulario con los datos de la cita
    const motivo = $(this).closest("tr").find("td:eq(3)").text();
    const fechaHora = $(this).closest("tr").find("td:eq(4)").text();
    const estado = $(this).closest("tr").find("td:eq(5)").text();
    const duracion = $(this).closest("tr").find("td:eq(6)").text();
    const comentarios = $(this).closest("tr").find("td:eq(7)").text();

    $("#edit-appointment-motivo").val(motivo);
    $("#edit-appointment-fechaHora").val(fechaHora);
    $("#edit-appointment-estado").val(estado);
    $("#edit-appointment-duracion").val(duracion);
    $("#edit-appointment-comentarios").val(comentarios);

    // Asociar evento de envío del formulario
    $("#appointment-edit-form").on("submit", function (event) {
      event.preventDefault();

      // Obtener los datos editados del formulario
      const editedMotivo = $("#edit-appointment-motivo").val();
      const editedFechaHora = $("#edit-appointment-fechaHora").val();
      const editedEstado = $("#edit-appointment-estado").val();
      const editedDuracion = $("#edit-appointment-duracion").val();
      const editedComentarios = $("#edit-appointment-comments").val();
      const editedidMedico = $("#edit-appointment-id-medico").val();
      const editedIdPaciente = $("#edit-appointment-id-paciente").val();

      // Crear un objeto con los datos editados
      const editedAppointmentData = {
        motivo: editedMotivo,
        fechaHora: editedFechaHora,
        estado: editedEstado,
        duracion: editedDuracion,
        comentarios: editedComentarios,
        idMedico: editedidMedico,
        idPaciente: editedIdPaciente,
      };

      // Realizar una solicitud al servidor para actualizar la cita
      fetch(`http://localhost:8080/cita/actualizar/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedAppointmentData),
      })
        .then((response) => {
          if (response.ok) {
            // Actualización exitosa, puedes ocultar el formulario de edición y recargar los datos
            $("#edit-appointment-form").hide();
            loadAppointmentData();
          } else {
            console.error("Error al actualizar la cita");
          }
        })
        .catch((error) => {
          console.error("Error al actualizar la cita:", error);
        });
    });
  });

  $(document).on("click", ".delete-appointment", function () {
    const doctorId = $(this).data("id");
    fetch(`http://localhost:8080/cita/eliminar/${doctorId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Eliminación exitosa, puedes ocultar el formulario de edición y recargar los datos
          $("#edit-user-form").hide();
          loadAppointmentData();
        } else {
          console.error("Error al eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  });

  function loadPacientesData() {
    fetch("http://localhost:8080/paciente/listar")
      .then((response) => response.json())
      .then((data) => {
        console.log("pacientes:" + data);
        // Aquí puedes actualizar la tabla de citas con los datos obtenidos en 'data'
        // Asumiendo que tienes una tabla con id 'pacientes-table-body':
        const pacientesTableBody = document.getElementById(
          "pacientes-table-body"
        );
        pacientesTableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((pacientes) => {
          //   console.log(paciente);
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${pacientes.id}</td>
              <td>${pacientes.nombre}</td>
              <td>${pacientes.apellido}</td>
              <td>${pacientes.genero}</td>
              <td>${pacientes.celular}</td>
              <td>${pacientes.direccion}</td>
              <td>${pacientes.email}</td>
              <td>${pacientes.fechaNacimiento}</td>
              <td>${pacientes.historiaClinica}</td>
              <td>${pacientes.medicamentos}</td>

              <td>
                <button class="btn btn-primary update-pacientes" data-id="${pacientes.id}">Actualizar</button>
                <button class="btn btn-danger delete-pacientes" data-id="${pacientes.id}">Eliminar</button>
              </td>
            `;
          pacientesTableBody.appendChild(row);
        });
      })
      .catch((error) =>
        console.error("Error al cargar datos de citas:", error)
      );
  }

  $(document).on("click", ".update-pacientes", function () {
    const pacientesId = $(this).data("id");
    // Mostrar el formulario de edición
    $("#pacientes-edit-form").show();

    // Rellenar el formulario con los datos del paciente
    const nombre = $(this).closest("tr").find("td:eq(0)").text();
    const apellido = $(this).closest("tr").find("td:eq(1)").text();
    const genero = $(this).closest("tr").find("td:eq(2)").text();
    const celular = $(this).closest("tr").find("td:eq(3)").text();
    const direccion = $(this).closest("tr").find("td:eq(4)").text();
    const fechaNacimiento = $(this).closest("tr").find("td:eq(5)").text();
    const historiaClinica = $(this).closest("tr").find("td:eq(6)").text();
    const medicamentos = $(this).closest("tr").find("td:eq(7)").text();

    $("#edit-pacientes-nombre").val(nombre);
    $("#edit-pacientes-apellido").val(apellido);
    $("#edit-pacientes-genero").val(genero);
    $("#edit-pacientes-celular").val(celular);
    $("#edit-pacientes-direccion").val(direccion);
    $("#edit-pacientes-fechaNacimiento").val(fechaNacimiento);
    $("#edit-pacientes-historiaClinica").val(historiaClinica);
    $("#edit-pacientes-medicamentos").val(medicamentos);

    // Asociar evento de envío del formulario
    $("#edit-pacientes-form").on("submit", function (event) {
      event.preventDefault();

      // Obtener los datos editados del formulario
      const editedNombre = $("#edit-pacientes-nombre").val();
      const editedApellido = $("#edit-pacientes-apellido").val();
      const editedGenero = $("#edit-pacientes-genero").val();
      const editedCelular = $("#edit-pacientes-celular").val();
      const editedDireccion = $("#edit-pacientes-direccion").val();
      const editedFechaNacimiento = $("#edit-pacientes-fechaNacimiento").val();
      const editedHistoriaClinica = $("#edit-pacientes-historiaClinica").val();
      const editedMedicamentos = $("#edit-pacientes-medicamentos").val();

      // Crear un objeto con los datos editados
      const editedPacientesData = {
        nombre: editedNombre,
        apellido: editedApellido,
        genero: editedGenero,
        celular: editedCelular,
        direccion: editedDireccion,
        fechaNacimiento: editedFechaNacimiento,
        historiaClinica: editedHistoriaClinica,
        medicamentos: editedMedicamentos,
      };

      // Realizar una solicitud al servidor para actualizar el paciente
      fetch(`http://localhost:8080/pacientes/actualizar/${pacientesId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPacientesData),
      })
        .then((response) => {
          if (response.ok) {
            // Actualización exitosa, puedes ocultar el formulario de edición y recargar los datos
            $("#edit-pacientes-form").hide();
            loadPacientesData(); // Asume que tienes una función para cargar datos de pacientes
          } else {
            console.error("Error al actualizar el paciente");
          }
        })
        .catch((error) => {
          console.error("Error al actualizar el paciente:", error);
        });
    });
  });

  $(document).on("click", ".delete-appointment", function () {
    const doctorId = $(this).data("id");
    fetch(`http://localhost:8080/cita/eliminar/${doctorId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Eliminación exitosa, puedes ocultar el formulario de edición y recargar los datos
          $("#edit-user-form").hide();
          loadAppointmentData();
        } else {
          console.error("Error al eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  });

  // Agregar acciones para los botones de navegación
  $("#users-tab").on("click", function () {
    loadUserData();
  });

  $("#doctors-tab").on("click", function () {
    loadDoctorData();
  });

  $("#appointments-tab").on("click", function () {
    loadAppointmentData();
  });

  $("#pacientes-tab").on("click", function () {
    loadPacientesData();
  });
});

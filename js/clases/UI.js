import { eliminarCita, editarCita } from '../funciones.js';
import { contenedorCitas } from '../selectores.js';

class UI {
  imprimirAlerta(mensaje, tipo) {
    const alert = document.createElement('DIV');
    alert.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (tipo === 'error') {
      alert.classList.add('alert-danger');
    } else {
      alert.classList.add('alert-success');
    }

    alert.textContent = mensaje;

    document
      .querySelector('#contenido')
      .insertBefore(alert, document.querySelector('.agregar-cita'));

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

  imprimitCitas({ citas }) {
    this.limpiarHTML();
    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = document.createElement('DIV');
      divCita.classList.add('cita', 'p-3');
      divCita.dataset.id = id;

      //* SCRIPT ELEMENTOS DE LA CITA

      const mascotaParrafo = document.createElement('H2');
      mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
      mascotaParrafo.textContent = mascota;
      const propietarioParrafo = document.createElement('P');
      propietarioParrafo.innerHTML = `
      <span class="font-weight-bolder">Propietario:</span> ${propietario}
      `;
      const telefonoParrafo = document.createElement('P');
      telefonoParrafo.innerHTML = `
      <span class="font-weight-bolder">Telefono:</span> ${telefono}
      `;
      const fechaParrafo = document.createElement('P');
      fechaParrafo.innerHTML = `
      <span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;
      const horaParrafo = document.createElement('P');
      horaParrafo.innerHTML = `
      <span class="font-weight-bolder">Hora:</span> ${hora}
      `;
      const sintomasParrafo = document.createElement('P');
      sintomasParrafo.innerHTML = `
      <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
      `;

      //* BOTON ELIMINAR CITA

      const btnEliminar = document.createElement('BUTTON');
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      `;

      btnEliminar.onclick = () => eliminarCita(id);

      //* BOTON EDITAR CITA

      const btnEditar = document.createElement('BUTTON');
      btnEditar.classList.add('btn', 'btn-info', 'mr-2');
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
      `;

      btnEditar.onclick = () => editarCita(cita);

      //* AGREGAR LOS PARRAFOS AL divCitas
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //* AGREGAR divCitas AL HTML

      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.remove(contenedorCitas.firstChild);
    }
  }
}

export default UI;

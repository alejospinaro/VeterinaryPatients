import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from './selectores.js';

//! CLASES

const administrarCitas = new Citas();
const ui = new UI();

let editando = false;

//! OBJETO INFORMACIÓN DE LA CITA
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

//! RELLENAR OBJETO CON EL VALOR CORRESPONDIENTE
export function datosCitas(e) {
  citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  if (
    mascota === '' ||
    propietario === '' ||
    telefono === '' ||
    fecha === '' ||
    hora === '' ||
    sintomas === ''
  ) {
    ui.imprimirAlerta('Todos los campos requeridos', 'error');

    return;
  }

  if (editando) {
    ui.imprimirAlerta('Se editó correctamente', 'success');

    administrarCitas.editarCita({ ...citaObj });

    formulario.querySelector('button[type="submit"]').textContent =
      'CREAR CITA';

    editando = false;
  } else {
    //* GENERAR UN ID

    citaObj.id = Date.now();

    //* CREAR CITA

    administrarCitas.agregarCita({ ...citaObj });

    //* MENSAJE AGREGADO CORRECTAMENTE

    ui.imprimirAlerta('Se agregó correctamente', 'success');
  }

  //* REINICIAR FORMULARIO

  reiniciarObjeto();
  formulario.reset();

  ui.imprimitCitas(administrarCitas);
}

export function reiniciarObjeto() {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}

export function eliminarCita(id) {
  //* ELIMINAR CITA

  administrarCitas.eliminarCita(id);
  //* MOSTRAR MENSAJE

  ui.imprimirAlerta('Cita eliminada exitosamente', 'success');
  //* REFRESCAR CITAS

  ui.imprimitCitas(administrarCitas);
}

export function editarCita(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //* CAMBIAR TEXTO BOTON

  formulario.querySelector('button[type="submit"]').textContent =
    'Guardar Cambios';

  editando = true;
}

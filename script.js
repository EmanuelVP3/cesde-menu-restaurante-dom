'use strict';

// REGIÓN COMPAÑERO 2: validación compartida y CRUD.
let menuData = [];
let pedidoData = [];

const menuApp = document.getElementById('menu-app');
const formPlato = document.getElementById('form-plato');
const nombreInput = document.getElementById('nombre-plato');
const precioInput = document.getElementById('precio-plato');
const listaPlatos = document.getElementById('lista-platos');
const listaPedido = document.getElementById('lista-pedido');
const mensajeEl = document.getElementById('mensaje');

function mostrarMensaje(texto) {
  if (!mensajeEl) return;
  mensajeEl.textContent = texto;
}

function generarId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatearPrecio(precioCentavos) {
  if (!Number.isFinite(precioCentavos)) {
    return '$0,00';
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precioCentavos / 100);
}

function validarNombre(nombre) {
  const texto = typeof nombre === 'string' ? nombre.trim() : '';
  return texto.length > 0;
}

function validarPrecioCentavos(valor) {
  const texto = typeof valor === 'string' ? valor.trim() : String(valor ?? '').trim();

  if (texto === '') {
    return { valido: false, valor: 0, mensaje: 'El precio es obligatorio.' };
  }

  const numero = Number(texto);

  if (!Number.isFinite(numero) || numero <= 0) {
    return { valido: false, valor: 0, mensaje: 'El precio debe ser un número mayor que cero.' };
  }

  if (!Number.isInteger(numero * 100)) {
    return { valido: false, valor: 0, mensaje: 'El precio admite máximo dos decimales.' };
  }

  return { valido: true, valor: Math.round(numero * 100), mensaje: '' };
}

function crearAcciones(tarjeta, modo) {
  const contenedor = tarjeta.querySelector('.plato__acciones');
  const acciones = contenedor || document.createElement('div');

  acciones.className = 'plato__acciones';
  acciones.replaceChildren();

  if (modo === 'editar') {
    const guardar = document.createElement('button');
    guardar.type = 'button';
    guardar.dataset.action = 'guardar';
    guardar.textContent = 'Guardar';

    const cancelar = document.createElement('button');
    cancelar.type = 'button';
    cancelar.dataset.action = 'cancelar';
    cancelar.textContent = 'Cancelar';

    acciones.append(guardar, cancelar);
  } else {
    const pedir = document.createElement('button');
    pedir.type = 'button';
    pedir.dataset.action = 'pedir';
    pedir.textContent = 'Pedir';

    const editar = document.createElement('button');
    editar.type = 'button';
    editar.dataset.action = 'editar';
    editar.textContent = 'Editar';

    const eliminar = document.createElement('button');
    eliminar.type = 'button';
    eliminar.dataset.action = 'eliminar';
    eliminar.textContent = 'Eliminar';

    acciones.append(pedir, editar, eliminar);
  }

  if (!contenedor) {
    tarjeta.append(acciones);
  }

  return acciones;
}

function crearPlato(nombre, precioCentavos) {
  if (!listaPlatos || !Number.isInteger(precioCentavos) || precioCentavos <= 0) {
    return null;
  }

  const nombreSeguro = nombre.trim();
  if (!validarNombre(nombreSeguro)) {
    return null;
  }

  const tarjeta = document.createElement('article');
  tarjeta.className = 'plato';
  tarjeta.dataset.id = generarId();

  const nombreVisible = document.createElement('p');
  nombreVisible.className = 'plato__nombre';
  nombreVisible.textContent = nombreSeguro;

  const precioVisible = document.createElement('span');
  precioVisible.className = 'plato__precio';
  precioVisible.dataset.precioCentavos = String(precioCentavos);
  precioVisible.textContent = formatearPrecio(precioCentavos);

  tarjeta.append(nombreVisible, precioVisible);
  crearAcciones(tarjeta, 'normal');
  listaPlatos.append(tarjeta);

  menuData.push({
    id: tarjeta.dataset.id,
    nombre: nombreSeguro,
    precioCentavos,
  });

  mostrarMensaje('Plato agregado correctamente.');
  return tarjeta;
}

function iniciarEdicion(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return false;
  }

  if (tarjeta.querySelector('.plato__editar-nombre, .plato__editar-precio')) {
    return false;
  }

  const nombreActual = tarjeta.querySelector('.plato__nombre');
  const precioActual = tarjeta.querySelector('.plato__precio');

  if (!nombreActual || !precioActual) {
    return false;
  }

  const nombreInputEdicion = document.createElement('input');
  nombreInputEdicion.type = 'text';
  nombreInputEdicion.className = 'plato__editar-nombre';
  nombreInputEdicion.value = nombreActual.textContent.trim();

  const precioInputEdicion = document.createElement('input');
  precioInputEdicion.type = 'number';
  precioInputEdicion.min = '0.01';
  precioInputEdicion.step = '0.01';
  precioInputEdicion.className = 'plato__editar-precio';
  precioInputEdicion.value = (Number(precioActual.dataset.precioCentavos || 0) / 100).toFixed(2);

  nombreActual.replaceWith(nombreInputEdicion);
  precioActual.replaceWith(precioInputEdicion);
  crearAcciones(tarjeta, 'editar');

  const pedirBoton = tarjeta.querySelector('[data-action="pedir"]');
  if (pedirBoton) {
    pedirBoton.disabled = true;
  }

  return true;
}

function guardarEdicion(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return false;
  }

  const nombreInputEdicion = tarjeta.querySelector('.plato__editar-nombre');
  const precioInputEdicion = tarjeta.querySelector('.plato__editar-precio');

  if (!nombreInputEdicion || !precioInputEdicion) {
    return false;
  }

  if (!validarNombre(nombreInputEdicion.value)) {
    mostrarMensaje('El nombre del plato no puede quedar vacío.');
    nombreInputEdicion.focus();
    return false;
  }

  const validacionPrecio = validarPrecioCentavos(precioInputEdicion.value);
  if (!validacionPrecio.valido) {
    mostrarMensaje(validacionPrecio.mensaje);
    precioInputEdicion.focus();
    return false;
  }

  const plato = menuData.find((item) => item.id === tarjeta.dataset.id);
  if (!plato) {
    return false;
  }

  plato.nombre = nombreInputEdicion.value.trim();
  plato.precioCentavos = validacionPrecio.valor;

  const nombreVisible = document.createElement('p');
  nombreVisible.className = 'plato__nombre';
  nombreVisible.textContent = plato.nombre;

  const precioVisible = document.createElement('span');
  precioVisible.className = 'plato__precio';
  precioVisible.dataset.precioCentavos = String(plato.precioCentavos);
  precioVisible.textContent = formatearPrecio(plato.precioCentavos);

  nombreInputEdicion.replaceWith(nombreVisible);
  precioInputEdicion.replaceWith(precioVisible);
  crearAcciones(tarjeta, 'normal');
  mostrarMensaje('Los cambios del plato se guardaron.');
  return true;
}

function cancelarEdicion(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return false;
  }

  const nombreInputEdicion = tarjeta.querySelector('.plato__editar-nombre');
  const precioInputEdicion = tarjeta.querySelector('.plato__editar-precio');

  if (!nombreInputEdicion || !precioInputEdicion) {
    return false;
  }

  const plato = menuData.find((item) => item.id === tarjeta.dataset.id);
  const nombreVisible = document.createElement('p');
  nombreVisible.className = 'plato__nombre';
  nombreVisible.textContent = plato ? plato.nombre : nombreInputEdicion.value.trim();

  const precioVisible = document.createElement('span');
  precioVisible.className = 'plato__precio';
  const precioGuardado = plato ? plato.precioCentavos : Number(precioInputEdicion.value || 0) * 100;
  precioVisible.dataset.precioCentavos = String(precioGuardado);
  precioVisible.textContent = formatearPrecio(precioGuardado);

  nombreInputEdicion.replaceWith(nombreVisible);
  precioInputEdicion.replaceWith(precioVisible);
  crearAcciones(tarjeta, 'normal');
  mostrarMensaje('La edición se canceló y se conservaron los datos anteriores.');
  return true;
}

function eliminarPlato(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return false;
  }

  const id = tarjeta.dataset.id;
  menuData = menuData.filter((plato) => plato.id !== id);
  tarjeta.remove();
  mostrarMensaje('El plato se eliminó del menú.');
  return true;
}

function agregarAlPedido(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return null;
  }

  const nombreVisible = tarjeta.querySelector('.plato__nombre');
  const precioVisible = tarjeta.querySelector('.plato__precio');

  if (!nombreVisible || !precioVisible) {
    return null;
  }

  const nombre = nombreVisible.textContent.trim();
  const precioCentavos = Number(precioVisible.dataset.precioCentavos || 0);

  if (!validarNombre(nombre) || !Number.isFinite(precioCentavos) || precioCentavos <= 0) {
    mostrarMensaje('No se pudo agregar el plato porque faltan datos válidos.');
    return null;
  }

  const linea = document.createElement('li');
  linea.textContent = `${nombre} — ${formatearPrecio(precioCentavos)}`;

  pedidoData.push({
    id: generarId(),
    nombre,
    precioCentavos,
  });

  listaPedido.append(linea);
  mostrarMensaje(`Se agregó "${nombre}" al pedido.`);
  return linea;
}

function inicializarApp() {
  if (!menuApp || !formPlato || !listaPlatos || !listaPedido) {
    return;
  }

  if (menuApp.dataset.inicializado === 'true') {
    return;
  }

  menuApp.dataset.inicializado = 'true';

  menuApp.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const boton = event.target.closest('button[data-action]');
    if (!boton || !menuApp.contains(boton)) {
      return;
    }

    const tarjeta = boton.closest('.plato');
    if (!tarjeta) {
      return;
    }

    switch (boton.dataset.action) {
      case 'editar':
        iniciarEdicion(tarjeta);
        break;
      case 'guardar':
        guardarEdicion(tarjeta);
        break;
      case 'cancelar':
        cancelarEdicion(tarjeta);
        break;
      case 'eliminar':
        eliminarPlato(tarjeta);
        break;
      case 'pedir':
        agregarAlPedido(tarjeta);
        break;
      default:
        break;
    }
  });

  formPlato.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!nombreInput || !precioInput) {
      return;
    }

    const nombre = nombreInput.value;
    const validacionNombre = validarNombre(nombre);

    if (!validacionNombre) {
      mostrarMensaje('El nombre del plato no puede quedar vacío.');
      nombreInput.focus();
      return;
    }

    const validacionPrecio = validarPrecioCentavos(precioInput.value);
    if (!validacionPrecio.valido) {
      mostrarMensaje(validacionPrecio.mensaje);
      precioInput.focus();
      return;
    }

    crearPlato(nombre, validacionPrecio.valor);
    formPlato.reset();
  });
}

// REGIÓN COMPAÑERO 3: pedido, único listener delegado y arranque.
inicializarApp();
'use strict';

// REGIÓN COMPAÑERO 2: validación compartida y CRUD.
// Estado del menú: guarda los datos originales para editar y cancelar sin perderlos.
let menuData = [];

// Buscamos una vez los contenedores estables. Después recorremos cada tarjeta desde su botón.
const menuApp = document.getElementById('menu-app');
const formPlato = document.getElementById('form-plato');
const nombreInput = document.getElementById('nombre-plato');
const precioInput = document.getElementById('precio-plato');
const listaPlatos = document.getElementById('lista-platos');
const listaPedido = document.getElementById('lista-pedido');
const mensajeEl = document.getElementById('mensaje');

// aria-live en el HTML permite anunciar este texto a lectores de pantalla.
function mostrarMensaje(texto) {
  if (!mensajeEl) return;
  mensajeEl.textContent = texto;
}

// Cada tarjeta recibe una identidad propia, incluso si dos platos tienen el mismo nombre.
function generarId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// El valor interno está en centavos; dividimos por 100 solo para mostrar pesos colombianos.
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

// trim elimina espacios en los extremos: un nombre de solo espacios no es válido.
function validarNombre(nombre) {
  const texto = typeof nombre === 'string' ? nombre.trim() : '';
  return texto.length > 0;
}

// Validamos el texto antes de convertirlo: así 0.29 y 1.10 no fallan por precisión decimal.
function validarPrecioCentavos(valor) {
  const texto = typeof valor === 'string' ? valor.trim() : String(valor ?? '').trim();

  if (texto === '') {
    return { valido: false, valor: 0, mensaje: 'El precio es obligatorio.' };
  }

  // La expresión permite un importe decimal positivo con un máximo de dos cifras decimales.
  const partes = texto.match(/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/);
  if (!partes) {
    return { valido: false, valor: 0, mensaje: 'Ingresa un precio positivo con máximo dos decimales.' };
  }

  // Separar pesos y decimales evita comprobar decimales con numero * 100.
  const [unidadesTexto, decimalesTexto = ''] = texto.split('.');
  const unidades = Number(unidadesTexto || 0);
  const centavos = unidades * 100 + Number((decimalesTexto + '00').slice(0, 2));

  // Un entero seguro se puede representar sin perder precisión en JavaScript.
  if (!Number.isSafeInteger(centavos) || centavos <= 0) {
    return { valido: false, valor: 0, mensaje: 'El precio debe ser un número mayor que cero.' };
  }

  return { valido: true, valor: centavos, mensaje: '' };
}

// Construimos botones sin listeners propios: el contenedor atenderá todos sus clics.
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

// CREATE y READ: creamos una tarjeta, la mostramos y guardamos sus datos en el estado.
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
  // textContent muestra el nombre literalmente; no interpreta etiquetas escritas por el usuario.
  nombreVisible.textContent = nombreSeguro;

  const precioVisible = document.createElement('span');
  precioVisible.className = 'plato__precio';
  // dataset conserva el precio numérico: no necesitamos extraerlo del texto con símbolo de moneda.
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

// UPDATE, paso 1: buscamos dentro de esta tarjeta y sustituimos sus textos por campos editables.
function iniciarEdicion(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return false;
  }

  if (tarjeta.querySelector('.plato__editar-nombre, .plato__editar-precio')) {
    return false;
  }

  // Bajar en el DOM: querySelector parte de la tarjeta recibida y no busca en los otros platos.
  const nombreActual = tarjeta.querySelector('.plato__nombre');
  const precioActual = tarjeta.querySelector('.plato__precio');

  if (!nombreActual || !precioActual) {
    return false;
  }

  const nombreInputEdicion = document.createElement('input');
  nombreInputEdicion.type = 'text';
  nombreInputEdicion.className = 'plato__editar-nombre';
  nombreInputEdicion.setAttribute('aria-label', 'Nombre del plato en edición');
  nombreInputEdicion.value = nombreActual.textContent.trim();

  const precioInputEdicion = document.createElement('input');
  precioInputEdicion.type = 'number';
  precioInputEdicion.min = '0.01';
  precioInputEdicion.step = '0.01';
  precioInputEdicion.className = 'plato__editar-precio';
  precioInputEdicion.setAttribute('aria-label', 'Precio del plato en edición, en pesos colombianos');
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

// UPDATE, paso 2: solo actualizamos el estado y la tarjeta cuando todos los datos son válidos.
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

// Cancelar recupera el estado original: escribir en el input todavía no había cambiado menuData.
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

// DELETE: quitamos del estado el ID elegido y del DOM únicamente su tarjeta.
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

// REGIÓN COMPAÑERO 3: pedido, único listener delegado y arranque.
// Acción del proyecto 2: una línea de pedido es una copia, no una referencia al plato editable.
function agregarAlPedido(tarjeta) {
  if (!(tarjeta instanceof Element)) {
    return null;
  }

  if (!listaPedido) {
    mostrarMensaje('No se pudo acceder a la lista del pedido.');
    return null;
  }

  const nombreVisible = tarjeta.querySelector('.plato__nombre');
  const precioVisible = tarjeta.querySelector('.plato__precio');

  if (!nombreVisible || !precioVisible) {
    mostrarMensaje('No se pudo agregar el plato porque faltan datos válidos.');
    return null;
  }

  const nombre = nombreVisible.textContent.trim();
  const precioCentavos = Number(precioVisible.dataset.precioCentavos || 0);

  if (!validarNombre(nombre) || !Number.isSafeInteger(precioCentavos) || precioCentavos <= 0) {
    mostrarMensaje('No se pudo agregar el plato porque faltan datos válidos.');
    return null;
  }

  // Cada clic crea un nodo nuevo: pedir dos veces produce dos líneas independientes.
  const linea = document.createElement('li');
  linea.textContent = `${nombre} — ${formatearPrecio(precioCentavos)}`;

  listaPedido.append(linea);
  mostrarMensaje(`Se agregó "${nombre}" al pedido.`);
  return linea;
}

// El arranque conecta formulario y acciones una sola vez, cuando el DOM ya existe gracias a defer.
function inicializarApp() {
  if (!menuApp || !formPlato || !listaPlatos || !listaPedido) {
    throw new Error('No se pudo inicializar la aplicación: faltan elementos requeridos del menú.');
  }

  // Esta bandera evita duplicar eventos si alguien vuelve a llamar a inicializarApp.
  if (menuApp.dataset.inicializado === 'true') {
    return;
  }

  const botonSubmit = formPlato.querySelector('button[type="submit"]');
  if (!botonSubmit) {
    throw new Error('No se pudo inicializar la aplicación: falta el botón para agregar platos.');
  }

  menuApp.dataset.inicializado = 'true';
  // Habilitamos Agregar solo después de comprobar que existen los elementos requeridos.
  botonSubmit.disabled = false;

  const estadoDesarrollo = document.getElementById('estado-desarrollo');
  if (estadoDesarrollo) {
    estadoDesarrollo.remove();
  }

  const descripcionesFormulario = (formPlato.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter((id) => id && id !== 'estado-desarrollo');
  if (descripcionesFormulario.length) {
    formPlato.setAttribute('aria-describedby', descripcionesFormulario.join(' '));
  } else {
    formPlato.removeAttribute('aria-describedby');
  }

  // DELEGACIÓN: el clic de un botón asciende hasta este contenedor, incluso en tarjetas nuevas.
  menuApp.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    // La delegación resuelve el botón desde el elemento exacto que recibió el clic.
    const boton = event.target.closest('button[data-action]');
    if (!boton || !menuApp.contains(boton)) {
      return;
    }

    // closest sube del botón a su tarjeta; se rechazan tarjetas fuera del menú.
    const tarjeta = boton.closest('.plato');
    if (!tarjeta || !listaPlatos.contains(tarjeta)) {
      return;
    }

    // data-action decide la operación; todas reciben la tarjeta del botón pulsado.
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

  // Submit es independiente del clic delegado: también permite agregar usando Enter.
  formPlato.addEventListener('submit', (event) => {
    // Evitamos que el formulario recargue la página y borre el menú que está en memoria.
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

    const tarjetaCreada = crearPlato(nombre, validacionPrecio.valor);
    if (
      tarjetaCreada instanceof Element
      && tarjetaCreada.matches('.plato[data-id]')
      && listaPlatos.contains(tarjetaCreada)
    ) {
      // Limpiar solo después del éxito permite corregir los datos si la creación falla.
      formPlato.reset();
    } else {
      mostrarMensaje('No se pudo agregar el plato. Verifica los datos e inténtalo de nuevo.');
    }
  });
}

// Comenzamos una vez; el atributo defer del script asegura que el HTML ya se haya leído.
inicializarApp();
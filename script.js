'use strict';

let menuData = [];

// Referencias a los elementos del DOM principales
const menuForm = document.getElementById('menu-form');
const menuBody = document.getElementById('menu-body');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');

// Generar un identificador único basado en el tiempo actual
function generarId() {
    return Date.now().toString();
}

// Validar que los campos de texto y precio no estén vacíos o sean inválidos
function validarDatos(nombre, precio) {
    if (!nombre || nombre.trim() === '') {
        alert('El nombre del platillo no puede estar vacío.');
        return false;
    }
    if (isNaN(precio) || parseFloat(precio) <= 0) {
        alert('El precio debe ser un número mayor a 0.');
        return false;
    }
    return true;
}

// Mantener el estado vacío coherente si no hay elementos
function actualizarEstadoVacio() {
    if (menuData.length === 0) {
        menuBody.innerHTML = '';
        const trVacio = document.createElement('tr');
        const tdVacio = document.createElement('td');
        tdVacio.colSpan = 3;
        tdVacio.style.textAlign = 'center';
        tdVacio.textContent = 'No hay platillos agregados al menú.';
        trVacio.appendChild(tdVacio);
        menuBody.appendChild(trVacio);
    }
}

// R: Mostrar / Renderizar el menú completo en la tabla
function mostrarMenu() {
    menuBody.innerHTML = '';
    
    if (menuData.length === 0) {
        actualizarEstadoVacio();
        return;
    }

    menuData.forEach(platillo => {
        const tr = document.createElement('tr');
        tr.dataset.id = platillo.id; // Guardamos el ID único en el dataset de la fila

        // Celda de nombre (Segura con textContent)
        const tdNombre = document.createElement('td');
        tdNombre.textContent = platillo.nombre;

        // Celda de precio (Segura con textContent)
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${parseFloat(platillo.precio).toFixed(2)}`;

        // Celda de acciones con clases identificadoras para la delegación de eventos
        const tdAcciones = document.createElement('td');
        tdAcciones.innerHTML = `
            <button class="btn btn-edit btn-accion-editar">Editar</button>
            <button class="btn btn-delete btn-accion-eliminar">Eliminar</button>
        `;

        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdAcciones);

        menuBody.appendChild(tr);
    });
}

// C: Crear platillo mediante el formulario principal
menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = nombreInput.value;
    const precio = precioInput.value;

    if (!validarDatos(nombre, precio)) return;

    const nuevoPlatillo = {
        id: generarId(),
        nombre: nombre.trim(),
        precio: parseFloat(precio)
    };

    menuData.push(nuevoPlatillo);
    mostrarMenu();
    menuForm.reset();
});

// ==========================================================================
// UN SOLO ADD EVENT LISTENER EN EL CONTENEDOR (DELEGACIÓN DE EVENTOS)
// ==========================================================================
menuBody.addEventListener('click', (e) => {
    const elemento = e.target;

    // DOM Traversing: Navegamos desde el botón clickeado hasta su fila contenedora (tr)
    const filaTarget = elemento.parentElement.parentElement;
    const id = filaTarget.dataset.id;

    // 1. ELIMINAR PLATILLO (D)
    if (elemento.classList.contains('btn-accion-eliminar')) {
        menuData = menuData.filter(item => item.id !== id);
        mostrarMenu();
    }

    // 2. ACTIVAR MODO EDICIÓN (U - Parte 1)
    if (elemento.classList.contains('btn-accion-editar')) {
        const platillo = menuData.find(item => item.id === id);
        if (!platillo) return;

        // DOM Traversing usando children para acceder a las celdas de la fila
        const tdNombre = filaTarget.children[0];
        const tdPrecio = filaTarget.children[1];
        const tdAcciones = filaTarget.children[2];

        // Reemplazar texto por inputs seguros para editar en línea
        tdNombre.innerHTML = '';
        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.value = platillo.nombre;
        tdNombre.appendChild(inputNombre);

        tdPrecio.innerHTML = '';
        const inputPrecio = document.createElement('input');
        inputPrecio.type = 'number';
        inputPrecio.value = platillo.precio;
        tdPrecio.appendChild(inputPrecio);

        // Cambiar botones de acción a Guardar y Cancelar
        tdAcciones.innerHTML = `
            <button class="btn btn-primary btn-accion-guardar">Guardar</button>
            <button class="btn btn-delete btn-accion-cancelar">Cancelar</button>
        `;
    }

    // 3. GUARDAR EDICIÓN (U - Parte 2)
    if (elemento.classList.contains('btn-accion-guardar')) {
        // DOM Traversing con firstElementChild para capturar el valor de los inputs creados
        const inputNombre = filaTarget.children[0].firstElementChild;
        const inputPrecio = filaTarget.children[1].firstElementChild;

        const nuevoNombre = inputNombre.value;
        const nuevoPrecio = inputPrecio.value;

        if (!validarDatos(nuevoNombre, nuevoPrecio)) return;

        // Búsqueda local y actualización en el array de datos
        const platillo = menuData.find(item => item.id === id);
        if (platillo) {
            platillo.nombre = nuevoNombre.trim();
            platillo.precio = parseFloat(nuevoPrecio);
        }

        mostrarMenu();
    }

    // 4. CANCELAR EDICIÓN (U - Parte 3: Mantiene los datos originales intactos)
    if (elemento.classList.contains('btn-accion-cancelar')) {
        mostrarMenu();
    }
});

// Inicializar la vista limpia al cargar la página
actualizarEstadoVacio();
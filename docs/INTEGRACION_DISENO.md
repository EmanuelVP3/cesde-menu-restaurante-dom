# Integrar la estructura y el diseño

La rama `feature/diseno-elegante-menu` incluye la estructura de `feature/estructura-estilos-menu` y la mejora visual. Integrar **esta rama una sola vez hacia develop**; no es necesario integrar por separado las dos ramas de diseño. Revisar el pull request antes de fusionarlo.

## Reparto para reducir conflictos

- Emanuel mantiene `index.html` y `style.css`.
- El compañero 2 modifica la región de CRUD de `script.js`.
- El compañero 3 modifica la región de pedido y eventos de `script.js`.
- El compañero 4 mantiene las pruebas, evidencia y presentación en `docs/`.

Todos conservan el contrato de selectores de `PROMPT_GENERAL.md`. Separar ramas permite revisar el trabajo; no evita conflictos si dos personas cambian las mismas líneas.

## Después de integrar el diseño en develop

Cada integrante guarda sus cambios en un commit y actualiza su rama:

```sh
git fetch origin
git switch NOMBRE-DE-SU-RAMA
git merge origin/develop
```

Reemplazar `NOMBRE-DE-SU-RAMA` por la rama real. Si aparece un conflicto, resolverlo con el responsable del archivo antes de continuar. No reemplazar archivos completos por versiones de otra conversación de IA.

## Al clonar

La clonación abre la rama predeterminada del repositorio, normalmente `main`. Para consultar la integración:

```sh
git clone https://github.com/EmanuelVP3/cesde-menu-restaurante-dom.git
cd cesde-menu-restaurante-dom
git switch develop
```

## Pendiente al conectar la lógica

- Habilitar el botón submit y retirar `#estado-desarrollo` al integrar el formulario funcional; quitar también esa referencia de `aria-describedby`.
- Los mensajes vacíos del diseño son hermanos de las listas. CSS los oculta al tener contenido. Si CRUD crea su propio mensaje vacío dentro de la lista, eliminar el aviso hermano correspondiente para no duplicarlo. Mantener los IDs de las listas.
- La imagen de portada es una composición decorativa CSS con `aria-hidden`; no representa un producto real. Las fotos de platos son opcionales y no forman parte del contrato actual: nombre y precio.
- Revisar escritorio, móvil y teclado en un navegador local. La revisión visual de esta versión queda pendiente; la herramienta no pudo acceder al archivo local.

La mejora visual no implementa ni modifica el CRUD o los pedidos.

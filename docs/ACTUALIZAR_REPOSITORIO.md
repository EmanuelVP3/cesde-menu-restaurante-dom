# Cómo actualizar la copia local

Ejecutar los comandos dentro de la carpeta cesde-menu-restaurante-dom.

## Antes de actualizar

```sh
git status
```

Si aparecen archivos modificados, guardarlos en un commit en su rama antes de continuar. No usar reset --hard ni descartar cambios de otros compañeros para resolver una actualización.

## Descargar la versión compartida

```sh
git switch develop
git pull --ff-only origin develop
```

Para consultar la versión publicada en main:

```sh
git switch main
git pull --ff-only origin main
```

## Incorporar la integración a su rama de trabajo

Primero guardar sus cambios. Luego, sustituyendo el nombre de ejemplo por su rama real:

```sh
git fetch origin
git switch trabajo/pedidos-integracion
git merge origin/develop
```

Si hay conflictos, revisar los bloques marcados con el dueño del archivo, conservar ambos aportes necesarios, probar y finalizar el merge con git add y git commit. No aceptar automáticamente todo un lado.

Después de nuevos cambios propios:

```sh
git add script.js
git commit -m "fix: describe el ajuste realizado"
git push origin trabajo/pedidos-integracion
```

Agregar solo los archivos que realmente correspondan a su parte. Si aparece «nothing to commit, working tree clean», no crear un commit vacío: comprobar que están en la rama correcta y que los cambios ya fueron guardados.

## Nueva tarea

Partir de develop actualizado y crear una rama nueva:

```sh
git switch develop
git pull --ff-only origin develop
git switch -c feature/nombre-de-la-tarea
```

Subirla con git push -u origin feature/nombre-de-la-tarea y proponer un pull request hacia develop. Después de revisar y probar, integrar develop en main. Un pull descarga cambios: no publica los cambios locales ni sustituye el merge entre ramas.

## Primera descarga

```sh
git clone https://github.com/EmanuelVP3/cesde-menu-restaurante-dom.git
cd cesde-menu-restaurante-dom
git switch develop
```

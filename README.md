# Menú de restaurante — DOM Traversing

Proyecto 2 de Front I, CESDE–Comfama. Base de trabajo para cuatro estudiantes: crear, mostrar, editar y eliminar platos con nombre y precio; usar **Pedir** para agregarlos a una lista de pedido mediante `closest` y `querySelector`.

## Estado

Repositorio de preparación: contiene el plan compartido y archivos iniciales; **el CRUD y el pedido todavía deben implementarse**. No se han ejecutado pruebas funcionales ni recogido evidencias. La guía original contempla equipos de dos o tres; este reparto se adapta a cuatro por solicitud del equipo. Confirmen con el docente esa adaptación.

## Empezar

1. Leer [PROMPT_GENERAL.md](PROMPT_GENERAL.md), incluido el contrato de integración.
2. Cada integrante copia el prompt general y el prompt de su parte en su IA, e indica su nombre y la etapa que realizará.
3. Abrir `index.html` en un navegador. No requiere instalación, servidor ni dependencias.
4. Implementar por etapas y completar [las pruebas](docs/PRUEBAS.md), [la evidencia de IA](docs/EVIDENCIA_IA.md) y [la presentación](docs/PRESENTACION.md).

## Estructura

```text
cesde-menu-restaurante-dom/
├── PROMPT_GENERAL.md
├── README.md
├── .gitignore
├── index.html
├── style.css
├── script.js
└── docs/
    ├── PRUEBAS.md
    ├── EVIDENCIA_IA.md
    ├── PRESENTACION.md
    └── evidencias/
```

Los tres archivos de la aplicación conservan los nombres que exige el PDF. La documentación acompaña el trabajo; no agrega herramientas ni dependencias a la aplicación.

## Ramas y responsabilidades

| Rama | Uso / responsable |
| --- | --- |
| `main` | Entrega verificada |
| `develop` | Integración del equipo |
| `trabajo/estructura-estilos` | Compañero 1: HTML y CSS |
| `trabajo/crud-platos` | Compañero 2: funciones de CRUD |
| `trabajo/pedidos-integracion` | Compañero 3: pedido, delegación y arranque |
| `trabajo/pruebas-presentacion` | Compañero 4: pruebas, evidencia y exposición |

Las ramas no incluyen referencias a IA. Cada estudiante hace sus propios commits con su identidad; no se atribuye a compañeros trabajo que aún no hayan realizado. El commit inicial usa la identidad Git de Emanuel.

Flujo: partir de `develop`, trabajar en la rama asignada, hacer commits pequeños y abrir un pull request hacia `develop`. Otro integrante revisa; integrar primero HTML/CSS, luego CRUD y pedidos. Compañeros 2 y 3 comparten `script.js`: usar las regiones acordadas, actualizar desde `develop` antes de integrar y resolver los conflictos juntos. Compañero 4 ejecuta pruebas sobre `develop` integrado. Llevar a `main` cuando pase la lista de verificación. No usar push forzado.

```sh
git switch develop
git pull --ff-only origin develop
git switch trabajo/estructura-estilos
git merge develop
# Tras implementar y revisar sus cambios:
git add index.html style.css
git commit -m "Agrega estructura y estilos del menú"
git push -u origin trabajo/estructura-estilos
```

Los nombres «Compañero 1–4» son espacios de asignación: anoten sus nombres en el prompt antes de empezar.

## Repositorio en GitHub

[cesde-menu-restaurante-dom](https://github.com/EmanuelVP3/cesde-menu-restaurante-dom)

Para descargar el proyecto y comenzar desde la rama de integración:

```sh
git clone https://github.com/EmanuelVP3/cesde-menu-restaurante-dom.git
cd cesde-menu-restaurante-dom
git switch develop
```

Luego cambiar a la rama asignada en la tabla de responsabilidades. Si el repositorio es privado, los integrantes deben estar invitados como colaboradores.

## Entrega

Carpeta con `index.html`, `style.css`, `script.js`, presentación de siete diapositivas y evidencias reales de uso de IA. Todos deben explicar el código con sus palabras y demostrar primera fila, última fila y lista vacía sin errores en consola. No agregar backend, frameworks, autenticación, pagos ni persistencia a este ejercicio.


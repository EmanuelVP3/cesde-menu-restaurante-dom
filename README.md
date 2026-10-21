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

## Publicar en GitHub

La llave universitaria fue verificada con la cuenta **EmanuelVP3**. SSH permite subir código; crear un repositorio requiere una sesión web o API. No confundir la carpeta y ramas locales con un repositorio remoto ya creado.

Si el repositorio aún no existe, iniciar sesión en GitHub como EmanuelVP3 y crear `cesde-menu-restaurante-dom`, preferiblemente privado mientras trabajan. No inicializarlo con README, licencia ni .gitignore: estos ya están en la carpeta local. Invitar a los otros tres integrantes desde Settings → Collaborators con sus usuarios reales (pendientes de proporcionar).

Desde esta carpeta, después de crear el repositorio vacío:

```powershell
git config core.sshCommand 'ssh -i C:/Users/evasquez/.ssh/id_ed25519_u -o IdentitiesOnly=yes'
git remote add origin git@github.com:EmanuelVP3/cesde-menu-restaurante-dom.git
git push -u origin main develop trabajo/estructura-estilos trabajo/crud-platos trabajo/pedidos-integracion trabajo/pruebas-presentacion
```

Si `origin` ya existe, comprobar `git remote -v` antes de cambiarlo. La ruta de la llave es local a Emanuel: los compañeros usan sus propias credenciales y nunca copian llaves privadas al proyecto.

## Entrega

Carpeta con `index.html`, `style.css`, `script.js`, presentación de siete diapositivas y evidencias reales de uso de IA. Todos deben explicar el código con sus palabras y demostrar primera fila, última fila y lista vacía sin errores en consola. No agregar backend, frameworks, autenticación, pagos ni persistencia a este ejercicio.

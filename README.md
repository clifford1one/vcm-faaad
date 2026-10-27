# vcm-faaad

Proyectos de **Vinculación con el Medio (VcM)** de la Facultad de Arquitectura, Arte y Diseño (FaAAD) de la Universidad Diego Portales (UDP).

## Proyectos

| Carpeta | Descripción |
| --- | --- |
| [formulario-actividades](formulario-actividades/) | Formulario web (Google Apps Script) para solicitudes de actividades de la FaAAD. Distribuye cada solicitud a spreadsheets, carpetas de Drive y correos según su tipo. |
| [formulario-perfi-ingreso](formulario-perfi-ingreso/) | Encuesta de perfil de ingreso para estudiantes de primer año de Diseño. |
| [medio-corte](medio-corte/) | Evento Medio Corte (20 y 21 de noviembre de 2026, Salvador Sanfuentes 2221, Santiago): planos, standing y formulario de convocatoria. |
| [mexico-design-week](mexico-design-week/) | Participación de la Escuela de Diseño en México Design Week: modelos 3D del espacio y one-pager de los proyectos. |

Cada carpeta tiene su propio `README.md` con el detalle.

## Estructura

```text
formulario-actividades/     index.html, script.js, style.css, code.gs (Apps Script)
formulario-perfi-ingreso/   index.html, style.css
medio-corte/
  fomrulario-convocatoria-v3/   versión vigente del formulario (code.gs, index.html)
  formulario-convocatoria-v2/   versión anterior
  formulario-comvocatoria/      versión inicial
  standing-a-frame/             modelo 3D del standing
  files/                        planos, teaser y material de referencia
mexico-design-week/
  one-pager/                    one-pager (PDF/SVG/PNG) e imágenes
  files/                        modelos 3D del espacio
```

## Tecnologías

- **Formularios:** HTML, CSS y JavaScript, desplegados con Google Apps Script (`code.gs`).
- **Diseño:** Rhino (`.3dm`), SketchUp (`.skp`), Affinity (`.af`), Illustrator (`.ai`), Photoshop (`.psd`).

## Licencia

[MIT](LICENSE)

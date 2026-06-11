# formulario de actividades

dividio en 3 tipos de actividades

1. Iniciativas de Extensión Organizadas por UDP
2. Participación en Instancias Externas
3. Proyectos de Investigación, creación e innovación

la idea es que la info que proporcionen en el formulario se pase automáticamente a un spreadsheets, y las imágenes a un carpeta de google drive. Esto automatizado con appscript.

Link de la carpeta de drive:

- <https://drive.google.com/drive/u/1/folders/114KG_idXui1SK3amPksnTVK5ejd8mted>

Link del spreadsheet:

- <https://docs.google.com/spreadsheets/d/1zuFTho0-2zNFo2zzrFC3w_5hehucmAgJzHeWb1y6uRU/edit?usp=sharing>

Link del appscript

- <https://script.google.com/d/1ilYLD5aOOhDJG-KC4mCjGIsPP79lHkVIzp9BDLfHE65Zn-sBRWWEYgZG/edit?usp=sharing>



pruebaaa 

```

function testVcm() {
  var payload = {
    tipoSolicitud: 'vcm',
    actividadVcm: 'Prueba actividad',
    responsableVcm: 'Juan Pérez',
    fechaVcm: '04-06-2026',
    nombreResponsable: 'Juan Pérez',
    emailResponsable: 'juan@mail.com'
  };
  var resultado = enviarProyecto(payload);
  Logger.log(resultado);
}
```

## nueva version

hay 4 tipo de actividades.

1. Iniciativas de Extensión Organizadas por UDP
2. Participación en Instancias Externas
3. Proyectos de Investigación, creación e innovación
4. VcM

4 va directo a merry, y a un sprradsheet de la merry

1-3 van a un spreadsheet general, donde se rellena una pestaña general, y automáticamente se pasa a cada pestaña específica.

la pestaña general contiene casillas para todas los tipos de solicitudes. Organizados de esta manera.

```csv
  GENERAL:
  ESTADO, Marca temporal, Dirección de correo electrónico, ¿Qué tipo de iniciativa quieres registrar?

  EXTENSIÓN:
  Organiza(n),Título de la actividad,Nombre del ciclo o proyecto al que pertenece,Descripción del evento o iniciativa,Participan o colaboran,Reseña de participantes e instituciones,Fecha y Hora,Lugar,Formato,Público objetivo,Cantidad de asistentes,Solicitud de apoyo gráfico

  EXTERNA:
  Organiza(n),Título,Descripción de la iniciativa,Participan o colaboran,Reseña de los participantes,Enlaces,Fecha y Hora (opcional),Lugar,"Formato
  En caso de ser online u híbrido es necesario tener la autorización de los invitados.",Público objetivo,Cantidad de asistentes,Imágenes,Adjuntar logos (no FAAD),Hipervínculos,Equipo técnico,Disposición de sala / auditorio,"Cobertura fotográfica, filmación o transmisión de la actividad",Solicitudes especiales

  PUBLICACIONES:
  Título,"En caso de ser un capítulo de libro, indicar el título del libro",Resumen o reseña (abstract),Año,País,ISBN / ISSN,Editorial o revista,Cita completa,DOI o URL,Indexación,Enlaces complementarios,Documento e imágenes,Comentarios adicionales,Título,Descripción,Biografía ,Documentos e imágenes

  INVESTIGACIÓN:
  Título del proyecto,¿Este proyecto contó con financiamiento UDP?,Reseña,Financiamiento - Agencia,Financiamiento - Línea / Programa,Año de adjudicación,Año de inicio,Año de termino,Monto adjudicado,Rol UDP,Investigador/a responsable del proyecto,Colaboradores / equipo de trabajo,Imagen representativa del proyecto

  N.a:
  Tipo de publicación,Link a aparición en prensa (URL),Unidad FaAAD de la actividad,Unidad FaAAD a la que está asociada la actividad,Imágenes,
  
```

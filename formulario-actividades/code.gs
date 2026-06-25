// a partir de aca, es codigo nuevo que lo separa en las pestañas
// spreadsheet oficial
var SPREADSHEET_ID = '18EUt_wauhDenkEmjawYFDDZ7XYgLmSiIQmonL4LVRIA';
var SHEET_GENERAL = 'Respuestas de Formulario 1';

//spreadsheet vcm
var SPREADSHEET_ID_VCM = '1mssLeTJuhg49QZPdkB7zQZO78p5AuA6J71hX302aciw';
// var SHEET_GENERAL_VCM = 'pruebitas'
var SHEET_GENERAL_VCM = 'Registro-VcM';


// spreadsheet emi - para proyectoooos
var SPREADSHEET_ID_PROYECTOS = '1Y_pmmK7_d_mQAK3xOXO9k0ADidAzcqXbBcZnTqEmdks';
var SHEET_PROYECTOS = 'Proyectos';


var DRIVE_FOLDER_ID = '1Qd9rSijCviNjZU6j7IeekKv-L56TWTm5'; // imagenes (solicitudes-general)
var DRIVE_FOLDER_ID_PUBLICACION = '1_QqPOgXPq5u2xjR3NdJql7as17hcLyFj'; // imagenes (publicacion-proyectos)
var DRIVE_FOLDER_ID_VCM = '1fuYLDH2Vhsix5i0fEAMFzLydDd6E-Y_b'; // imagenes (vcm)

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('Formulario de Actividades — FaAAD UDP')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function enviarProyecto(payload) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    var datePrefix = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // 1. Determinar el título para el nombre de la carpeta
    // var titulo = payload.tituloExtension || payload.tituloExterna || payload.tituloInvestigacion || "Sin Titulo";
    var titulo = payload.tituloExtension2 || payload.tituloExterna2 || payload.tituloInvestigacion2 || payload.actividadVcm || payload.nombreProyectoPublicacion || "Sin Titulo";
    var folderName = datePrefix + "-" + titulo;

    // // 2. Crear la carpeta en Drive
    // var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    // var newFolder = parentFolder.createFolder(folderName);
    // var folderUrl = newFolder.getUrl();
    // var imagesFolder = newFolder.createFolder("Imágenes");

    // 2. Crear la carpeta en Drive
    // var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

    var folderIdToUse = DRIVE_FOLDER_ID;
    if (payload.tipoSolicitud === 'publicacion') folderIdToUse = DRIVE_FOLDER_ID_PUBLICACION;
    else if (payload.tipoSolicitud === 'vcm') folderIdToUse = DRIVE_FOLDER_ID_VCM;

    var parentFolder = DriveApp.getFolderById(folderIdToUse);

    var tipoNombre = '';
    if (payload.tipoSolicitud === 'extension2') tipoNombre = '1. Extensión UDP';
    if (payload.tipoSolicitud === 'externa2') tipoNombre = '2. Participación externa';
    if (payload.tipoSolicitud === 'investigacion2') tipoNombre = '3. Investigación';

    var tipoFolders = parentFolder.getFoldersByName(tipoNombre);
    var tipoFolder = tipoFolders.hasNext() ? tipoFolders.next() : parentFolder.createFolder(tipoNombre);

    var newFolder = tipoFolder.createFolder(folderName);
    var folderUrl = newFolder.getUrl();


    // 3. Subir los archivos si existen
    if (payload.archivos && payload.archivos.length > 0) {
      payload.archivos.forEach(function (fileObj) {
        try {
          // AJUSTE: Ahora busca 'fileObj.base64' (como está en tu HTML)
          // No hace falta split porque tu HTML ya lo hace antes de enviar
          var decodedData = Utilities.base64Decode(fileObj.base64);

          // AJUSTE: Ahora busca 'fileObj.name' (como está en tu HTML)
          var blob = Utilities.newBlob(decodedData, fileObj.type, fileObj.name || "imagen.jpg");

          var file = newFolder.createFile(blob);

          try {
            file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (e) {
            Logger.log("No se pudo cambiar permisos, pero el archivo se subió.");
          }
        } catch (err) {
          Logger.log("Error procesando archivo: " + err.message);
        }
      });
    }

    // 4. Mapear los datos al Excel (Fila de 92 columnas)
    var row = new Array(92).fill("");
    row[0] = "Pendiente";
    row[1] = timestamp;
    row[2] = payload.emailResponsable;
    row[3] = payload.tipoSolicitud; // tipo de iniciativa
    // row[9] = folderUrl; // Columna J

    if (payload.tipoSolicitud === 'extension2') {
      var organizaExt2 = payload.organizaExtension2;
      row[4] = organizaExt2;
      row[5] = payload.tituloExtension2;
      row[6] = payload.cicloExtension2;
      row[7] = payload.descripcionExtension2;
      row[8] = payload.participanExtension2;
      row[9] = payload.reseñaParticipantesExtension2;
      row[10] = payload.fechaHoraExtension2;
      row[11] = payload.lugarExtension2;
      row[12] = payload.formatoExtension2;
      row[13] = payload.publicoObjetivoExtension2;
      row[14] = payload.cantidadAsistentesExtension2;
      // row[15] = payload.apoyoGraficoExtension2;
      row[15] = payload.apoyoGraficoExtension2 === 'Sí' ? folderUrl : payload.apoyoGraficoExtension2;
    } else if (payload.tipoSolicitud === 'externa2') {
      row[16] = payload.organizaExterna2;
      row[17] = payload.tituloExterna2;
      row[18] = payload.descripcionExterna2;
      row[19] = payload.participanExterna2;
      row[20] = payload.reseñaParticipantesExterna2;
      row[21] = payload.enlacesExterna2;
      row[22] = payload.fechaHoraExterna2;
      row[23] = payload.lugarExterna2;
      row[24] = payload.formatoExterna2;
      row[25] = payload.publicoObjetivoExterna2;
      row[26] = payload.cantidadAsistentesExterna2;
      row[27] = folderUrl; // imágenes (link a la carpeta de Drive)
      row[28] = folderUrl; // logos (mismo link, ya que van en la misma carpeta)
      row[29] = payload.hipervínculosExterna2;
      row[30] = payload.equipoTecnicoExterna2 ? payload.equipoTecnicoExterna2.join(', ') : '';
      row[31] = payload.disposicionSalaExterna2;
      row[32] = payload.coberturaExterna2 ? payload.coberturaExterna2.join(', ') : '';
      row[33] = payload.solicitudesEspecialesExterna2 ? payload.solicitudesEspecialesExterna2.join(', ') : '';
    } else if (payload.tipoSolicitud === 'investigacion2') {
      row[51] = payload.tituloInvestigacion2;
      row[52] = payload.financiamientoUdpInvestigacion2;
      row[53] = payload.reseñaInvestigacion2;
      row[54] = payload.agenciaInvestigacion2;
      row[55] = payload.lineaProgramaInvestigacion2;
      row[56] = payload.anioAdjudicacionInvestigacion2;
      row[57] = payload.anioInicioInvestigacion2;
      row[58] = payload.anioTerminoInvestigacion2;
      row[59] = payload.montoAdjudicadoInvestigacion2;
      row[60] = payload.rolUdpInvestigacion2;
      row[61] = payload.investigadorResponsableInvestigacion2;
      row[62] = payload.colaboradoresInvestigacion2;
      row[63] = folderUrl;
    } else if (payload.tipoSolicitud === 'vcm') {
      row[0] = payload.actividadVcm;
      row[1] = payload.nivelVcm;
      row[2] = payload.lineaEstrategicaVcm;
      row[3] = payload.convenioVcm;
      row[4] = payload.institucionConvenioVcm;
      row[5] = payload.contraparteVcm;
      row[6] = payload.financiamientoVcm;
      // en la 6, se pone el tipo de financ, no importa si externo interno u otro
      row[7] = payload.tipoFinanciamientoVcm || payload.fondoExternoVcm || payload.fondoInternoVcm;
      row[8] = payload.montoVcm;
      // row[8] = payload.fechaVcm;
      row[9] = (payload.fechaInicioVcm || '') + ' - ' + (payload.fechaTerminoVcm || '');
      row[10] = payload.objetivoVcm;
      row[11] = payload.responsableVcm;
      row[12] = payload.cursoVcm;
      row[13] = payload.outputVcm;
      row[14] = payload.outcomeVcm;
      row[15] = payload.indicadorActividadVcm;
      row[16] = payload.indicadorResultadoVcm;
    }

    row[90] = payload.nombreResponsable;

    //     // 5. Guardar en la pestaña GENERAL
    //     var sheetGeneral = ss.getSheetByName(SHEET_GENERAL);
    //     if (sheetGeneral) {
    //       sheetGeneral.appendRow(row);
    //     }

    //     return { exito: true, mensaje: 'Solicitud guardada con éxito.' };

    //   } catch (e) {
    //     return { exito: false, mensaje: 'Error: ' + e.toString() };
    //   }
    // }

    if (payload.tipoSolicitud === 'vcm') {
      var ssVcm = SpreadsheetApp.openById(SPREADSHEET_ID_VCM);
      var sheetVcm = ssVcm.getSheetByName('Registro-VcM');
      if (sheetVcm) {
        sheetVcm.appendRow(row);
      }

      MailApp.sendEmail({
        to: 'santiago.gaete@mail.udp.cl, maria.faundez4@mail.udp.cl',
        subject: '[FaAAD Diseño] Nueva actividad registrada: VcM',
        htmlBody:
          '<p>Estimado/a, te llega este correo porque se ha registrado una nueva actividad en el formulario único de registro FaAAD correspondiente a la unidad que coordinas. A continuación encontrarás el detalle. Si necesitas más información, puedes revisar la planilla completa al final del mensaje.</p>' +
          '<p>Ten en cuenta que este correo solo despliega la información que la persona ingresó al hacer clic en enviar. Si por algún motivo la persona actualiza la respuesta, solo verás esa diferencia indicada en la planilla.</p>' +
          '<hr>' +
          '<p><strong>Descripción de la actividad:</strong> ' + (payload.actividadVcm || '') + '</p>' +
          '<p><strong>Nivel:</strong> ' + (payload.nivelVcm || '') + '</p>' +
          '<p><strong>Línea estratégica:</strong> ' + (payload.lineaEstrategicaVcm || '') + '</p>' +
          '<p><strong>Convenio:</strong> ' + (payload.convenioVcm || '') + '</p>' +
          '<p><strong>Contraparte:</strong> ' + (payload.contraparteVcm || '') + '</p>' +
          '<p><strong>Financiamiento:</strong> ' + (payload.financiamientoVcm || '') + '</p>' +
          '<p><strong>Tipo de financiamiento:</strong> ' + (payload.tipoFinanciamientoVcm || '') + '</p>' +
          '<p><strong>Fondo externo:</strong> ' + (payload.fondoExternoVcm || '') + '</p>' +
          '<p><strong>Fondo interno:</strong> ' + (payload.fondoInternoVcm || '') + '</p>' +
          '<p><strong>Monto:</strong> ' + (payload.montoVcm || '') + '</p>' +
          '<p><strong>Fecha y hora:</strong> ' + (payload.fechaVcm || '') + '</p>' +
          '<p><strong>Objetivo:</strong> ' + (payload.objetivoVcm || '') + '</p>' +
          '<p><strong>Responsable:</strong> ' + (payload.responsableVcm || '') + '</p>' +
          '<p><strong>Curso:</strong> ' + (payload.cursoVcm || '') + '</p>' +
          '<p><strong>Resultado esperado (output):</strong> ' + (payload.outputVcm || '') + '</p>' +
          '<p><strong>Resultado esperado (outcome):</strong> ' + (payload.outcomeVcm || '') + '</p>' +
          '<p><strong>Indicador de actividad:</strong> ' + (payload.indicadorActividadVcm || '') + '</p>' +
          '<p><strong>Indicador de resultado:</strong> ' + (payload.indicadorResultadoVcm || '') + '</p>' +
          '<p><strong>Enviado por:</strong> ' + payload.nombreResponsable + ' (' + payload.emailResponsable + ')</p>' +
          '<hr>' +
          '<p><a href="https://docs.google.com/spreadsheets/d/1mssLeTJuhg49QZPdkB7zQZO78p5AuA6J71hX302aciw/edit?usp=sharing">Ver en la planilla</a></p>' +
          '<p>— Coordinaciones de Facultad <a href="https://faad.udp.cl/">Facultad de Arquitectura, Arte y Diseño</a> – UDP</p>'
      });
    } else if (payload.tipoSolicitud === 'publicacion') {
      var ssPub = SpreadsheetApp.openById(SPREADSHEET_ID_PROYECTOS);
      var sheetPub = ssPub.getSheetByName(SHEET_PROYECTOS);
      if (sheetPub) {
        var rowPub = [
          timestamp,
          payload.nombreProyectoPublicacion,
          payload.nombreResponsable,
          payload.emailResponsable,
          payload.tipoProyectoPublicacion,
          payload.coleccionPublicacion,
          payload.etiquetasPublicacion ? payload.etiquetasPublicacion.join(', ') : '',
          payload.descripcionPublicacion,
          [payload.linkWebPublicacion, payload.instagramPublicacion, payload.youtubePublicacion, payload.otrasRedesPublicacion].filter(Boolean).join(', '),
          payload.palabrasClavePublicacion,
          payload.linkVideoPublicacion,
          folderUrl,
          payload.archivos ? payload.archivos.length : 0,
          'Pendiente'
        ];
        sheetPub.appendRow(rowPub);

        MailApp.sendEmail({
          to: 'comunicaciones.diseno@mail.udp.cl',
          subject: '[FaAAD Diseño] Nuevo proyecto para publicación: ' + (payload.nombreProyectoPublicacion || 'Sin título'),
          htmlBody:
            '<p>Se ha registrado un nuevo proyecto para publicación.</p>' +
            '<hr>' +
            '<p><strong>Nombre del proyecto:</strong> ' + (payload.nombreProyectoPublicacion || '') + '</p>' +
            '<p><strong>Autor:</strong> ' + payload.nombreResponsable + '</p>' +
            '<p><strong>Email:</strong> ' + payload.emailResponsable + '</p>' +
            '<p><strong>Tipo:</strong> ' + (payload.tipoProyectoPublicacion || '') + '</p>' +
            '<p><strong>Colección/Muestra:</strong> ' + (payload.coleccionPublicacion || '') + '</p>' +
            '<p><strong>Descripción:</strong> ' + (payload.descripcionPublicacion || '') + '</p>' +
            '<p><strong>Palabras clave:</strong> ' + (payload.palabrasClavePublicacion || '') + '</p>' +
            '<hr>' +
            '<p><a href="' + folderUrl + '">Ver carpeta de imágenes en Drive</a></p>'
        });
      }
    } else {
      var sheetGeneral = ss.getSheetByName(SHEET_GENERAL);
      if (sheetGeneral) {
        sheetGeneral.appendRow(row);
      }

      // Buscar destinatario según tipo de solicitud
      var sheetDestinatarios = ss.getSheetByName('Destinatarios');
      if (sheetDestinatarios) {
        var columnaTipo = '';
        if (payload.tipoSolicitud === 'extension2') columnaTipo = 'B';
        else if (payload.tipoSolicitud === 'externa2') columnaTipo = 'C';
        // else if (payload.tipoSolicitud === 'publicacion') columnaTipo = 'D'; // publicación académica
        // E = prensa (no tiene tipo de solicitud asociado todavía)
        else if (payload.tipoSolicitud === 'investigacion2') columnaTipo = 'F';

        Logger.log('tipoSolicitud: ' + payload.tipoSolicitud);
        Logger.log('columnaTipo: ' + columnaTipo);
        Logger.log('sheetDestinatarios existe: ' + (sheetDestinatarios !== null));

        if (columnaTipo !== '') {
          var destinatario = sheetDestinatarios.getRange(columnaTipo + '4').getValue();
          if (destinatario) {
            MailApp.sendEmail({
              to: destinatario,
              subject: '[FaAAD Diseño] Nueva actividad registrada',
              htmlBody:
                // '<p>Estimado/a, te llega este correo porque se ha registrado un nuevo proyecto para publicación en el formulario de Diseño UDP. A continuación encontrarás el detalle. Si necesitas más información, puedes revisar la planilla completa al final del mensaje.</p>' +
                //   '<p>Ten en cuenta que este correo solo despliega la información que la persona ingresó al hacer clic en enviar. Si por algún motivo la persona actualiza la respuesta, solo verás esa diferencia indicada en la planilla.</p>' +
                //   '<hr>' +
                //   '<p><strong>Nombre del proyecto:</strong> ' + (payload.nombreProyectoPublicacion || '') + '</p>' +
                //   '<p><strong>Autor:</strong> ' + payload.nombreResponsable + '</p>' +
                //   '<p><strong>Email:</strong> ' + payload.emailResponsable + '</p>' +
                //   '<p><strong>Tipo:</strong> ' + (payload.tipoProyectoPublicacion || '') + '</p>' +
                //   '<p><strong>Colección/Muestra:</strong> ' + (payload.coleccionPublicacion || '') + '</p>' +
                //   '<p><strong>Descripción:</strong> ' + (payload.descripcionPublicacion || '') + '</p>' +
                //   '<p><strong>Palabras clave:</strong> ' + (payload.palabrasClavePublicacion || '') + '</p>' +
                //   '<hr>' +
                //   '<p><a href="' + folderUrl + '">Ver carpeta de imágenes en Drive</a></p>' +
                //   '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID_PROYECTOS + '/edit">Ver en la planilla</a></p>' +
                //   '<p>— Coordinaciones de Facultad <a href="https://faad.udp.cl/">Facultad de Arquitectura, Arte y Diseño</a> – UDP</p>'

                '<p>Estimado/a, te llega este correo porque se ha registrado una nueva actividad en el formulario único de registro FaAAD correspondiente a la unidad que coordinas. A continuación encontrarás el detalle. Si necesitas más información, puedes revisar la planilla completa al final del mensaje.</p>' +
                '<p>Ten en cuenta que este correo solo despliega la información que la persona ingresó al hacer clic en enviar. Si por algún motivo la persona actualiza la respuesta, solo verás esa diferencia indicada en la planilla.</p>' +
                '<hr>' +
                '<p><strong>Tipo de solicitud:</strong> ' + (payload.tipoSolicitud || '') + '</p>' +
                '<p><strong>Título:</strong> ' + (payload.tituloExtension2 || payload.tituloExterna2 || payload.tituloInvestigacion2 || '') + '</p>' +
                '<p><strong>Descripción:</strong> ' + (payload.descripcionExtension2 || payload.descripcionExterna2 || payload.reseñaInvestigacion2 || '') + '</p>' +
                '<p><strong>Responsable:</strong> ' + payload.nombreResponsable + ' (' + payload.emailResponsable + ')</p>' +
                '<hr>' +
                '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit">Ver en la planilla</a></p>' +
                '<p>— Coordinaciones de Facultad <a href="https://faad.udp.cl/">Facultad de Arquitectura, Arte y Diseño</a> – UDP</p>'
            });
          }
        }
      }
    }

    return { exito: true, mensaje: 'Solicitud guardada con éxito.' };

  } catch (e) {
    return { exito: false, mensaje: 'Error: ' + e.toString() };
  }
}
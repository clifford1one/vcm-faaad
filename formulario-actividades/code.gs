// spreadsheet oficial
var SPREADSHEET_ID = '1zuFTho0-2zNFo2zzrFC3w_5hehucmAgJzHeWb1y6uRU';
var SHEET_GENERAL = 'Respuestas de Formulario 1';

// aca se duplica las de extension, y agrega algunos campos
var SHEET_EXTENSION_VCM = 'Solicitudes-Extensión';

//spreadsheet vcm
var SPREADSHEET_ID_VCM = '1mssLeTJuhg49QZPdkB7zQZO78p5AuA6J71hX302aciw';
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
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function enviarProyecto(payload) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    var datePrefix = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // 1. Determinar el título para el nombre de la carpeta
    var titulo = payload.tituloExtension2 || payload.tituloExterna2 || payload.tituloInvestigacion2 || payload.actividadVcm || payload.nombreProyectoPublicacion || "Sin Titulo";
    var folderName = datePrefix + "-" + titulo;

    // 2. Crear la carpeta en Drive
    var folderIdToUse = DRIVE_FOLDER_ID;
    if (payload.tipoSolicitud === 'publicacion') folderIdToUse = DRIVE_FOLDER_ID_PUBLICACION;
    else if (payload.tipoSolicitud === 'vcm') folderIdToUse = DRIVE_FOLDER_ID_VCM;

    var parentFolder = DriveApp.getFolderById(folderIdToUse);

    var tipoNombre = '';
    if (payload.tipoSolicitud === 'extension2') tipoNombre = '1. Extensión UDP';
    if (payload.tipoSolicitud === 'externa2') tipoNombre = '2. Participación externa';
    if (payload.tipoSolicitud === 'investigacion2') tipoNombre = '3. Investigación';

    // var tipoFolders = parentFolder.getFoldersByName(tipoNombre);
    // var tipoFolder = tipoFolders.hasNext() ? tipoFolders.next() : parentFolder.createFolder(tipoNombre);

    var tipoFolder;
    if (tipoNombre === '') {
      tipoFolder = parentFolder;
    } else {
      var tipoFolders = parentFolder.getFoldersByName(tipoNombre);
      tipoFolder = tipoFolders.hasNext() ? tipoFolders.next() : parentFolder.createFolder(tipoNombre);
    }


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
    // row[3] = payload.tipoSolicitud; // tipo de iniciativa
    var tipoNombreDisplay = {
      'extension2': 'Iniciativas de extensión organizadas por UDP',
      'externa2': 'Participación en instancias externas',
      'investigacion2': 'Proyectos de Investigación, creación e innovación',
      'vcm': 'Registro de Actividades VcM',
      'publicacion': 'Publicación de proyecto'
    };
    row[3] = tipoNombreDisplay[payload.tipoSolicitud] || payload.tipoSolicitud;


    if (payload.tipoSolicitud === 'extension2') {
      var organizaExt2 = payload.organizaExtension2;
      row[4] = organizaExt2;
      row[5] = payload.tituloExtension2;
      row[6] = payload.cicloExtension2;
      row[7] = payload.descripcionExtension2;
      row[8] = payload.participanExtension2;
      row[9] = payload.reseñaParticipantesExtension2;

      // fechaHora solo inicio
      // row[10] = payload.fechaHoraExtension2;

      // fechaHora inicio y término
      row[10] = (payload.fechaInicioExtension2 || '') + ' — ' + (payload.fechaFinExtension2 || '');

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

      // solo inicio
      // row[22] = payload.fechaHoraExterna2;

      // inicio y témrino
      row[22] = (payload.fechaInicioExterna2 || '') + ' — ' + (payload.fechaFinExterna2 || '');

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
          '<p>Estimad-, te llega este correo porque se ha registrado una nueva actividad en el formulario único de registro FaAAD correspondiente a la unidad que coordinas. A continuación encontrarás el detalle. Si necesitas más información, puedes revisar la planilla completa al final del mensaje.</p>' +
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
          '<p><strong>Imágenes:</strong> <a href="' + folderUrl + '">Ver carpeta en Drive</a></p>' +
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
          'Pendiente',
          payload.mencionPublicacion ? payload.mencionPublicacion.join(', ') : '' // O - MENCIÓN
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

      // Si además se marcó como extensión, guardar fila en el general y mandar mail
      if (payload.tambienExtension) {
        var rowExt = new Array(92).fill("");
        rowExt[0] = "Pendiente";
        rowExt[1] = timestamp;
        rowExt[2] = payload.emailResponsable;
        rowExt[3] = 'Iniciativas de extensión organizadas por UDP';
        rowExt[4] = payload.organizaExtPub;
        rowExt[5] = payload.nombreProyectoPublicacion;
        rowExt[6] = payload.cicloExtPub;
        rowExt[7] = payload.descripcionPublicacion;
        rowExt[8] = payload.participanExtPub;
        rowExt[9] = payload.reseñaParticipantesExtPub;
        rowExt[10] = payload.fechaProyectoPublicacion;
        rowExt[11] = payload.lugarExtPub;
        rowExt[12] = payload.formatoExtPub;
        rowExt[13] = payload.publicoObjetivoExtPub;
        rowExt[14] = payload.cantidadAsistentesExtPub;
        rowExt[15] = payload.apoyoGraficoExtPub === 'Sí' ? folderUrl : payload.apoyoGraficoExtPub;
        rowExt[90] = payload.nombreResponsable;

        var sheetGen = ss.getSheetByName(SHEET_GENERAL);
        if (sheetGen) {
          var filtroGen = sheetGen.getFilter();
          if (filtroGen) filtroGen.remove();
          sheetGen.appendRow(rowExt);
        }

        // Guardar también en Solicitudes-Extensión del spreadsheet VcM (con los campos extra)
        var ssVcmExtP = SpreadsheetApp.openById(SPREADSHEET_ID_VCM);
        var sheetExtP = ssVcmExtP.getSheetByName(SHEET_EXTENSION_VCM);
        if (sheetExtP) {
          var filtroExtP = sheetExtP.getFilter();
          if (filtroExtP) filtroExtP.remove();
          sheetExtP.appendRow([
            timestamp,
            payload.emailResponsable,
            payload.nombreProyectoPublicacion,
            payload.descripcionPublicacion,
            payload.fechaProyectoPublicacion,
            payload.lugarExtPub,
            payload.formatoExtPub,
            payload.organizaExtPub,
            payload.cicloExtPub,
            payload.participanExtPub,
            payload.reseñaParticipantesExtPub,
            payload.publicoObjetivoExtPub,
            payload.cantidadAsistentesExtPub,
            payload.apoyoGraficoExtPub === 'Sí' ? folderUrl : payload.apoyoGraficoExtPub,
            payload.coberturaExtPub ? payload.coberturaExtPub.join(', ') : '',        // ← acá van los extra
            payload.disposicionSalaExtPub,
            payload.solicitudesEspecialesExtPub ? payload.solicitudesEspecialesExtPub.join(', ') : ''
          ]);
        }

        var sheetDest = ss.getSheetByName('Destinatarios');

        if (sheetDest) {
          var destExt = sheetDest.getRange('B4').getValue();
          if (destExt) {
            MailApp.sendEmail({
              to: destExt,
              subject: '[FaAAD Diseño] Nueva actividad registrada',
              htmlBody:
                '<p>Estimad-, te llega este correo porque se ha registrado una nueva actividad en el formulario único de registro FaAAD correspondiente a la unidad que coordinas.</p>' +
                '<p>Ten en cuenta que este correo solo despliega la información que la persona ingresó al hacer clic en enviar.</p>' +
                '<hr>' +
                '<p><strong>Tipo de solicitud:</strong> Iniciativas de extensión organizadas por UDP</p>' +
                '<p><strong>Enviado por:</strong> ' + payload.nombreResponsable + ' (' + payload.emailResponsable + ')</p>' +
                '<hr>' +
                (payload.organizaExtPub ? '<p><strong>Organiza:</strong> ' + payload.organizaExtPub + '</p>' : '') +
                '<p><strong>Título:</strong> ' + (payload.nombreProyectoPublicacion || '') + '</p>' +
                (payload.cicloExtPub ? '<p><strong>Ciclo o proyecto:</strong> ' + payload.cicloExtPub + '</p>' : '') +
                '<p><strong>Descripción:</strong> ' + (payload.descripcionPublicacion || '') + '</p>' +
                (payload.participanExtPub ? '<p><strong>Participan o colaboran:</strong> ' + payload.participanExtPub + '</p>' : '') +
                (payload.reseñaParticipantesExtPub ? '<p><strong>Reseña de participantes:</strong> ' + payload.reseñaParticipantesExtPub + '</p>' : '') +
                '<p><strong>Fecha:</strong> ' + (payload.fechaProyectoPublicacion || '') + '</p>' +
                (payload.lugarExtPub ? '<p><strong>Lugar:</strong> ' + payload.lugarExtPub + '</p>' : '') +
                (payload.formatoExtPub ? '<p><strong>Formato:</strong> ' + payload.formatoExtPub + '</p>' : '') +
                (payload.publicoObjetivoExtPub ? '<p><strong>Público objetivo:</strong> ' + payload.publicoObjetivoExtPub + '</p>' : '') +
                (payload.cantidadAsistentesExtPub ? '<p><strong>Cantidad de asistentes:</strong> ' + payload.cantidadAsistentesExtPub + '</p>' : '') +
                (payload.apoyoGraficoExtPub ? '<p><strong>Apoyo gráfico:</strong> ' + payload.apoyoGraficoExtPub + '</p>' : '') +
                '<hr>' +
                '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit">Ver en la planilla</a></p>' +
                '<p><strong>Imágenes:</strong> <a href="' + folderUrl + '">Ver carpeta en Drive</a></p>' +
                '<p>— Coordinaciones de Facultad <a href="https://faad.udp.cl/">Facultad de Arquitectura, Arte y Diseño</a> – UDP</p>'
            });
          }
        }
      }

    } else {
      var sheetGeneral = ss.getSheetByName(SHEET_GENERAL);
      if (sheetGeneral) {
        var filtroActivo = sheetGeneral.getFilter();
        if (filtroActivo) {
          filtroActivo.remove();
        }
        sheetGeneral.appendRow(row);
      }
      // Extensión: guardar también en pestaña específica del spreadsheet VcM
      if (payload.tipoSolicitud === 'extension2') {
        var ssVcmExt = SpreadsheetApp.openById(SPREADSHEET_ID_VCM);
        var sheetExt = ssVcmExt.getSheetByName(SHEET_EXTENSION_VCM);
        if (sheetExt) {
          var filtroExt = sheetExt.getFilter();
          if (filtroExt) filtroExt.remove();
          sheetExt.appendRow([
            // A - Marca temporal
            timestamp,
            // B - Email
            payload.emailResponsable,
            // C - Título                     
            payload.tituloExtension2,
            // D - Descripción                
            payload.descripcionExtension2,                
            // inicio y término
            (payload.fechaInicioExtension2 || '') + ' — ' + (payload.fechaFinExtension2 || ''),// E - Fecha y hora
            payload.lugarExtension2,                      // F - Lugar
            payload.formatoExtension2,                    // G - Formato
            payload.organizaExtension2,                   // H - Organiza
            payload.cicloExtension2,                      // I - Ciclo o proyecto
            payload.participanExtension2,                 // J - Participan
            payload.reseñaParticipantesExtension2,        // K - Reseña
            payload.publicoObjetivoExtension2,            // L - Público objetivo
            payload.cantidadAsistentesExtension2,         // M - Cantidad asistentes
            payload.apoyoGraficoExtension2 === 'Sí' ? folderUrl : payload.apoyoGraficoExtension2, // N - Apoyo gráfico
            payload.coberturaExtension2 ? payload.coberturaExtension2.join(', ') : '',           // O - Cobertura
            payload.disposicionSalaExtension2,            // P - Disposición sala
            payload.solicitudesEspecialesExtension2 ? payload.solicitudesEspecialesExtension2.join(', ') : '' // Q - Solicitudes especiales
          ]);
        }
      }

      // Buscar destinatario según tipo de solicitud
      var sheetDestinatarios = ss.getSheetByName('Destinatarios');
      if (sheetDestinatarios) {
        var columnaTipo = '';
        if (payload.tipoSolicitud === 'extension2') columnaTipo = 'B';
        else if (payload.tipoSolicitud === 'externa2') columnaTipo = 'C';
        // D = publicación académica
        // E = prensa 
        else if (payload.tipoSolicitud === 'investigacion2') columnaTipo = 'F';

        Logger.log('tipoSolicitud: ' + payload.tipoSolicitud);
        Logger.log('columnaTipo: ' + columnaTipo);
        Logger.log('sheetDestinatarios existe: ' + (sheetDestinatarios !== null));

        if (columnaTipo !== '') {
          var destinatario = sheetDestinatarios.getRange(columnaTipo + '4').getValue();
          if (destinatario) {
            var bodyContent = '';
            // mail solicitudes externas
            if (payload.tipoSolicitud === 'extension2') {
              bodyContent =
                (payload.tituloExtension2 ? '<p><strong>Título:</strong> ' + payload.tituloExtension2 + '</p>' : '') +
                (payload.descripcionExtension2 ? '<p><strong>Descripción:</strong> ' + payload.descripcionExtension2 + '</p>' : '') +
                // inicio y término
                (payload.lugarExtension2 ? '<p><strong>Lugar:</strong> ' + payload.lugarExtension2 + '</p>' : '') +
                (payload.formatoExtension2 ? '<p><strong>Formato:</strong> ' + payload.formatoExtension2 + '</p>' : '') +
                (payload.organizaExtension2 ? '<p><strong>Organiza:</strong> ' + payload.organizaExtension2 + '</p>' : '') +
                (payload.cicloExtension2 ? '<p><strong>Ciclo o proyecto:</strong> ' + payload.cicloExtension2 + '</p>' : '') +
                (payload.participanExtension2 ? '<p><strong>Participan o colaboran:</strong> ' + payload.participanExtension2 + '</p>' : '') +
                (payload.reseñaParticipantesExtension2 ? '<p><strong>Reseña de participantes:</strong> ' + payload.reseñaParticipantesExtension2 + '</p>' : '') +
                (payload.publicoObjetivoExtension2 ? '<p><strong>Público objetivo:</strong> ' + payload.publicoObjetivoExtension2 + '</p>' : '') +
                (payload.cantidadAsistentesExtension2 ? '<p><strong>Cantidad de asistentes:</strong> ' + payload.cantidadAsistentesExtension2 + '</p>' : '') +
                (payload.apoyoGraficoExtension2 ? '<p><strong>Apoyo gráfico:</strong> ' + payload.apoyoGraficoExtension2 + '</p>' : '');
            }

            // mail solicitudes extensión
            else if (payload.tipoSolicitud === 'externa2') {
              bodyContent =
                (payload.tituloExterna2 ? '<p><strong>Título:</strong> ' + payload.tituloExterna2 + '</p>' : '') +
                (payload.descripcionExterna2 ? '<p><strong>Descripción:</strong> ' + payload.descripcionExterna2 + '</p>' : '') +
                // inicio y término
                ((payload.fechaInicioExterna2 || payload.fechaFinExterna2) ? '<p><strong>Fecha y hora:</strong> ' + (payload.fechaInicioExterna2 || '') + ' — ' + (payload.fechaFinExterna2 || '') + '</p>' : '') +
                (payload.lugarExterna2 ? '<p><strong>Lugar:</strong> ' + payload.lugarExterna2 + '</p>' : '') +
                (payload.formatoExterna2 ? '<p><strong>Formato:</strong> ' + payload.formatoExterna2 + '</p>' : '') +
                (payload.organizaExterna2 ? '<p><strong>Organiza:</strong> ' + payload.organizaExterna2 + '</p>' : '') +
                (payload.participanExterna2 ? '<p><strong>Participan o colaboran:</strong> ' + payload.participanExterna2 + '</p>' : '') +
                (payload.reseñaParticipantesExterna2 ? '<p><strong>Reseña de participantes:</strong> ' + payload.reseñaParticipantesExterna2 + '</p>' : '') +
                (payload.publicoObjetivoExterna2 ? '<p><strong>Público objetivo:</strong> ' + payload.publicoObjetivoExterna2 + '</p>' : '') +
                (payload.cantidadAsistentesExterna2 ? '<p><strong>Cantidad de asistentes:</strong> ' + payload.cantidadAsistentesExterna2 + '</p>' : '') +
                (payload.enlacesExterna2 ? '<p><strong>Enlaces:</strong> ' + payload.enlacesExterna2 + '</p>' : '') +
                (payload.hipervínculosExterna2 ? '<p><strong>Hipervínculos:</strong> ' + payload.hipervínculosExterna2 + '</p>' : '') +
                (payload.equipoTecnicoExterna2 && payload.equipoTecnicoExterna2.length ? '<p><strong>Equipo técnico:</strong> ' + payload.equipoTecnicoExterna2.join(', ') + '</p>' : '') +
                (payload.disposicionSalaExterna2 ? '<p><strong>Disposición de sala:</strong> ' + payload.disposicionSalaExterna2 + '</p>' : '') +
                (payload.coberturaExterna2 && payload.coberturaExterna2.length ? '<p><strong>Cobertura:</strong> ' + payload.coberturaExterna2.join(', ') + '</p>' : '') +
                (payload.solicitudesEspecialesExterna2 && payload.solicitudesEspecialesExterna2.length ? '<p><strong>Solicitudes especiales:</strong> ' + payload.solicitudesEspecialesExterna2.join(', ') + '</p>' : '');
            }
            // mail solicitudes investigación

            else if (payload.tipoSolicitud === 'investigacion2') {
              bodyContent =
                (payload.tituloInvestigacion2 ? '<p><strong>Título del proyecto:</strong> ' + payload.tituloInvestigacion2 + '</p>' : '') +
                (payload.reseñaInvestigacion2 ? '<p><strong>Reseña:</strong> ' + payload.reseñaInvestigacion2 + '</p>' : '') +
                (payload.investigadorResponsableInvestigacion2 ? '<p><strong>Investigador responsable:</strong> ' + payload.investigadorResponsableInvestigacion2 + '</p>' : '') +
                (payload.colaboradoresInvestigacion2 ? '<p><strong>Colaboradores:</strong> ' + payload.colaboradoresInvestigacion2 + '</p>' : '') +
                (payload.financiamientoUdpInvestigacion2 ? '<p><strong>Financiamiento UDP:</strong> ' + payload.financiamientoUdpInvestigacion2 + '</p>' : '') +
                (payload.agenciaInvestigacion2 ? '<p><strong>Agencia financiera:</strong> ' + payload.agenciaInvestigacion2 + '</p>' : '') +
                (payload.lineaProgramaInvestigacion2 ? '<p><strong>Línea / Programa:</strong> ' + payload.lineaProgramaInvestigacion2 + '</p>' : '') +
                (payload.montoAdjudicadoInvestigacion2 ? '<p><strong>Monto adjudicado:</strong> ' + payload.montoAdjudicadoInvestigacion2 + '</p>' : '') +
                (payload.anioAdjudicacionInvestigacion2 ? '<p><strong>Año adjudicación:</strong> ' + payload.anioAdjudicacionInvestigacion2 + '</p>' : '') +
                (payload.anioInicioInvestigacion2 ? '<p><strong>Año inicio:</strong> ' + payload.anioInicioInvestigacion2 + '</p>' : '') +
                (payload.anioTerminoInvestigacion2 ? '<p><strong>Año término:</strong> ' + payload.anioTerminoInvestigacion2 + '</p>' : '') +
                (payload.rolUdpInvestigacion2 ? '<p><strong>Rol UDP:</strong> ' + payload.rolUdpInvestigacion2 + '</p>' : '');
            }

            MailApp.sendEmail({
              to: destinatario,
              subject: '[FaAAD Diseño] Nueva actividad registrada',
              htmlBody:
                '<p>Estimad-, te llega este correo porque se ha registrado una nueva actividad en el formulario único de registro FaAAD correspondiente a la unidad que coordinas.</p>' +
                '<p>Ten en cuenta que este correo solo despliega la información que la persona ingresó al hacer clic en enviar.</p>' +
                '<hr>' +
                '<p><strong>Tipo de solicitud:</strong> ' + (tipoNombreDisplay[payload.tipoSolicitud] || payload.tipoSolicitud) + '</p>' +
                '<p><strong>Enviado por:</strong> ' + payload.nombreResponsable + ' (' + payload.emailResponsable + ')</p>' +
                '<hr>' +
                bodyContent +
                '<hr>' +
                '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit">Ver en la planilla</a></p>' +
                '<p><strong>Imágenes:</strong> <a href="' + folderUrl + '">Ver carpeta en Drive</a></p>' +
                '<p>— Coordinaciones de Facultad <a href="https://faad.udp.cl/">Facultad de Arquitectura, Arte y Diseño</a> – UDP</p>'
            });
          }
        }
      }
    }

    MailApp.sendEmail({
      to: payload.emailResponsable,
      subject: '[FaAAD Diseño] Hemos recibido tu solicitud',
      htmlBody:
        '<p>Hola ' + (payload.nombreResponsable || '') + ',</p>' +
        '<p>Gracias por completar el formulario de actividades de FaAAD UDP. Hemos recibido tu solicitud correctamente y será revisada por el equipo correspondiente.</p>' +
        // '<p>Si necesitas hacer algún cambio o tienes consultas, puedes responder a este correo.</p>' +
        '<hr>' +
        '<p>— Coordinaciones de Facultad <a href="https://faad.udp.cl/">Facultad de Arquitectura, Arte y Diseño</a> – UDP</p>'
    });

    return { exito: true, mensaje: 'Solicitud guardada con éxito.' };

  } catch (e) {
    return { exito: false, mensaje: 'Error: ' + e.toString() };
  }
}
// a partir de aca, es codigo nuevo que lo separa en las pestañas
// spreadsheet oficial
var SPREADSHEET_ID = '18EUt_wauhDenkEmjawYFDDZ7XYgLmSiIQmonL4LVRIA';
var SHEET_GENERAL = 'pruebas-VCM';

//spreadsheet vcm
var SPREADSHEET_ID_VCM = '1mssLeTJuhg49QZPdkB7zQZO78p5AuA6J71hX302aciw';
// var SHEET_GENERAL_VCM = 'pruebitas'
var SHEET_GENERAL_VCM = 'Registro-VcM';


// spreadsheet emi - para proyectoooos
var SPREADSHEET_ID_PROYECTOS = '1Y_pmmK7_d_mQAK3xOXO9k0ADidAzcqXbBcZnTqEmdks';
var SHEET_PROYECTOS = 'Proyectos';


var DRIVE_FOLDER_ID = '114KG_idXui1SK3amPksnTVK5ejd8mted';

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
    var titulo = payload.tituloExtension || payload.tituloExterna || payload.tituloInvestigacion || "Sin Titulo";
    var folderName = datePrefix + "-" + titulo;

    // // 2. Crear la carpeta en Drive
    // var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    // var newFolder = parentFolder.createFolder(folderName);
    // var folderUrl = newFolder.getUrl();
    // var imagesFolder = newFolder.createFolder("Imágenes");

    // 2. Crear la carpeta en Drive
    var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    var tipoNombre = '';
    if (payload.tipoSolicitud === 'extension') tipoNombre = '1. Extensión UDP';
    if (payload.tipoSolicitud === 'externa') tipoNombre = '2. Participación externa';
    if (payload.tipoSolicitud === 'investigacion') tipoNombre = '3. Investigación';

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

    if (payload.tipoSolicitud === 'extension') {
      row[4] = payload.organizaExtension;
      row[5] = payload.tituloExtension;
      row[6] = payload.nombreCicloExtension;
      row[7] = payload.descripcionExtension;
      row[8] = (payload.participantesNombreExtension || "") + " " + (payload.participantesApellidoExtension || "");
      row[9] = payload.biografiaExtension;   // J — reseña de participantes
      row[10] = payload.fechaHoraExtension;
      row[11] = payload.lugarExtension;
      row[12] = payload.formatoExtension;
      row[13] = payload.publicoObjetivoExtension;
      row[14] = payload.cantidadAsistentesExtension;
      row[15] = payload.apoyoGraficoExtension;
    } else if (payload.tipoSolicitud === 'externa') {
      row[16] = payload.organizaExterna;
      row[17] = payload.tituloExterna;
      row[18] = payload.descripcionExterna;
      row[19] = payload.participantesExterna;
      row[20] = payload.biografiaExterna;
      row[21] = payload.enlacesExterna;
      row[22] = payload.fechaHoraExterna;
      row[23] = payload.lugarExterna;
      row[24] = payload.formatoExterna;
      row[25] = payload.publicoObjetivoExterna;
      row[26] = payload.asistentesExterna;
      row[28] = payload.logosExterna;
      row[29] = payload.hipervínculosExterna;
      row[30] = payload.equipoTecnicoExterna;
      row[31] = payload.preferenciaSalaExterna;
      row[32] = payload.coberturaExterna;
      row[33] = payload.solicitudesEspecialesExterna;
    }
    else if (payload.tipoSolicitud === 'investigacion') {
      row[51] = payload.tituloInvestigacion;
      row[52] = payload.financiamientoUdpInvestigacion;
      row[53] = payload.descripcionInvestigacion;
      row[54] = payload.agenciaFinancieraInvestigacion;
      row[55] = payload.lineaProgramaInvestigacion;
      row[56] = payload.anioAdjudicacionInvestigacion;
      row[57] = payload.anioInicioInvestigacion;
      row[58] = payload.anioTerminoInvestigacion;
      row[59] = payload.montoAdjudicadoInvestigacion;
      row[60] = payload.rolUdpInvestigacion;
      row[61] = payload.investigadorResponsableInvestigacion;
      row[62] = payload.colaboradoresInvestigacion;
    }
    else if (payload.tipoSolicitud === 'vcm') {

      row[0] = payload.actividadVcm;
      row[1] = payload.nivelVcm;
      row[2] = payload.lineaEstrategicaVcm;
      row[3] = payload.convenioVcm;
      row[4]= payload.institucionConvenioVcm;
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
    } else {
      var sheetGeneral = ss.getSheetByName(SHEET_GENERAL_VCM);
      if (sheetGeneral) {
        sheetGeneral.appendRow(row);
      }
    }

    return { exito: true, mensaje: 'Solicitud guardada con éxito.' };

  } catch (e) {
    return { exito: false, mensaje: 'Error: ' + e.toString() };
  }
}


// a partir de aca, es codigo nuevo que lo separa en las pestañas
// spreadsheet oficial
var SPREADSHEET_ID = '18EUt_wauhDenkEmjawYFDDZ7XYgLmSiIQmonL4LVRIA';
var SHEET_GENERAL = 'pruebas-VCM';

var SPREADSHEET_ID_VCM = '1mssLeTJuhg49QZPdkB7zQZO78p5AuA6J71hX302aciw'
var SHEET_GENERAL_VCM = 'pruebitas'

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
      row[4] = payload.contraparteVcm;
      row[5] = payload.financiamientoVcm;
      row[6] = payload.tipoFinanciamientoVcm;
      row[7] = payload.montoVcm;
      row[8] = payload.fechaVcm;
      row[9] = payload.objetivoVcm;
      row[10] = payload.responsableVcm;
      row[11] = payload.cursoVcm;
      row[12] = payload.outputVcm;
      row[13] = payload.outcomeVcm;
      row[14] = payload.indicadorActividadVcm;
      row[15] = payload.indicadorResultadoVcm;
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
      var sheetVcm = ssVcm.getSheetByName('pruebitas');
      if (sheetVcm) {
        sheetVcm.appendRow(row);
      }
    } else {
      var sheetGeneral = ss.getSheetByName(SHEET_GENERAL);
      if (sheetGeneral) {
        sheetGeneral.appendRow(row);
      }
    }

    return { exito: true, mensaje: 'Solicitud guardada con éxito.' };

  } catch (e) {
    return { exito: false, mensaje: 'Error: ' + e.toString() };
  }
}
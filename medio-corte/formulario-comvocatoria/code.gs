/* ============================================================
   CONVOCATORIA FERIA MEDIO CORTE 2026 — backend Apps Script
   ------------------------------------------------------------
   Las columnas se crean solas a partir de los labels que manda
   el formulario. Si agregas una pregunta nueva en el SCHEMA de
   script.js, acá se agrega una columna nueva al final sin
   romper las respuestas anteriores.
   ============================================================ */

// PLACEHOLDER: ID de la planilla (lo que va entre /d/ y /edit en la URL)
var SPREADSHEET_ID = 'PEGA_AQUI_EL_ID_DE_LA_PLANILLA';

// Una pestaña por tipo de convocatoria
var SHEETS = {
    stand: 'Stands',
    taller: 'Talleres',
    musico: 'Música'
};

// PLACEHOLDER: ID de la carpeta de Drive donde se guardan las imágenes
var DRIVE_FOLDER_ID = 'PEGA_AQUI_EL_ID_DE_LA_CARPETA';

// PLACEHOLDER: a quién le llega el aviso de cada postulación
var MAIL_TO = 'correo@ejemplo.cl';

// PLACEHOLDER: true = le manda copia de confirmación a quien postula
var ENVIAR_COPIA_AL_POSTULANTE = false;


function doGet() {
    return HtmlService
        .createHtmlOutputFromFile('index')
        .setTitle('Convocatoria Feria Medio Corte 2026')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function enviarPostulacion(payload) {
    try {
        var now = new Date();
        var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
        var datePrefix = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');

        var nombreSheet = SHEETS[payload.tipo];
        if (!nombreSheet) return { exito: false, mensaje: 'Tipo de postulación no reconocido.' };

        // 1. Carpeta en Drive: /Carpeta raíz/Stands/2026-09-01-Nombre del proyecto/
        var folderUrl = '';
        if (payload.archivos && payload.archivos.length > 0) {
            var parent = DriveApp.getFolderById(DRIVE_FOLDER_ID);
            var subs = parent.getFoldersByName(nombreSheet);
            var tipoFolder = subs.hasNext() ? subs.next() : parent.createFolder(nombreSheet);

            var folderName = datePrefix + ' - ' + (payload.nombreProyecto || 'Sin título');
            var newFolder = tipoFolder.createFolder(folderName);
            folderUrl = newFolder.getUrl();

            payload.archivos.forEach(function (f) {
                try {
                    var blob = Utilities.newBlob(
                        Utilities.base64Decode(f.base64),
                        f.type,
                        f.name || 'imagen.jpg'
                    );
                    var file = newFolder.createFile(blob);
                    try {
                        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
                    } catch (e) {
                        Logger.log('No se pudieron cambiar los permisos del archivo.');
                    }
                } catch (err) {
                    Logger.log('Error procesando archivo: ' + err.message);
                }
            });
        }

        // 2. Armar el registro: columnas fijas + las del formulario
        var registro = {
            'Estado': 'Pendiente',
            'Fecha de envío': timestamp,
            'Tipo de postulación': payload.tipoLabel
        };
        payload.datos.forEach(function (d) {
            registro[d.label] = d.valor;
        });
        registro['Carpeta de imágenes'] = folderUrl;

        // 3. Escribir en la pestaña correspondiente
        var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        var sheet = ss.getSheetByName(nombreSheet) || ss.insertSheet(nombreSheet);
        appendPorEtiquetas(sheet, registro);

        // 4. Avisos por correo
        enviarAvisoInterno(payload, folderUrl, nombreSheet);
        if (ENVIAR_COPIA_AL_POSTULANTE && payload.email) {
            enviarCopiaPostulante(payload);
        }

        return { exito: true, mensaje: 'Postulación registrada.' };

    } catch (e) {
        Logger.log('Error en enviarPostulacion: ' + e.message);
        return { exito: false, mensaje: e.message };
    }
}


/**
 * Escribe una fila haciendo calzar cada valor con su columna por el
 * nombre del encabezado. Si aparece una etiqueta nueva, crea la columna
 * al final en vez de correr las existentes.
 */
function appendPorEtiquetas(sheet, registro) {
    var filtro = sheet.getFilter();
    if (filtro) filtro.remove();

    var lastCol = sheet.getLastColumn();
    var headers = lastCol > 0
        ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(String)
        : [];

    // Agregar columnas que no existan todavía
    Object.keys(registro).forEach(function (label) {
        if (headers.indexOf(label) === -1) headers.push(label);
    });

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);

    var fila = headers.map(function (h) {
        return registro.hasOwnProperty(h) ? registro[h] : '';
    });
    sheet.appendRow(fila);
}


function enviarAvisoInterno(payload, folderUrl, nombreSheet) {
    var detalle = payload.datos.map(function (d) {
        return '<p><strong>' + d.label + ':</strong> ' + (d.valor || '—') + '</p>';
    }).join('');

    MailApp.sendEmail({
        to: MAIL_TO,
        subject: '[Medio Corte 2026] Nueva postulación (' + nombreSheet + '): ' +
            (payload.nombreProyecto || 'Sin título'),
        htmlBody:
            '<p>Se registró una nueva postulación a la Feria Medio Corte 2026.</p>' +
            '<p><strong>Tipo:</strong> ' + payload.tipoLabel + '</p>' +
            '<hr>' + detalle + '<hr>' +
            (folderUrl ? '<p><a href="' + folderUrl + '">Ver imágenes en Drive</a></p>' : '') +
            '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit">Ver en la planilla</a></p>'
    });
}


function enviarCopiaPostulante(payload) {
    MailApp.sendEmail({
        to: payload.email,
        subject: 'Recibimos tu postulación — Feria Medio Corte 2026',
        htmlBody:
            '<p>Hola ' + (payload.nombreResponsable || '') + ',</p>' +
            '<p>Recibimos la postulación de <strong>' + (payload.nombreProyecto || '') +
            '</strong> a la Feria Medio Corte 2026.</p>' +
            '<p>Completar el formulario no constituye una inscripción confirmada. ' +
            'Revisaremos todas las postulaciones y te escribiremos a este correo con el resultado.</p>' +
            // PLACEHOLDER: firma del equipo
            '<p>— Equipo Feria Medio Corte</p>'
    });
}

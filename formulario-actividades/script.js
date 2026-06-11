var cardOrder = [];
var nextCardId = 0;

var STEP_LABELS = ['Autor', 'Solicitud', 'Enviar'];
var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// ── HTML de cada tarjeta ─────────────────────────────────────
// esta funcion se encarga de mostrar las preugntas al usuario.
function buildCardHTML(id) {
    return (
        '<div class="project-card-header">' +
        '<span class="card-number">Solicitud 1</span>' +
        '<button type="button" class="remove-card-btn" style="display:none">Eliminar solicitud</button>' +
        '</div>' +

        // Tipo de solicitud

        //////////////////////////////////////////////////
        /////////////////// GENERAAAAL ///////////////////
        //////////////////////////////////////////////////

        '<div class="form-section" id="anchorProyecto-' + id + '">' +
        '<p class="section-title">Tipo de solicitud</p>' +
        '<div class="field">' +
        '<label for="tipoSolicitud-' + id + '">Selecciona el tipo de solicitud <span class="req">*</span></label>' +
        '<select id="tipoSolicitud-' + id + '" required>' +
        '<option value="">Selecciona una opción</option>' +
        '<option value="extension">Iniciativas de extensión organizadas por UDP</option>' +
        '<option value="extension2">Iniciativas de extensión UDP (v2)</option>' +
        '<option value="externa">Participación en instancias externas</option>' +
        '<option value="externa2">Participación en instancias externas (v2)</option>' +
        '<option value="investigacion">Proyectos de Investigación, creación e innovación</option>' +
        '<option value="investigacion2">Proyectos de Investigación (v2)</option>' +
        '<option value="vcm">Registro de Actividades VcM</option>' +
        '<option value="publicacion">Publicación de proyecto</option>' +

        '</select>' +
        '<p class="field-error" id="err-tipoSolicitud-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '</div>' +
        //////////////////////////////////////////////////
        // Iniciativas de extensión organizadas por UDP //
        //////////////////////////////////////////////////

        '<div class="form-section solicitud-extension" id="solicitud-extension-' + id + '" style="display:none">' +
        '<p class="section-title">Iniciativas de extensión organizadas por UDP</p>' +
        '<div class="field">' +
        '<label for="tituloExtension-' + id + '">Título <span class="req">*</span></label>' +
        // ñññññññ
        '<input type="text" id="tituloExtension-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-tituloExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="descripcionExtension-' + id + '">Descripción de la actividad <span class="req">*</span></label>' +
        '<input type="text" id="descripcionExtension-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-descripcionExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label>¿Está en convenio? <span class="req">*</span></label>' +
        '<div class="radio-chips" id="convenioExtension-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="convenioExtension-' + id + '" value="Sí" id="convenioExtension-' + id + '-si"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="convenioExtension-' + id + '" value="No" id="convenioExtension-' + id + '-no"><span>No</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-convenioExtension-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '<div class="field" id="institucionConvenioWrapExtension-' + id + '" style="display:none">' +
        '<label for="institucionConvenioExtension-' + id + '">Institución con convenio</label>' +
        '<select id="institucionConvenioExtension-' + id + '">' +
        '<option value="">Selecciona una institución</option>' +
        '<option value="Museo de la Solidaridad Salvador Allende">Museo de la Solidaridad Salvador Allende</option>' +
        '<option value="Centro Cultural CEINA">Centro Cultural CEINA</option>' +
        '<option value="Museo Nacional de Bellas Artes">Museo Nacional de Bellas Artes</option>' +
        '<option value="Biblioteca Nacional de Chile">Biblioteca Nacional de Chile</option>' +
        '<option value="Teatro Municipal de Santiago">Teatro Municipal de Santiago</option>' +
        '<option value="Museo Interactivo Mirador">Museo Interactivo Mirador</option>' +
        '<option value="Museo de Artes Visuales">Museo de Artes Visuales</option>' +
        '<option value="Museo Artequín">Museo Artequín</option>' +
        '<option value="Empresa de Ferrocarriles del Estado">Empresa de Ferrocarriles del Estado</option>' +
        '<option value="Museo de la Memoria y los Derechos Humanos">Museo de la Memoria y los Derechos Humanos</option>' +
        '<option value="Museo de la Educación Gabriela Mistral">Museo de la Educación Gabriela Mistral</option>' +
        '<option value="Fundación TECHO Chile">Fundación TECHO Chile</option>' +
        '<option value="Municipalidad de Recoleta">Municipalidad de Recoleta</option>' +
        '<option value="MOBIL Arquitectos">MOBIL Arquitectos</option>' +
        '<option value="Asociación de Oficinas de Arquitectura">Asociación de Oficinas de Arquitectura</option>' +
        '<option value="Galería Isabel Croxatto">Galería Isabel Croxatto</option>' +
        '<option value="Otra institución">Otra institución</option>' +
        '</select>' +
        '</div>' +



        '<div class="field-row">' +
        '<div class="field">' +
        '<label for="participantesNombreExtension-' + id + '">Nombre <span class="req">*</span></label>' +
        '<input type="text" id="participantesNombreExtension-' + id + '" placeholder="Nombre" required>' +
        '<p class="field-error" id="err-participantesNombreExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="participantesApellidoExtension-' + id + '">Apellido <span class="req">*</span></label>' +
        '<input type="text" id="participantesApellidoExtension-' + id + '" placeholder="Apellido" required>' +
        '<p class="field-error" id="err-participantesApellidoExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '</div>' +
        '<div class="field-row">' +
        '<div class="field">' +
        '<label for="participantesCargoExtension-' + id + '">Cargo <span class="req">*</span></label>' +
        '<input type="text" id="participantesCargoExtension-' + id + '" placeholder="Cargo" required>' +
        '<p class="field-error" id="err-participantesCargoExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="participantesInstitucionExtension-' + id + '">Institución <span class="req">*</span></label>' +
        '<input type="text" id="participantesInstitucionExtension-' + id + '" placeholder="Institución" required>' +
        '<p class="field-error" id="err-participantesInstitucionExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '</div>' +
        '<div class="field">' +
        '<label for="biografiaExtension-' + id + '">Biografía <span class="req">*</span></label>' +
        '<input type="text" id="biografiaExtension-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-biografiaExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="rrssExtension-' + id + '">RRSS</label>' +
        '<input type="text" id="rrssExtension-' + id + '" placeholder="Información para tagear a la gente en IG">' +
        '</div>' +
        // '<div class="field">' +
        // '<label for="fechaHoraExtension-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        // '<input type="datetime-local" id="fechaHoraExtension-' + id + '" required>' +
        // '<p class="field-error" id="err-fechaHoraExtension-' + id + '">Este campo es obligatorio.</p>' +
        // '</div>' +

        '<div class="field">' +
        '<label for="fechaHoraExtension-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        // Cambiamos type a "text" y agregamos la clase "datepicker"
        '<input type="text" class="datepicker" id="fechaHoraExtension-' + id + '" placeholder="Seleccione fecha y hora..." readonly required>' +
        '<p class="field-error" id="err-fechaHoraExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +



        '<div class="field">' +
        '<label>¿Necesita una sala? <span class="req">*</span></label>' +
        '<div class="radio-chips" id="necesitaSalaExtension-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="necesitaSalaExtension-' + id + '" value="Sí" id="necesitaSalaExtension-' + id + '-si"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="necesitaSalaExtension-' + id + '" value="No" id="necesitaSalaExtension-' + id + '-no"><span>No</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-necesitaSalaExtension-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '<div class="field" id="preferenciaSalaWrapExtension-' + id + '" style="display:none">' +
        '<label for="preferenciaSalaExtension-' + id + '">Preferencia de lugar</label>' +
        '<select id="preferenciaSalaExtension-' + id + '">' +
        '<option value="">Selecciona una sala</option>' +
        '<option value="Auditorio -1 República 180 - 80 personas">Auditorio 1 República 180 - 80 personas</option>' +
        '<option value="Auditorio -2 República 180 - 150 personas">Auditorio 2 República 180 - 150 personas</option>' +
        '<option value="Auditorio Salvador Sanfuentes - 114 personas">Auditorio Salvador Sanfuentes - 114 personas</option>' +
        '<option value="Sala Cilindro Salvador Sanfuentes - 25 personas">Sala Cilindro Salvador Sanfuentes - 25 personas</option>' +
        '<option value="Aula Magna Facultad de Derecho - xx personas">Auditorio Facultad de Derecho - xx personas</option>' +
        '<option value="Auditorio Facultad de Derecho - xx personas">Auditorio Facultad de Derecho - xx personas</option>' +
        '<option value="Otro">Otro</option>' +
        '</select>' +
        '</div>' +
        '<div class="field" id="preferenciaSalaOtroWrapExtension-' + id + '" style="display:none">' +
        '<label for="preferenciaSalaOtroExtension-' + id + '">Especifica el lugar</label>' +
        '<input type="text" id="preferenciaSalaOtroExtension-' + id + '" placeholder="Describe el lugar o sala que necesitas">' +
        '</div>' +
        '<div class="field">' +
        '<label>¿Solicitas apoyo gráfico? <span class="req">*</span></label>' +
        '<div class="yes-no-buttons">' +
        '<label class="radio-chip">' +
        '<input type="radio" name="apoyoGraficoExtension-' + id + '" value="Sí">' +
        '<span>Sí</span>' +
        '</label>' +
        '<label class="radio-chip">' +
        '<input type="radio" name="apoyoGraficoExtension-' + id + '" value="No">' +
        '<span>No</span>' +
        '</label>' +
        '</div>' +
        '<p class="field-error" id="err-apoyoGraficoExtension-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '<div class="field" id="apoyoGraficoPanelExtension-' + id + '" style="display:none">' +
        '<div class="apoyo-grafico-panel">' +
        '<p class="panel-title">Imágenes para elaboración de gráficas</p>' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">01</span><span class="grafico-item-label">Pantallas</span></div>' +
        '<p class="grafico-item-spec">Imagen horizontal — 1920 × 1080 px</p>' +
        '<div class="drop-zone" id="dropPantallasExtension-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="filePantallasExtension-' + id + '" multiple accept="image/*">' +
        '<span class="drop-counter" id="cntPantallasExtension-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevPantallasExtension-' + id + '"></div>' +
        '</div>' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">02</span><span class="grafico-item-label">Post</span></div>' +
        '<p class="grafico-item-spec">Imagen cuadrada — 2048 × 2048 px</p>' +
        '<div class="drop-zone" id="dropPostExtension-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="filePostExtension-' + id + '" multiple accept="image/*">' +
        '<span class="drop-counter" id="cntPostExtension-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevPostExtension-' + id + '"></div>' +
        '</div>' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">03</span><span class="grafico-item-label">Historias</span></div>' +
        '<p class="grafico-item-spec">Imagen vertical — 1080 × 1920 px</p>' +
        '<div class="drop-zone" id="dropHistoriasExtension-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileHistoriasExtension-' + id + '" multiple accept="image/*">' +
        '<span class="drop-counter" id="cntHistoriasExtension-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevHistoriasExtension-' + id + '"></div>' +
        '</div>' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">04</span><span class="grafico-item-label">Logos</span></div>' +
        '<p class="grafico-item-spec">Si es necesario incluir instituciones externas</p>' +
        '<div class="drop-zone" id="dropLogosExtension-' + id + '" tabindex="0">' +
        '<strong>Arrastra archivos o haz clic para seleccionar</strong>' +
        '<span>PNG, SVG, AI, EPS · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileLogosExtension-' + id + '" multiple accept="image/*,.svg,.ai,.eps">' +
        '<span class="drop-counter" id="cntLogosExtension-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevLogosExtension-' + id + '"></div>' +
        '</div>' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">05</span><span class="grafico-item-label">Imágenes complementarias</span></div>' +
        '<p class="grafico-item-spec">Opcional — cualquier material adicional de referencia</p>' +
        '<div class="drop-zone" id="dropCompExtension-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileCompExtension-' + id + '" multiple accept="image/*">' +
        '<span class="drop-counter" id="cntCompExtension-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevCompExtension-' + id + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="field">' +
        '<label for="solicitudesEspecialesExtension-' + id + '">Solicitudes especiales</label>' +
        '<div class="tags-grid">' +
        '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExtension-' + id + '" value="Agua"><span>Agua</span></label>' +
        '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExtension-' + id + '" value="Pasador de diapositivas"><span>Pasador de diapositivas</span></label>' +
        '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExtension-' + id + '" value="Pantalla extra"><span>Pantalla extra</span></label>' +
        '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExtension-' + id + '" value="Estacionamiento"><span>Estacionamiento</span></label>' +
        '</div>' +
        '</div>' +
        '<div class="foto-registro-section">' +
        '<p class="section-subtitle">Registro post evento</p>' +
        '<div class="field">' +
        '<label>Subir fotos y registros</label>' +
        '<div class="drop-zone" id="dropRegistroExtension-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP, MP4 · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileRegistroExtension-' + id + '" multiple accept="image/*,video/mp4">' +
        '<span class="drop-counter" id="cntRegistroExtension-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevRegistroExtension-' + id + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +



        ////////////////////////////////////////////
        // Participación en instancias externas v2//
        ////////////////////////////////////////////
        // Extensión v2
        '<div class="form-section solicitud-extension2" id="solicitud-extension2-' + id + '" style="display:none">' +
        '<p class="section-title">Iniciativas de extensión organizadas por UDP</p>' +

        '<div class="field">' +
        '<label for="organizaExtension2-' + id + '">Organiza(n) <span class="req">*</span></label>' +
        '<select id="organizaExtension2-' + id + '" required>' +
        '<option value="">Selecciona una opción</option>' +
        '<option value="Escuela de Diseño">Escuela de Diseño</option>' +
        '<option value="Escuela de Arquitectura">Escuela de Arquitectura</option>' +
        '<option value="Escuela de Arte">Escuela de Arte</option>' +
        '<option value="Laboratorio de Interacción (LID)">Laboratorio de Interacción (LID)</option>' +
        '<option value="LABORATORIO OTF">LABORATORIO OTF</option>' +
        '<option value="LAB 360">LAB 360</option>' +
        '<option value="CENTRO EDITORIAL">CENTRO EDITORIAL</option>' +
        '<option value="Otro">Otro</option>' +
        '</select>' +
        '<p class="field-error" id="err-organizaExtension2-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field" id="organizaOtroWrapExtension2-' + id + '" style="display:none">' +
        '<input type="text" id="organizaOtroExtension2-' + id + '" placeholder="Especifica quién organiza">' +
        '</div>' +

        '<div class="field">' +
        '<label for="tituloExtension2-' + id + '">Título de la actividad <span class="req">*</span></label>' +
        '<input type="text" id="tituloExtension2-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-tituloExtension2-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +

        '<div class="field">' +
        '<label for="cicloExtension2-' + id + '">Nombre del ciclo o proyecto al que pertenece</label>' +
        '<input type="text" id="cicloExtension2-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +

        '<div class="field">' +
        '<label for="descripcionExtension2-' + id + '">Descripción del evento o iniciativa <span class="req">*</span></label>' +
        '<input type="text" id="descripcionExtension2-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-descripcionExtension2-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +

        '<div class="field">' +
        '<label for="participanExtension2-' + id + '">Participan o colaboran</label>' +
        '<input type="text" id="participanExtension2-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +

        '<div class="field">' +
        '<label for="reseñaParticipantesExtension2-' + id + '">Reseña de participantes e instituciones</label>' +
        '<input type="text" id="reseñaParticipantesExtension2-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +

        '<div class="field">' +
        '<label for="fechaHoraExtension2-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        '<input type="text" class="datepicker" id="fechaHoraExtension2-' + id + '" placeholder="Seleccione fecha y hora..." readonly required>' +
        '<p class="field-error" id="err-fechaHoraExtension2-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +

        '<div class="field">' +
        '<label for="lugarExtension2-' + id + '">Lugar <span class="req">*</span></label>' +
        '<input type="text" id="lugarExtension2-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-lugarExtension2-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +

        '<div class="field">' +
        '<label>Formato <span class="req">*</span></label>' +
        '<div class="radio-chips" id="formatoExtension2-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="formatoExtension2-' + id + '" value="Presencial"><span>Presencial</span></label>' +
        '<label class="radio-chip"><input type="radio" name="formatoExtension2-' + id + '" value="Online"><span>Online</span></label>' +
        '<label class="radio-chip"><input type="radio" name="formatoExtension2-' + id + '" value="Híbrido"><span>Híbrido</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-formatoExtension2-' + id + '">Selecciona una opción.</p>' +
        '</div>' +

        '<div class="field">' +
        '<label for="publicoObjetivoExtension2-' + id + '">Público objetivo</label>' +
        '<input type="text" id="publicoObjetivoExtension2-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +

        '<div class="field">' +
        '<label for="cantidadAsistentesExtension2-' + id + '">Cantidad de asistentes</label>' +
        '<input type="text" id="cantidadAsistentesExtension2-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +

        '<div class="field">' +
        '<label>¿Solicitas apoyo gráfico? <span class="req">*</span></label>' +
        '<div class="radio-chips" id="apoyoGraficoExtension2-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="apoyoGraficoExtension2-' + id + '" value="Sí"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="apoyoGraficoExtension2-' + id + '" value="No"><span>No</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-apoyoGraficoExtension2-' + id + '">Selecciona una opción.</p>' +
        '</div>' +

        '<div class="field" id="apoyoGraficoPanelExtension2-' + id + '" style="display:none">' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">01</span><span class="grafico-item-label">Imágenes</span></div>' +
        '<div class="drop-zone" id="dropImagenesExtension2-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileImagenesExtension2-' + id + '" multiple accept="image/*">' +
        '<span class="drop-counter" id="cntImagenesExtension2-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevImagenesExtension2-' + id + '"></div>' +
        '</div>' +
        '<div class="grafico-item">' +
        '<div class="grafico-item-header"><span class="grafico-item-num">02</span><span class="grafico-item-label">Logos</span></div>' +
        '<div class="drop-zone" id="dropLogosExtension2-' + id + '" tabindex="0">' +
        '<strong>Arrastra archivos o haz clic para seleccionar</strong>' +
        '<span>PNG, SVG, AI, EPS · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileLogosExtension2-' + id + '" multiple accept="image/*,.svg,.ai,.eps">' +
        '<span class="drop-counter" id="cntLogosExtension2-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevLogosExtension2-' + id + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +


        '</div>' +







        //////////////////////////////////////////
        // Participación en instancias externas //
        //////////////////////////////////////////

        '<div class="form-section solicitud-externa" id="solicitud-externa-' + id + '" style="display:none">' +
        '<p class="section-title">Participación en instancias externas</p>' +
        '<div class="field">' +
        '<label for="institucionExterna-' + id + '">Institución organizadora <span class="req">*</span></label>' +
        '<input type="text" id="institucionExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-institucionExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="tituloExterna-' + id + '">Título actividad <span class="req">*</span></label>' +
        '<input type="text" id="tituloExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-tituloExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="descripcionExterna-' + id + '">Descripción del evento <span class="req">*</span></label>' +
        '<input type="text" id="descripcionExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-descripcionExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="participantesExterna-' + id + '">Participantes (Nombre Apellido - Cargo, Institución) <span class="req">*</span></label>' +
        '<input type="text" id="participantesExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-participantesExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="biografiaExterna-' + id + '">Biografía <span class="req">*</span></label>' +
        '<input type="text" id="biografiaExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-biografiaExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="linksExterna-' + id + '">Links a información complementaria</label>' +
        '<input type="text" id="linksExterna-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +


        // '<div class="field">' +
        // '<label for="fechaHoraExterna-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        // '<input type="datetime-local" id="fechaHoraExterna-' + id + '" required>' +
        // '<p class="field-error" id="err-fechaHoraExterna-' + id + '">Este campo es obligatorio.</p>' +
        // '</div>' +

        '<div class="field">' +
        '<label for="fechaHoraExtension-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        // Cambiamos type a "text" y agregamos la clase "datepicker"
        '<input type="text" class="datepicker" id="fechaHoraExterna-' + id + '" placeholder="Seleccione fecha y hora..." readonly required>' +
        '<p class="field-error" id="err-fechaHoraExtension-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +


        '<div class="field">' +
        '<label for="lugarExterna-' + id + '">Lugar <span class="req">*</span></label>' +
        '<input type="text" id="lugarExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-lugarExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="asistentesExterna-' + id + '">Cantidad de asistentes <span class="req">*</span></label>' +
        '<input type="text" id="asistentesExterna-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-asistentesExterna-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="foto-registro-section">' +
        '<p class="section-subtitle">Registro post actividad</p>' +
        '<div class="field">' +
        '<label>Subir fotos y registros</label>' +
        '<div class="drop-zone" id="dropRegistroExterna-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP, MP4 · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileRegistroExterna-' + id + '" multiple accept="image/*,video/mp4">' +
        '<span class="drop-counter" id="cntRegistroExterna-' + id + '"></span>' +
        '</div>' +
        '<div class="preview-grid" id="prevRegistroExterna-' + id + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        /////////////////////////////////////////////
    // PARTICIPACION EN INSTANCIAS EXTERNAS V2 //
    /////////////////////////////////////////////
        // Instancias externas v2
'<div class="form-section solicitud-externa2" id="solicitud-externa2-' + id + '" style="display:none">' +
'<p class="section-title">Participación en instancias externas</p>' +

'<div class="field">' +
'<label for="organizaExterna2-' + id + '">Organiza(n) <span class="req">*</span></label>' +
'<select id="organizaExterna2-' + id + '" required>' +
'<option value="">Selecciona una opción</option>' +
'<option value="Escuela de Diseño">Escuela de Diseño</option>' +
'<option value="Escuela de Arquitectura">Escuela de Arquitectura</option>' +
'<option value="Escuela de Arte">Escuela de Arte</option>' +
'<option value="Laboratorio de Interacción (LID)">Laboratorio de Interacción (LID)</option>' +
'<option value="Laboratorio OTF">Laboratorio OTF</option>' +
'<option value="Lab360">Lab360</option>' +
'<option value="Centro Editorial">Centro Editorial</option>' +
'<option value="Otro">Otro</option>' +
'</select>' +
'<p class="field-error" id="err-organizaExterna2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +
'<div class="field" id="organizaOtroWrapExterna2-' + id + '" style="display:none">' +
'<input type="text" id="organizaOtroExterna2-' + id + '" placeholder="Especifica quién organiza">' +
'</div>' +

'<div class="field">' +
'<label for="tituloExterna2-' + id + '">Título <span class="req">*</span></label>' +
'<input type="text" id="tituloExterna2-' + id + '" placeholder="Respuesta corta" required>' +
'<p class="field-error" id="err-tituloExterna2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="descripcionExterna2-' + id + '">Descripción de la iniciativa <span class="req">*</span></label>' +
'<input type="text" id="descripcionExterna2-' + id + '" placeholder="Respuesta corta" required>' +
'<p class="field-error" id="err-descripcionExterna2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="participanExterna2-' + id + '">Participan o colaboran</label>' +
'<input type="text" id="participanExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="reseñaParticipantesExterna2-' + id + '">Reseña de los participantes</label>' +
'<input type="text" id="reseñaParticipantesExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="enlacesExterna2-' + id + '">Enlaces</label>' +
'<input type="text" id="enlacesExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="fechaHoraExterna2-' + id + '">Fecha y hora <span class="req">*</span></label>' +
'<input type="text" class="datepicker" id="fechaHoraExterna2-' + id + '" placeholder="Seleccione fecha y hora..." readonly required>' +
'<p class="field-error" id="err-fechaHoraExterna2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="lugarExterna2-' + id + '">Lugar <span class="req">*</span></label>' +
'<input type="text" id="lugarExterna2-' + id + '" placeholder="Respuesta corta" required>' +
'<p class="field-error" id="err-lugarExterna2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label>Formato <span class="req">*</span></label>' +
'<div class="radio-chips" id="formatoExterna2-' + id + '" data-required="true">' +
'<label class="radio-chip"><input type="radio" name="formatoExterna2-' + id + '" value="Presencial"><span>Presencial</span></label>' +
'<label class="radio-chip"><input type="radio" name="formatoExterna2-' + id + '" value="Online"><span>Online</span></label>' +
'<label class="radio-chip"><input type="radio" name="formatoExterna2-' + id + '" value="Híbrido"><span>Híbrido</span></label>' +
'</div>' +
'<p class="field-error" id="err-formatoExterna2-' + id + '">Selecciona una opción.</p>' +
'</div>' +

'<div class="field">' +
'<label for="publicoObjetivoExterna2-' + id + '">Público objetivo</label>' +
'<input type="text" id="publicoObjetivoExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="cantidadAsistentesExterna2-' + id + '">Cantidad de asistentes</label>' +
'<input type="text" id="cantidadAsistentesExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label>Imágenes</label>' +
'<div class="drop-zone" id="dropImagenesExterna2-' + id + '" tabindex="0">' +
'<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
'<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
'<input type="file" class="file-input-hidden" id="fileImagenesExterna2-' + id + '" multiple accept="image/*">' +
'<span class="drop-counter" id="cntImagenesExterna2-' + id + '"></span>' +
'</div>' +
'<div class="preview-grid" id="prevImagenesExterna2-' + id + '"></div>' +
'</div>' +

'<div class="field">' +
'<label>Adjuntar logos (no FAAD)</label>' +
'<div class="drop-zone" id="dropLogosExterna2-' + id + '" tabindex="0">' +
'<strong>Arrastra archivos o haz clic para seleccionar</strong>' +
'<span>PNG, SVG, AI, EPS · Máx 10 MB por archivo</span>' +
'<input type="file" class="file-input-hidden" id="fileLogosExterna2-' + id + '" multiple accept="image/*,.svg,.ai,.eps">' +
'<span class="drop-counter" id="cntLogosExterna2-' + id + '"></span>' +
'</div>' +
'<div class="preview-grid" id="prevLogosExterna2-' + id + '"></div>' +
'</div>' +

'<div class="field">' +
'<label for="hipervínculosExterna2-' + id + '">Hipervínculos</label>' +
'<input type="text" id="hipervínculosExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label>Equipo técnico</label>' +
'<div class="tags-grid">' +
'<label class="tag-chip"><input type="checkbox" name="equipoTecnicoExterna2-' + id + '" value="Data"><span>Data</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="equipoTecnicoExterna2-' + id + '" value="Micrófono"><span>Micrófono</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="equipoTecnicoExterna2-' + id + '" value="Amplificador"><span>Amplificador</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="equipoTecnicoExterna2-' + id + '" value="Tele"><span>Tele</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="equipoTecnicoExterna2-' + id + '" value="Lápiz pantalla touch"><span>Lápiz pantalla touch</span></label>' +
'</div>' +
'</div>' +

'<div class="field">' +
'<label for="disposicionSalaExterna2-' + id + '">Disposición de sala / auditorio</label>' +
'<input type="text" id="disposicionSalaExterna2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label>Cobertura fotográfica, filmación o transmisión</label>' +
'<div class="tags-grid">' +
'<label class="tag-chip"><input type="checkbox" name="coberturaExterna2-' + id + '" value="Registro fotográfico"><span>Registro fotográfico</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="coberturaExterna2-' + id + '" value="Filmación"><span>Filmación</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="coberturaExterna2-' + id + '" value="Transmisión en vivo"><span>Transmisión en vivo</span></label>' +
'</div>' +
'</div>' +

'<div class="field">' +
'<label>Solicitudes especiales</label>' +
'<div class="tags-grid">' +
// '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExterna2-' + id + '" value="Agua"><span>Agua</span></label>' +
// '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExterna2-' + id + '" value="Pasador de diapositivas"><span>Pasador de diapositivas</span></label>' +
// '<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExterna2-' + id + '" value="Pantalla extra"><span>Pantalla extra</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="solicitudesEspecialesExterna2-' + id + '" value="Estacionamiento"><span>Estacionamiento</span></label>' +
'</div>' +
'</div>' +

'</div>' +

        ///////////////////////////////////////////////////////
        // Proyectos de Investigación, creación e innovación //
        ///////////////////////////////////////////////////////

        '<div class="form-section solicitud-investigacion" id="solicitud-investigacion-' + id + '" style="display:none">' +
        '<p class="section-title">Proyectos de Investigación, creación e innovación</p>' +
        '<div class="field">' +
        '<label for="tituloInvestigacion-' + id + '">Título del proyecto <span class="req">*</span></label>' +
        '<input type="text" id="tituloInvestigacion-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-tituloInvestigacion-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="descripcionInvestigacion-' + id + '">Descripción del proyecto <span class="req">*</span></label>' +
        '<input type="text" id="descripcionInvestigacion-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-descripcionInvestigacion-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label>¿Cuenta con financiamiento UDP? <span class="req">*</span></label>' +
        '<div class="radio-chips" id="financiamientoUdpInvestigacion-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="financiamientoUdpInvestigacion-' + id + '" value="Sí"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="financiamientoUdpInvestigacion-' + id + '" value="No"><span>No</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-financiamientoUdpInvestigacion-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label>¿Cuenta con financiamiento externo? <span class="req">*</span></label>' +
        '<div class="radio-chips" id="financiamientoExternoInvestigacion-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="financiamientoExternoInvestigacion-' + id + '" value="Sí"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="financiamientoExternoInvestigacion-' + id + '" value="No"><span>No</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-financiamientoExternoInvestigacion-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="agenciaFinancieraInvestigacion-' + id + '">Nombre de agencia o institución financista</label>' +
        '<input type="text" id="agenciaFinancieraInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="field">' +
        '<label for="fondoInvestigacion-' + id + '">Nombre del fondo</label>' +
        '<input type="text" id="fondoInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="field">' +
        '<label for="anioAdjudicacionInvestigacion-' + id + '">Año de adjudicación</label>' +
        '<input type="text" id="anioAdjudicacionInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="field">' +
        '<label for="anioInicioInvestigacion-' + id + '">Año de inicio</label>' +
        '<input type="text" id="anioInicioInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="field">' +
        '<label for="anioTerminoInvestigacion-' + id + '">Año de término</label>' +
        '<input type="text" id="anioTerminoInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="field">' +
        '<label for="montoAdjudicadoInvestigacion-' + id + '">Monto adjudicado</label>' +
        '<input type="text" id="montoAdjudicadoInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="field">' +
        '<label>Rol de la UDP <span class="req">*</span></label>' +
        '<div class="radio-chips" id="rolUdpInvestigacion-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="rolUdpInvestigacion-' + id + '" value="Principal"><span>Principal</span></label>' +
        '<label class="radio-chip"><input type="radio" name="rolUdpInvestigacion-' + id + '" value="Colaborador"><span>Colaborador</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-rolUdpInvestigacion-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="investigadorResponsableInvestigacion-' + id + '">Investigador responsable y afiliación institucional <span class="req">*</span></label>' +
        '<input type="text" id="investigadorResponsableInvestigacion-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-investigadorResponsableInvestigacion-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="investigadoresColaboradoresInvestigacion-' + id + '">Investigadores colaboradores y afiliación institucional</label>' +
        '<input type="text" id="investigadoresColaboradoresInvestigacion-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '<div class="foto-registro-section">' +
        '<p class="section-subtitle">Registro del proyecto</p>' +
        '<div class="field">' +
        '<label>Subir fotos y registros</label>' +
        '<div class="drop-zone" id="dropRegistroInvestigacion-' + id + '" tabindex="0">' +
        '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
        '<span>JPG, PNG, WEBP, PDF · Máx 10 MB por archivo</span>' +
        '<input type="file" class="file-input-hidden" id="fileRegistroInvestigacion-' + id + '" multiple accept="image/*,.pdf">' +
        '<span class="drop-counter" id="cntRegistroInvestigacion-' + id + '"></span>' +
        '</div>' +


        '<div class="preview-grid" id="prevRegistroInvestigacion-' + id + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +   // ← agrega el + aquí


        ////////////////////////////////////////
        //////// INVESTIGACIÓN V2 /////////
        ////////////////////////////////////////

        // Investigación v2
'<div class="form-section solicitud-investigacion2" id="solicitud-investigacion2-' + id + '" style="display:none">' +
'<p class="section-title">Proyectos de Investigación, creación e innovación</p>' +

'<div class="field">' +
'<label for="tituloInvestigacion2-' + id + '">Título del proyecto <span class="req">*</span></label>' +
'<input type="text" id="tituloInvestigacion2-' + id + '" placeholder="Respuesta corta" required>' +
'<p class="field-error" id="err-tituloInvestigacion2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label>¿Este proyecto contó con financiamiento UDP? <span class="req">*</span></label>' +
'<div class="radio-chips" id="financiamientoUdpInvestigacion2-' + id + '" data-required="true">' +
'<label class="radio-chip"><input type="radio" name="financiamientoUdpInvestigacion2-' + id + '" value="Sí"><span>Sí</span></label>' +
'<label class="radio-chip"><input type="radio" name="financiamientoUdpInvestigacion2-' + id + '" value="No"><span>No</span></label>' +
'</div>' +
'<p class="field-error" id="err-financiamientoUdpInvestigacion2-' + id + '">Selecciona una opción.</p>' +
'</div>' +

'<div class="field">' +
'<label for="reseñaInvestigacion2-' + id + '">Reseña</label>' +
'<input type="text" id="reseñaInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="agenciaInvestigacion2-' + id + '">Financiamiento - Agencia</label>' +
'<input type="text" id="agenciaInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="lineaProgramaInvestigacion2-' + id + '">Financiamiento - Línea / Programa</label>' +
'<input type="text" id="lineaProgramaInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label for="anioAdjudicacionInvestigacion2-' + id + '">Año de adjudicación</label>' +
'<input type="text" id="anioAdjudicacionInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field-row">' +
'<div class="field">' +
'<label for="anioInicioInvestigacion2-' + id + '">Año de inicio</label>' +
'<input type="text" id="anioInicioInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +
'<div class="field">' +
'<label for="anioTerminoInvestigacion2-' + id + '">Año de término</label>' +
'<input type="text" id="anioTerminoInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +
'</div>' +

'<div class="field">' +
'<label for="montoAdjudicadoInvestigacion2-' + id + '">Monto adjudicado</label>' +
'<input type="text" id="montoAdjudicadoInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label>Rol UDP <span class="req">*</span></label>' +
'<div class="radio-chips" id="rolUdpInvestigacion2-' + id + '" data-required="true">' +
'<label class="radio-chip"><input type="radio" name="rolUdpInvestigacion2-' + id + '" value="Principal"><span>Principal</span></label>' +
'<label class="radio-chip"><input type="radio" name="rolUdpInvestigacion2-' + id + '" value="Colaborador"><span>Colaborador</span></label>' +
'</div>' +
'<p class="field-error" id="err-rolUdpInvestigacion2-' + id + '">Selecciona una opción.</p>' +
'</div>' +

'<div class="field">' +
'<label for="investigadorResponsableInvestigacion2-' + id + '">Investigador/a responsable del proyecto <span class="req">*</span></label>' +
'<input type="text" id="investigadorResponsableInvestigacion2-' + id + '" placeholder="Respuesta corta" required>' +
'<p class="field-error" id="err-investigadorResponsableInvestigacion2-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="colaboradoresInvestigacion2-' + id + '">Colaboradores / equipo de trabajo</label>' +
'<input type="text" id="colaboradoresInvestigacion2-' + id + '" placeholder="Respuesta corta">' +
'</div>' +

'<div class="field">' +
'<label>Imagen representativa del proyecto</label>' +
'<div class="drop-zone" id="dropImagenInvestigacion2-' + id + '" tabindex="0">' +
'<strong>Arrastra una imagen o haz clic para seleccionar</strong>' +
'<span>JPG, PNG, WEBP · Máx 10 MB</span>' +
'<input type="file" class="file-input-hidden" id="fileImagenInvestigacion2-' + id + '" accept="image/*">' +
'<span class="drop-counter" id="cntImagenInvestigacion2-' + id + '"></span>' +
'</div>' +
'<div class="preview-grid" id="prevImagenInvestigacion2-' + id + '"></div>' +
'</div>' +

'</div>' +

        ////////////////////////////////////////
        ///// Registro de actividades VCM /////
        ////////////////////////////////////////

        '<div class="form-section solicitud-vcm" id="solicitud-vcm-' + id + '" style="display:none">' +
        // ... campos vcm ...

        '<p class="section-title">Registro de actividades VCM</p>' +
        '<div class="field"><label for="actividadVcm-' + id + '">Descripción de la Actividad <span class="req">*</span></label>' +
        '<input type="text" id="actividadVcm-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-actividadVcm-' + id + '">Este campo es obligatorio.</p></div>' +


        '<div class="field"><label>Nivel <span class="tooltip-icon">?</span><span class="tooltip-box" style="left:5vw">Inicial: actividades unidireccionales de impacto externo limitado en el medio y/o estudiantes. Ejemplos: salidas a terreno, visitas de profesionales externos a la sala de clases o talleres abiertos a la comunidad.<br><br>Medio: acciones unidireccionales o bidireccionales que generan un impacto en la comunidad y en los estudiantes como parte de un proceso formativo. Ejemplos: charlas, conversatorios, seminarios, trabajo con contrapartes en cursos teórico prácticos, participación en ferias o instancias de divulgación (podcast, vodcast, etc).<br><br>Alto: acciones bidireccionales, continuas y de alto impacto entre la escuela y su entorno. Ejemplos: desarrollo de exposiciones, actividades semestrales con contrapartes en cursos o taller, workshops y publicaciones académicas.</span></label>' +

        '<div class="radio-chips">' +
        '<label class="radio-chip"><input type="radio" name="nivelVcm-' + id + '" value="Inicial"><span>Inicial</span></label>' +
        '<label class="radio-chip"><input type="radio" name="nivelVcm-' + id + '" value="Medio"><span>Medio</span></label>' +
        '<label class="radio-chip"><input type="radio" name="nivelVcm-' + id + '" value="Alto"><span>Alto</span></label>' +
        '</div></div>' +

        '<div class="field"><label>Línea Estratégica<span class="tooltip-icon">?</span><span class="tooltip-box" style="left:13vw">1. Integrar sistemáticamente actores, problemas y contextos reales en el proceso formativo, fortaleciendo el aprendizaje situado y las competencias profesionales.<br><br>2. Posicionar a la Escuela como actor cultural y disciplinar relevante mediante una agenda pública de actividades coherente y sostenida.<br><br>3. Desarrollar proyectos de diseño con instituciones y comunidades que generen impacto social, territorial o institucional.<br><br>4. Fortalecer la inserción de la Escuela en redes profesionales, académicas y culturales, consolidando su posicionamiento disciplinar.</span></label>' +
        '<select id="lineaEstrategicaVcm-' + id + '">' +
        '<option value="">Selecciona una opción</option>' +
        '<option value="Docencia vinculada al medio">1. Docencia vinculada al medio</option>' +
        '<option value="Extensión académica y cultural">2. Extensión académica y cultural</option>' +
        '<option value="Desarrollo de proyectos y servicios comunitarios">3. Desarrollo de proyectos y servicios comunitarios</option>' +
        '<option value="Redes y posicionamiento disciplinar">4. Redes y posicionamiento disciplinar</option>' +
        '</select></div>' +

        '<div class="field"><label>Convenio</label>' +
        '<div class="radio-chips">' +
        '<label class="radio-chip"><input type="radio" name="convenioVcm-' + id + '" value="Sí"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="convenioVcm-' + id + '" value="No"><span>No</span></label>' +
        '</div></div>' +
        '<div class="field" id="institucionConvenioWrapVcm-' + id + '" style="display:none">' +
        '<label for="institucionConvenioVcm-' + id + '">Institución con convenio</label>' +
        '<select id="institucionConvenioVcm-' + id + '">' +
        '<option value="">Selecciona una institución</option>' +
        '<option value="Museo de la Solidaridad Salvador Allende">Museo de la Solidaridad Salvador Allende</option>' +
        '<option value="Centro Cultural CEINA">Centro Cultural CEINA</option>' +
        '<option value="Museo Nacional de Bellas Artes">Museo Nacional de Bellas Artes</option>' +
        '<option value="Biblioteca Nacional de Chile">Biblioteca Nacional de Chile</option>' +
        '<option value="Teatro Municipal de Santiago">Teatro Municipal de Santiago</option>' +
        '<option value="Museo Interactivo Mirador">Museo Interactivo Mirador</option>' +
        '<option value="Museo de Artes Visuales">Museo de Artes Visuales</option>' +
        '<option value="Museo Artequín">Museo Artequín</option>' +
        '<option value="Empresa de Ferrocarriles del Estado">Empresa de Ferrocarriles del Estado</option>' +
        '<option value="Museo de la Memoria y los Derechos Humanos">Museo de la Memoria y los Derechos Humanos</option>' +
        '<option value="Museo de la Educación Gabriela Mistral">Museo de la Educación Gabriela Mistral</option>' +
        '<option value="Fundación TECHO Chile">Fundación TECHO Chile</option>' +
        '<option value="Municipalidad de Recoleta">Municipalidad de Recoleta</option>' +
        '<option value="MOBIL Arquitectos">MOBIL Arquitectos</option>' +
        '<option value="Asociación de Oficinas de Arquitectura">Asociación de Oficinas de Arquitectura</option>' +

        '<option value="Galería Isabel Croxatto">Galería Isabel Croxatto</option>' +
        '<option value="Otra institución">Otra institución</option>' +
        '</select>' +
        '<div id="institucionConvenioOtroWrapVcm-' + id + '" style="display:none">' +
        '<input type="text" id="institucionConvenioOtroVcm-' + id + '" placeholder="Especifica la institución">' +
        '</div>' +
        '</div>' +

        '<div class="field"><label for="contraparteVcm-' + id + '">Nombre y Cargo Contraparte</label>' +
        '<input type="text" id="contraparteVcm-' + id + '" placeholder="Nombre, Cargo"></div>' +

        '<div class="field"><label>¿Cuenta con financiamiento? <span class="req">*</span></label>' +
        '<div class="radio-chips" id="financiamientoVcm-' + id + '" data-required="true">' +
        '<label class="radio-chip"><input type="radio" name="financiamientoVcm-' + id + '" value="Sí"><span>Sí</span></label>' +
        '<label class="radio-chip"><input type="radio" name="financiamientoVcm-' + id + '" value="No"><span>No</span></label>' +
        '</div>' +
        '<p class="field-error" id="err-financiamientoVcm-' + id + '">Selecciona una opción.</p></div>' +

        '<div class="field" id="financiamientoDetalleWrapVcm-' + id + '" style="display:none">' +
        '<label>Tipo de financiamiento</label>' +
        '<div class="radio-chips">' +
        '<label class="radio-chip"><input type="radio" name="tipoFinanciamientoVcm-' + id + '" value="Externo"><span>Externo</span></label>' +
        '<label class="radio-chip"><input type="radio" name="tipoFinanciamientoVcm-' + id + '" value="Interno"><span>Interno</span></label>' +
        '</div>' +

        '<div class="field" id="fondoExternoWrapVcm-' + id + '" style="display:none">' +
        '<label>Fondo externo</label>' +
        '<div class="radio-chips">' +
        '<label class="radio-chip"><input type="radio" name="fondoExternoVcm-' + id + '" value="Ciencia Pública"><span>Ciencia Pública</span></label>' +
        '<label class="radio-chip"><input type="radio" name="fondoExternoVcm-' + id + '" value="FONDART"><span>FONDART</span></label>' +
        '<label class="radio-chip"><input type="radio" name="fondoExternoVcm-' + id + '" value="Otro"><span>Otro</span></label>' +
        '</div>' +
        '<div class="field" id="fondoExternoOtroWrapVcm-' + id + '" style="display:none">' +
        '<input type="text" id="fondoExternoOtroVcm-' + id + '" placeholder="Especifica el fondo externo">' +
        '</div>' +
        '</div>' +

        '<div class="field" id="fondoInternoWrapVcm-' + id + '" style="display:none">' +
        '<label>Fondo interno</label>' +
        '<div class="radio-chips">' +
        '<label class="radio-chip"><input type="radio" name="fondoInternoVcm-' + id + '" value="Vértice"><span>Vértice</span></label>' +
        '<label class="radio-chip"><input type="radio" name="fondoInternoVcm-' + id + '" value="Innovación Docente"><span>Innovación Docente</span></label>' +
        '<label class="radio-chip"><input type="radio" name="fondoInternoVcm-' + id + '" value="Otro"><span>Otro</span></label>' +
        '</div>' +
        '<div class="field" id="fondoInternoOtroWrapVcm-' + id + '" style="display:none">' +
        '<input type="text" id="fondoInternoOtroVcm-' + id + '" placeholder="Especifica el fondo interno">' +
        '</div>' +
        '</div>' +

        '<div class="field">' +
        '<label for="montoVcm-' + id + '">Monto</label>' +
        '<input type="text" id="montoVcm-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '</div>' +
        '<div class="field" id="financiamientoDetalleWrapVcm-' + id + '" style="display:none">' +
        '<label for="tipoFinanciamientoVcm-' + id + '">Tipo de financiamiento</label>' +
        '<div class="radio-chips">' +
        '<label class="radio-chip"><input type="radio" name="tipoFinanciamientoVcm-' + id + '" value="Público"><span>Público</span></label>' +
        '<label class="radio-chip"><input type="radio" name="tipoFinanciamientoVcm-' + id + '" value="Privado"><span>Privado</span></label>' +
        '<label class="radio-chip"><input type="radio" name="tipoFinanciamientoVcm-' + id + '" value="Otro"><span>Otro</span></label>' +
        '</div>' +
        '<div class="field" id="tipoFinanciamientoOtroWrapVcm-' + id + '" style="display:none">' +
        '<input type="text" id="tipoFinanciamientoOtroVcm-' + id + '" placeholder="Especifica el tipo de financiamiento">' +
        '</div>' +
        '<div class="field">' +
        '<label for="montoVcm-' + id + '">Monto</label>' +
        '<input type="text" id="montoVcm-' + id + '" placeholder="Respuesta corta">' +
        '</div>' +
        '</div>' +
        // calendario inicio y fin
        '<div class="field-row">' +
        '<div class="field">' +
        '<label for="fechaInicioVcm-' + id + '">Fecha de inicio <span class="req">*</span></label>' +
        '<input type="text" class="datepicker-fecha" id="fechaInicioVcm-' + id + '" placeholder="aaaa/mm/dd" readonly required>' +
        '<p class="field-error" id="err-fechaInicioVcm-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="fechaTerminoVcm-' + id + '">Fecha de término <span class="req">*</span></label>' +
        '<input type="text" class="datepicker-fecha" id="fechaTerminoVcm-' + id + '" placeholder="aaaa/mm/dd" readonly required>' +
        '<p class="field-error" id="err-fechaTerminoVcm-' + id + '">Este campo es obligatorio.</p>' +
        '</div>' +
        '</div>' +

        '<div class="field"><label for="objetivoVcm-' + id + '">Objetivo</label>' +
        '<input type="text" id="objetivoVcm-' + id + '" placeholder="Respuesta corta"></div>' +
        '<div class="field"><label for="responsableVcm-' + id + '">Responsable UDP<span class="req">*</span></label>' +
        '<input type="text" id="responsableVcm-' + id + '" placeholder="Respuesta corta" required>' +
        '<p class="field-error" id="err-responsableVcm-' + id + '">Este campo es obligatorio.</p></div>' +
        '<div class="field"><label for="cursoVcm-' + id + '">Curso Asociado</label>' +
        '<input type="text" id="cursoVcm-' + id + '" placeholder="Respuesta corta"></div>' +
        '<div class="field"><label for="outputVcm-' + id + '">Resultado esperado (output)</label>' +
        '<input type="text" id="outputVcm-' + id + '" placeholder="Respuesta corta"></div>' +
        '<div class="field"><label for="outcomeVcm-' + id + '">Resultado esperado (outcome)</label>' +
        '<input type="text" id="outcomeVcm-' + id + '" placeholder="Respuesta corta"></div>' +
        '<div class="field"><label for="indicadorActividadVcm-' + id + '">Indicador de actividad</label>' +
        '<input type="text" id="indicadorActividadVcm-' + id + '" placeholder="Respuesta corta"></div>' +
        '<div class="field"><label for="indicadorResultadoVcm-' + id + '">Indicador de resultado</label>' +
        '<input type="text" id="indicadorResultadoVcm-' + id + '" placeholder="Respuesta corta"></div>' +
'</div>'+

        ////////////////////////////////////
        ////////// PROYECTOOOOOS ///////////
        ////////////////////////////////////

// Publicación de proyecto
'<div class="form-section solicitud-publicacion" id="solicitud-publicacion-' + id + '" style="display:none">' +
'<p class="section-title">Publicación de proyecto</p>' +

'<div class="field">' +
'<label for="nombreProyectoPublicacion-' + id + '">Nombre del proyecto <span class="req">*</span></label>' +
'<input type="text" id="nombreProyectoPublicacion-' + id + '" placeholder="Respuesta corta" required>' +
'<p class="field-error" id="err-nombreProyectoPublicacion-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="fechaProyectoPublicacion-' + id + '">Fecha del proyecto <span class="req">*</span></label>' +
'<input type="text" class="datepicker-fecha" id="fechaProyectoPublicacion-' + id + '" placeholder="aaaa/mm/dd" readonly required>' +
'<p class="field-error" id="err-fechaProyectoPublicacion-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="tipoProyectoPublicacion-' + id + '">Tipo de proyecto <span class="req">*</span></label>' +
'<select id="tipoProyectoPublicacion-' + id + '" required>' +
'<option value="">Selecciona una opción</option>' +
'<option value="Pregrado">Pregrado</option>' +
'<option value="Postgrado">Postgrado</option>' +
'<option value="Docente / Investigación">Docente / Investigación</option>' +
'<option value="Extensión">Extensión</option>' +
'<option value="Alumni">Alumni</option>' +
'<option value="Colaboradores/as externos/as">Colaboradores/as externos/as</option>' +
'</select>' +
'<p class="field-error" id="err-tipoProyectoPublicacion-' + id + '">Selecciona una opción.</p>' +
'</div>' +

'<div class="field">' +
'<label for="descripcionPublicacion-' + id + '">Descripción del proyecto <span class="req">*</span></label>' +
// '<textarea id="descripcionPublicacion-' + id + '" rows="6" placeholder="Describe el proyecto, su contexto y objetivos." required></textarea>' +
'<input type="text" id="descripcionPublicacion-' + id + '" placeholder="Describe el proyecto, su contexto y objetivos." required>' +
'<p class="field-error" id="err-descripcionPublicacion-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label>Mención <span class="req">*</span></label>' +
'<div class="radio-chips" id="mencionPublicacion-' + id + '" data-required="true">' +
'<label class="radio-chip"><input type="radio" name="mencionPublicacion-' + id + '" value="Diseño Gráfico"><span>Diseño Gráfico</span></label>' +
'<label class="radio-chip"><input type="radio" name="mencionPublicacion-' + id + '" value="Diseño Industrial"><span>Diseño Industrial</span></label>' +
'<label class="radio-chip"><input type="radio" name="mencionPublicacion-' + id + '" value="Diseño de Interacción"><span>Diseño de Interacción</span></label>' +
'<label class="radio-chip"><input type="radio" name="mencionPublicacion-' + id + '" value="Diseño Textil e Indumentaria"><span>Diseño Textil e Indumentaria</span></label>' +
'</div>' +
'<p class="field-error" id="err-mencionPublicacion-' + id + '">Selecciona una opción.</p>' +
'</div>' +

'<div class="field">' +
'<label>Etiquetas</label>' +
'<div class="tags-grid">' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Publicaciones"><span>Publicaciones</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Creación"><span>Creación</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Edición"><span>Edición</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Exposición colectiva"><span>Exposición colectiva</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Exposición individual"><span>Exposición individual</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Innovación"><span>Innovación</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Innovación docente"><span>Innovación docente</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Investigación"><span>Investigación</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Mediación"><span>Mediación</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Reconocimiento"><span>Reconocimiento</span></label>' +
'<label class="tag-chip"><input type="checkbox" name="etiquetasPublicacion-' + id + '" value="Otros"><span>Otros</span></label>' +
'</div>' +
'</div>' +

'<div class="field">' +
'<label for="coleccionPublicacion-' + id + '">Colección / Muestra</label>' +
'<select id="coleccionPublicacion-' + id + '">' +
'<option value="No aplica">No aplica</option>' +
'<option value="Exposición fin de semestre">Exposición fin de semestre</option>' +
'<option value="Taller Internacional / Latitud Sur">Taller Internacional / Latitud Sur</option>' +
'<option value="Proyecto de Título">Proyecto de Título</option>' +
'<option value="Intercambio Internacional">Intercambio Internacional</option>' +
'<option value="Residencia Artística">Residencia Artística</option>' +
'<option value="Investigación Aplicada">Investigación Aplicada</option>' +
'<option value="Muestra permanente">Muestra permanente</option>' +
'</select>' +
'</div>' +

'<div class="field">' +
'<label for="rolPublicacion-' + id + '">Rol</label>' +
'<select id="rolPublicacion-' + id + '">' +
'<option value="">Selecciona un rol</option>' +
'<option value="Estudiante pregrado">Estudiante pregrado</option>' +
'<option value="Estudiante postgrado">Estudiante postgrado</option>' +
'<option value="Docente">Docente</option>' +
'<option value="Investigador/a">Investigador/a</option>' +
'<option value="Invitado/a externo/a">Invitado/a externo/a</option>' +
'<option value="Alumni">Alumni</option>' +
'</select>' +
'</div>' +

'<div class="field">' +
'<label for="paisPublicacion-' + id + '">País <span class="req">*</span></label>' +
'<select id="paisPublicacion-' + id + '" required>' +
'<option value="">Selecciona un país</option>' +
'<optgroup label="América Latina">' +
'<option value="Chile">Chile</option>' +
'<option value="México">México</option>' +
'<option value="Argentina">Argentina</option>' +
'<option value="Colombia">Colombia</option>' +
'<option value="Brasil">Brasil</option>' +
'<option value="Perú">Perú</option>' +
'<option value="Venezuela">Venezuela</option>' +
'<option value="Uruguay">Uruguay</option>' +
'<option value="Ecuador">Ecuador</option>' +
'<option value="Bolivia">Bolivia</option>' +
'<option value="Paraguay">Paraguay</option>' +
'<option value="Costa Rica">Costa Rica</option>' +
'<option value="Cuba">Cuba</option>' +
'<option value="Guatemala">Guatemala</option>' +
'<option value="Panamá">Panamá</option>' +
'<option value="República Dominicana">República Dominicana</option>' +
'<option value="El Salvador">El Salvador</option>' +
'<option value="Honduras">Honduras</option>' +
'<option value="Nicaragua">Nicaragua</option>' +
'<option value="Puerto Rico">Puerto Rico</option>' +
'<option value="Haití">Haití</option>' +
'</optgroup>' +
'<optgroup label="Otras regiones">' +
'<option value="Norteamérica">Norteamérica</option>' +
'<option value="Europa">Europa</option>' +
'<option value="Asia">Asia</option>' +
'<option value="África">África</option>' +
'<option value="Oceanía">Oceanía</option>' +
'</optgroup>' +
'</select>' +
'<p class="field-error" id="err-paisPublicacion-' + id + '">Este campo es obligatorio.</p>' +
'</div>' +

'<div class="field">' +
'<label for="palabrasClavePublicacion-' + id + '">Palabras clave</label>' +
'<input type="text" id="palabrasClavePublicacion-' + id + '" placeholder="tipografía, identidad, textil…">' +
'<p class="helper">Separadas por comas.</p>' +
'</div>' +

'<div class="field">' +
'<label for="linkWebPublicacion-' + id + '">Link web</label>' +
'<input type="text" id="linkWebPublicacion-' + id + '" placeholder="https://...">' +
'</div>' +

'<div class="field">' +
'<label for="instagramPublicacion-' + id + '">Instagram</label>' +
'<input type="text" id="instagramPublicacion-' + id + '" placeholder="https://instagram.com/usuario">' +
'</div>' +

'<div class="field">' +
'<label for="youtubePublicacion-' + id + '">YouTube (canal)</label>' +
'<input type="text" id="youtubePublicacion-' + id + '" placeholder="https://youtube.com/@canal">' +
'</div>' +

'<div class="field">' +
'<label for="otrasRedesPublicacion-' + id + '">Otras redes sociales</label>' +
'<input type="text" id="otrasRedesPublicacion-' + id + '" placeholder="https://...">' +
'</div>' +

'<div class="field">' +
'<label>Imágenes del proyecto <span class="req">*</span></label>' +
'<div class="drop-zone" id="dropImagenesPublicacion-' + id + '" tabindex="0">' +
'<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
'<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
'<input type="file" class="file-input-hidden" id="fileImagenesPublicacion-' + id + '" multiple accept="image/*">' +
'<span class="drop-counter" id="cntImagenesPublicacion-' + id + '"></span>' +
'</div>' +
'<div class="preview-grid" id="prevImagenesPublicacion-' + id + '"></div>' +
'</div>' +

'<div class="field">' +
'<label for="linkVideoPublicacion-' + id + '">Link de video YouTube del proyecto</label>' +
'<input type="text" id="linkVideoPublicacion-' + id + '" placeholder="https://youtube.com/watch?v=...">' +
'</div>' +

        '</div>'     // ← sin + , sigue siendo el último

        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////

    );
}


// ── Agregar / eliminar tarjetas ──────────────────────────────
function addCard() {
    var id = nextCardId++;
    cardOrder.push(id);

    var container = document.getElementById('projectsContainer');
    var wrapper = document.createElement('div');
    wrapper.id = 'card-' + id;
    wrapper.className = 'project-card';

    // Generar el HTML de la tarjeta
    wrapper.innerHTML = buildCardHTML(id);
    container.appendChild(wrapper);

    // Conectar lógica de la tarjeta (botones, radios, etc.)
    wireCard(id);

    // === ACTIVAR FLATPICKR ===
    // Al usar wrapper.querySelectorAll('.datepicker'), activamos TODOS los 
    // calendarios de la tarjeta (Extensión, Externa, etc.) de una sola vez.
    flatpickr(wrapper.querySelectorAll('.datepicker'), {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        minuteIncrement: 30,
        time_24hr: true,
        //desactivar domingos
        disable: [
            function (date) {
                // Regresa true si el día es 0 (Domingo) para deshabilitarlo
                return (date.getDay() === 0);
            }
        ],
        //
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            },
        }
    });

    // calendario pa vcm
    flatpickr(wrapper.querySelectorAll('.datepicker-fecha'), {
        enableTime: false,
        dateFormat: "Y/m/d",
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            },
        }
    });
    // Actualizar la interfaz (números de tarjeta, visibilidad, etc.)
    updateCardUI();
}

function removeCard(id) {
    cardOrder = cardOrder.filter(function (x) { return x !== id; });
    var el = document.getElementById('card-' + id);
    if (el) el.remove();
    updateCardUI();
}

function updateCardUI() {
    cardOrder.forEach(function (id, index) {
        var numEl = document.querySelector('#card-' + id + ' .card-number');
        if (numEl) numEl.textContent = 'Solicitud ' + (index + 1);
    });
    document.querySelectorAll('.remove-card-btn').forEach(function (btn) {
        btn.style.display = cardOrder.length > 1 ? 'inline-block' : 'none';
    });
    var btnTextEl = document.getElementById('btnText');
    if (btnTextEl) btnTextEl.textContent = cardOrder.length > 1 ? 'Enviar solicitudes' : 'Enviar solicitud';
}

// ── Conectar eventos ─────────────────────────────────────────
function wireCard(id) {
    var card = document.getElementById('card-' + id);
    var tipoSolicitud = document.getElementById('tipoSolicitud-' + id);
    var removeBtn = card.querySelector('.remove-card-btn');

    // Helper: leer valor de radio-chips group
    function radioVal(name) {
        var checked = document.querySelector('input[name="' + name + '"]:checked');
        return checked ? checked.value : '';
    }

    // Mostrar/ocultar secciones basadas en tipo de solicitud
    tipoSolicitud.addEventListener('change', function () {
        var val = this.value;
        document.getElementById('solicitud-extension-' + id).style.display = val === 'extension' ? 'block' : 'none';
        document.getElementById('solicitud-extension2-' + id).style.display = val === 'extension2' ? 'block' : 'none';

        document.getElementById('solicitud-externa-' + id).style.display = val === 'externa' ? 'block' : 'none';
        document.getElementById('solicitud-externa2-' + id).style.display = val === 'externa2' ? 'block' : 'none';

        document.getElementById('solicitud-investigacion-' + id).style.display = val === 'investigacion' ? 'block' : 'none';
        document.getElementById('solicitud-investigacion2-' + id).style.display = val === 'investigacion2' ? 'block' : 'none';

        document.getElementById('solicitud-vcm-' + id).style.display = val === 'vcm' ? 'block' : 'none';

        document.getElementById('solicitud-publicacion-' + id).style.display = val === 'publicacion' ? 'block' : 'none';

        this.classList.remove('error');
        hideFieldError('tipoSolicitud-' + id);
        hideErrorSummary();
    });

    // ── necesitaSala (radio-chips) ────────────────────────────
    card.querySelectorAll('input[name="necesitaSalaExtension-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var prefWrap = document.getElementById('preferenciaSalaWrapExtension-' + id);
            var otroWrap = document.getElementById('preferenciaSalaOtroWrapExtension-' + id);
            var prefSel = document.getElementById('preferenciaSalaExtension-' + id);
            if (this.value === 'Sí') {
                prefWrap.style.display = 'block';
            } else {
                prefWrap.style.display = 'none';
                if (otroWrap) otroWrap.style.display = 'none';
                if (prefSel) prefSel.value = '';
            }
            hideFieldError('necesitaSalaExtension-' + id);
        });
    });

    // ESTE ES LA CASILLA DE "OTRO" EN ORGANIZA EN EXNTENSION V2
    var organizaEl = document.getElementById('organizaExtension2-' + id);
    if (organizaEl) {
        organizaEl.addEventListener('change', function () {
            var otroWrap = document.getElementById('organizaOtroWrapExtension2-' + id);
            if (otroWrap) otroWrap.style.display = this.value === 'Otro' ? 'block' : 'none';
        });
    }

    // ESTE ES LA CASILLA DE "OTRO" EN ORGANIZA EN EXTERNO V2
    var organizaExterna2El = document.getElementById('organizaExterna2-' + id);
if (organizaExterna2El) {
    organizaExterna2El.addEventListener('change', function() {
        var otroWrap = document.getElementById('organizaOtroWrapExterna2-' + id);
        if (otroWrap) otroWrap.style.display = this.value === 'Otro' ? 'block' : 'none';
    });
}


    // QUERY DE APOYO GRAFICO EXTENSION V2
    card.querySelectorAll('input[name="apoyoGraficoExtension2-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var panel = document.getElementById('apoyoGraficoPanelExtension2-' + id);
            if (panel) panel.style.display = this.value === 'Sí' ? 'block' : 'none';
            if (this.value === 'Sí') wireDropZonesApoyo2(id);
        });
    });

    // Sala "Otro" → campo libre
    var prefSalaEl = document.getElementById('preferenciaSalaExtension-' + id);
    if (prefSalaEl) {
        prefSalaEl.addEventListener('change', function () {
            var otroWrap = document.getElementById('preferenciaSalaOtroWrapExtension-' + id);
            if (otroWrap) otroWrap.style.display = this.value === 'Otro' ? 'block' : 'none';
        });
    }

    // ── convenio (radio-chips) ────────────────────────────────
    card.querySelectorAll('input[name="convenioExtension-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var instWrap = document.getElementById('institucionConvenioWrapExtension-' + id);
            if (instWrap) instWrap.style.display = this.value === 'Sí' ? 'block' : 'none';
            hideFieldError('convenioExtension-' + id);
        });
    });

    // ── apoyo gráfico → panel de imágenes ────────────────────
    card.querySelectorAll('input[name="apoyoGraficoExtension-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var panel = document.getElementById('apoyoGraficoPanelExtension-' + id);
            if (panel) panel.style.display = this.value === 'Sí' ? 'block' : 'none';
            if (this.value === 'Sí') {
                wireDropZonesApoyo(id);
            }
            hideFieldError('apoyoGraficoExtension-' + id);
        });
    });

    // ── Drop zones: registros ─────────────────────────────────
    wireDropZone('dropRegistroExtension-' + id, 'fileRegistroExtension-' + id, 'cntRegistroExtension-' + id, 'prevRegistroExtension-' + id);
    wireDropZone('dropRegistroExterna-' + id, 'fileRegistroExterna-' + id, 'cntRegistroExterna-' + id, 'prevRegistroExterna-' + id);
    wireDropZone('dropRegistroInvestigacion-' + id, 'fileRegistroInvestigacion-' + id, 'cntRegistroInvestigacion-' + id, 'prevRegistroInvestigacion-' + id);

// registros externa v2
wireDropZone('dropImagenesExterna2-' + id, 'fileImagenesExterna2-' + id, 'cntImagenesExterna2-' + id, 'prevImagenesExterna2-' + id);
wireDropZone('dropLogosExterna2-' + id, 'fileLogosExterna2-' + id, 'cntLogosExterna2-' + id, 'prevLogosExterna2-' + id);
// registro investigación v2
wireDropZone('dropImagenInvestigacion2-' + id, 'fileImagenInvestigacion2-' + id, 'cntImagenInvestigacion2-' + id, 'prevImagenInvestigacion2-' + id);
// drop de registro de proyectos
wireDropZone('dropImagenesPublicacion-' + id, 'fileImagenesPublicacion-' + id, 'cntImagenesPublicacion-' + id, 'prevImagenesPublicacion-' + id);

    // ¿Cuenta con financiamiento? → mostrar detalle
    card.querySelectorAll('input[name="financiamientoVcm-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var wrap = document.getElementById('financiamientoDetalleWrapVcm-' + id);
            if (wrap) wrap.style.display = this.value === 'Sí' ? 'block' : 'none';
        });
    });

    // Externo o interno → mostrar el fondo correspondiente
    card.querySelectorAll('input[name="tipoFinanciamientoVcm-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            document.getElementById('fondoExternoWrapVcm-' + id).style.display = this.value === 'Externo' ? 'block' : 'none';
            document.getElementById('fondoInternoWrapVcm-' + id).style.display = this.value === 'Interno' ? 'block' : 'none';
        });
    });

    // Fondo externo → Otro
    card.querySelectorAll('input[name="fondoExternoVcm-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var otroWrap = document.getElementById('fondoExternoOtroWrapVcm-' + id);
            if (otroWrap) otroWrap.style.display = this.value === 'Otro' ? 'block' : 'none';
        });
    });

    // Fondo interno → Otro
    card.querySelectorAll('input[name="fondoInternoVcm-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var otroWrap = document.getElementById('fondoInternoOtroWrapVcm-' + id);
            if (otroWrap) otroWrap.style.display = this.value === 'Otro' ? 'block' : 'none';
        });
    });





    removeBtn.addEventListener('click', function () {
        if (cardOrder.length > 1 && confirm('¿Eliminar esta solicitud del formulario?')) {
            removeCard(id);
        }
    });

    // Limpiar errores inline al corregir
    var requiredFields = ['tipoSolicitud'];
    requiredFields.forEach(function (fid) {
        var el = document.getElementById(fid + '-' + id);
        if (!el) return;
        var evts = el.tagName === 'SELECT' ? ['change'] : ['input', 'change'];
        evts.forEach(function (evt) {
            el.addEventListener(evt, function () {
                el.classList.remove('error');
                hideFieldError(fid + '-' + id);
                hideErrorSummary();
            });
        });
    });

    // despliega opcion de convenios si pones qie si convenio en tipo de solicitud vcm
    card.querySelectorAll('input[name="convenioVcm-' + id + '"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            var wrap = document.getElementById('institucionConvenioWrapVcm-' + id);
            if (wrap) wrap.style.display = this.value === 'Sí' ? 'block' : 'none';
        });
    });

    var instConvenioVcm = document.getElementById('institucionConvenioVcm-' + id);
    if (instConvenioVcm) {
        instConvenioVcm.addEventListener('change', function () {
            var otroWrap = document.getElementById('institucionConvenioOtroWrapVcm-' + id);
            if (otroWrap) otroWrap.style.display = this.value === 'Otra institución' ? 'block' : 'none';
        });
    }
}

// Wire apoyo gráfico drop zones (called lazily when panel opens)
var wiredApoyo = {};
function wireDropZonesApoyo(id) {
    if (wiredApoyo[id]) return;
    wiredApoyo[id] = true;
    var slots = [
        ['dropPantallasExtension-' + id, 'filePantallasExtension-' + id, 'cntPantallasExtension-' + id, 'prevPantallasExtension-' + id],
        ['dropPostExtension-' + id, 'filePostExtension-' + id, 'cntPostExtension-' + id, 'prevPostExtension-' + id],
        ['dropHistoriasExtension-' + id, 'fileHistoriasExtension-' + id, 'cntHistoriasExtension-' + id, 'prevHistoriasExtension-' + id],
        ['dropLogosExtension-' + id, 'fileLogosExtension-' + id, 'cntLogosExtension-' + id, 'prevLogosExtension-' + id],
        ['dropCompExtension-' + id, 'fileCompExtension-' + id, 'cntCompExtension-' + id, 'prevCompExtension-' + id]
    ];
    slots.forEach(function (s) { wireDropZone(s[0], s[1], s[2], s[3]); });
}

var wiredApoyo2 = {};
function wireDropZonesApoyo2(id) {
    if (wiredApoyo2[id]) return;
    wiredApoyo2[id] = true;
    var slots = [
        ['dropImagenesExtension2-' + id, 'fileImagenesExtension2-' + id, 'cntImagenesExtension2-' + id, 'prevImagenesExtension2-' + id],
        ['dropLogosExtension2-' + id, 'fileLogosExtension2-' + id, 'cntLogosExtension2-' + id, 'prevLogosExtension2-' + id]
    ];
    slots.forEach(function (s) { wireDropZone(s[0], s[1], s[2], s[3]); });
}

// Generic drop zone wiring
function wireDropZone(dropId, fileId, cntId, prevId) {
    var drop = document.getElementById(dropId);
    var inp = document.getElementById(fileId);
    if (!drop || !inp) return;
    drop.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-btn')) return;
        inp.click();
    });
    drop.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); }
    });
    drop.addEventListener('dragover', function (e) { e.preventDefault(); drop.classList.add('dragover'); });
    drop.addEventListener('dragleave', function () { drop.classList.remove('dragover'); });
    drop.addEventListener('drop', function (e) {
        e.preventDefault(); drop.classList.remove('dragover');
        handleFiles(e.dataTransfer.files, cntId, prevId);
    });
    inp.addEventListener('change', function () {
        handleFiles(inp.files, cntId, prevId);
        inp.value = '';
    });
}

// function handleFiles(files, cntId, prevId) {
//   var cnt  = document.getElementById(cntId);
//   var prev = document.getElementById(prevId);
//   if (!cnt || !prev) return;
//   Array.from(files).forEach(function(file) {
//     if (!file.type.startsWith('image/') && file.type !== 'application/pdf') return;
//     var item = document.createElement('div');
//     item.className = 'preview-item';
//     if (file.type.startsWith('image/')) {
//       var img = document.createElement('img');
//       img.src = URL.createObjectURL(file);
//       item.appendChild(img);
//     } else {
//       var lbl = document.createElement('div');
//       lbl.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;font-family:NectoMono,monospace;font-size:0.7rem;color:#444;padding:8px;text-align:center;';
//       lbl.textContent = file.name;
//       item.appendChild(lbl);
//     }
//     var fl = document.createElement('span');
//     fl.className = 'file-label';
//     fl.textContent = file.name;
//     item.appendChild(fl);
//     var rb = document.createElement('button');
//     rb.type = 'button';
//     rb.className = 'remove-btn';
//     rb.textContent = '×';
//     rb.addEventListener('click', function() { item.remove(); updateCounter(cntId, prevId); });
//     item.appendChild(rb);
//     prev.appendChild(item);
//   });
//   updateCounter(cntId, prevId);
// }

function handleFiles(files, cntId, prevId) {
    var cnt = document.getElementById(cntId);
    var prev = document.getElementById(prevId);
    if (!cnt || !prev) return;
    Array.from(files).forEach(function (file) {
        if (!file.type.startsWith('image/') && file.type !== 'application/pdf') return;
        var item = document.createElement('div');
        item.className = 'preview-item';

        // GUARDAMOS EL ARCHIVO AQUÍ PARA EL ENVÍO
        item.file = file;

        if (file.type.startsWith('image/')) {
            var img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            item.appendChild(img);
        } else {
            var lbl = document.createElement('div');
            lbl.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;font-family:NectoMono,monospace;font-size:0.7rem;color:#444;padding:8px;text-align:center;';
            lbl.textContent = file.name;
            item.appendChild(lbl);
        }
        var fl = document.createElement('span');
        fl.className = 'file-label';
        fl.textContent = file.name;
        item.appendChild(fl);
        var rb = document.createElement('button');
        rb.type = 'button';
        rb.className = 'remove-btn';
        rb.textContent = '×';
        rb.addEventListener('click', function () { item.remove(); updateCounter(cntId, prevId); });
        item.appendChild(rb);
        prev.appendChild(item);
    });
    updateCounter(cntId, prevId);
}


function updateCounter(cntId, prevId) {
    var cnt = document.getElementById(cntId);
    var prev = document.getElementById(prevId);
    if (!cnt || !prev) return;
    var n = prev.querySelectorAll('.preview-item').length;
    cnt.textContent = n > 0 ? n + (n === 1 ? ' archivo' : ' archivos') : '';
}

// ── Validación ───────────────────────────────────────────────
// esta funcion se encarga de revisar qeu estén rellenos los campos obligatorios, solo se deben agregar los campos obligatorios
function validateForm() {
    clearErrors();
    var ok = true;
    var errFields = [];

    // Campos del autor
    var authorFields = [
        { id: 'nombreResponsable', label: 'Nombre del autor' },
        { id: 'emailResponsable', label: 'Email del autor' }
    ];
    authorFields.forEach(function (f) {
        var el = document.getElementById(f.id);
        if (el && !el.value.trim()) {
            el.classList.add('error');
            showFieldError(f.id);
            ok = false;
            errFields.push({ label: f.label, id: f.id });
        }
    });

    // Campos de cada tarjeta
    cardOrder.forEach(function (id, index) {
        var num = index + 1;
        var tipo = document.getElementById('tipoSolicitud-' + id).value;
        var cardFields = [
            { fid: 'tipoSolicitud', label: 'Tipo de solicitud (Solicitud ' + num + ')' }
        ];
        if (tipo === 'extension') {
            cardFields = cardFields.concat([
                { fid: 'tituloExtension', label: 'Título (Solicitud ' + num + ')' },
                // ñññññññññññ
                { fid: 'descripcionExtension', label: 'Descripción de la actividad (Solicitud ' + num + ')' },
                { fid: 'convenioExtension', label: '¿Está en convenio? (Solicitud ' + num + ')' },
                { fid: 'participantesNombreExtension', label: 'Nombre participante (Solicitud ' + num + ')' },
                { fid: 'participantesApellidoExtension', label: 'Apellido participante (Solicitud ' + num + ')' },
                { fid: 'participantesCargoExtension', label: 'Cargo participante (Solicitud ' + num + ')' },
                { fid: 'participantesInstitucionExtension', label: 'Institución participante (Solicitud ' + num + ')' },
                { fid: 'biografiaExtension', label: 'Biografía (Solicitud ' + num + ')' },
                { fid: 'fechaHoraExtension', label: 'Fecha y hora (Solicitud ' + num + ')' },
                { fid: 'necesitaSalaExtension', label: '¿Necesita una sala? (Solicitud ' + num + ')' },
                { fid: 'apoyoGraficoExtension', label: 'Solicitud de apoyo gráfico (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'extension2') {
            cardFields = cardFields.concat([
                { fid: 'organizaExtension2', label: 'Organiza(n) (Solicitud ' + num + ')' },
                { fid: 'tituloExtension2', label: 'Título (Solicitud ' + num + ')' },
                { fid: 'descripcionExtension2', label: 'Descripción (Solicitud ' + num + ')' },
                { fid: 'fechaHoraExtension2', label: 'Fecha y hora (Solicitud ' + num + ')' },
                { fid: 'lugarExtension2', label: 'Lugar (Solicitud ' + num + ')' },
                { fid: 'formatoExtension2', label: 'Formato (Solicitud ' + num + ')' },
                { fid: 'apoyoGraficoExtension2', label: 'Apoyo gráfico (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'externa') {
            cardFields = cardFields.concat([
                { fid: 'institucionExterna', label: 'Institución organizadora (Solicitud ' + num + ')' },
                { fid: 'tituloExterna', label: 'Título actividad (Solicitud ' + num + ')' },
                { fid: 'descripcionExterna', label: 'Descripción del evento (Solicitud ' + num + ')' },
                { fid: 'participantesExterna', label: 'Participantes (Solicitud ' + num + ')' },
                { fid: 'biografiaExterna', label: 'Biografía (Solicitud ' + num + ')' },
                { fid: 'fechaHoraExterna', label: 'Fecha y hora (Solicitud ' + num + ')' },
                { fid: 'lugarExterna', label: 'Lugar (Solicitud ' + num + ')' },
                { fid: 'asistentesExterna', label: 'Cantidad de asistentes (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'externa2') {
            cardFields = cardFields.concat([
                { fid: 'organizaExterna2', label: 'Organiza(n) (Solicitud ' + num + ')' },
                { fid: 'tituloExterna2', label: 'Título (Solicitud ' + num + ')' },
                { fid: 'descripcionExterna2', label: 'Descripción (Solicitud ' + num + ')' },
                { fid: 'fechaHoraExterna2', label: 'Fecha y hora (Solicitud ' + num + ')' },
                { fid: 'lugarExterna2', label: 'Lugar (Solicitud ' + num + ')' },
                { fid: 'formatoExterna2', label: 'Formato (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'investigacion') {
            cardFields = cardFields.concat([
                { fid: 'tituloInvestigacion', label: 'Título del proyecto (Solicitud ' + num + ')' },
                { fid: 'descripcionInvestigacion', label: 'Descripción del proyecto (Solicitud ' + num + ')' },
                { fid: 'financiamientoUdpInvestigacion', label: '¿Cuenta con financiamiento UDP? (Solicitud ' + num + ')' },
                { fid: 'financiamientoExternoInvestigacion', label: '¿Cuenta con financiamiento externo? (Solicitud ' + num + ')' },
                { fid: 'rolUdpInvestigacion', label: 'Rol de la UDP (Solicitud ' + num + ')' },
                { fid: 'investigadorResponsableInvestigacion', label: 'Investigador responsable y afiliación institucional (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'investigacion2') {
            cardFields = cardFields.concat([
                { fid: 'tituloInvestigacion2', label: 'Título del proyecto (Solicitud ' + num + ')' },
                { fid: 'financiamientoUdpInvestigacion2', label: '¿Financiamiento UDP? (Solicitud ' + num + ')' },
                { fid: 'rolUdpInvestigacion2', label: 'Rol UDP (Solicitud ' + num + ')' },
                { fid: 'investigadorResponsableInvestigacion2', label: 'Investigador responsable (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'vcm') {
            cardFields = cardFields.concat([
                { fid: 'actividadVcm', label: 'Actividad (Solicitud ' + num + ')' },
                { fid: 'financiamientoVcm', label: '¿Cuenta con financiamiento? (Solicitud ' + num + ')' },
                // { fid: 'fechaVcm', label: 'Fecha (Solicitud ' + num + ')' },
                // calendario inicio y fin 
                { fid: 'fechaInicioVcm', label: 'Fecha de inicio (Solicitud ' + num + ')' },
                { fid: 'fechaTerminoVcm', label: 'Fecha de término (Solicitud ' + num + ')' },
                { fid: 'responsableVcm', label: 'Responsable (Solicitud ' + num + ')' }
            ]);
        } else if (tipo === 'publicacion') {
    cardFields = cardFields.concat([
        { fid: 'nombreProyectoPublicacion', label: 'Nombre del proyecto (Solicitud ' + num + ')' },
        { fid: 'fechaProyectoPublicacion', label: 'Fecha del proyecto (Solicitud ' + num + ')' },
        { fid: 'tipoProyectoPublicacion', label: 'Tipo de proyecto (Solicitud ' + num + ')' },
        { fid: 'descripcionPublicacion', label: 'Descripción (Solicitud ' + num + ')' },
        { fid: 'mencionPublicacion', label: 'Mención (Solicitud ' + num + ')' },
        { fid: 'paisPublicacion', label: 'País (Solicitud ' + num + ')' }
    ]);
}

        cardFields.forEach(function (f) {
            var el = document.getElementById(f.fid + '-' + id);
            if (!el) return;
            // radio-chips: el es el contenedor div, leer radio checked
            if (el.classList && el.classList.contains('radio-chips')) {
                var checked = document.querySelector('input[name="' + f.fid + '-' + id + '"]:checked');
                if (!checked) {
                    el.style.outline = '2px solid #b83a24';
                    showFieldError(f.fid + '-' + id);
                    ok = false;
                    errFields.push({ label: f.label, id: f.fid + '-' + id });
                }
            } else if (!el.value.trim()) {
                el.classList.add('error');
                showFieldError(f.fid + '-' + id);
                ok = false;
                errFields.push({ label: f.label, id: f.fid + '-' + id });
            }
        });
        // No hay mínimo de imágenes obligatorio ahora, pero si hay apoyo gráfico, podría requerir imágenes
    });

    if (!ok) showErrorSummary(errFields);
    return ok;
}

function showFieldError(fieldId) {
    var errEl = document.getElementById('err-' + fieldId);
    if (errEl) errEl.style.display = 'block';
}

function hideFieldError(fieldId) {
    var errEl = document.getElementById('err-' + fieldId);
    if (errEl) errEl.style.display = 'none';
}

function showErrorSummary(fields) {
    var summary = document.getElementById('error-summary');
    if (!summary) return;
    summary.innerHTML =
        '<p class="err-summary-title">Por favor corrige los siguientes campos:</p>' +
        '<ul>' + fields.map(function (f) {
            return '<li><a href="#' + f.id + '">' + f.label + '</a></li>';
        }).join('') + '</ul>';
    summary.style.display = 'block';
    summary.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Focus en el primer campo con error
    if (fields.length > 0) {
        var first = document.getElementById(fields[0].id);
        if (first) setTimeout(function () { first.focus(); }, 400);
    }
}

function hideErrorSummary() {
    var summary = document.getElementById('error-summary');
    if (summary) summary.style.display = 'none';
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
    document.querySelectorAll('.field-error').forEach(function (el) { el.style.display = 'none'; });
    hideErrorSummary();
}

// Helper para convertir archivo a Base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function obtenerArchivosDeTarjeta(id) {
    const archivos = [];
    const items = document.querySelectorAll(`#card-${id} .preview-item`);
    console.log('Archivos encontrados en card-' + id + ':', items.length);
    for (let item of items) {
        if (item.file) {
            try {
                const base64 = await toBase64(item.file);
                archivos.push({
                    name: item.file.name,
                    type: item.file.type,
                    base64: base64.split(',')[1]
                });
            } catch (e) {
                console.log('Error convirtiendo archivo a base64:', e);
            }
        }
    }
    console.log('Archivos procesados:', archivos.length);
    return archivos;
}

// ── Envío ────────────────────────────────────────────────────
document.getElementById('projectForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true); hideStatus();

    // Capturar datos antes de leer archivos (los nombres y email se necesitan en confirmación)
    var capturedNames = cardOrder.map(function (id) {
        var tipo = document.getElementById('tipoSolicitud-' + id).value;
        if (tipo === 'extension') return cval(id, 'tituloExtension');
        if (tipo === 'extension2') return cval(id, 'tituloExtension2');
        if (tipo === 'externa') return cval(id, 'tituloExterna');
        if (tipo === 'externa2') return cval(id, 'tituloExterna2');
        if (tipo === 'investigacion') return cval(id, 'tituloInvestigacion');
        if (tipo === 'investigacion2') return cval(id, 'tituloInvestigacion2');

        if (tipo === 'vcm') return cval(id, 'actividadVcm');

        if (tipo === 'publicacion') return cval(id, 'nombreProyectoPublicacion');

        return 'Sin título';
    });
    var capturedEmail = document.getElementById('emailResponsable').value.trim();

    submitCards(0, [], capturedNames, capturedEmail);
});

async function submitCards(index, results, projectNames, authorEmail) {
    if (index >= cardOrder.length) {
        setLoading(false);
        var ok = results.filter(function (r) { return r.exito; }).length;
        var total = results.length;
        if (ok === total) {
            showConfirmacion(authorEmail, projectNames);
            resetForm();
        } else {
            var failed = results.filter(function (r) { return !r.exito; }).map(function (r) { return r.mensaje; });
            showStatus(ok + ' de ' + total + ' enviados. Errores: ' + failed.join('; '), 'error');
        }
        return;
    }

    var id = cardOrder[index];
    var payload = buildPayload(id);

    // CAPTURAMOS LAS FOTOS AQUÍ
    try {
        payload.archivos = await obtenerArchivosDeTarjeta(id);
    } catch (e) {
        console.log('Error obteniendo archivos:', e);
        payload.archivos = [];
    }

    if (typeof google !== 'undefined' && google.script) {
        google.script.run
            .withSuccessHandler(function (result) {
                results.push(result);
                submitCards(index + 1, results, projectNames, authorEmail);
            })
            .withFailureHandler(function (err) {
                results.push({ exito: false, mensaje: err.message || 'Error' });
                submitCards(index + 1, results, projectNames, authorEmail);
            })
            .enviarProyecto(payload);
    } else {
        setTimeout(function () {
            results.push({ exito: true, mensaje: '[Local] ' + (payload.tituloExtension || payload.tituloExterna || payload.tituloInvestigacion || 'Sin título') });
            submitCards(index + 1, results, projectNames, authorEmail);
        }, 400);
    }
}

// esta funcion se encarga de establecer la ocnexión entre el script.js y el code.gs
function buildPayload(id) {
    var tipo = cval(id, 'tipoSolicitud');
    var payload = {
        tipoSolicitud: tipo,
        nombreResponsable: document.getElementById('nombreResponsable').value.trim(),
        emailResponsable: document.getElementById('emailResponsable').value.trim()
    };
    if (tipo === 'extension') {
        payload.tituloExtension = cval(id, 'tituloExtension');
        // ññññññ
        payload.descripcionExtension = cval(id, 'descripcionExtension');
        payload.convenioExtension = getRadio(id, 'convenioExtension');
        payload.institucionConvenioExtension = cval(id, 'institucionConvenioExtension');
        payload.participantesNombreExtension = cval(id, 'participantesNombreExtension');
        payload.participantesApellidoExtension = cval(id, 'participantesApellidoExtension');
        payload.participantesCargoExtension = cval(id, 'participantesCargoExtension');
        payload.participantesInstitucionExtension = cval(id, 'participantesInstitucionExtension');
        payload.biografiaExtension = cval(id, 'biografiaExtension');
        payload.rrssExtension = cval(id, 'rrssExtension');
        payload.fechaHoraExtension = cval(id, 'fechaHoraExtension');
        payload.necesitaSalaExtension = getRadio(id, 'necesitaSalaExtension');
        var salaVal = cval(id, 'preferenciaSalaExtension');
        payload.preferenciaSalaExtension = salaVal === 'Otro' ? cval(id, 'preferenciaSalaOtroExtension') : salaVal;
        payload.apoyoGraficoExtension = getRadio(id, 'apoyoGraficoExtension');
        payload.solicitudesEspecialesExtension = getChecked(id, 'solicitudesEspecialesExtension');
    } else if (tipo === 'extension2') {
        // payload.organizaExtension2 = cval(id, 'organizaExtension2');
        var organiza = cval(id, 'organizaExtension2');
        payload.organizaExtension2 = organiza === 'Otro' ? cval(id, 'organizaOtroExtension2') : organiza;

        payload.tituloExtension2 = cval(id, 'tituloExtension2');
        payload.cicloExtension2 = cval(id, 'cicloExtension2');
        payload.descripcionExtension2 = cval(id, 'descripcionExtension2');
        payload.participanExtension2 = cval(id, 'participanExtension2');
        payload.reseñaParticipantesExtension2 = cval(id, 'reseñaParticipantesExtension2');
        payload.fechaHoraExtension2 = cval(id, 'fechaHoraExtension2');
        payload.lugarExtension2 = cval(id, 'lugarExtension2');
        payload.formatoExtension2 = getRadio(id, 'formatoExtension2');
        payload.publicoObjetivoExtension2 = cval(id, 'publicoObjetivoExtension2');
        payload.cantidadAsistentesExtension2 = cval(id, 'cantidadAsistentesExtension2');
        payload.apoyoGraficoExtension2 = getRadio(id, 'apoyoGraficoExtension2');
    } else if (tipo === 'externa') {
        payload.institucionExterna = cval(id, 'institucionExterna');
        payload.tituloExterna = cval(id, 'tituloExterna');
        payload.descripcionExterna = cval(id, 'descripcionExterna');
        payload.participantesExterna = cval(id, 'participantesExterna');
        payload.biografiaExterna = cval(id, 'biografiaExterna');
        payload.linksExterna = cval(id, 'linksExterna');
        payload.fechaHoraExterna = cval(id, 'fechaHoraExterna');
        payload.lugarExterna = cval(id, 'lugarExterna');
        payload.asistentesExterna = cval(id, 'asistentesExterna');
    }  else if (tipo === 'externa2') {
    var organizaE2 = cval(id, 'organizaExterna2');
    payload.organizaExterna2 = organizaE2 === 'Otro' ? cval(id, 'organizaOtroExterna2') : organizaE2;
    payload.tituloExterna2 = cval(id, 'tituloExterna2');
    payload.descripcionExterna2 = cval(id, 'descripcionExterna2');
    payload.participanExterna2 = cval(id, 'participanExterna2');
    payload.reseñaParticipantesExterna2 = cval(id, 'reseñaParticipantesExterna2');
    payload.enlacesExterna2 = cval(id, 'enlacesExterna2');
    payload.fechaHoraExterna2 = cval(id, 'fechaHoraExterna2');
    payload.lugarExterna2 = cval(id, 'lugarExterna2');
    payload.formatoExterna2 = getRadio(id, 'formatoExterna2');
    payload.publicoObjetivoExterna2 = cval(id, 'publicoObjetivoExterna2');
    payload.cantidadAsistentesExterna2 = cval(id, 'cantidadAsistentesExterna2');
    payload.hipervínculosExterna2 = cval(id, 'hipervínculosExterna2');
    payload.equipoTecnicoExterna2 = getChecked(id, 'equipoTecnicoExterna2');
    payload.disposicionSalaExterna2 = cval(id, 'disposicionSalaExterna2');
    payload.coberturaExterna2 = getChecked(id, 'coberturaExterna2');
    payload.solicitudesEspecialesExterna2 = getChecked(id, 'solicitudesEspecialesExterna2');
}else if (tipo === 'investigacion') {
        payload.tituloInvestigacion = cval(id, 'tituloInvestigacion');
        payload.descripcionInvestigacion = cval(id, 'descripcionInvestigacion');
        payload.financiamientoUdpInvestigacion = getRadio(id, 'financiamientoUdpInvestigacion');
        payload.financiamientoExternoInvestigacion = getRadio(id, 'financiamientoExternoInvestigacion');
        payload.agenciaFinancieraInvestigacion = cval(id, 'agenciaFinancieraInvestigacion');
        payload.fondoInvestigacion = cval(id, 'fondoInvestigacion');
        payload.anioAdjudicacionInvestigacion = cval(id, 'anioAdjudicacionInvestigacion');
        payload.anioInicioInvestigacion = cval(id, 'anioInicioInvestigacion');
        payload.anioTerminoInvestigacion = cval(id, 'anioTerminoInvestigacion');
        payload.montoAdjudicadoInvestigacion = cval(id, 'montoAdjudicadoInvestigacion');
        payload.rolUdpInvestigacion = getRadio(id, 'rolUdpInvestigacion');
        payload.investigadorResponsableInvestigacion = cval(id, 'investigadorResponsableInvestigacion');
        payload.investigadoresColaboradoresInvestigacion = cval(id, 'investigadoresColaboradoresInvestigacion');
    } else if (tipo === 'investigacion2') {
    payload.tituloInvestigacion2 = cval(id, 'tituloInvestigacion2');
    payload.financiamientoUdpInvestigacion2 = getRadio(id, 'financiamientoUdpInvestigacion2');
    payload.reseñaInvestigacion2 = cval(id, 'reseñaInvestigacion2');
    payload.agenciaInvestigacion2 = cval(id, 'agenciaInvestigacion2');
    payload.lineaProgramaInvestigacion2 = cval(id, 'lineaProgramaInvestigacion2');
    payload.anioAdjudicacionInvestigacion2 = cval(id, 'anioAdjudicacionInvestigacion2');
    payload.anioInicioInvestigacion2 = cval(id, 'anioInicioInvestigacion2');
    payload.anioTerminoInvestigacion2 = cval(id, 'anioTerminoInvestigacion2');
    payload.montoAdjudicadoInvestigacion2 = cval(id, 'montoAdjudicadoInvestigacion2');
    payload.rolUdpInvestigacion2 = getRadio(id, 'rolUdpInvestigacion2');
    payload.investigadorResponsableInvestigacion2 = cval(id, 'investigadorResponsableInvestigacion2');
    payload.colaboradoresInvestigacion2 = cval(id, 'colaboradoresInvestigacion2');
}else if (tipo === 'vcm') {
        payload.actividadVcm = cval(id, 'actividadVcm');



        // payload.nivelVcm = cval(id, 'nivelVcm');
        payload.nivelVcm = getRadio(id, 'nivelVcm');



        payload.lineaEstrategicaVcm = cval(id, 'lineaEstrategicaVcm');


        // payload.convenioVcm = cval(id, 'convenioVcm');
        payload.convenioVcm = getRadio(id, 'convenioVcm');
        // payload.institucionConvenioVcm = cval(id, 'institucionConvenioVcm');
        var instConvenio = cval(id, 'institucionConvenioVcm');
        payload.institucionConvenioVcm = instConvenio === 'Otra institución' ? cval(id, 'institucionConvenioOtroVcm') : instConvenio;


        payload.contraparteVcm = cval(id, 'contraparteVcm');
        payload.financiamientoVcm = getRadio(id, 'financiamientoVcm');



        // payload.tipoFinanciamientoVcm = cval(id, 'tipoFinanciamientoVcm');
        // esto era cuando tipo de financ se respondia con texto
        // payload.tipoFinanciamientoVcm = getRadio(id, 'tipoFinanciamientoVcm');
        var fondoExterno = getRadio(id, 'fondoExternoVcm');
        payload.fondoExternoVcm = fondoExterno === 'Otro' ? cval(id, 'fondoExternoOtroVcm') : fondoExterno;
        var fondoInterno = getRadio(id, 'fondoInternoVcm');
        payload.fondoInternoVcm = fondoInterno === 'Otro' ? cval(id, 'fondoInternoOtroVcm') : fondoInterno;


        payload.montoVcm = cval(id, 'montoVcm');
        // payload.fechaVcm = cval(id, 'fechaVcm');

        // agrrgar calendario de inicio y fin
        payload.fechaInicioVcm = cval(id, 'fechaInicioVcm');
        payload.fechaTerminoVcm = cval(id, 'fechaTerminoVcm');

        payload.objetivoVcm = cval(id, 'objetivoVcm');
        payload.responsableVcm = cval(id, 'responsableVcm');
        payload.cursoVcm = cval(id, 'cursoVcm');
        payload.outputVcm = cval(id, 'outputVcm');
        payload.outcomeVcm = cval(id, 'outcomeVcm');
        payload.indicadorActividadVcm = cval(id, 'indicadorActividadVcm');
        payload.indicadorResultadoVcm = cval(id, 'indicadorResultadoVcm');
    } else if (tipo === 'publicacion') {
    payload.nombreProyectoPublicacion = cval(id, 'nombreProyectoPublicacion');
    payload.fechaProyectoPublicacion = cval(id, 'fechaProyectoPublicacion');
    payload.tipoProyectoPublicacion = cval(id, 'tipoProyectoPublicacion');
    payload.descripcionPublicacion = cval(id, 'descripcionPublicacion');
    payload.mencionPublicacion = getRadio(id, 'mencionPublicacion');
    payload.etiquetasPublicacion = getChecked(id, 'etiquetasPublicacion');
    payload.coleccionPublicacion = cval(id, 'coleccionPublicacion');
    payload.rolPublicacion = cval(id, 'rolPublicacion');
    payload.paisPublicacion = cval(id, 'paisPublicacion');
    payload.palabrasClavePublicacion = cval(id, 'palabrasClavePublicacion');
    payload.linkWebPublicacion = cval(id, 'linkWebPublicacion');
    payload.instagramPublicacion = cval(id, 'instagramPublicacion');
    payload.youtubePublicacion = cval(id, 'youtubePublicacion');
    payload.otrasRedesPublicacion = cval(id, 'otrasRedesPublicacion');
    payload.linkVideoPublicacion = cval(id, 'linkVideoPublicacion');
}
    return payload;
}

function cval(id, field) {
    var el = document.getElementById(field + '-' + id);
    return el && typeof el.value === 'string' ? el.value.trim() : '';
}
function getRadio(id, name) {
    var checked = document.querySelector('input[name="' + name + '-' + id + '"]:checked');
    return checked ? checked.value : '';
}
function getChecked(id, name) {
    return Array.from(document.querySelectorAll('input[name="' + name + '-' + id + '"]:checked'))
        .map(function (cb) { return cb.value; });
}

// ── Confirmación ─────────────────────────────────────────────
function showConfirmacion(email, nombres) {
    document.getElementById('projectForm').style.display = 'none';
    var confirmEl = document.getElementById('confirmacion');
    document.getElementById('confirm-email').textContent = email;
    var list = document.getElementById('confirm-list');
    list.innerHTML = nombres.map(function (n) {
        return '<li>' + (n || 'Sin título') + '</li>';
    }).join('');
    confirmEl.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function volverAlFormulario() {
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('projectForm').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Reset ────────────────────────────────────────────────────
function resetForm() {
    document.getElementById('nombreResponsable').value = '';
    document.getElementById('emailResponsable').value = '';
    cardOrder.slice().forEach(function (id) { removeCard(id); });
    addCard();
    clearErrors();
}

document.getElementById('clearBtn').addEventListener('click', function () {
    if (!confirm('¿Limpiar el formulario? Se perderán todos los datos ingresados.')) return;
    resetForm(); hideStatus();
});

document.getElementById('addProjectBtn').addEventListener('click', function () {
    addCard();
    var newCard = document.getElementById('card-' + (nextCardId - 1));
    if (newCard) newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('btnVolverFormulario').addEventListener('click', volverAlFormulario);

// Limpiar errores autor al corregir
['nombreResponsable', 'emailResponsable'].forEach(function (fid) {
    var el = document.getElementById(fid);
    if (!el) return;
    el.addEventListener('input', function () {
        el.classList.remove('error');
        hideFieldError(fid);
        hideErrorSummary();
    });
});

// ── UI helpers ───────────────────────────────────────────────
function setLoading(on) {
    document.getElementById('submitBtn').disabled = on;
    document.getElementById('clearBtn').disabled = on;
    document.getElementById('spinner').style.display = on ? 'block' : 'none';
    document.getElementById('btnArrow').style.display = on ? 'none' : 'inline';
    document.getElementById('btnText').textContent = on
        ? 'Enviando...'
        : (cardOrder.length > 1 ? 'Enviar solicitudes' : 'Enviar solicitud');
}
function showStatus(msg, type) {
    var s = document.getElementById('statusMsg');
    s.textContent = msg; s.className = 'status ' + type;
    s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function hideStatus() {
    var s = document.getElementById('statusMsg');
    s.className = 'status'; s.textContent = '';
}

// ── Barra de progreso: IntersectionObserver ──────────────────
function setActiveStep(idx) {
    // Nav escritorio
    document.querySelectorAll('.step-btn').forEach(function (btn, i) {
        btn.classList.toggle('active', i === idx);
        btn.textContent = STEP_LABELS[i];
    });
    // Nav móvil bottom bar
    document.querySelectorAll('.mob-step-btn').forEach(function (btn, i) {
        btn.classList.toggle('active', i === idx);
    });
}

// IDs de destino por índice de paso (0=Autor, 1=Solicitud, 2=Enviar)
// Los IDs con sufijo -0 apuntan siempre a la primera tarjeta
var STEP_ANCHOR_IDS = [
    'anchorAutor',
    'anchorProyecto-0',
    'anchorRevision'
];

function isMobile() {
    return window.innerWidth <= 600;
}

// ── Paginación móvil ──────────────────────────────────────────
var currentMobPage = 0;

function goToMobPage(pageIdx) {
    currentMobPage = pageIdx;
    // Mostrar solo la página activa
    document.querySelectorAll('.mob-page').forEach(function (p) {
        p.classList.toggle('active', parseInt(p.getAttribute('data-page'), 10) === pageIdx);
    });
    // Sincronizar bottom nav
    document.querySelectorAll('.mob-step-btn').forEach(function (btn) {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-page'), 10) === pageIdx);
    });
    // Scroll al tope del formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Nav escritorio: scroll a sección ────────────────────────
function scrollToStep(idx) {
    var targetId = STEP_ANCHOR_IDS[idx];
    var target = document.getElementById(targetId);
    if (!target) return;
    var barH = document.getElementById('progressSteps').offsetHeight;
    var top = target.getBoundingClientRect().top + window.pageYOffset - barH - 12;
    window.scrollTo({ top: top, behavior: 'smooth' });
}

function initProgressObserver() {
    // Click handlers — nav escritorio (solo desktop)
    document.querySelectorAll('.step-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var idx = parseInt(btn.getAttribute('data-step'), 10);
            setActiveStep(idx);
            scrollToStep(idx);
        });
    });

    // Click handlers — bottom bar móvil (data-page)
    document.querySelectorAll('.mob-step-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (!isMobile()) return;
            var page = parseInt(btn.getAttribute('data-page'), 10);
            goToMobPage(page);
        });
    });

    // Click handlers — botones Siguiente / Anterior entre páginas
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.mob-nav-btn');
        if (!btn) return;
        var to = parseInt(btn.getAttribute('data-to'), 10);
        goToMobPage(to);
    });

    // Obtiene la posición absoluta de un elemento desde el tope del documento
    function absTop(el) {
        var top = 0;
        while (el) { top += el.offsetTop; el = el.offsetParent; }
        return top;
    }

    // Scroll listener — solo para el nav de escritorio
    function updateActiveStep() {
        if (isMobile()) return; // en móvil la paginación maneja el estado
        var barH = document.getElementById('progressSteps').offsetHeight;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        var active = 0;
        for (var i = STEP_ANCHOR_IDS.length - 1; i >= 0; i--) {
            var el = document.getElementById(STEP_ANCHOR_IDS[i]);
            if (!el) continue;
            if (scrollY >= absTop(el) - barH - 16) { active = i; break; }
        }
        setActiveStep(active);
    }

    window.addEventListener('scroll', updateActiveStep, { passive: true });
    updateActiveStep();
}

// ── Init ─────────────────────────────────────────────────────
addCard();
initProgressObserver();
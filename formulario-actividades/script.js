var cardOrder = [];
var nextCardId = 0;

var STEP_LABELS = ['Autor', 'Solicitud', 'Enviar'];
var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// ── HTML de cada tarjeta ─────────────────────────────────────
function buildCardHTML(id) {
    return (
        '<div class="project-card-header">' +
        '<span class="card-number">Solicitud 1</span>' +
        '<button type="button" class="remove-card-btn" style="display:none">Eliminar solicitud</button>' +
        '</div>' +

        // Tipo de solicitud
        '<div class="form-section" id="anchorProyecto-' + id + '">' +
        '<p class="section-title">Tipo de solicitud</p>' +
        '<div class="field">' +
        '<label for="tipoSolicitud-' + id + '">Selecciona el tipo de solicitud <span class="req">*</span></label>' +
        '<select id="tipoSolicitud-' + id + '" required>' +
        '<option value="">Selecciona una opción</option>' +
        '<option value="extension">Iniciativas de extensión organizadas por UDP</option>' +
        '<option value="externa">Participación en instancias externas</option>' +
        '<option value="investigacion">Proyectos de Investigación, creación e innovación</option>' +
        '</select>' +
        '<p class="field-error" id="err-tipoSolicitud-' + id + '">Selecciona una opción.</p>' +
        '</div>' +
        '</div>' +

        // Iniciativas de extensión organizadas por UDP
        '<div class="form-section solicitud-extension" id="solicitud-extension-' + id + '" style="display:none">' +
        '<p class="section-title">Iniciativas de extensión organizadas por UDP</p>' +
        '<div class="field">' +
        '<label for="tituloExtension-' + id + '">Título <span class="req">*</span></label>' +
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
        '<div class="field">' +
        '<label for="fechaHoraExtension-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        '<input type="datetime-local" id="fechaHoraExtension-' + id + '" required>' +
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

        // Participación en instancias externas
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
        '<div class="field">' +
        '<label for="fechaHoraExterna-' + id + '">Fecha y hora <span class="req">*</span></label>' +
        '<input type="datetime-local" id="fechaHoraExterna-' + id + '" required>' +
        '<p class="field-error" id="err-fechaHoraExterna-' + id + '">Este campo es obligatorio.</p>' +
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

        // Proyectos de Investigación, creación e innovación
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
        '</div>'
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
    wrapper.innerHTML = buildCardHTML(id);
    container.appendChild(wrapper);
    wireCard(id);
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
        document.getElementById('solicitud-externa-' + id).style.display = val === 'externa' ? 'block' : 'none';
        document.getElementById('solicitud-investigacion-' + id).style.display = val === 'investigacion' ? 'block' : 'none';
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
        } else if (tipo === 'investigacion') {
            cardFields = cardFields.concat([
                { fid: 'tituloInvestigacion', label: 'Título del proyecto (Solicitud ' + num + ')' },
                { fid: 'descripcionInvestigacion', label: 'Descripción del proyecto (Solicitud ' + num + ')' },
                { fid: 'financiamientoUdpInvestigacion', label: '¿Cuenta con financiamiento UDP? (Solicitud ' + num + ')' },
                { fid: 'financiamientoExternoInvestigacion', label: '¿Cuenta con financiamiento externo? (Solicitud ' + num + ')' },
                { fid: 'rolUdpInvestigacion', label: 'Rol de la UDP (Solicitud ' + num + ')' },
                { fid: 'investigadorResponsableInvestigacion', label: 'Investigador responsable y afiliación institucional (Solicitud ' + num + ')' }
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
        if (tipo === 'externa') return cval(id, 'tituloExterna');
        if (tipo === 'investigacion') return cval(id, 'tituloInvestigacion');
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

function buildPayload(id) {
    var tipo = cval(id, 'tipoSolicitud');
    var payload = {
        tipoSolicitud: tipo,
        nombreResponsable: document.getElementById('nombreResponsable').value.trim(),
        emailResponsable: document.getElementById('emailResponsable').value.trim()
    };
    if (tipo === 'extension') {
        payload.tituloExtension = cval(id, 'tituloExtension');
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
    } else if (tipo === 'investigacion') {
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
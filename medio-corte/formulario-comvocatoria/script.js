/* ============================================================
   CONVOCATORIA FERIA MEDIO CORTE 2026
   ------------------------------------------------------------
   Para editar el formulario: toca SOLO el objeto SCHEMA de abajo.
   El resto del archivo dibuja, valida y envía lo que definas ahí.

   Tipos de campo disponibles:
     text · email · tel · url · number · textarea
     select   -> opciones: []
     radio    -> opciones: []
     checkbox -> opciones: []   (múltiple)
     check    -> casilla única (para declaraciones)
     file     -> zona de carga de imágenes
     info     -> texto informativo, no se guarda

   Propiedades por campo:
     id        (obligatorio, sin espacios)
     label     texto de la pregunta
     ayuda     texto chico bajo el label
     req       true = obligatorio
     max       límite de caracteres (muestra contador)
     otro      true = agrega campo "Otro:" cuando eligen "Otro"
     showIf    { campo: 'idDeOtroCampo', valor: 'X' } -> solo aparece si coincide
   ============================================================ */

var CONVOCATORIA = {
    titulo: 'Convocatoria Feria Medio Corte 2026',
    // PLACEHOLDER: bajada de la convocatoria
    bajada: 'Formulario de postulación para la Feria Medio Corte, que se realizará el [FECHA] en [LUGAR].',
    // PLACEHOLDER: link a las bases
    linkBases: '#',
    // PLACEHOLDER: fecha de cierre
    plazo: 'Recibimos postulaciones hasta el [FECHA] a las 23:59 hrs. Notificaremos los resultados el [FECHA].'
};

var TIPOS = [
    { valor: 'stand', label: 'Quiero participar con un stand' },
    { valor: 'taller', label: 'Quiero participar con un taller / workshop' },
    { valor: 'musico', label: 'Quiero participar como músico' }
];

var SCHEMA = {

    /* ---------- BLOQUE COMÚN: se muestra siempre ---------- */
    comun: [
        { seccion: 'Sobre ti o tu proyecto' },

        {
            id: 'nombreProyecto', tipo: 'text', req: true,
            label: 'Nombre del proyecto, artista o colectivo',
            ayuda: 'Tal como quieras que aparezca en la difusión de la feria.'
        },
        {
            id: 'resena', tipo: 'textarea', req: true, max: 350,
            label: 'Reseña breve',
            ayuda: 'Se usará para difusión si eres seleccionadx, así que cuídala.'
        },
        {
            id: 'nombreResponsable', tipo: 'text', req: true,
            label: 'Nombre completo de la persona responsable'
        },
        {
            id: 'pronombres', tipo: 'select', otro: true,
            label: '¿Qué pronombres usas?',
            opciones: ['Ella / la', 'Él / lo', 'Elle / le', 'Prefiero no indicarlo', 'Otro']
        },
        { id: 'email', tipo: 'email', req: true, label: 'Correo electrónico de contacto' },
        { id: 'telefono', tipo: 'tel', req: true, label: 'Teléfono de contacto' },
        { id: 'ciudadPais', tipo: 'text', req: true, label: 'Ciudad y país de residencia' },
        {
            id: 'redes', tipo: 'text', req: true,
            label: 'Redes sociales', ayuda: 'Instagram, Behance u otras.'
        },
        { id: 'web', tipo: 'url', label: 'Sitio web o portafolio (opcional)' }
    ],

    /* ---------- RAMA 1: STAND ---------- */
    stand: [
        { seccion: 'Sobre tu stand' },

        {
            id: 'tipoPostulacion', tipo: 'radio', req: true,
            label: 'Tipo de postulación',
            opciones: ['Individual', 'Colectivo']
        },
        {
            id: 'categoria', tipo: 'select', req: true, otro: true,
            label: '¿Qué categoría describe mejor tu práctica?',
            opciones: ['Artista o autor/a/x', 'Colectivo', 'Taller', 'Microeditorial', 'Editorial', 'Otro']
        },
        {
            id: 'trayectoria', tipo: 'textarea', req: true, max: 700,
            label: 'Cuéntanos sobre tu proyecto: ¿cuándo, dónde y cómo surge? ¿Qué te mueve?'
        },
        {
            id: 'queTraes', tipo: 'textarea', req: true, max: 350,
            label: '¿Qué publicaciones, prints u objetos traerás?',
            ayuda: 'Fanzines, libros gráficos, prints, afiches, objetos, otros.'
        },
        {
            id: 'cantidadTitulos', tipo: 'radio', req: true,
            label: '¿Cuántos títulos u obras planeas llevar?',
            opciones: ['Entre 1 y 5', 'Entre 6 y 10', 'Más de 10']
        },
        {
            id: 'personasStand', tipo: 'radio', req: true,
            label: '¿Cuántas personas atenderían el stand?',
            ayuda: 'Recomendamos 1 persona por tema de circulación.',
            opciones: ['1', '2']
        },
        {
            id: 'necesidadesMontaje', tipo: 'checkbox',
            label: '¿Qué necesitas para el montaje?',
            opciones: ['Mesa', 'Sillas', 'Muro o panel', 'Toma de corriente', 'Iluminación adicional', 'Nada, llevo todo']
        },
        {
            id: 'viaje', tipo: 'radio', req: true,
            label: 'Si viajas desde otra ciudad, ¿tienes cómo gestionar tu estadía?',
            opciones: ['Vivo en la ciudad', 'Viajo y tengo estadía resuelta', 'Viajo y necesitaría apoyo']
        },
        {
            id: 'cartaInvitacion', tipo: 'radio', req: true,
            label: '¿Necesitas una carta o documento oficial para gestionar fondos o permisos?',
            opciones: ['Sí', 'No']
        },
        {
            id: 'imagenes', tipo: 'file', req: true,
            label: 'Carga hasta 5 fotografías de tus proyectos',
            ayuda: 'JPG o PNG, buena resolución, máx 10 MB por archivo. Puede usarse para difusión.'
        }
    ],

    /* ---------- RAMA 2: TALLER / WORKSHOP ---------- */
    taller: [
        { seccion: 'Sobre tu taller' },

        { id: 'nombreTaller', tipo: 'text', req: true, label: 'Nombre del taller' },
        {
            id: 'descripcionTaller', tipo: 'textarea', req: true, max: 700,
            label: 'Descripción del taller',
            ayuda: '¿Qué se hace, qué se lleva la gente al final?'
        },
        {
            id: 'tecnica', tipo: 'text', req: true,
            label: 'Técnica o disciplina',
            ayuda: 'Risografía, encuadernación, serigrafía, escritura, etc.'
        },
        { id: 'duracion', tipo: 'text', req: true, label: 'Duración', ayuda: 'Ej: 2 horas.' },
        { id: 'sesiones', tipo: 'number', req: true, label: 'Número de sesiones' },
        { id: 'cuposMin', tipo: 'number', req: true, label: 'Cupos mínimos' },
        { id: 'cuposMax', tipo: 'number', req: true, label: 'Cupos máximos' },
        { id: 'publicoObjetivo', tipo: 'text', req: true, label: 'Público objetivo' },
        { id: 'edadMinima', tipo: 'text', label: 'Edad mínima (si aplica)' },
        {
            id: 'nivel', tipo: 'radio', req: true,
            label: 'Nivel requerido',
            opciones: ['Inicial', 'Intermedio', 'Avanzado', 'Todo público']
        },
        {
            id: 'materialesAporta', tipo: 'textarea', req: true,
            label: '¿Qué materiales aportas tú?'
        },
        {
            id: 'materialesNecesita', tipo: 'textarea', req: true,
            label: '¿Qué materiales necesitas de la organización?',
            ayuda: 'Sé específicx con cantidades. Esto define el presupuesto.'
        },
        {
            id: 'requerimientosEspacio', tipo: 'checkbox',
            label: 'Requerimientos del espacio',
            opciones: ['Mesas de trabajo', 'Sillas', 'Acceso a agua', 'Toma de corriente', 'Proyector', 'Buena ventilación', 'Espacio oscuro']
        },
        {
            id: 'costoParticipante', tipo: 'radio', req: true,
            label: '¿El taller tiene costo para quien participa?',
            opciones: ['Gratuito', 'Con costo']
        },
        {
            id: 'montoTaller', tipo: 'text', req: true,
            label: 'Valor por participante',
            showIf: { campo: 'costoParticipante', valor: 'Con costo' }
        },
        {
            id: 'disponibilidadTaller', tipo: 'checkbox', req: true,
            label: '¿Qué días podrías dictarlo?',
            // PLACEHOLDER: reemplazar por las fechas reales de la feria
            opciones: ['[DÍA 1]', '[DÍA 2]', '[DÍA 3]', 'Cualquiera']
        },
        {
            id: 'experienciaTaller', tipo: 'textarea',
            label: '¿Has dictado este taller antes? Cuéntanos dónde.'
        },
        {
            id: 'imagenes', tipo: 'file', req: true,
            label: 'Carga hasta 5 imágenes del taller o de resultados anteriores',
            ayuda: 'JPG o PNG, máx 10 MB por archivo.'
        }
    ],

    /* ---------- RAMA 3: MÚSICO ---------- */
    musico: [
        { seccion: 'Sobre tu música' },

        { id: 'nombreArtistico', tipo: 'text', req: true, label: 'Nombre artístico o de la banda' },
        { id: 'genero', tipo: 'text', req: true, label: 'Género o estilo' },
        {
            id: 'formato', tipo: 'radio', req: true, otro: true,
            label: 'Formato',
            opciones: ['Solista', 'Dúo', 'Banda', 'DJ set', 'Otro']
        },
        { id: 'integrantes', tipo: 'number', req: true, label: 'Número de integrantes en escenario' },
        { id: 'duracionSet', tipo: 'text', req: true, label: 'Duración del set', ayuda: 'Ej: 40 minutos.' },
        {
            id: 'linksAudio', tipo: 'textarea', req: true,
            label: 'Links a audio o video',
            ayuda: 'Obligatorio. Bandcamp, YouTube, Spotify, SoundCloud, lo que tengas.'
        },
        {
            id: 'riderTecnico', tipo: 'textarea', req: true,
            label: 'Rider técnico',
            ayuda: 'Canales necesarios, backline, monitores, micrófonos.'
        },
        {
            id: 'equipoPropio', tipo: 'radio', req: true,
            label: '¿Llevas equipo propio?',
            opciones: ['Sí, llevo todo', 'Parcialmente', 'No, necesito backline completo']
        },
        { id: 'tiempoMontaje', tipo: 'text', req: true, label: 'Tiempo estimado de montaje y prueba de sonido' },
        {
            id: 'disponibilidadMusico', tipo: 'checkbox', req: true,
            label: '¿Qué días podrías tocar?',
            // PLACEHOLDER: reemplazar por las fechas reales de la feria
            opciones: ['[DÍA 1]', '[DÍA 2]', '[DÍA 3]', 'Cualquiera']
        },
        {
            id: 'experienciaMusico', tipo: 'textarea',
            label: 'Presentaciones anteriores relevantes'
        },
        {
            id: 'imagenes', tipo: 'file',
            label: 'Fotografías de prensa o de presentaciones (opcional)',
            ayuda: 'JPG o PNG, máx 10 MB por archivo.'
        }
    ],

    /* ---------- CIERRE: se muestra siempre ---------- */
    cierre: [
        { seccion: 'Para finalizar' },

        {
            id: 'comentarios', tipo: 'textarea',
            label: '¿Hay algo más que quieras contarnos?',
            ayuda: 'Cuidados a considerar, accesibilidad, lo que sea.'
        },
        {
            id: 'declaracion', tipo: 'check', req: true,
            label: 'Declaro haber leído las bases y entiendo que completar este formulario no constituye una inscripción confirmada.'
        }
    ]
};

/* ============================================================
   DE ACÁ PARA ABAJO NO NECESITAS EDITAR NADA
   ============================================================ */

var tipoActual = '';

// ── Dibujar ──────────────────────────────────────────────────
function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
}

function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildField(f) {
    if (f.seccion) return '<p class="section-title">' + esc(f.seccion) + '</p>';
    if (f.tipo === 'info') return '<p class="helper">' + f.label + '</p>';

    var req = f.req ? ' <span class="req">*</span>' : '';
    var ayuda = f.ayuda ? '<p class="helper">' + esc(f.ayuda) + '</p>' : '';
    var err = '<p class="field-error" id="err-' + f.id + '">Este campo es obligatorio.</p>';
    var hidden = f.showIf ? ' style="display:none"' : '';
    var h = '<div class="field" id="wrap-' + f.id + '"' + hidden + '>';

    // Casilla única (declaración)
    if (f.tipo === 'check') {
        h += '<label class="tag-chip"><input type="checkbox" id="' + f.id + '"><span>' +
            esc(f.label) + req + '</span></label>' + ayuda +
            '<p class="field-error" id="err-' + f.id + '">Debes marcar esta casilla.</p></div>';
        return h;
    }

    h += '<label for="' + f.id + '">' + esc(f.label) + req + '</label>' + ayuda;

    if (f.tipo === 'textarea') {
        h += '<textarea id="' + f.id + '" rows="1" placeholder="Respuesta larga"' +
            (f.max ? ' maxlength="' + f.max + '"' : '') + '></textarea>';
        if (f.max) h += '<span class="drop-counter" id="cnt-' + f.id + '">0 / ' + f.max + '</span>';

    } else if (f.tipo === 'select') {
        h += '<select id="' + f.id + '"><option value="">Selecciona una opción</option>';
        f.opciones.forEach(function (o) { h += '<option value="' + esc(o) + '">' + esc(o) + '</option>'; });
        h += '</select>';

    } else if (f.tipo === 'radio') {
        h += '<div class="radio-chips" id="' + f.id + '">';
        f.opciones.forEach(function (o) {
            h += '<label class="radio-chip"><input type="radio" name="' + f.id + '" value="' +
                esc(o) + '"><span>' + esc(o) + '</span></label>';
        });
        h += '</div>';

    } else if (f.tipo === 'checkbox') {
        h += '<div class="tags-grid" id="' + f.id + '">';
        f.opciones.forEach(function (o) {
            h += '<label class="tag-chip"><input type="checkbox" name="' + f.id + '" value="' +
                esc(o) + '"><span>' + esc(o) + '</span></label>';
        });
        h += '</div>';

    } else if (f.tipo === 'file') {
        h += '<div class="drop-zone" id="drop-' + f.id + '" tabindex="0">' +
            '<strong>Arrastra imágenes o haz clic para seleccionar</strong>' +
            '<span>JPG, PNG, WEBP · Máx 10 MB por archivo</span>' +
            '<input type="file" class="file-input-hidden" id="file-' + f.id + '" multiple accept="image/*">' +
            '<span class="drop-counter" id="cnt-' + f.id + '"></span>' +
            '</div><div class="preview-grid" id="prev-' + f.id + '"></div>';

    } else {
        h += '<input type="' + f.tipo + '" id="' + f.id + '" placeholder="Respuesta corta"' +
            (f.max ? ' maxlength="' + f.max + '"' : '') + '>';
    }

    h += err;

    // Campo "Otro:"
    if (f.otro) {
        h += '<div class="field" id="wrap-' + f.id + 'Otro" style="display:none;margin-top:8px">' +
            '<input type="text" id="' + f.id + 'Otro" placeholder="Especifica cuál">' +
            '</div>';
    }

    h += '</div>';
    return h;
}

function renderTipo(tipo) {
    tipoActual = tipo;
    var cont = document.getElementById('camposContainer');

    if (!tipo) { cont.innerHTML = ''; return; }

    var campos = SCHEMA.comun.concat(SCHEMA[tipo]).concat(SCHEMA.cierre);
    cont.innerHTML = '<div class="form-section">' +
        campos.map(buildField).join('') + '</div>';

    wireCampos(campos);
    clearErrors();
}

// ── Conectar eventos ─────────────────────────────────────────
function camposActivos() {
    if (!tipoActual) return [];
    return SCHEMA.comun.concat(SCHEMA[tipoActual]).concat(SCHEMA.cierre)
        .filter(function (f) { return f.id; });
}

function wireCampos(campos) {
    campos.forEach(function (f) {
        if (!f.id) return;

        // Contador de caracteres
        if (f.max) {
            var ta = document.getElementById(f.id);
            var cnt = document.getElementById('cnt-' + f.id);
            if (ta && cnt) {
                ta.addEventListener('input', function () {
                    cnt.textContent = ta.value.length + ' / ' + f.max;
                    if (ta.tagName === 'TEXTAREA') autoExpand(ta);
                });
            }
        }

        // Zona de carga
        if (f.tipo === 'file') {
            wireDropZone('drop-' + f.id, 'file-' + f.id, 'cnt-' + f.id, 'prev-' + f.id);
        }

        // Campo "Otro:"
        if (f.otro) {
            var toggleOtro = function (val) {
                var w = document.getElementById('wrap-' + f.id + 'Otro');
                if (w) w.style.display = val === 'Otro' ? 'block' : 'none';
            };
            if (f.tipo === 'select') {
                document.getElementById(f.id).addEventListener('change', function () { toggleOtro(this.value); });
            } else if (f.tipo === 'radio') {
                document.querySelectorAll('input[name="' + f.id + '"]').forEach(function (r) {
                    r.addEventListener('change', function () { toggleOtro(this.value); });
                });
            }
        }

        // Limpiar error al escribir
        var el = document.getElementById(f.id);
        if (el) {
            el.addEventListener('input', function () {
                el.classList.remove('error'); hideFieldError(f.id); hideErrorSummary();
            });
            el.addEventListener('change', function () {
                el.classList.remove('error'); hideFieldError(f.id); hideErrorSummary();
            });
            if (el.tagName === 'TEXTAREA') el.addEventListener('input', function () { autoExpand(el); });
        }
        document.querySelectorAll('[name="' + f.id + '"]').forEach(function (i) {
            i.addEventListener('change', function () {
                var g = document.getElementById(f.id);
                if (g) g.style.outline = '';
                hideFieldError(f.id); hideErrorSummary();
            });
        });
    });

    // Campos condicionales (showIf)
    campos.forEach(function (f) {
        if (!f.showIf) return;
        var origen = f.showIf.campo;
        var actualizar = function () {
            var v = leerValor(campoPorId(origen));
            var w = document.getElementById('wrap-' + f.id);
            if (w) w.style.display = (v === f.showIf.valor) ? 'block' : 'none';
        };
        var el = document.getElementById(origen);
        if (el) el.addEventListener('change', actualizar);
        document.querySelectorAll('[name="' + origen + '"]').forEach(function (i) {
            i.addEventListener('change', actualizar);
        });
        actualizar();
    });
}

function campoPorId(id) {
    return camposActivos().filter(function (f) { return f.id === id; })[0];
}

function visible(f) {
    var w = document.getElementById('wrap-' + f.id);
    return w && w.style.display !== 'none';
}

// ── Leer valores ─────────────────────────────────────────────
function leerValor(f) {
    if (!f) return '';
    if (f.tipo === 'radio') {
        var r = document.querySelector('input[name="' + f.id + '"]:checked');
        var v = r ? r.value : '';
        if (v === 'Otro') v = (document.getElementById(f.id + 'Otro') || {}).value || 'Otro';
        return v;
    }
    if (f.tipo === 'checkbox') {
        return Array.from(document.querySelectorAll('input[name="' + f.id + '"]:checked'))
            .map(function (c) { return c.value; }).join(', ');
    }
    if (f.tipo === 'check') {
        var c = document.getElementById(f.id);
        return c && c.checked ? 'Sí' : '';
    }
    if (f.tipo === 'file') {
        var n = document.querySelectorAll('#prev-' + f.id + ' .preview-item').length;
        return n + (n === 1 ? ' archivo' : ' archivos');
    }
    var el = document.getElementById(f.id);
    var val = el ? String(el.value).trim() : '';
    if (val === 'Otro') val = (document.getElementById(f.id + 'Otro') || {}).value || 'Otro';
    return val;
}

// ── Validación ───────────────────────────────────────────────
function validateForm() {
    clearErrors();
    var ok = true, errFields = [];

    var sel = document.getElementById('tipoConvocatoria');
    if (!sel.value) {
        sel.classList.add('error');
        showFieldError('tipoConvocatoria');
        errFields.push({ label: 'Tipo de postulación', id: 'tipoConvocatoria' });
        showErrorSummary(errFields);
        return false;
    }

    camposActivos().forEach(function (f) {
        if (!f.req || !visible(f)) return;

        if (f.tipo === 'file') {
            if (document.querySelectorAll('#prev-' + f.id + ' .preview-item').length === 0) {
                showFieldError(f.id); ok = false;
                errFields.push({ label: f.label, id: f.id });
            }
            return;
        }

        if (!leerValor(f)) {
            var el = document.getElementById(f.id);
            if (el) {
                if (el.classList.contains('radio-chips') || el.classList.contains('tags-grid')) {
                    el.style.outline = '2px solid #b83a24';
                } else {
                    el.classList.add('error');
                }
            }
            showFieldError(f.id); ok = false;
            errFields.push({ label: f.label, id: f.id });
        }
    });

    if (!ok) showErrorSummary(errFields);
    return ok;
}

function showFieldError(id) { var e = document.getElementById('err-' + id); if (e) e.style.display = 'block'; }
function hideFieldError(id) { var e = document.getElementById('err-' + id); if (e) e.style.display = 'none'; }

function showErrorSummary(fields) {
    var s = document.getElementById('error-summary');
    if (!s) return;
    s.innerHTML = '<p class="err-summary-title">Por favor corrige los siguientes campos:</p><ul>' +
        fields.map(function (f) { return '<li><a href="#' + f.id + '">' + esc(f.label) + '</a></li>'; }).join('') +
        '</ul>';
    s.style.display = 'block';
    s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (fields.length) {
        var first = document.getElementById(fields[0].id);
        if (first) setTimeout(function () { first.focus(); }, 400);
    }
}
function hideErrorSummary() { var s = document.getElementById('error-summary'); if (s) s.style.display = 'none'; }
function clearErrors() {
    document.querySelectorAll('.error').forEach(function (e) { e.classList.remove('error'); });
    document.querySelectorAll('.radio-chips, .tags-grid').forEach(function (e) { e.style.outline = ''; });
    document.querySelectorAll('.field-error').forEach(function (e) { e.style.display = 'none'; });
    hideErrorSummary();
}

// ── Zona de carga ────────────────────────────────────────────
function wireDropZone(dropId, fileId, cntId, prevId) {
    var drop = document.getElementById(dropId), inp = document.getElementById(fileId);
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
    inp.addEventListener('change', function () { handleFiles(inp.files, cntId, prevId); inp.value = ''; });
}

function handleFiles(files, cntId, prevId) {
    var prev = document.getElementById(prevId);
    if (!prev) return;
    Array.from(files).forEach(function (file) {
        if (!file.type.startsWith('image/')) return;
        if (file.size > 10 * 1024 * 1024) {
            showStatus('El archivo "' + file.name + '" pesa más de 10 MB.', 'error');
            return;
        }
        var item = document.createElement('div');
        item.className = 'preview-item';
        item.file = file;
        var img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        item.appendChild(img);
        var fl = document.createElement('span');
        fl.className = 'file-label'; fl.textContent = file.name;
        item.appendChild(fl);
        var rb = document.createElement('button');
        rb.type = 'button'; rb.className = 'remove-btn'; rb.textContent = '×';
        rb.addEventListener('click', function () { item.remove(); updateCounter(cntId, prevId); });
        item.appendChild(rb);
        prev.appendChild(item);
    });
    updateCounter(cntId, prevId);
}

function updateCounter(cntId, prevId) {
    var cnt = document.getElementById(cntId), prev = document.getElementById(prevId);
    if (!cnt || !prev) return;
    var n = prev.querySelectorAll('.preview-item').length;
    cnt.textContent = n > 0 ? n + (n === 1 ? ' archivo' : ' archivos') : '';
}

var toBase64 = function (file) {
    return new Promise(function (resolve, reject) {
        var r = new FileReader();
        r.readAsDataURL(file);
        r.onload = function () { resolve(r.result); };
        r.onerror = reject;
    });
};

async function obtenerArchivos() {
    var archivos = [];
    var items = document.querySelectorAll('.preview-item');
    for (var i = 0; i < items.length; i++) {
        if (!items[i].file) continue;
        try {
            var b64 = await toBase64(items[i].file);
            archivos.push({ name: items[i].file.name, type: items[i].file.type, base64: b64.split(',')[1] });
        } catch (e) { console.log('Error convirtiendo archivo:', e); }
    }
    return archivos;
}

// ── Payload ──────────────────────────────────────────────────
function buildPayload() {
    var tipoLabel = TIPOS.filter(function (t) { return t.valor === tipoActual; })[0].label;
    var datos = [];

    camposActivos().forEach(function (f) {
        if (!visible(f)) return;
        datos.push({ label: f.label, valor: leerValor(f) });
    });

    return {
        tipo: tipoActual,
        tipoLabel: tipoLabel,
        nombreProyecto: leerValor(campoPorId('nombreProyecto')),
        nombreResponsable: leerValor(campoPorId('nombreResponsable')),
        email: leerValor(campoPorId('email')),
        datos: datos,
        archivos: []
    };
}

// ── Envío ────────────────────────────────────────────────────
document.getElementById('projectForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true); hideStatus();

    var payload = buildPayload();
    try { payload.archivos = await obtenerArchivos(); } catch (err) { payload.archivos = []; }

    if (typeof google !== 'undefined' && google.script) {
        google.script.run
            .withSuccessHandler(function (res) {
                setLoading(false);
                if (res && res.exito) {
                    showConfirmacion(payload.email, payload.nombreProyecto);
                    resetForm();
                } else {
                    showStatus('No se pudo enviar: ' + ((res && res.mensaje) || 'error desconocido'), 'error');
                }
            })
            .withFailureHandler(function (err) {
                setLoading(false);
                showStatus('No se pudo enviar: ' + (err.message || 'error'), 'error');
            })
            .enviarPostulacion(payload);
    } else {
        // Modo local (sin Apps Script): solo muestra en consola
        console.log('[Local] payload', payload);
        setTimeout(function () {
            setLoading(false);
            showConfirmacion(payload.email, payload.nombreProyecto);
            resetForm();
        }, 500);
    }
});

// ── Confirmación y reset ─────────────────────────────────────
function showConfirmacion(email, nombre) {
    document.getElementById('projectForm').style.display = 'none';
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-proyecto').textContent = nombre || 'Sin título';
    document.getElementById('confirmacion').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('tipoConvocatoria').value = '';
    renderTipo('');
    clearErrors();
}

document.getElementById('btnOtraPostulacion').addEventListener('click', function () {
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('projectForm').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('clearBtn').addEventListener('click', function () {
    if (!confirm('¿Limpiar el formulario? Se perderán todos los datos ingresados.')) return;
    resetForm(); hideStatus();
});

document.getElementById('tipoConvocatoria').addEventListener('change', function () {
    renderTipo(this.value);
});

// ── UI helpers ───────────────────────────────────────────────
function autoExpand(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }

function setLoading(on) {
    document.getElementById('submitBtn').disabled = on;
    document.getElementById('clearBtn').disabled = on;
    document.getElementById('spinner').style.display = on ? 'block' : 'none';
    document.getElementById('btnArrow').style.display = on ? 'none' : 'inline';
    document.getElementById('btnText').textContent = on ? 'Enviando...' : 'Enviar postulación';
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

// ── Init ─────────────────────────────────────────────────────
(function init() {
    document.getElementById('conv-titulo').textContent = CONVOCATORIA.titulo;
    document.getElementById('conv-bajada').textContent = CONVOCATORIA.bajada;
    document.getElementById('conv-plazo').textContent = CONVOCATORIA.plazo;
    document.getElementById('conv-bases').href = CONVOCATORIA.linkBases;

    var sel = document.getElementById('tipoConvocatoria');
    TIPOS.forEach(function (t) {
        var o = document.createElement('option');
        o.value = t.valor; o.textContent = t.label;
        sel.appendChild(o);
    });
})();

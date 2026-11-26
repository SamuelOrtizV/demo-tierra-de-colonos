'use strict';
const listings = window.PROPERTIES;
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/>',
  find:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  saved:'<path d="M6 4h12v17l-6-4-6 4z"/>', sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon:'<path d="M20 14A8.7 8.7 0 0 1 10 3a8.8 8.8 0 1 0 10 11Z"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>', theme:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16m3-12h3m-3 4h3"/>',
  house:'<path d="m2 11 10-8 10 8M5 9v12h14V9M10 21v-7h4v7"/>',area:'<path d="M4 4h16v16H4zM4 9h4M4 14h3M9 4v4m5-4v3"/>',bed:'<path d="M3 18v3m18-3v3M3 11V5h18v6M3 11h18v7H3zM6 8h4m4 0h4"/>',
  key:'<circle cx="8" cy="9" r="4"/><path d="m11 12 8 8 3-3-2-2-2 1-2-3"/>',ruler:'<path d="m3 15 12-12 6 6L9 21zM12 6l3 3m-6 0 2 2m-5 1 3 3"/>',doc:'<path d="M5 3h9l5 5v13H5zM14 3v6h5M8 13h8m-8 4h6"/>',land:'<path d="m2 10 7-6 5 2 7-3v13l-7 4-5-2-7 3zM9 4v14m5-12v14"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',phone:'<path d="m6 3 4 4-2 3c1 3 3 5 6 6l3-2 4 4-2 3C11 22 2 13 3 5z"/>',instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r=".7" fill="currentColor"/>',facebook:'<path d="M14 21v-8h3l.6-3H14V8c0-1 .6-2 2-2h2V3h-3c-3 0-5 2-5 5v2H7v3h3v8"/>',
  lens:'<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="3.5"/>',
  check:'<path d="m4 12 5 5L20 6"/>',chev:'<path d="m6 9 6 6 6-6"/>', prev:'<path d="m15 5-7 7 7 7"/>',next:'<path d="m9 5 7 7-7 7"/>',chat:'<path d="M21 11.5a8.8 8.8 0 0 1-13 8L3 21l1.4-5A8.8 8.8 0 1 1 21 11.5Z"/><path d="M8 8c0 4 4 8 8 8"/>',mail:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'
};
const icon = (key,size=20) => '<svg aria-hidden="true" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+icons[key]+'</svg>';
const services = [
  { key: 'Corretaje', title: 'Venta y arriendo', icon: 'house', photo: 'cod-654-3.webp', caption: 'Casa en Frutillar Bajo', description: 'Cuando quieres vender o arrendar, el primer paso es conocer el inmueble y definir la operación que te conviene.', scope: ['Presentación de la propiedad a compradores o arrendatarios.', 'Acompañamiento en las gestiones de venta o arriendo.'], action: 'Quiero ofrecer mi propiedad' },
  { key: 'Administración', title: 'Administración de propiedades', icon: 'key', photo: 'cod-651-1.webp', caption: 'Departamentos en la costanera', description: 'Si vives lejos o prefieres delegar la atención del arriendo, la oficina puede acompañarte desde Frutillar.', scope: ['Gestión del arriendo en representación del propietario.', 'Atención de requerimientos y coordinación de especialistas ante desperfectos.'], action: 'Consultar por administración' },
  { key: 'Tasación', title: 'Tasaciones', icon: 'ruler', photo: 'cod-660-2.webp', caption: 'Departamento en Frutillar Bajo', description: 'Conoce los factores que influyen en el valor de una casa, departamento o terreno antes de decidir su precio.', scope: ['Revisión de ubicación, conectividad, estado del inmueble y planificación urbana.', 'Análisis de la oferta y la demanda en el mercado local.'], action: 'Solicitar una tasación' },
  { key: 'Asesoría legal', title: 'Asesoría legal', icon: 'doc', photo: 'cod-654-2.webp', caption: 'Detalle de una vivienda en Frutillar Bajo', description: 'Revisa los antecedentes de la propiedad cuando preparas una compraventa o un proyecto inmobiliario.', scope: ['Estudio de títulos y búsqueda de documentación complementaria.', 'Revisión de antecedentes para fusiones, subdivisiones y copropiedad.'], action: 'Consultar por asesoría legal' },
  { key: 'Subdivisión', title: 'Subdivisiones', icon: 'land', photo: 'cod-614-2.webp', caption: 'Terreno en el sector Los Leones', description: 'Evalúa con la corredora cómo dividir un terreno y qué antecedentes necesita tu proyecto para avanzar.', scope: ['Análisis de las posibilidades de subdivisión del terreno.', 'Acompañamiento en la tramitación y obtención de roles.'], action: 'Consultar por mi terreno' }
];
const operations=['Venta','Arriendo','Temporada'];
const unique = key => [...new Set(listings.map(p=>p[key]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function stored(k,fallback){try{return localStorage.getItem(k)??fallback}catch{return fallback}}
function save(k,v){try{localStorage.setItem(k,v)}catch{}}
let saved=new Set();
try{saved=new Set(JSON.parse(stored('tdc-cuenca-guardadas','[]')).map(String))}catch{}
const url=(path,values={})=>{
  const params=new URLSearchParams(Object.entries(values).filter(([,v])=>v));
  return '#/'+path+(params.size?'?'+params:'');
};
function route(){
  const [path,query]=location.hash.replace(/^#\/?/,'').split('?');
  return {path:path||'', params:new URLSearchParams(query)};
}
const propBy = id=>listings.find(p=>String(p.id)===String(id));
const ref = p=>String(p.id).replace(/^COD-?/i,'');
const propUrl=p=>url('ficha/'+encodeURIComponent(String(p.id)));
const office='Carlos Richter 378, Frutillar Alto';
const mapsQuery='Carlos Richter 378, Frutillar, Chile';
const mapsUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(mapsQuery);
const mapSrc='https://maps.google.com/maps?q='+encodeURIComponent(mapsQuery)+'&z=17&hl=es&output=embed';
const nav=[['','Inicio'],['propiedades','Propiedades'],['servicios','Servicios'],['nosotros','Nosotros']];
function header(path){
  const current=path.startsWith('ficha/')?'propiedades':path;
  $('#cabecera').innerHTML='<div class="shell mast"><a class="brand" href="#/" aria-label="Tierra de Colonos, inicio"><img src="img/logo.png" alt="Tierra de Colonos"></a><nav id="menu" aria-label="Navegación principal">'+nav.map(([r,n])=>'<a href="'+url(r)+'" '+(current===r?'aria-current="page"':'')+'>'+n+'</a>').join('')+'</nav><div class="header-tools"><a class="icon-btn" href="#/guardadas" aria-label="Propiedades guardadas" title="Propiedades guardadas">'+icon('saved')+'</a><button class="icon-btn" id="mode"></button><a class="contact-link" href="#/contacto" '+(current==='contacto'?'aria-current="page"':'')+'>Contacto</a><button class="icon-btn hamburger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú" id="hamb">'+icon('menu')+'</button></div></div>';
  setTools();
}
function setTools(){
  const root=document.documentElement, light=root.dataset.mode==='claro', primary=root.dataset.theme==='ribera';
  const mode=$('#mode');mode.setAttribute('aria-label',light?'Activar modo oscuro':'Activar modo claro');mode.title=mode.getAttribute('aria-label');mode.innerHTML=icon(light?'moon':'sun');
  $('#estilo').innerHTML=icon('theme',17)+'<span>Tema · '+(primary?'Ribera':'Archivo')+'</span>'+icon('chev',14);
  $('#temas').innerHTML='<p>Diseño de la demo</p>'+[['ribera','Ribera','Editorial · bordes rectos'],['plano','Archivo','Contemporáneo · redondeado']].map(([k,v,h])=>'<button data-theme-choice="'+k+'" aria-pressed="'+(root.dataset.theme===k)+'"><span><b>'+v+'</b><small>'+h+'</small></span>'+(root.dataset.theme===k?icon('check',18):'')+'</button>').join('');
}
function officeMap(interactive = false) {
  return `<div class="office-map" data-view="${interactive ? 'google' : 'plano'}">
    <div class="map-canvas">
      <img class="street-map" loading="lazy" src="img/oficina-mapa.svg" alt="Plano de referencia de la calle Carlos Richter en Frutillar Alto">
      <a class="map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a>
      <div class="google-layer">${interactive ? googleFrame() : ''}</div>
    </div>
    <div class="map-options" aria-label="Vista del mapa">
      <button data-map="plano" aria-pressed="${!interactive}">Plano del sector</button>
      <button data-map="google" aria-pressed="${interactive}">Google Maps</button>
    </div>
  </div>`;
}
function googleFrame() {
  return `<iframe title="Ubicación de la oficina en Carlos Richter 378, Frutillar" src="${esc(mapSrc)}" loading="lazy" allowfullscreen></iframe>`;
}
function setMapView(container, view) {
  container.dataset.view = view;
  container.querySelector('.google-layer').innerHTML = view === 'google' ? googleFrame() : '';
  container.querySelectorAll('[data-map]').forEach(button => button.setAttribute('aria-pressed', button.dataset.map === view));
}
function footer(path) {
  const visit = path === 'contacto' ? '' : `<section class="office-visit">
    <div class="shell visit-grid"><div class="visit-info">
      <p class="eyebrow lined">Nuestra oficina</p><h2>Visítanos en <em>Frutillar Alto.</em></h2>
      <div class="visit-detail">${icon('pin')}<div><strong>Carlos Richter 378</strong><span>Frutillar Alto, Región de Los Lagos</span></div></div>
      <div class="visit-detail">${icon('clock')}<div><strong>Horario de atención</strong><span>Lun a vie · 09:00–13:00 y 15:00–19:00<br>Sáb · 09:00–13:00</span></div></div>
      <a class="text-link" href="${mapsUrl}" target="_blank" rel="noopener">Cómo llegar en Google Maps</a>
    </div>${officeMap(true)}</div>
  </section>`;
  return visit + `<div class="shell foot-brand"><div class="foot-signature">
    <a href="#/" aria-label="Tierra de Colonos, inicio"><img src="img/logo.png" alt="Tierra de Colonos"></a>
    <p>Corretaje y gestión inmobiliaria<br>en la cuenca del Llanquihue.</p></div>
    <div class="foot-group"><h2>Contacto</h2><a href="tel:+56998475257">+56 9 9847 5257</a>
    <a href="mailto:ventas@tierradecolonos.cl">ventas@tierradecolonos.cl</a></div>
    <div class="foot-group"><h2>Explorar</h2><a href="#/propiedades">Propiedades</a><a href="#/servicios">Servicios al propietario</a><a href="#/nosotros">La corredora</a></div>
    <div class="foot-group"><h2>Redes</h2><a href="https://www.instagram.com/tierradecolonos/" target="_blank" rel="noopener">${icon('instagram',16)} Instagram</a>
    <a href="https://www.facebook.com/tierradecolonospropiedades/" target="_blank" rel="noopener">${icon('facebook',16)} Facebook</a></div></div>
    <div class="shell foot-note"><span>Tierra de Colonos Propiedades</span><span>Demo comercial · Catálogo de muestra</span></div>`;
}
function ruralFeature() {
  const land = propBy('COD-614');
  return `<section class="territory-section shell"><figure class="territory-photo">
    <img loading="lazy" src="img/atardecer.webp" alt="El volcán Osorno al atardecer, al otro lado del lago Llanquihue">
    <figcaption>${icon('lens',15)} Cuenca del lago Llanquihue</figcaption></figure>
    <div class="territory-copy"><p class="eyebrow lined">Frutillar Alto</p><h2>La vida en <br><em>el campo.</em></h2>
    <p>En Los Leones, los terrenos llanos y los árboles nativos quedan a unos diez minutos del área urbana de Frutillar.</p>
    <a class="land-preview" href="${propUrl(land)}"><img src="${esc(land.photos[0])}" loading="lazy" alt="Vista aérea de la parcela Los Leones">
      <span><small>Parcela en venta · COD-614</small><b>Los Leones</b><span>5.000 m² · ${esc(land.price)}</span><u>Ver parcela</u></span></a>
    </div></section>`;
}
const select=(name,label,all,items,value='')=>'<label class="field"><span>'+label+'</span><span class="select"><select name="'+name+'"><option value="">'+all+'</option>'+items.map(v=>'<option '+(v===value?'selected ':'')+'value="'+esc(v)+'">'+esc(v)+'</option>').join('')+'</select>'+icon('chev',15)+'</span></label>';
function searchForm(params=new URLSearchParams(),full=false){
  return '<form id="search" class="searchbar '+(full?'full':'')+'">'+select('op','Operación','Todas',operations,params.get('op'))+select('tipo','Tipo de propiedad','Todos',unique('type'),params.get('tipo'))+select('zona','Sector','Todos',unique('sector'),params.get('zona'))+(full?'<label class="field search-term"><span>Nombre o código</span><input name="q" placeholder="Ej. COD-660" value="'+esc(params.get('q'))+'"></label>':'')+'<button class="primary">'+icon('find',18)+' Buscar</button></form>';
}
function saveButton(p){
  const active=saved.has(String(p.id));
  return '<button class="save icon-btn" data-save="'+esc(p.id)+'" aria-label="'+(active?'Quitar de guardadas':'Guardar propiedad')+' · COD-'+esc(ref(p))+'" aria-pressed="'+active+'">'+icon('saved',18)+'</button>';
}
function specs(p) {
  return [[p.area,'area'],[p.beds?p.beds+' dorm.':'','bed'],[p.baths?p.baths+(p.baths===1?' baño':' baños'):'','house']].filter(([t])=>t).map(([t,i])=>'<span>'+icon(i,15)+esc(t)+'</span>').join('');
}
function card(p){
  return '<article class="card"><div class="photo"><a href="'+propUrl(p)+'" aria-label="Ver '+esc(p.title)+'"><img loading="lazy" src="'+esc(p.photos[0])+'" alt="'+esc(p.title)+'"></a><span class="tag">'+esc(p.operation)+'</span>'+saveButton(p)+'</div><div class="card-copy"><p class="place">'+icon('pin',15)+esc(p.sector)+'</p><h3><a href="'+propUrl(p)+'">'+esc(p.title)+'</a></h3><p class="price">'+esc(p.price)+'</p><div class="specs">'+specs(p)+'</div></div></article>';
}
function home(){
  const picks=operations.map(op=>listings.find(p=>p.operation===op)).filter(Boolean);
  return '<section class="hero"><div class="hero-copy"><div class="eyebrow lined">Gestión inmobiliaria</div><h1>Tu lugar junto <br>al <em>Llanquihue.</em></h1><p>Casas, departamentos y parcelas en Frutillar y la cuenca del lago.</p><a class="hero-link" href="#/propiedades">Explorar propiedades '+icon('find',16)+'</a></div><figure class="hero-image"><picture><source media="(max-width:620px)" srcset="img/hero-small.webp"><img fetchpriority="high" src="img/hero.webp" alt="Paisaje de Frutillar en la cuenca del lago Llanquihue"></picture><figcaption>'+icon('pin',15)+' Frutillar, Región de Los Lagos</figcaption></figure></section><section class="shell quick" aria-label="Buscar propiedades">'+searchForm()+'</section><section class="shell section"><div class="section-title"><div><p class="eyebrow lined">El catálogo</p><h2>Propiedades destacadas</h2></div><a class="text-link" href="#/propiedades">Ver catálogo completo</a></div><div class="cards">'+picks.map(card).join('')+'</div></section>'+ruralFeature()+'<section class="owner shell"><div><p class="eyebrow">Para propietarios</p><h2>¿Vendes o arriendas?</h2></div><a class="primary" href="#/servicios">Ver servicios</a></section>';
}
function pageHead(kicker,title,sub=''){
  return '<div class="page-head"><p class="eyebrow lined">'+esc(kicker)+'</p><h1>'+esc(title)+'</h1>'+(sub?'<p class="lead">'+esc(sub)+'</p>':'')+'</div>';
}
function katalog(params,onlySaved){
  const op=params.get('op'),tipo=params.get('tipo'),zona=params.get('zona'),q=normalize(params.get('q')||'');
  const found=listings.filter(p=>(!onlySaved||saved.has(String(p.id)))&&(!op||p.operation===op)&&(!tipo||p.type===tipo)&&(!zona||p.sector===zona)&&normalize([p.title,p.sector,'COD-'+ref(p),p.type].join(' ')).includes(q));
  const title=onlySaved?'Propiedades guardadas':'Propiedades';
  return '<section class="shell page">'+pageHead('Tierra de Colonos',title,onlySaved?'Tu selección en este navegador.':'Encuentra una propiedad por operación, tipo o sector.')+(onlySaved?'':searchForm(params,true))+'<div class="result-line"><span>'+found.length+(found.length===1?' propiedad':' propiedades')+'</span>'+(params.size?'<a href="#/propiedades">Quitar filtros</a>':'')+'</div>'+(found.length?'<div class="cards">'+found.map(card).join('')+'</div>':'<div class="empty"><h2>'+(onlySaved?'Tu selección empieza en el catálogo.':'No encontramos coincidencias.')+'</h2><p>'+(onlySaved?'Usa el marcador de una ficha para volver a ella.':'Prueba con otro sector o quita los filtros.')+'</p><a class="primary" href="#/propiedades">Ver todas las propiedades</a></div>')+'</section>';
}
let catalogReturn='#/propiedades';
function detail(p){
  return '<section class="shell page detail"><a class="text-link" href="'+esc(catalogReturn)+'">Volver al listado</a><div class="detail-heading"><div><p class="eyebrow lined">'+esc(p.operation)+' · COD-'+esc(ref(p))+'</p><h1>'+esc(p.title)+'</h1><p class="place">'+icon('pin',17)+esc(p.sector)+'</p></div>'+saveButton(p)+'</div><div class="mobile-inquiry"><strong>'+esc(p.price)+'</strong><a class="primary" href="'+url('contacto',{ref:p.id})+'">Consultar</a></div><div class="detail-grid"><div><figure class="gallery"><img id="gallery-img" src="'+esc(p.photos[0])+'" alt="'+esc(p.title)+' · Foto 1"><div class="gallery-nav"><button class="circle" data-gallery="-1" aria-label="Foto anterior">'+icon('prev')+'</button><span id="image-number" aria-live="polite">1 / '+p.photos.length+'</span><button class="circle" data-gallery="1" aria-label="Foto siguiente">'+icon('next')+'</button></div></figure>'+(p.captions?'<p class="gallery-land-caption">'+icon('lens',16)+'<span id="gallery-caption">'+esc(p.captions[0])+'</span></p>':'')+'<div class="thumbs">'+p.photos.map((src,i)=>'<button data-index="'+i+'" aria-label="Ver foto '+(i+1)+'" aria-pressed="'+(i===0)+'"><img src="'+esc(src)+'" alt="" loading="lazy"></button>').join('')+'</div></div><aside class="detail-aside"><p class="eyebrow">'+esc(p.type)+' en '+esc(p.operation.toLowerCase())+'</p><h2>'+esc(p.price)+'</h2>'+(p.status?'<p>'+esc(p.status)+'</p>':'')+'<div class="specs">'+specs(p)+'</div><p>'+esc(p.description)+'</p><a class="primary" href="'+url('contacto',{ref:p.id})+'">'+(p.status?'Consultar alternativas':p.operation==='Temporada'?'Consultar fechas':'Consultar propiedad')+'</a><button class="secondary" data-wa="'+esc(p.id)+'">'+icon('chat',18)+' WhatsApp</button><small>Muestra comercial · Confirmar disponibilidad.</small></aside></div></section>';
}
function serviceSheet(service) {
  return `<figure class="service-photo">
      <img src="img/${service.photo}" alt="${esc(service.caption)}"><figcaption>${icon('lens',15)} ${esc(service.caption)}</figcaption>
    </figure><div class="sheet-body"><div class="sheet-heading"><span class="service-symbol">${icon(service.icon,25)}</span>
    <h2>${esc(service.title)}</h2></div><p>${esc(service.description)}</p>
    <h3>Qué incluye</h3><ul>${service.scope.map(item => `<li>${icon('check',16)}<span>${esc(item)}</span></li>`).join('')}</ul>
    <a class="primary" href="${url('contacto',{motivo:service.key})}">${esc(service.action)}</a></div>`;
}
function servicesPage() {
  const selected = services.find(service => service.key === route().params.get('servicio')) || services[0];
  return `<section class="shell service-page"><div class="service-index">
    <p class="eyebrow lined">Para propietarios</p><h1>Servicios <br><em>inmobiliarios.</em></h1>
    <p class="service-intro">Elige qué necesitas hacer con tu propiedad en la cuenca del Llanquihue.</p>
    <div class="service-menu" role="group" aria-label="Elegir servicio">${services.map(service => `
      <button data-service="${esc(service.key)}" aria-pressed="${service === selected}" aria-controls="service-sheet">
      ${icon(service.icon,19)}<span>${esc(service.title)}</span>${icon('next',14)}</button>`).join('')}</div>
    <label class="service-mobile">Seleccionar servicio<select id="service-select">${services.map(service => `
      <option value="${esc(service.key)}" ${service === selected ? 'selected' : ''}>${esc(service.title)}</option>`).join('')}</select></label>
    </div><article id="service-sheet" class="service-sheet">${serviceSheet(selected)}</article></section>`;
}
function selectService(key) {
  const service = services.find(item => item.key === key);
  if (!service) return;
  document.querySelectorAll('[data-service]').forEach(button => button.setAttribute('aria-pressed',button.dataset.service === key));
  $('#service-select').value = key;
  $('#service-sheet').innerHTML = serviceSheet(service);
  history.replaceState(null,'',url('servicios',{servicio:key}));
}
function about(){return '<section class="shell page">'+pageHead('La corredora','Tierra de Colonos')+'<div class="story about"><img src="img/costanera.webp" alt="El Teatro del Lago y la costanera de Frutillar vistos desde el aire"><div><p class="eyebrow lined">Frutillar · Desde 2006</p><h2>Una relación cercana con el territorio.</h2><p>La corredora nació en Frutillar para acompañar a quienes compran, venden o arriendan propiedades urbanas y rurales en la cuenca del lago Llanquihue.</p><p>Su trabajo reúne corretaje, administración y asesoría inmobiliaria desde su oficina en Frutillar Alto.</p><a class="primary" href="#/contacto">Contactar a la oficina</a></div></div></section>'}
function contact(params){
  const p=propBy(params.get('ref')), reason=p?'Consulta por una propiedad':params.get('motivo')||'Consulta general';
  return '<section class="shell page">'+pageHead('Frutillar Alto','Contacto')+'<div class="contact-grid"><div class="office"><h2>Oficina en Frutillar</h2><p>'+icon('pin')+' '+office+'</p><p><a href="tel:+56998475257">+56 9 9847 5257</a> · <a href="tel:+56993746036">+56 9 9374 6036</a></p><p><a href="mailto:ventas@tierradecolonos.cl">ventas@tierradecolonos.cl</a></p><p>Lunes a viernes de 09:00 a 13:00 y de 15:00 a 19:00.<br>Sábado de 09:00 a 13:00.</p><button class="secondary" data-wa="'+esc(p?.id||'')+'">'+icon('chat',18)+' Preparar WhatsApp</button>'+officeMap(true)+'<a class="text-link" href="'+mapsUrl+'" target="_blank" rel="noopener">Cómo llegar en Google Maps</a></div><form id="inquiry" class="inquiry"><p class="eyebrow lined">Formulario de muestra</p><h2>'+(p?'Consultar por COD-'+esc(ref(p)):'Escríbenos')+'</h2><p>Prueba el formulario. La consulta se simula en este navegador.</p>'+(p?'<p><a class="text-link" href="'+propUrl(p)+'">'+esc(p.title)+'</a></p>':'')+'<label>Nombre<input name="nombre" autocomplete="name" required maxlength="80"></label><label>Correo electrónico<input name="correo" type="email" autocomplete="email" required maxlength="180"></label>'+select('motivo','Motivo','Selecciona un motivo',['Consulta general','Consulta por una propiedad',...services.map(service=>service.key)],reason)+(p?.operation==='Temporada'&&!p.status?'<div class="dates"><label>Llegada<input type="date" required name="entrada"></label><label>Salida<input type="date" required name="salida"></label></div>':'')+'<label>Mensaje<textarea name="mensaje" required rows="3" maxlength="1600">'+(p?'Me interesa '+esc(p.title)+' (COD-'+esc(ref(p))+').':'')+'</textarea></label><button class="primary">Simular consulta</button><div id="confirmation" role="status"></div></form></div></section>';
}
function whatsappDraft(p){
  const message=p?'Hola, me interesa '+p.title+' (COD-'+ref(p)+'). ¿Podrían darme más información?':'Hola, quisiera conversar con Tierra de Colonos sobre una propiedad.';
  return {message, href:'https://wa.me/56998475257?text='+encodeURIComponent(message)};
}
function wa(id){
  const {message, href}=whatsappDraft(propBy(id));
  const d=$('#dialogo');d.innerHTML='<button class="icon-btn dlg-close" aria-label="Cerrar">'+icon('close')+'</button><p class="eyebrow">Contacto externo</p><h2 id="dialog-title">Borrador de WhatsApp</h2><p>Se abrirá una conversación con el teléfono publicado por la corredora. Puedes editar el texto antes de enviarlo.</p><blockquote>'+esc(message)+'</blockquote><a class="primary" rel="noopener" target="_blank" href="'+esc(href)+'">Abrir WhatsApp</a>';d.showModal();
}
let galleryIndex=0;
function showImage(n){
  const p=propBy(decodeURIComponent(route().path.slice(6))); if(!p)return;
  galleryIndex=(n+p.photos.length)%p.photos.length;
  $('#gallery-img').src=p.photos[galleryIndex];$('#gallery-img').alt=p.title+' · Foto '+(galleryIndex+1);
  if(p.captions){$('#gallery-caption').textContent=p.captions[galleryIndex];$('#gallery-img').alt=p.captions[galleryIndex]}
  $('#image-number').textContent=(galleryIndex+1)+' / '+p.photos.length;
  document.querySelectorAll('[data-index]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.index)===galleryIndex));
}
function render(move=false){
  const {path,params}=route();
  if(['guardadas','propiedades'].includes(path))catalogReturn=location.hash;
  const p=path.startsWith('ficha/')?propBy(decodeURIComponent(path.slice(6))):null;
  const contactProperty = p || (path === 'contacto' ? propBy(params.get('ref')) : null);
  $('#whatsapp-flotante').href = whatsappDraft(contactProperty).href;
  galleryIndex=0;header(path);
  const main=$('#principal');
  main.innerHTML=path===''?home():path==='propiedades'||path==='guardadas'?katalog(params,path==='guardadas'):p?detail(p):path==='contacto'?contact(params):path==='nosotros'?about():path==='servicios'?servicesPage():'<section class="shell page">'+pageHead('Navegación','Página no encontrada')+'<a class="primary" href="#/">Volver al inicio</a></section>';
  $('#pie').innerHTML=footer(path);
  document.title=(main.querySelector('h1')?.textContent||'Inicio')+' · Tierra de Colonos';
  if(move){main.focus({preventScroll:true});document.querySelector('.scroll').scrollTo(0,0)}
}
function closeThemes(){ $('#temas').hidden=true;$('#estilo').setAttribute('aria-expanded','false') }
document.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!e.target.closest('.dock'))closeThemes();
  if(!b)return;
  if(b.id==='mode'){const root=document.documentElement;root.dataset.mode=root.dataset.mode==='claro'?'oscuro':'claro';save('tdc-cuenca-modo',root.dataset.mode);setTools()}
  if(b.id==='estilo'){const el=$('#temas');el.hidden=!el.hidden;b.setAttribute('aria-expanded',!el.hidden)}
  if(b.dataset.themeChoice){document.documentElement.dataset.theme=b.dataset.themeChoice;save('tdc-cuenca-tema',b.dataset.themeChoice);setTools();closeThemes();$('#estilo').focus()}
  if(b.id==='hamb'){const open=$('#menu').classList.toggle('open');b.setAttribute('aria-expanded',open);b.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');b.innerHTML=icon(open?'close':'menu')}
  if(b.hasAttribute('data-save')){const id=b.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);save('tdc-cuenca-guardadas',JSON.stringify([...saved]));if(route().path==='guardadas'){render();($('#principal [data-save]')||$('#principal')).focus()}else{const active=saved.has(id);b.setAttribute('aria-pressed',active);b.setAttribute('aria-label',(active?'Quitar de guardadas':'Guardar propiedad')+' · COD-'+ref(propBy(id)))}}
  if(b.hasAttribute('data-gallery'))showImage(galleryIndex+Number(b.dataset.gallery));
  if(b.hasAttribute('data-index'))showImage(Number(b.dataset.index));
  if(b.hasAttribute('data-wa'))wa(b.dataset.wa);
  if(b.classList.contains('dlg-close'))$('#dialogo').close();
  if(b.dataset.map)setMapView(b.closest('.office-map'),b.dataset.map);
  if(b.dataset.service)selectService(b.dataset.service);
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#temas').hidden){closeThemes();$('#estilo').focus()}if($('#menu').classList.contains('open'))$('#hamb').click()}});
document.addEventListener('change',event => {
  if(event.target.id === 'service-select')selectService(event.target.value);
});
document.addEventListener('securitypolicyviolation',event => {
  if(event.effectiveDirective === 'frame-src' && event.blockedURI.includes('google.')){
    document.querySelectorAll('.office-map[data-view="google"]').forEach(map => setMapView(map,'plano'));
  }
});
document.addEventListener('input',e=>{if(e.target.name==='entrada'){const out=$('[name=salida]');if(!e.target.value){out.removeAttribute('min');return}const d=new Date(e.target.value+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+(propBy(route().params.get('ref'))?.minNights||1));out.min=d.toISOString().slice(0,10)}});
document.addEventListener('submit',e=>{
  if(e.target.id==='search'){e.preventDefault();const params=Object.fromEntries(new FormData(e.target));location.hash=url('propiedades',params)}
  if(e.target.id==='inquiry'){e.preventDefault();const p=propBy(route().params.get('ref'));$('#confirmation').textContent='Consulta simulada'+(p?' para COD-'+ref(p):'')+'. La corredora no ha recibido estos datos.'}
});
window.addEventListener('hashchange',()=>render(true));
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();$('#principal').focus()});
render();







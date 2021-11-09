var map;
var latitud_mapa = 41.67097948393865;
var longitud_mapa = -3.6769259916763985;
var botonMap;

function inicioMapa(){
 
map = new google.maps.Map(
    document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(latitud_mapa,longitud_mapa),//latitud,longitud),//
       // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
    zoom: 12, // zoom del mapa
    draggableCursor: 'auto', // forma del cursor
    draggingCursor: 'crosshair',
    mapTypeId: google.maps.MapTypeId.HYBRID // tipo de mapa
    });
}
//Función que crea un marcador al clicar sobre el boton de la tabla servicios contratados
function crearMarcador(){
    var registro=this.datosServicio;
    /*var icono = {
        url: icono_lista[cont], // url
        scaledSize: new google.maps.Size(25, 25), // tamaño del icono
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };*/
    lati=registro.latitud;
    long=registro.longitud;
    marker = new google.maps.Marker({
        position: {lat:parseFloat(lati),lng:parseFloat(long)},
        map: map,
        title: 'Pepino'
         
    })
}
inicioMapa();
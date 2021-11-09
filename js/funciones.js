var totalpedido=0;
var FamiliaSeleccionada=document.getElementById("FamiliaSeleccionada");

document.getElementById("lupa").addEventListener("click", generarServicios, false);

class serviciosMunicipales {
    constructor(id, descripcion, direccion, tipo, latitud, longitud, precio, duracion) {
        this.id = id;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.tipo = tipo;
        this.latitud = latitud;
        this.longitud = longitud;
        this.precio = precio;
        this.duracion = duracion;

    }

}
//Función que muestra todos los datos de la BD al clicar sobre la lupa
function generarServicios(evt) {
    var cuerpoServicios = document.querySelector("#cuerpoServicios");
    cuerpoServicios.innerHTML="";
   
    myDBInstance.transaction(function (tran) {
        //Lee los registros grabados en la tabla servicios
        tran.executeSql('SELECT * FROM servicios', [], function (tran, data) {
            for (i = 0; i < data.rows.length; i++) {

               // alert(data.rows[i].Nombre);
                registroServicio = new serviciosMunicipales(
                    data.rows[i].id,
                    data.rows[i].Descripcion,
                    data.rows[i].Direccion,
                    data.rows[i].Tipo,
                    data.rows[i].Latitud,
                    data.rows[i].Longitud,
                    data.rows[i].Precio,
                    data.rows[i].Duracion);            
                   

                if (FamiliaSeleccionada.value == registroServicio.tipo || FamiliaSeleccionada.value == "") {
                    linea = document.createElement("tr");

                    botonId = document.createElement("button");
                    // En el atributo  del button creado paso los datos de cada registro  
                    botonId.datosServicio = registroServicio;
                    
                    botonId.addEventListener("click", serviciosContratados, true);

                    dato = document.createTextNode(registroServicio.id);
                    botonId.appendChild(dato);
                    casilla = document.createElement("td");
                    casilla.appendChild(botonId);
                    linea.appendChild(casilla);

                    pdescripcion = document.createElement("p");
                    dato = document.createTextNode(registroServicio.descripcion);
                    pdescripcion.appendChild(dato);
                    casilla = document.createElement("td");
                    casilla.appendChild(pdescripcion);
                    linea.appendChild(casilla);

                    pprecio = document.createElement("p");
                    dato = document.createTextNode(registroServicio.precio);
                    pprecio.appendChild(dato);
                    casilla = document.createElement("td");
                    casilla.appendChild(pprecio);
                    linea.appendChild(casilla);

                    pduracion = document.createElement("p");
                    dato = document.createTextNode(registroServicio.duracion);
                    pduracion.appendChild(dato);
                    casilla = document.createElement("td");
                    casilla.appendChild(pduracion);
                    linea.appendChild(casilla);

                    ptipo = document.createElement("p");
                    dato = document.createTextNode(registroServicio.tipo);
                    ptipo.appendChild(dato);
                    casilla = document.createElement("td");
                    casilla.appendChild(ptipo);
                    linea.appendChild(casilla);

                    cuerpoServicios.appendChild(linea);
                };
                
            }
        });
    });
}

//Función que muestra los registros que se corresponden con el botonId que ha pinchado el usuario al mostrar los datos con la lupa
function serviciosContratados(){
    var registro=this.datosServicio;
    var cuerpop=document.getElementById("cuerpoPedido");
    
    linea=document.createElement("tr");

    botonId = document.createElement("button");
    dato = document.createTextNode(registro.id);
    botonId.appendChild(dato);
    botonId.datosServicio=registro;
    casilla = document.createElement("td");
    casilla.appendChild(botonId);
    linea.appendChild(casilla);

    var pdescripcion=document.createElement("p");
    dato=document.createTextNode(registro.descripcion);
    pdescripcion.appendChild(dato);
    casilla=document.createElement("td");
    casilla.appendChild(pdescripcion);
    linea.appendChild(casilla);

    var pprecio=document.createElement("p");
    dato=document.createTextNode(registro.precio);
    pprecio.appendChild(dato);
    casilla=document.createElement("td");
    casilla.appendChild(pprecio);
    linea.appendChild(casilla); 
    
    var icantidad=document.createElement("input");
    icantidad.datosServicio=registro;
    icantidad.setAttribute("type", "text");
    icantidad.style.width="100px";
    //Al programar un evento keyup, si quieres borrar la cantidad ya establecida con la tecla de suprimir la interpreta
    //como un numero y no hace bien el total
    icantidad.addEventListener("keyup", calcularImporte, false);
    casilla=document.createElement("td");
    //icantidad.addEventListener("change", calcularImporte, false);
    casilla.appendChild(icantidad);
    linea.appendChild(casilla);

    var iimporte=document.createElement("input");
    iimporte.setAttribute("type","text");
    iimporte.disabled="true";
    iimporte.style.width="100px";
    casilla=document.createElement("td");
    casilla.appendChild(iimporte);
    linea.appendChild(casilla);
    
    cuerpop.appendChild(linea);
    //Elimina el evento para que al pulsar dos veces sobre el mismo registro, solo lo muestre una vez
    this.removeEventListener("click", serviciosContratados, true);

    //Crea el marcador cuando pincha en el botonId
    botonId.addEventListener("click",crearMarcador, false);
    
}
//Calcula el importe teniendo en cuenta el precio (dato del registro) y la cantidad que el usuario le indica
function calcularImporte(){
    var registro=this.datosServicio;
    var precio=registro.precio;
    var cantidad=this.value;
    var importeLinea=parseFloat(precio)*parseFloat(cantidad);

    var lineaPadre=this.parentElement.parentElement;
    var hijosPedido=lineaPadre.childNodes;
    var importelinea=hijosPedido[4].firstChild;

    var importeAnterior=parseFloat(importelinea.value);
    if (isNaN(importeAnterior)) {
        importeAnterior = 0;
    }
    importelinea.value=importeLinea;
    if (isNaN(importelinea.value)) {
        importelinea.value = 0;
    }
    if (isNaN(totalpedido)) {
        totalpedido = 0;
    }

    totalpedido = totalpedido + importeLinea - importeAnterior;
    
    var total = document.getElementById("total");
    total.value = totalpedido;
    
    
}

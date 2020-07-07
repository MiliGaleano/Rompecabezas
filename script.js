function mostrarDificil() {

  var todaslasfotos = document.getElementsByClassName("imagen-rompecabeza menos");
  var srcdegrilla = [];

  for (var i = 0; i < todaslasfotos.length; i++) {
    srcdegrilla.push(todaslasfotos[i].getAttribute('src'));
  }

  var dificil = document.getElementById("tutor");
  dificil.style.display = 'block';
  var modoJuego = document.getElementById("modojuego");
  modoJuego.style.display = 'none';

  mostrarInstrucciones(instrucciones);
  setTimeout(iniciar, 2000);
}

function mostrarFacil() {
  var facil = document.getElementById("tutor");
  facil.style.display = 'block';
  var modoJuego = document.getElementById("modojuego");
  modoJuego.style.display = 'none';
  var juegoqs = document.getElementById("juego");
  juegoqs.style.display = 'none';
  var facil23 = document.getElementById("juegoRompecabeza");
  facil23.style.display = 'block';

  mostrarInstrucciones(instrucciones2);

  var borrarult = document.getElementById("ultimo-mov");
  borrarult.style.display = 'none';
}

  var piezas = document.getElementsByClassName("movil");

  var tamWidth = [238, 238, 238, 238, 238, 238, 238, 238, 238];
  var tamHeight = [238, 238, 238, 238, 238, 238, 238, 238, 238];
  
  function volveraMezclar(){
      
  for (var i = 0; i < piezas.length; i++) {
      piezas[i].classList.add("animacion");
      piezas[i].setAttribute("width", tamWidth[i]);
      piezas[i].setAttribute("height", tamHeight[i]);
      piezas[i].setAttribute("x", Math.floor((Math.random() * 400) +1));
      piezas[i].setAttribute("y", Math.floor((Math.random() * 400) +1));
      piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
  }
  setTimeout(detenerAnimacion, 3000);
        function detenerAnimacion() {
          for (var i = 0; i < piezas.length; i++) {
              piezas[i].classList.remove("animacion");}
        }
  }
  volveraMezclar();
  
  var elementSelect = 0;
  var currentX = 0;
  var currentY = 0;
  var currentPosX = 0;
  var currentPosY = 0;
  
  function seleccionarElemento(evt) {
      elementSelect = reordenar(evt);
      currentX = evt.clientX;
      currentY = evt.clientY;
      currentPosX = parseFloat(elementSelect.getAttribute("x"));
      currentPosY = parseFloat(elementSelect.getAttribute("y"));
      elementSelect.setAttribute("onmousemove","moverElemento(evt)");
  }
  
  function moverElemento(evt) {
      var dx = evt.clientX - currentX;
      var dy = evt.clientY - currentY;
      currentPosX = currentPosX + dx;
      currentPosY = currentPosY + dy;
      elementSelect.setAttribute("x",currentPosX);
      elementSelect.setAttribute("y",currentPosY);
      currentX = evt.clientX;
      currentY = evt.clientY;
      elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
      elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
      iman();
  }
  
  function deseleccionarElemento(evt) {
      testing();
      if (elementSelect != 0){
          elementSelect.removeAttribute("onmousemove");
          elementSelect.removeAttribute("onmouseout");
          elementSelect.removeAttribute("onmouseup");
          elementSelect = 0;
      }
  }
  
  var entorno = document.getElementById("entorno");
  
  function reordenar(evt) {
      var padre = evt.target.parentNode;
      var clone = padre.cloneNode(true);
      var id = padre.getAttribute("id");
      entorno.removeChild(document.getElementById(id));
      entorno.appendChild(clone);
      return entorno.lastChild.firstChild;
  }
  
  var origX = [56, 183, 302, 50, 184, 313, 82, 188, 308];
  var origY = [50, 54, 50, 183, 183, 183, 353, 308, 308];
  
  function iman() {
      for (var i=0; i < piezas.length; i++){
          if (Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15){
              elementSelect.setAttribute("x", origX[i]);
              elementSelect.setAttribute("y", origY[i]);
          }
  
      }
  }
  
  function testing() {
      var bien_ubicada = 0;
      var padres = document.getElementsByClassName("padre");
      for (var i = 0; i< piezas.length; i++) {
          var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
          var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
          ide = padres[i].getAttribute("id");
          if(origX[ide] == posx && origY[ide] == posy) {
              bien_ubicada = bien_ubicada + 1;
          }
      }
      if (bien_ubicada == 9) {
          ganaste();
  
      }
  }
  
  function ganaste(){
      var referencia = document.getElementById("fondo");  
      referencia.style.opacity = '1'; 
      for(var i=0; i < piezas.length; i++)
      {
          piezas[i].style.display = 'none';
      }
        
          var confetti = document.getElementById("container");
          confetti.style.display = 'block';
          
          setTimeout(mostrarOpciones, 4000);
          function mostrarOpciones() {
            
            document.getElementById("mostrarAlGanar2").style.display = 'block';
            for(var i=0; i < piezas.length; i++){
                  piezas[i].style.display = 'block';
              }
          }

          setTimeout(ordenarid, 2000);
          function ordenarid() {
          var todaslasfotospadre = document.getElementsByClassName("padre");
   for (var i = 0; i <todaslasfotospadre.length; i++) {
    todaslasfotospadre[i].setAttribute("id", i);
  }}

    }


var instrucciones = ["Mueve las piezas con las flechas de dirección del teclado para ordenar el rompecabezas.", "Usa la foto de referencia para guiarte."];
var instrucciones2 = ["Mueve las piezas con el mouse para ordenar el rompecabezas.", "Usa la foto de referencia para guiarte."];

var movimientos = [];

var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var filaVacia = 2;
var columnaVacia = 2;


function mostrarInstrucciones(x) {
  for (var i=0; i<x.length;i++){
    var instruccion = x[i];
    mostrarInstruccionEnLista(instruccion, "lista-instrucciones");   
  }   
}

function agregarUltimoMovimiento(direccion){
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion);
}

function chequearSiGano() {
  var contador = 1;
  for(var i=0; i<grilla.length; i++){
    for(var j=0; j<grilla.length; j++){
      if(grilla[i][j]!=contador){
        return;}   
      contador++;
    }
  }
  mostrarCartelGanador();
}

function mostrarCartelGanador(){

  var referencia = document.getElementById("title").innerHTML;  
  var pieza9 = document.getElementById("imgpieza9");
    
    if (referencia === "Tutor Bunny") {
      pieza9.setAttribute("src", "images/bunny_08.jpg"); 
    } else if (referencia === "Fighter Koala") {
      pieza9.setAttribute("src", "images/koala_08.jpg");
    } else 
      pieza9.setAttribute("src", "images/koalabunny_08.jpg");
    
      var confetti = document.getElementById("container");
      confetti.style.display = 'block';
      
      setTimeout(mostrarOpciones, 4000);
      function mostrarOpciones() {
        document.getElementById("mostrarAlGanar").style.display = 'block';
        pieza9.setAttribute("src", "");
      }

}


function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
  var grillaTemporal = grilla[filaPos1][columnaPos1];
  grilla[filaPos1][columnaPos1]= grilla[filaPos2][columnaPos2];
  grilla[filaPos2][columnaPos2]= grillaTemporal;

}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}


function posicionValida(fila, columna) {
  return(fila<grilla.length && -1<fila && -1<columna && columna<grilla[0].length);
}

function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }
    
 
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
     
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        agregarUltimoMovimiento(direccion);

    }
}

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}


function intercambiarPosiciones(fila1, columna1, fila2, columna2) {

  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}


function intercambiarPosicionesDOM(idPieza1, idPieza2) {

  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}


function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '⬆';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '⬇';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '➡';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '⬅';
      break;
  }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}


function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);
  

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);

}


function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}


function iniciar() {
    mezclarPiezas(30);
    capturarTeclas();
}


var koala = "koala";
var bunny = "bunny";
var fighterkoala = "Fighter Koala";
var koalabunny = "koalabunny";
var tutorfighter = "Tutor & Fighter";
var tutorbunny = "Tutor Bunny";
var blacks = "black";
var pinks = "#da78b6";
var greys = "grey";


function cambiarimagen(x, y, z) {

  var titulo = document.getElementById("title");
  titulo.innerHTML = y;
  titulo.style.color = z;
  var fondo = document.getElementById("juego");
  fondo.style.background = z;
  var fondo2 = document.getElementById("juego2");
  fondo2.style.background = z;
  var referencia = document.getElementById("refe");
  referencia.setAttribute("src", "images/" + x + ".jpg");

   var todaslasfotos = document.getElementsByClassName("imagen-rompecabeza menos");
   for (var i = 0; i <todaslasfotos.length; i++) {
     todaslasfotos[i].setAttribute("src", "images/" + x + "_0" + i + ".jpg");
   }

  document.getElementById("mostrarAlGanar").style.display = 'none';
  var confetti = document.getElementById("container");
      confetti.style.display = 'none';
  iniciar();
}

function cambiaraFacil(){

  var elemento = document.getElementById("lista-instrucciones");
    while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
    }

  mostrarFacil();
  document.getElementById("mostrarAlGanar").style.display = 'none';
  var confetti = document.getElementById("container");
      confetti.style.display = 'none';

      var titulo = document.getElementById("title");
      titulo.innerHTML = "Tutor Bunny";
      titulo.style.color = "#da78b6";
      var fondo2 = document.getElementById("juego2");
      fondo2.style.background = "#da78b6";
      document.getElementById("entorno").style.background = "#da78b6";
      var referencia = document.getElementById("refe");
      referencia.setAttribute("src", "images/bunny.jpg");

      var fondorompeimg = document.getElementById("imgfondo");
      fondorompeimg.setAttribute("xlink:href", "images/bunnyrompe.png");

      var todaslasfotos = document.getElementsByClassName("movil");
      for (var i = 0; i <todaslasfotos.length; i++) {
        todaslasfotos[i].setAttribute("xlink:href", "images/bunny" + i + ".png");
      }

      function ordenarid() {
        var todaslasfotospadre = document.getElementsByClassName("padre");
 for (var i = 0; i <todaslasfotospadre.length; i++) {
  todaslasfotospadre[i].setAttribute("id", i);}}


      var facil23 = document.getElementById("juegoRompecabeza");
      facil23.style.display = 'block';
      var facil23 = document.getElementById("juego");
      facil23.style.display = 'none';
      var referencia = document.getElementById("fondo");  
      referencia.style.opacity = '0.3'; 
      volveraMezclar();

}

function cambiaraDificil(){

  var elemento = document.getElementById("lista-instrucciones");
    while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
    }

    var borrarult = document.getElementById("ultimo-mov");
    borrarult.style.display = 'block';
  var facil23 = document.getElementById("juegoRompecabeza");
  facil23.style.display = 'none';
  var facil23 = document.getElementById("juego");
  facil23.style.display = 'block';
  mostrarDificil();
  document.getElementById("mostrarAlGanar2").style.display = 'none';
  var confetti = document.getElementById("container");
      confetti.style.display = 'none';

      var titulo = document.getElementById("title");
      titulo.innerHTML = "Tutor Bunny";
      titulo.style.color = "#da78b6";
      var fondo2 = document.getElementById("juego2");
      fondo2.style.background = "#da78b6";
      var fondo = document.getElementById("juego");
      fondo.style.background = "#da78b6";
      var referencia = document.getElementById("refe");
      referencia.setAttribute("src", "images/bunny.jpg");

      var todaslasfotos = document.getElementsByClassName("imagen-rompecabeza menos");
      for (var i = 0; i <todaslasfotos.length; i++) {
        todaslasfotos[i].setAttribute("src", "images/bunny_0" + i + ".jpg");
      }


}

function cambiarimagen2(x, y, z) {

  var titulo = document.getElementById("title");
  titulo.innerHTML = y;
  titulo.style.color = z;
  var fondo = document.getElementById("juego");
  fondo.style.background = z;
  var fondo2 = document.getElementById("juego2");
  fondo2.style.background = z;
  document.getElementById("entorno").style.background = z;
  var referencia = document.getElementById("refe");
  referencia.setAttribute("src", "images/" + x + ".jpg");
 
   var todaslasfotos = document.getElementsByClassName("movil");
   for (var i = 0; i <todaslasfotos.length; i++) {
     todaslasfotos[i].setAttribute("xlink:href", "images/" + x + i + ".png");
   }

  document.getElementById("mostrarAlGanar2").style.display = 'none';
  var confetti = document.getElementById("container");
      confetti.style.display = 'none';
    var fondorompe = document.getElementById("fondo");  
    fondorompe.style.opacity = '0.3'; 
    var fondorompeimg = document.getElementById("imgfondo");
    fondorompeimg.setAttribute("xlink:href", "images/" + x + "rompe" + ".png");
    volveraMezclar();
}
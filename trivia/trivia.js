var total = 10; //Total de preguntas
var puntaje = 0; //Inicializa puntaje en 0
var pista=0; //Cantidad de pistas disponibles 

//Array que contiene las pistas 1
var pistasA = ["Es contemporáneo de artistas como Luis Alberto Spinetta y Gustavo Santaolalla.","Se caracterizaba por un sonido folk y letras poéticas."," Estudió música clásica en su juventud.","El álbum incluye Canción para mi muerte.","Fue grabado en Nueva York y marcó un cambio hacia el pop-rock y la electrónica.","Fue una banda de rock progresivo."];

//Array que contiene las pistas 2
var pistasB = ["Nació durante la presidencia de Juan Domingo Perón.","Fue fundada junto a su amigo Nito Mestre.","Es conocido por su talento en las teclas.","Fue lanzado en 1972.","Incluye canciones como No soy un extraño.","Tiene una canción llamada Hipercandombre"];

var intentos=5; //Cantidad de intentos que tendrá el jugador para tirar el dado al final del juego. Inicializa en 5 y se irán si se usan pistas
var resultadoDado=1; //Inicializa en 1 porque si el usuario no tira el dado, multiplica el puntaje por 1

//Funcion para iniciar el juego
function comenzar() {
  
for (i = 1; i <= 20; i++) //Muestra las 20 pistas al comenzar
{
    document.getElementById('pista'+i).style.display = 'block'; 
  }
    document.getElementById('inicio').style.display = 'none'; //Esconde botón inicio
    document.getElementById('reiniciar').style.display = 'none'; //Esconde botón reiniciar
    document.getElementById('preguntas').style.display = 'block'; //Muestra las preguntas
}

function verificar() { //Función que envía y evalua las respuestas y acumula puntaje

//Guarda el valor de las opciones elegidas por el jugador en cada pregunta, es decir el "value"  
var p1 = document.forms['trivia']['p1'].value;
var p2 = document.forms['trivia']['p2'].value;
var p3 = document.forms['trivia']['p3'].value;
var p4 = document.forms['trivia']['p4'].value;
var p5 = document.forms['trivia']['p5'].value;
var p6 = document.forms['trivia']['p6'].value;

//Ciclo que valida que el usuario ingrese todas las opciones y avisa con unalrte al usuario si hay un olvido
for(var i = 1; i <= total; i++) {
  if(eval('p' + i) === null || eval('p' + i) == '' ) {
    alert('UPS! Te olvidaste de responder la pregunta N° ' + i);
    return false;
  }
}

//Array que contiene las opciones correctas para cada pregunta
var respuestas = ["c","b","a","d","a","b"];

//Ciclo que recorre las opciones ingresadas, evalúa y valida las respuestas correctas
for(var i = 1; i <= total; i++) {
  if (eval('p' + i) == respuestas[i - 1]) {
    puntaje+=10; //Suma 10 puntos por cada respuesta correcta
    document.getElementById('p'+i).style.backgroundColor='green' //Marca en color verde las correctas
  }
  else{
  document.getElementById('p'+i).style.backgroundColor='red' //Marca en color rojo las correctas
  }
}
 if (intentos > 0)  //Si quedan intentos para multiplicar, se muestra el puntaje acumulado y la cantidad de intentos para tirar dado
{
document.getElementById('score').innerHTML='Tu puntaje acumulado es: '+puntaje+ ' puntos. Tenés ' +intentos+' intentos para lanzar el dado y multiplicar tu puntaje';
document.getElementById('intentos').style.display='inline-block';
}

//Si no quedan intentos muestra el puntaje final y avisa al jugador que no tiene tiros disponibles para multiplicar puntaje 
else {

  document.getElementById('score').innerHTML = 'No te quedan pistas disponibles para multiplicar tu puntaje. <br> Tu puntaje final es ' + puntaje;
  document.getElementById('reiniciar').style.display='block'; //Muestra botón VOLVER A JUGAR
  document.getElementById('tirar').style.display='none'; //Esconde botón tirar dado
  document.getElementById('stop').style.display='none'; //Esconde botón plantarse
  document.getElementById('apuesta').style.display='none'; //Esconde tablero apuesta para multiplicar puntaje
}
document.getElementById('apuesta').style.display='block'; //Muestra el tablero de apuesta
document.getElementById('score').style.display='block'; //Muestra tablero con puntaje
esconderPistas();  //Llama a función para esconder todas las pistas
document.getElementById('submit').disabled=true; //Deshabilita botón "verificar respuestas"
mostrarExtras();

return false;
}

//Función asignada a botones "Pista 1". Entrega las pistas 1 y actualiza puntaje
function pedirPista1(cual) { //Con el parámetro 'cual' llama a una pista del array PistasA
  pista++; //Acumula 1 pista
  intentos--; //Resta un intento para tirar dado
  puntaje-=2; //Resta 2 puntos
  alert(cual); //Muestra la pista en un alert

  if (pista == 5){  //Si se piden 5 pistas, se esconden todas
esconderPistas()
}
}

//Función igual a pedirPista1 pero asignada a botones "Pista 2". Llama pistas del array PistasB 
function pedirPista2(cual) {
  pista++;
  intentos--;
  puntaje-=5;
  alert(cual);

if (pista == 5){

esconderPistas()
}
}

//Función que esconde todas las pistas. Llamada cuando se piden 5 pistas, y cuando se verifican las respuestas
function esconderPistas() {
 
      for (i = 1; i <= 12; i++)
      {
            document.getElementById('pista'+i).style.visibility = "hidden"; //Concatena 'pista' con el valor de i, y así esconde pista1,pista2,pista3,etc.
      }   
                       }

//Funcion que habilita pistas (cuando se pide la pista 1, se la llama para habilitar pista2)
function habilitar(cual){ //El parámetro 'cual' será reemplazado por la pista que será habilitada
document.getElementById(cual).disabled=false;
}

//Funcion que deshabilita pistas a medida que se van usando
function deshabilitar(cual){ //Parámetro 'cual' será reemplazado por la pistá a deshabilitar
document.getElementById(cual).disabled=true;
}

//Función que tira el dado
function tirarDado(){

intentos--; //Cada tiro resta un intento y actualiza la cantidad restante en pantalla
document.getElementById('intentos').innerHTML='Te quedan : '+intentos + ' intentos para multiplicar.';

resultadoDado = Math.floor(Math.random()*9); //Obtiene un numero random del 0 al 9 que representa la cara de un dado
document.getElementById('dadoPreguntas').src='img/dado2/'+resultadoDado+'.png'; //Asigna al elemento la imagen correspondiente a la cara del dado y lo actualiza en cada tiro
document.getElementById('dadoPreguntas').style.display='block'; //Muestra el dado que se inicia oculto
sinIntentos(); //Cuando intentos llega a 0, llama a la función que muestra el puntaje final

return resultadoDado; //Retorna el numero del 1 al 9 y lo guarda
}

function plantarse(){ //Función para mostrar el puntaje final y finalizar el juego

puntaje=puntaje*resultadoDado; //Multiplica puntaje por el resultado actual del dado

if (puntaje < 0){ //Para evitar puntajes menores a 0, se le asigna 0 en caso de ser negativo

puntaje=0;
}

if (pista == 5){ //Si se usan las 5 pistas, no se tira el dado y se muestra puntaje final en pantalla

document.getElementById('score').innerHTML = 'Tu puntaje final es ' + puntaje+'.<br>FIN DEL JUEGO ' 
}

document.getElementById('score').innerHTML = 'Tu puntaje final es ' + puntaje+'.<br>FIN DEL JUEGO ' //Muestra el puntaje final en pantalla
document.getElementById('preguntas').style.display='block';  //Muestra las preguntas/respuestas
document.getElementById('reiniciar').style.display='block'; //Muestra botón VOLVER A JUGAR
document.getElementById('stop').style.display='none';  //Esconde el botón plantarse
document.getElementById('tirar').style.display='none';  //Esconde el botón tirar
esconderPistas(); //Esconde todas las pistas
}

function mostrarExtras(){ //Función que revela información extra para cada pregunta

for (i = 1; i <= 10; i++) //Recorre de 1 a 10 y muestra los 10 div con la información extra
      {
            document.getElementById('extra'+i).style.display='block';
      }
}

function reintentar(){  //Función para volver a jugar, refresca la página estado inicial
location.reload(); 
}

function sinIntentos(){  //Se activa en caso de tirar el dado hasta agotar los intentos

if (intentos <= 0) //Si no quedan intentos disponibles, multiplica el puntaje por el resultado del último dado tirado
{ 
puntaje=puntaje*resultadoDado;

  document.getElementById('score').innerHTML = 'Te quedaste sin intentos para tirar el dado. <br> Tu puntaje final es ' + puntaje; //Avisa que no hay intentos y muestra puntaje
  document.getElementById('reiniciar').style.display='block'; //Muestra botón VOLVER A JUGAR
  document.getElementById('tirar').style.display='none'; //Esconde botón tirar dado
  document.getElementById('stop').style.display='none'; //Esconde botón plantarse
}
}

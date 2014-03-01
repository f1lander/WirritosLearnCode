window.addEventListener("load", init, false);


function init(){
     
}

function leerComandos(){
    var lines = $('#comandos').val().split('\n');
    for(var i = 0;i < lines.length;i++){
        //code here using lines[i] which will give you each line
        if(validarComando(lines[i])){
            if (lines[i] == "moverderecha();")
                lista[i] = "derecha";
            if (lines[i] == "moverizquierda();")
                lista[i] = "izquierda";
            if (lines[i] == "moverarriba();")
                lista[i] = "arriba"
            if (lines[i] == "moverabajo();")
                lista[i] = "abajo";
        }   
        else
        {
            return;
        }
    }
    myFunction(lista);
}

function run(){
    
}

function validarComando(instruccion){
    
    /* moverDerecha();
       moverIzquierda();
       moverArriba();
       moverAbajo();    
    */
   if (instruccion.toUpperCase() == "moverderecha();".toUpperCase())
        return true;
    if (instruccion.toUpperCase() == "moverizquierda();".toUpperCase())
        return true;   
    if (instruccion.toUpperCase() == "moverarriba();".toUpperCase())
       return true;     
    if (instruccion.toUpperCase() == "moverabajo();".toUpperCase())
       return true;

   $('#dangerMsj').show();
}

var pos=0;

var position_x=0;
var position_y=0;

var obstaculos_x = new Array();
var obstaculos_y = new Array();
var lista = new Array();
var meta_x;
var meta_y;
function myFunction(lista)
{
  meta_x=4;
  meta_y=4;

  //lista[0] = "derecha";
  //lista[1] = "derecha";
  //lista[2] = "abajo";
  //lista[3] = "abajo";
  //lista[4] = "abajo";
  //lista[5] = "izquierda";

  //lista[4] = "derecha";
  //lista[5] = "derecha";
  //lista[6] = "abajo";
  //lista[7] = "abajo";


  obstaculos_x[0] = 2;
  obstaculos_y[0] = 3;

  obstaculos_x[1] = 1;
  obstaculos_y[1] = 1;

  limpiarPantalla();

  var onUpdate=setInterval(
    function()
    {
      pintarCuadro("vacio",position_x,position_y);
      if(lista[pos]=="arriba")
      {
        position_y--;
      }
      if(lista[pos]=="abajo")
      {
        position_y++;
      }
      if(lista[pos]=="izquierda")
      {
        position_x--;
      }
      if(lista[pos]=="derecha")
      {
        position_x++;
      }

      pintarCuadro("actual",position_x,position_y);

      if(esObstaculo(position_x,position_y))
      {
        alert("obstaculo");
      }

      if(esMeta(position_x,position_y))
      {
        alert("meta");
      }

      pos++;
      if(pos>=lista.length)
      {
        window.clearInterval(onUpdate)
      }
    }
  ,500);
}

function limpiarPantalla()
{
  var y=0;
  while(y<5)
  {
  	pintarCuadro("vacio",0,y);
  	pintarCuadro("vacio",1,y);
  	pintarCuadro("vacio",2,y);
  	pintarCuadro("vacio",3,y);
  	pintarCuadro("vacio",4,y);
    y++;
  }
  var i=0;
  while(i<2)
  {
    pintarCuadro("obstaculo",obstaculos_x[i],obstaculos_y[i]);
    i++;
  }
  pintarCuadro("meta",meta_x,meta_y);
  pintarCuadro("actual",position_x,position_y);
}

function pintarCuadro(tipo,col,row)
{
  var table = document.getElementById("myTable");
  var columna = document.getElementById("myTable").rows[row].cells;
  columna[col].innerHTML='<img src=img/'+tipo+'.png></img>';
}

function esObstaculo(pos_x,pos_y)
{
  var i=0;
  while(i<2)
  {
    if(pos_x==obstaculos_x[i] && pos_y==obstaculos_y[i])
    {
      return true;
    }
    i++;
  }
  return false;
}

function esMeta(pos_x,pos_y)
{
  return pos_x==meta_x && pos_y==meta_y;
}
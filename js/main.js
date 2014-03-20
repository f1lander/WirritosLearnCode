window.addEventListener("load", init, false);


function init(){
    inicializar();
}

function leerComandos(){
    $('#dangerMsj').hide();
    var lines = $('#comandos').val().split('\n');
    for(var i = 0;i < lines.length;i++){
        //code here using lines[i] which will give you each line
        if (lines[i].trim() != "")
            
            if (validarComando(lines[i].trim())) {
                if (lines[i] == "moverderecha();")
                    lista[i] = "derecha";
                if (lines[i] == "moverizquierda();")
                    lista[i] = "izquierda";
                if (lines[i] == "moverarriba();")
                    lista[i] = "arriba"
                if (lines[i] == "moverabajo();")
                    lista[i] = "abajo";
            }
            else {
                return;
            }
        
    }
    myFunction(lista);
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
   return false;
}

var pos=0;

var position_x=0;
var position_y=0;

var obstaculos_x = new Array();
var obstaculos_y = new Array();
var lista = new Array();
var meta_x;
var meta_y;
var current_level=1;

function inicializar()
{
  pos=0;
  initLevel(current_level);
}

function myFunction(lista)
{
    inicializar();
    var onUpdate = setInterval(
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
        alert("Pucha! perdiste has chocado con un obstaculo!");
        window.clearInterval(onUpdate);
        inicializar();
      }

      if(esMeta(position_x,position_y))
      {
        alert("Siiii ganaste! ahora intentalo en el siguiente nivel");
        window.clearInterval(onUpdate);
        current_level++;
        inicializar();
      }

      pos++;
      if(pos>=lista.length)
      {
        window.clearInterval(onUpdate)
      }
    }
  ,500);
}

function initLevel(level)
{
  if(level==1)
  {
    position_x=2;
    position_y=0;
		meta_x=2;
		meta_y=2;
  }

  if(level==2)
  {
    position_x=0;
    position_y=0;
		meta_x=2;
		meta_y=2;

    obstaculos_x[0] = 1;
    obstaculos_y[0] = 2;

    obstaculos_x[1] = 3;
    obstaculos_y[1] = 2;
  }

  if(level==3)
  {
    position_x=2;
    position_y=2;
		meta_x=4;
		meta_y=4;

    obstaculos_x[0] = 1;
    obstaculos_y[0] = 0;

    obstaculos_x[1] = 1;
    obstaculos_y[1] = 2;

    obstaculos_x[2] = 3;
    obstaculos_y[2] = 2;

    obstaculos_x[3] = 3;
    obstaculos_y[3] = 4;
  }

  if(level==4)
  {
    position_x=2;
    position_y=2;
		meta_x=3;
		meta_y=4;

    obstaculos_x[0] = 2;
    obstaculos_y[0] = 0;

    obstaculos_x[1] = 1;
    obstaculos_y[1] = 1;

    obstaculos_x[2] = 3;
    obstaculos_y[2] = 3;

    obstaculos_x[3] = 2;
    obstaculos_y[3] = 4;
  }

  if(level==5)
  {
    position_x=2;
    position_y=0;
		meta_x=2;
		meta_y=2;

    obstaculos_x[0] = 1;
    obstaculos_y[0] = 1;

    obstaculos_x[1] = 2;
    obstaculos_y[1] = 1;

    obstaculos_x[2] = 3;
    obstaculos_y[2] = 1;

    obstaculos_x[3] = 1;
    obstaculos_y[3] = 2;

    obstaculos_x[4] = 3;
    obstaculos_y[4] = 2;

    obstaculos_x[5] = 1;
    obstaculos_y[5] = 3;

    obstaculos_x[6] = 3;
    obstaculos_y[6] = 3;
  }
  limpiarPantalla();
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
  while(i<obstaculos_x.length && obstaculos_x.length!=0)
  {
    pintarCuadro("obstaculo",obstaculos_x[i],obstaculos_y[i]);
    i++;
  }
  pintarCuadro("meta",meta_x,meta_y);
  pintarCuadro("actual",position_x,position_y);
}

function pintarCuadro(tipo,col,row)
{
  if(col<0 || col>4
     || row<0 || col>4)
    return;
  var table = document.getElementById("myTable");
  var columna = document.getElementById("myTable").rows[row].cells;
  columna[col].innerHTML='<img src=img/'+tipo+'.png></img>';
}

function esObstaculo(pos_x,pos_y)
{
  if(pos_x<0 || pos_x>4
    || pos_y<0 || pos_y>4)
  {
    return true;
  }

  var i=0;
  while(i<obstaculos_x.length)
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
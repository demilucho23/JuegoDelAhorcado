	//Coleccion de palabras
   
    const coleccionDePalabras = ['ENTONCES', 'NOSOTROS', 'NECESITO', 'HACIENDO', 'PROBLEMA', 'REALMENTE', 'DEMASIADO', 'HISTORIA', 'MIENTRAS', 'CUALQUIER', 'HABLANDO', 'PROBLEMAS', 'ENTIENDO', 'PERSONAS', 'ADELANTE', 'SIGNIFICA', 'IMPORTANTE', 'NECESITAMOS', 'NUESTROS', 'NECESITA', 'SUFICIENTE', 'GUSTARÍA', 'SIQUIERA', 'SUPUESTO', 'ENCONTRAR', 'REALIDAD', 'DEBERÍAS', 'PREGUNTA', 'TRABAJAR', 'NECESITAS', 'OPORTUNIDAD', 'PREOCUPES', 'EXACTAMENTE', 'BASTANTE', 'SEGURIDAD', 'ESPERANDO', 'TELÉFONO', 'BUSCANDO', 'DEMONIOS', 'PENSANDO', 'RECUERDO', 'CABALLEROS', 'NUESTRAS', 'CORRECTO', 'ENTIENDES', 'MUCHACHOS', 'HOSPITAL', 'PRESIDENTE', 'DICIENDO', 'DISCULPE', 'INCREÍBLE', 'ESPECIAL', 'QUEREMOS', 'PERFECTO', 'RECUERDAS', 'MILLONES', 'QUISIERA', 'PROBABLEMENTE', 'MALDICIÓN', 'MUCHACHO', 'INFORMACIÓN', 'PREGUNTAS', 'DEBERÍAMOS', 'PROFESOR', 'HABITACIÓN', 'NOTICIAS', 'TRANQUILO', 'RECUERDA', 'TRATANDO', 'EJÉRCITO', 'COMPAÑÍA', 'ATENCIÓN', 'PALABRAS', 'PELÍCULA', 'REGRESAR', 'ENTENDIDO', 'SEÑORITA', 'ESTÚPIDO', 'DIFERENTE', 'ENCONTRÉ', 'ACCIDENTE', 'IMPOSIBLE', 'PODRÍAMOS', 'SEGUNDOS', 'FUNCIONA', 'PROGRAMA', 'SITUACIÓN', 'PERSONAL', 'CONSEGUIR', 'TRABAJANDO', 'GRACIOSO', 'IZQUIERDA', 'RESPUESTA', 'HICIERON', 'SERVICIO', 'SIMPLEMENTE', 'SIÉNTATE', 'DIVERTIDO', 'SIGUIENTE', 'DISCULPA']
    var coleccion=coleccionDePalabras
		console.log(document.documentElement.clientWidth)
    //Foco en el input
    let entrada=document.getElementById("letra-presionada")
    //variables de canvas
    let pantalla = document.querySelector('canvas');
        pantalla.width=document.documentElement.clientWidth*0.75
        pantalla.height=document.documentElement.clientHeight*0.5
    let pincel = pantalla.getContext('2d');
        pincel.fillStyle="#81D4FA"
        pincel.fillRect(0, 0, pantalla.width, pantalla.height);
        pincel.scale(pantalla.width/300,pantalla.height/150)// lo tuve que escalar porque el dibujo que hice
    //inicializar varibles del juego
    let errores=0	
    let letrasFalladas=[];
    let letrasAcertadas=[];
    let longitud=0;
    //sortear palabra
    let azar=Math.floor(Math.random()*coleccion.length)
    let palabraSecreta=coleccion[azar]
    //Segun la palabra se dibuja el  inicio del ahorcado sobre elcanvas
        dibujarBase();
        dibujarGuiones();
    //Base de las letras
    function dibujarGuiones(){
        for (let i=0; i<palabraSecreta.length ; i++){
        
        pincel.fillStyle= "black"
        pincel.fillRect(150-20*palabraSecreta.length/2+20*i,132,12,1)
        }
    }
    //Base
    function dibujarBase(){
        pincel.fillStyle= "#6E2C00"
        pincel.beginPath();
        pincel.moveTo(90, 110);
        pincel.lineTo(210,110);
        pincel.lineTo(210,105);
        pincel.lineTo(90,105);
        pincel.fill();	
        }
    //reiniciar Pantalla
    function reiniciarPantalla(){
        pantalla.width=pantalla.width
        
        errores=0
        azar=Math.floor(Math.random()*coleccion.length)
        palabraSecreta=coleccion[azar]
            pincel.fillStyle="#81D4FA"
            pincel.fillRect(0, 0, pantalla.width, pantalla.height);
            pincel.scale(pantalla.width/300,pantalla.height/150)
        letrasFalladas=[];
        letrasAcertadas=[];
        longitud=0;
        dibujarBase();
        dibujarGuiones();
        document.getElementById("resultado").value=""
        entrada.value=""
        enfocarEntrada();
    }			
    //imprimir Derrota
    function derrota(){       
            document.getElementById("resultado").style.color="red"
            document.getElementById("resultado").value="¡¡¡DERROTA!!!"
            pantalla.onclick=reiniciarPantalla
        }
    //Dibujar letras sobre guiones
    function dibujarLetrasSobreGuiones(letra, cantidadDeLetras, i,color){
        let x=150-20*cantidadDeLetras/2+20*i
        let y=126
        if(letra==="I"){
            pincel.fillStyle=color
            pincel.fillText(letra,x+5,y,8);
        }else{
            pincel.fillStyle=color
            pincel.fillText(letra,x+2,y,8);
        }
    }
    //Rendirse
    function rendirse(){
        derrota();
        for(let i=0 ;i<palabraSecreta.length;i++){
            dibujarLetrasSobreGuiones(palabraSecreta[i], palabraSecreta.length,i,"red")
        }	
        setTimeout(irAlIndex, 2000)				
    }
    //Evalua la letra presionada 
    function compararLetra(){
        if (errores<9 && letrasAcertadas.length<palabraSecreta.length){
            let cantidadDeLetras=coleccion[azar].length
            let letra=entrada.value.toUpperCase()
            let aciertos= 0
            
                if (!letrasAcertadas.includes(letra)){
                    for(let i=0 ;i<palabraSecreta.length;i++){
                        if(palabraSecreta[i]===letra){
                            aciertos++
                            dibujarLetrasSobreGuiones(letra, cantidadDeLetras,i,"blue")
                        }
                    }
                }

            if (!letrasFalladas.includes(letra) && !letrasAcertadas.includes(letra)){
                if(aciertos===0){
                    errores++
                    dibujarAhorcado();
                    letrasFalladas.push(letra)
                    
                    let x=50+20*(letrasFalladas.length-1)
                    let y=149
                    if (letra==="I"){
                        pincel.fillStyle="red"
                        pincel.fillText(letra,x+6,y,6)
                  
                    }else{
                        pincel.fillStyle="red"
                        pincel.fillText(letra,x+2,y,6);  
                    }

                    if(errores>=9){
                        derrota();
                        for(let i=0 ;i<palabraSecreta.length;i++){
                            dibujarLetrasSobreGuiones(palabraSecreta[i], palabraSecreta.length,i,"red")
                        }	
                        pantalla.onclick=reiniciarPantalla
                    }

                }else{
                    letrasAcertadas.push(letra)
                    console.log(letrasAcertadas)
                    longitud+=aciertos
                    if (longitud===palabraSecreta.length){
                        tristeOFeliz(true);
                        document.getElementById("resultado").style.color="green"
                        document.getElementById("resultado").value="¡¡¡VICTORIA!!!"
                        pantalla.onclick=reiniciarPantalla
                    }
                }			
            }
        }		
    }	
    //Dibuja el ahorcado segun cantidad de errores cometidos
    function dibujarAhorcado() {
        function dibujarRectangulo(x1,y1,x2,y2, color){
            pincel.fillStyle= color
            pincel.beginPath();
            pincel.moveTo(x1,y1);
            pincel.lineTo(x1,y2);
            pincel.lineTo(x2,y2);
            pincel.lineTo(x2,y1);
            pincel.fill();		
        }				
        function dibujarDiagonales(x1,x2,y1,y2,lado,color){
            pincel.fillStyle= color
            pincel.beginPath();
            pincel.moveTo( x1, y1);
            if(lado==="D"){
                pincel.lineTo( x2, y2);
                pincel.lineTo( x2-4 , y2);
                pincel.lineTo(x1,y1+3)
            }else{
                pincel.lineTo( x2, y2);
                pincel.lineTo( x2+4 , y2);
                pincel.lineTo( x1,y1+3)
            }
            pincel.fill()
        }
        switch(errores){						
            case 1:
                dibujarRectangulo(138,110,141,10,"#6E2C00 ")			
                break
            case 2:
                dibujarRectangulo(141,13,188,10,"#6E2C00 ")
                dibujarDiagonales(141,150,20,10,"I","#6E2C00 ")					
                break
            case 3:
                dibujarRectangulo(185,23,188,13,"#6E2C00 ")
                
                break;
            case 4:
                pincel.fillStyle="#F5CBA7"
                pincel.beginPath();
                pincel.arc(186.5, 35, 12 , 0, 2 * 3.14);
                pincel.fill();
                break
            case 5:
                dibujarRectangulo(185,78,188,47,"#F5CBA7")
                break;
            case 6: 
                dibujarDiagonales(186.5,206.5,52,60, "D","#F5CBA7")
                break;	
            case 7:
                dibujarDiagonales(186.5,166.5,52,60,"I","#F5CBA7")						
                break;
            case 8:
                dibujarDiagonales(186.5,206.5,75,98,"D","#F5CBA7")
                break;	
            case 9:
                dibujarDiagonales(186.5,166.5,75,98,"I","#F5CBA7")
                tristeOFeliz(false); 
                break;								

        }

    }
    //dibujar estado cara
    function tristeOFeliz(esFeliz){
        if(esFeliz){
            pincel.fillStyle="black"
            pincel.beginPath();
            pincel.arc(182.5, 33, 2 , 0, 2 * 3.14);
            pincel.arc(190.5, 33, 2 , 0, 2 * 3.14);
            pincel.fill();
            pincel.beginPath();
            pincel.arc(186.5, 29, 13 , 3.14/2-0.4, 3.14/2+0.4,false);
            pincel.lineWidth = 1;
            pincel.strokeStyle="black"
            pincel.stroke();
        }else{
            pincel.fillStyle="black"
            pincel.beginPath();
            pincel.arc(182.5, 33, 2 , 0, 2 * 3.14);
            pincel.arc(190.5, 33, 2 , 0, 2 * 3.14);
            pincel.fill();
            pincel.beginPath();
            pincel.arc(186.5, 52, 12 , 3*3.14/2-0.4, 3*3.14/2+0.4,false);
            pincel.lineWidth = 1;
            pincel.strokeStyle="black"
            pincel.stroke();
        }
    }
    //Eventos al presionar tecla
    function jugar(){
        let letra=entrada.value.toUpperCase()
        if ((/[A-Z]/).test(letra)){
        compararLetra();
        entrada.value=""
        }
        entrada.value=""
    }
    function enfocarEntrada(){
        entrada.focus()
    }
    irAlIndex();
    window.onclick=enfocarEntrada
    entrada.onkeyup=jugar


let entrada2=document.getElementById("palabra-para-agregar");
let agregar = document.getElementById("agregar-palabra");	
function agregarPalabra(){
    let palabra2=entrada2.value
    if ((/[A-Z]/g).test(palabra2)){
        if (!coleccionDePalabras.includes(palabra2.toUpperCase())){
        coleccionDePalabras.push(palabra2.toUpperCase())                         
        alert("La palabra " +palabra2+ " fue agregada con exito")
        iniciarJuego()
        }else{
            alert("La palabra " +palabra2+ " ya se encuentra en la coleccion")
            iniciarAgregar()
        }
    }else{
        alert("Debe ingresar una palabra correcta")
    }
    entrada2.value=""
}

function iniciarJuego(){
    document.getElementById("index").style.display = "none";
    document.getElementById("agregarPalabra").style.display = "none";
    document.getElementById("juegoAhorcado").style.display = "flex";
    
    reiniciarPantalla()
    
}
function iniciarAgregar(){
    document.getElementById("index").style.display = "none";
    document.getElementById("agregarPalabra").style.display = "flex";
    document.getElementById("juegoAhorcado").style.display = "none";
    reiniciarPantalla()
}
function irAlIndex(){
    document.getElementById("index").style.display = "flex";
    document.getElementById("agregarPalabra").style.display = "none";
    document.getElementById("juegoAhorcado").style.display = "none";
    reiniciarPantalla();

}
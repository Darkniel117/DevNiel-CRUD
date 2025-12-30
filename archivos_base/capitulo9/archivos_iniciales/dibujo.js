
    let dibujo = document.getElementById("grafico");
    let lienzo = dibujo.getContext("2d");

function dibujar(color, xinicial, yinicial, xfinal, yfinal){
    lienzo.fillStyle="red";
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth=4;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.fill();
    lienzo.stroke();
    lienzo.closePath();
}
/*Funcion linea inferior */
    function dibujar_l(color, xinicial, yinicial, xfinal, yfinal){
    lienzo.fillStyle="red";
    lienzo.beginPath();
    lienzo.strokeStyle = "black";
    lienzo.lineWidth=4;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.fill();
    lienzo.stroke();
    lienzo.closePath();
    }
    /*Funcion linea superior */
        function dibujar_l_S(color, xinicial, yinicial, xfinal, yfinal){
        lienzo.fillStyle="red";
        lienzo.beginPath();
        lienzo.strokeStyle = "black";
        lienzo.lineWidth=4;
        lienzo.moveTo(xinicial, yinicial);
        lienzo.lineTo(xfinal, yfinal);
        lienzo.fill();
        lienzo.stroke();
        lienzo.closePath();
    }
/*superior negro*/
dibujar("black", 0, 200, 200, 0);
dibujar("black", 200, 0, 400, 200);
dibujar("black", 400, 200, 0, 200);
/*inferior negro*/
dibujar("black", 0, 210, 400, 210);
dibujar("black", 0, 210, 200, 400);
dibujar("black", 400, 210, 200, 400);
/*superior amarillo*/
dibujar("#044343", 20, 190, 200, 10);
dibujar("#044343", 200, 10, 380, 190);
dibujar("#044343", 380, 190, 20, 190);
/*inferior amarillo*/
dibujar("#044343", 20, 220, 380, 220);
dibujar("#044343", 20, 220, 200, 390);
dibujar("#044343", 200, 390, 380,220);
/*superior red*/
dibujar("black", 40, 180, 200, 20);
dibujar("black", 200, 20, 360, 180);
dibujar("black", 360, 180, 40, 180);
/*inferior red*/
dibujar("black", 40, 230, 360, 230);
dibujar("black", 40, 230, 200, 380);
dibujar("black", 200, 380, 360,230);
    /*linea inferior*/
    dibujar_l("red", 55, 230, 200, 380);
    dibujar_l("red", 70, 230, 200, 380);
    dibujar_l("red", 85, 230, 200, 380);
    dibujar_l("red", 100, 230, 200, 380);
    dibujar_l("red", 115, 230, 200, 380);
    dibujar_l("red", 130, 230, 200, 380);
    dibujar_l("red", 145, 230, 200, 380); 
    dibujar_l("red", 160, 230, 200, 380);
    dibujar_l("red", 175, 230, 200, 380);
    dibujar_l("red", 190, 230, 200, 380);
    dibujar_l("red", 205, 230, 200, 380);
    dibujar_l("red", 220, 230, 200, 380);
    dibujar_l("red", 235, 230, 200, 380);
    dibujar_l("red", 250, 230, 200, 380);
    dibujar_l("red", 265, 230, 200, 380);
    dibujar_l("red", 280, 230, 200, 380);
    dibujar_l("red", 295, 230, 200, 380);
    dibujar_l("red", 310, 230, 200, 380);
    dibujar_l("red", 325, 230, 200, 380);
    dibujar_l("red", 340, 230, 200, 380);
    /*linea inferior*/
    dibujar_l_S("", 55, 180, 200, 20);
    dibujar_l_S("", 70, 180, 200, 20);
    dibujar_l_S("", 85, 180, 200, 20);
    dibujar_l_S("", 100, 180, 200, 20);
    dibujar_l_S("", 115, 180, 200, 20);
    dibujar_l_S("", 130, 180, 200, 20);
    dibujar_l_S("", 145, 180, 200, 20);
    dibujar_l_S("", 160, 180, 200, 20);
    dibujar_l_S("", 175, 180, 200, 20);
    dibujar_l_S("", 190, 180, 200, 20);
    dibujar_l_S("", 205, 180, 200, 20);
    dibujar_l_S("", 220, 180, 200, 20);
    dibujar_l_S("", 235, 180, 200, 20);
    dibujar_l_S("", 250, 180, 200, 20);
    dibujar_l_S("", 265, 180, 200, 20);
    dibujar_l_S("", 280, 180, 200, 20);
    dibujar_l_S("", 295, 180, 200, 20);
    dibujar_l_S("", 310, 180, 200, 20);
    dibujar_l_S("", 325, 180, 200, 20);
    dibujar_l_S("", 340, 180, 200, 20);

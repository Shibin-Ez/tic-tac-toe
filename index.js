var i, turn=1, c0=0,c1=0,c2=0, sum, totalSum=0, keyspot, neutralspot;

var keyspots = [], neutralspots = [];

var table = [[0,0,0],[0,0,0],[0,0,0]];

// click functions
$(".place").click(function(){
    var posX = parseInt($(this).attr("id")[0]);
    var posY = parseInt($(this).attr("id")[1]);
    if(turn==1 && table[posX][posY]==0){
        table[posX][posY] = 1;
        $(this).addClass('img-x').animate({backgroundSize: "80%"},"fast");
        turn = 2;
        playsound();
        makeWin();
    }
    if(turn==2){
        var status = chooseMove();
        if(status==1){
            console.log("Oh.."+keyspot)
            var id = keyspot[1] + keyspot[2];
            table[parseInt(keyspot[1])][parseInt(keyspot[2])] = 10;
            $("#"+id).addClass('img-o').delay(200).animate({backgroundSize: "80%"},"fast");
            playsound();
        }
        else{
            status = 1;
            console.log("random");
            randomMove();
            var id = neutralspot[1] + neutralspot[2];
            table[parseInt(neutralspot[1])][parseInt(neutralspot[2])] = 10;
            $("#"+id).addClass('img-o').delay(200).animate({backgroundSize: "80%"},"fast");
            playsound();
        }
        turn=1;
        makeWin();
    }
});

function makeWin(){
    var result = checkWin();
    if(result == 1){
        $("#heading").delay(400).html("You Won..!!");
        turn = 0;
    }
    else if(result==2){
        $("#heading").delay(400).html("Better Luck Next Time...!!");
        turn = 0;
    }
    else if(result==-1){
        $("#heading").delay(400).html("Draw...!!");
        turn = 0;
    }
}

function checkWin(){
    // checking rows
    totalSum = 0;
    sum = table[0][0] + table[0][1] + table[0][2];
    if(sum==3){
        return 1; // You wins
    }
    else if(sum==30){
        return 2; // Computer Wins
    }
    totalSum += sum;
    
    sum = table[1][0] + table[1][1] + table[1][2];
    if(sum==3){
        return 1;
    }
    else if(sum==30){
        return 2;
    }
    totalSum += sum;
    
    sum = table[2][0] + table[2][1] + table[2][2];
    if(sum==3){
        return 1;
    }
    else if(sum==30){
        return 2;
    }
    totalSum += sum;

    //checking columns
    sum = table[0][0] + table[1][0] + table[2][0];
    if(sum==3){
        return 1;
    }
    else if(sum==30){
        return 2;
    }

    sum = table[0][1] + table[1][1] + table[2][1];
    if(sum==3){
        return 1;
    }
    else if(sum==30){
        return 2;
    }

    sum = table[0][2] + table[1][2] + table[2][2];
    if(sum==3){
        return 1;
    }
    else if(sum==30){
        return 2;
    }

    //checking diagonals
    sum = table[0][0] + table[1][1] + table[2][2];
    if(sum==3){
        return 1;
    }
    else if(sum==30){
        return 2;
    }

    sum = table[0][2] + table[1][1] + table[2][0];
    if(sum==3){
        return 1; // You win
    }
    else if(sum==30){
        return 2; // Computer Wins
    }
    
    if(totalSum == 45){
        return -1; // Draw
    }

    // if nothing is true
    return 0;
}

function playsound(){
    var audio = new Audio('sound.wav');
    audio.play();
}

function count(n){
    switch(n){
        case 0: c0++; break;
        case 1: c1++; break;
        case 10: c2++; break;
    }
}

function pushToKeyspotRow(i){
    if(table[i][0]==0)
        return 0;
    else if(table[i][1]==0)
        return 1;
    else if(table[i][2]==0)
        return 2;
}
function pushToKeyspotCol(i){
    if(table[0][i]==0)
        return 0;
    else if(table[1][i]==0)
        return 1;
    else if(table[2][i]==0)
        return 2;
}
function pushToKeyspotDiag1(){
    if(table[0][0]==0)
        return 0;
    else if(table[1][1]==0)
        return 1;
    else if(table[2][2]==0)
        return 2;
}
function pushToKeyspotDiag2(){
    if(table[0][2]==0)
        return [0,2];
    else if(table[1][1]==0)
        return [1,1];
    else if(table[2][0]==0)
        return [2,0];
}

function chooseMove(){
    findMoves();
    for(let i=0; i<keyspots.length; i++){
        if(keyspots[i][0] == 's'){
            keyspot = keyspots[i];
            return 1;
        }
    }
    for(let i=0; i<keyspots.length; i++){
        if(keyspots[i][0] == 'd'){
            keyspot = keyspots[i];
            return 1;
        }
    }
    return 0;
}

function findMoves(){
    keyspots = [];

    // checking rows
    count(table[0][0]);count(table[0][1]);count(table[0][2]);
    if(c1==2 && c0==1){
        keyspots.push("d0"+pushToKeyspotRow(0));
        console.log("d0"+pushToKeyspotRow(0)+" added dddddddd");
    }
    else if(c2==2 && c0==1){
        keyspots.push("s0"+pushToKeyspotRow(0));
        console.log("s0"+pushToKeyspotRow(0)+" added ssssssss");
    }
    c0 = c1 = c2 = 0;
    
    count(table[1][0]);count(table[1][1]);count(table[1][2]);
    if(c1==2 && c0==1){
        keyspots.push("d1"+pushToKeyspotRow(1));
    }
    else if(c2==2 && c0==1){
        keyspots.push("s1"+pushToKeyspotRow(1));
    }
    c0 = c1 = c2 = 0;

    count(table[2][0]);count(table[2][1]);count(table[2][2]);
    if(c1==2 && c0==1){
        keyspots.push("d2"+pushToKeyspotRow(2));
    }
    else if(c2==2 && c0==1){
        keyspots.push("s2"+pushToKeyspotRow(2));
    }
    c0 = c1 = c2 = 0;

    // checking columns
    count(table[0][0]);count(table[1][0]);count(table[2][0]);
    if(c1==2 && c0==1){
        keyspots.push("d"+pushToKeyspotCol(0)+"0");
    }
    else if(c2==2 && c0==1){
        keyspots.push("s"+pushToKeyspotCol(0)+"0");
    }
    c0 = c1 = c2 = 0;

    count(table[0][1]);count(table[1][1]);count(table[2][1]);
    if(c1==2 && c0==1){
        keyspots.push("d"+pushToKeyspotCol(1)+"1");
    }
    else if(c2==2 && c0==1){
        keyspots.push("s"+pushToKeyspotCol(1)+"1");
    }
    c0 = c1 = c2 = 0;

    count(table[0][2]);count(table[1][2]);count(table[2][2]);
    if(c1==2 && c0==1){
        keyspots.push("d"+pushToKeyspotCol(2)+"2");
    }
    else if(c2==2 && c0==1){
        keyspots.push("s"+pushToKeyspotCol(2)+"2");
    }
    c0 = c1 = c2 = 0;

    // checking diagonals
    count(table[0][0]);count(table[1][1]);count(table[2][2]);
    if(c1==2 && c0==1){
        keyspots.push("d"+pushToKeyspotDiag1()+pushToKeyspotDiag1());
    }
    else if(c2==2 && c0==1){
        keyspots.push("s"+pushToKeyspotDiag1()+pushToKeyspotDiag1());
    }
    c0 = c1 = c2 = 0;

    count(table[0][2]);count(table[1][1]);count(table[2][0]);
    if(c1==2 && c0==1){
        keyspots.push("d"+pushToKeyspotDiag2()[0]+pushToKeyspotDiag2()[1]);
    }
    else if(c2==2 && c0==1){
        keyspots.push("s"+pushToKeyspotDiag2()[0]+pushToKeyspotDiag2()[1]);
    }
    c0 = c1 = c2 = 0;
}

function randomMove(){
    neutralspots = [];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(table[i][j]==0){
                neutralspots.push("n"+i+j);
            }
        }
    }
    var random = Math.floor( Math.random() * neutralspots.length );
    neutralspot = neutralspots[random];
}
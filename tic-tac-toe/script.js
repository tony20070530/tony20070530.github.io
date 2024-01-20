// 選取所有 id 開頭等於 btnN 的元素，存到 buttons 陣列
var buttons = document.querySelectorAll('[id^="btnN"]');
var ttt = ["", "", "", "", "", "", "", "", ""];
var winLines = [
    // 橫線3條 (Horizontal Lines)
    // 請自己加勝利線的 index 陣列：直線3條、斜線/、反斜線\
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
var current = "X";
var endOrNot = new Boolean(false);
var total = 0;
    
buttons.forEach(function(abtn) {
    abtn.style.backgroundColor = '#606060';
    abtn.addEventListener('click', function() { markSpace(abtn.id) });
});

reset.addEventListener('click', function() 
{
    var i=1;

    endOrNot = false;
    current = "X";

    total = 0;

    for ( i=0; i<9; i++ ) { ttt[i] = ""; }

    btnN1.style.backgroundColor = '#606060';
    btnN2.style.backgroundColor = '#606060';
    btnN3.style.backgroundColor = '#606060';
    btnN4.style.backgroundColor = '#606060';
    btnN5.style.backgroundColor = '#606060';
    btnN6.style.backgroundColor = '#606060';
    btnN7.style.backgroundColor = '#606060';
    btnN8.style.backgroundColor = '#606060';
    btnN9.style.backgroundColor = '#606060';

    btnN1.innerText = "";
    btnN2.innerText = "";
    btnN3.innerText = "";
    btnN4.innerText = "";
    btnN5.innerText = "";
    btnN6.innerText = "";
    btnN7.innerText = "";
    btnN8.innerText = "";
    btnN9.innerText = "";

    document.getElementById("result").innerHTML = "結果";
});

function randInt(start, end) {
    return Math.floor(Math.random() * (end-start+1)) + start;
}

function markSpace(btnID) {
    var win_or_fail = new Boolean(true);
    
    if ( endOrNot==true ) { return 0; }
    
    if ( current=="X" ) {
        // 依指定的 id 取出對應的元素，任何有 id 的元素都可以這樣用
        var abtn = document.getElementById(btnID);
        // 輸出 btnID, 編號字串, 索引 indexx
        // console.log(btnID[4], parseInt(btnID[4])-1);
        // 將 index 存到 pos
        var pos = parseInt(btnID[4])-1;
        
        // console.log(abtn);
        // console.log(pos);
        
        if (ttt[pos] == "") {
            ttt[pos] = current;
            abtn.style.backgroundColor = '#cc4444';
            abtn.innerText = current;
            current = "O";
            total++;
        }
    }

    check();
    if ( endOrNot==true ) { return 0; }
    
    if ( current=="O" )
    {
        win_or_not = true;
        while (true) {
            
            if ( win_or_fail==true )
            {
                if ( approach_to_win()!=9 ) { pos = approach_to_win(); }
                else 
                {
                    if ( approach_to_fail()!=9 ) { pos = approach_to_fail(); }
                }
                win_or_fail = false;
            }
            else { pos = randInt(0, 8); }

            console.log("pos", pos);
            
            if ( ttt[pos] == "" ) {
                // 設定電腦要下的btnID
                btnID = "btnN" + (pos+1);
                abtn = document.getElementById(btnID);
                ttt[pos] = current;
                abtn.style.backgroundColor = '#57F287';
                abtn.innerText = current;
                current = "X";
                total++;
                break;
            }
        }
    }

    check ();
    // console.log(ttt);
}

function check () {
    var ri, ci;
    var winOrNot = new Boolean(true);

    for ( ri=0; ri<8; ri++ ) {
        winOrNot = true;
        
        for ( ci=1; ci<3; ci++ ) {
            if ( ttt[winLines[ri][ci]]!=ttt[winLines[ri][ci-1]] ) { winOrNot = false; break; }
        }

        if ( winOrNot==true ) {
            if ( ttt[winLines[ri][0]]=="X" ) { document.getElementById("result").innerHTML = "You win"; endOrNot = true; }
            else if ( ttt[winLines[ri][0]]=="O" ) { document.getElementById("result").innerHTML = "Computer win"; endOrNot = true; }
        }
    }

    if ( endOrNot==false )
    {
        if ( total==9 ) { document.getElementById("result").innerHTML = "It's a tie"; endOrNot = true; }
    }

    return 0;
}

function approach_to_fail()
{
    var X_total, empty;
    var empty_location;
    var ri, ci;

    for ( ri=0; ri<8; ri++ )
    {
        X_total = 0;
        empty = 0;
        for ( ci=0; ci<3; ci++ )
        {
            if ( ttt[winLines[ri][ci]]=="X" ) { X_total++; }
            else if ( ttt[winLines[ri][ci]]=="" ) { empty++; empty_location = winLines[ri][ci]; }
        }

        if ( X_total==2 && empty==1 ) { return empty_location; }
    }

    return 9;
}

function approach_to_win()
{
    var O_total, empty, empty_location;
    var ri, ci;

    for ( ri=0; ri<8; ri++ )
    {
        O_total = 0;
        empty = 0;
        for ( ci=0; ci<3; ci++ )
        {
            if ( ttt[winLines[ri][ci]]=="O" ) { O_total++; }
            else if ( ttt[winLines[ri][ci]]=="" ) { empty++; empty_location = winLines[ri][ci]; }
        }

        if ( O_total==2 && empty==1 ) { return empty_location; }
    }

    return 9;
}

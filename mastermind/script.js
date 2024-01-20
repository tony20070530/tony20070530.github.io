// ball number
let ballCodes = ['1', '2', '3', '4', '5', '6', '7', '8'];
// ball color
let colors = ['#cf339c', '#006400', '#00008b', '#f1cb02','#4b0082',
              '#ff8c00', '#a52a2a', '#008080', '#f7f7f7', '#f51707'];
// use randint to create answer (must use different color)
let answerBalls = [];
// the color is choosen by user
let selectedBalls = ['0', '0', '0', '0'];
// current locate
let currentP = 1;
// largest number of locate
let topP = 4;
// color array
let btnBS = document.querySelectorAll('[id^="btnB"]');
// You wanna choose (color array)
let btnPS = document.querySelectorAll('[id^="btnP"]');
// in turn
let turn = 0;
// finish or not
let finish = new Boolean(false);
let ballsState = ['1', '1', '1', '1', '1', '1', '1', '1'];

function randInt(start, end) {
    return Math.floor(Math.random() * (end-start+1)) + start;
}

function randShuffle(sequence) {
    let temp = '';
    let aLen = sequence.length;
    for (let i = aLen-1; i > -1; i--) {
        temp = sequence.pop();
        // remove empty items
        if (temp.trim().length != 0) {
            sequence.unshift(temp);
        }
    }
    // update length
    aLen = sequence.length;
    for (let i = 0; i < aLen; i++) {
        x = randInt(0, aLen-1);
        y = randInt(0, aLen-1);
        temp = sequence[x];
        sequence[x] = sequence[y];
        sequence[y] = temp;
    }

    console.log(sequence);
    
    return sequence;
}

// you only need four number
answerBalls = randShuffle(ballCodes);

btnBS.forEach(function(btnB) {
    btnB.addEventListener("click", function() {putBall(btnB.id)});
});

function putBall(btnID) {
    if (currentP > topP) {
        return;
    }

    let btnB = document.getElementById(btnID);
    let btnP = document.getElementById('btnP'+turn+currentP);
    let ballColor = colors[parseInt(btnID.slice(4))-1];

    if ( ballsState[parseInt(btnID.slice(4))-1]==0 ) { return; }

    ballsState[parseInt(btnID.slice(4))-1] = 0;
    btnP.style.backgroundColor = ballColor;
    selectedBalls[currentP-1] = btnID.slice(4);
    currentP++;
}

function check() {
    let btnA;
    let A = 0;
    let index = 1;
    let ballColor = colors[9];

    if ( currentP>topP && finish==false )
    {                
        for ( let i=0; i<topP; i++ )
        {
            for ( let j=0; j<topP; j++ )
            {
                if ( selectedBalls[i]==answerBalls[j] )
                {
                    if ( i==j )
                    {
                        btnA = document.getElementById('btnA'+turn+index);
                        btnA.style.backgroundColor = ballColor;
                        index++;
                        A++;
                    }
                }
            }
        }
    
        ballColor = colors[8];
        
        for ( let i=0; i<topP; i++ )
        {
            for ( let j=0; j<topP; j++ )
            {
                if ( selectedBalls[i]==answerBalls[j] )
                {
                    if ( i!=j )
                    {
                        btnA = document.getElementById('btnA'+turn+index);
                        btnA.style.backgroundColor = ballColor;
                        index++;
                    }
                }
            }
        }
    
        if ( A==4 ) { finish = true; }
        else
        {
            turn++;
            currentP = 1;
            infoContainer.innerHTML += `
                <div>
                    <div class="row">
                        <div class="col-lg-6">
                            <button type="button" id="btnP${turn}1" class="mb-2 ball ball-c0"></button>
                            <button type="button" id="btnP${turn}2" class="mb-2 ball ball-c0"></button>
                            <button type="button" id="btnP${turn}3" class="mb-2 ball ball-c0"></button>
                            <button type="button" id="btnP${turn}4" class="mb-2 ball ball-c0"></button>
                        </div>
                        <div class="col-lg-6">
                            <button id="btnA${turn}1" class="mb-2 ball-sm ball-sm-c0"></button>
                            <button id="btnA${turn}2" class="mb-2 ball-sm ball-sm-c0"></button>
                            <button id="btnA${turn}3" class="mb-2 ball-sm ball-sm-c0"></button>
                            <button id="btnA${turn}4" class="mb-2 ball-sm ball-sm-c0"></button>
                        </div>
                    </div>
                </div>`
        }

        for ( let i=0; i<8; i++ ) { ballsState[i] = 1; }
    }
}

function reset() {
    if ( finish==false )
    {
        currentP = 1;
    
        for ( var i=1; i<=topP; i++ )
        {
            btn = document.getElementById('btnP'+turn+i);
            btn.style.backgroundColor = "#707070";
        }

        for ( let i=0; i<8; i++ ) { ballsState[i] = 1; }
    }
}

function replay() {
    var answer = document.getElementById('infoContainer');
    var btnP, btnA;
    var i;

    for ( let i=0; i<8; i++ ) { ballsState[i] = 1; }
    
    finish = false;

    answer.innerHTML = '';

    for ( i=1; i<=topP; i++ )
    {
        btnP = document.getElementById('btnP0'+i);
        btnP.style.backgroundColor = "#707070";
        
        btnA = document.getElementById('btnA0'+i);
        btnA.style.backgroundColor = "#707070";
    }

    turn = 0;
    currentP = 1;
    answerBalls = randShuffle(ballCodes);
}


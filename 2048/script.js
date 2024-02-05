var integer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var largeNumber = 2;
var smallNumber = 1;
let initialOrNot = new Boolean(false);

initial();

function randint_add()
{
    return Math.floor( Math.random()*16 );
}

function randint_integer( start, end )
{
    return Math.floor( Math.random() * ( end - start + 1 ) ) + start;
}

function power( base, exponent )
{
    return Math.pow( base, exponent );
}

function powerOfTwo(number) {
    return Math.log2(number);
}

function initial()
{
    if ( initialOrNot==false )
    {
        var a = randint_add()
        var b = randint_add()
    
        while ( true )
        {
            if ( a!=b ) { break; }
    
            b = randint_add();
        }
    
        integer[a] = 2;
        integer[b] = 2;
    
        output( a );
        output( b );
    }
}

function add()
{
    var a = randint_add();
    var n = randint_integer( smallNumber, largeNumber );

    while ( true )
    {
        if ( integer[a]==0 ) { break; }

        a = randint_add();
    }

    if ( n==largeNumber ) { n = randint_integer( smallNumber, largeNumber ); }

    integer[a] = power(2, n);
    output( a );
}

function find_largeNumber()
{
    var large = 0;
    var temp;
    var i;

    for ( i=0; i<16; i++ )
    {
        temp = powerOfTwo(integer[i]);
        if ( temp>large) { large = temp; }
    }

    if ( largeNumber<large-3 ) { largeNumber = large - 3; smallNumber = largeNumber-2; }

    if ( smallNumber<1 ) { smallNumber = 1; }
}

function output( n )
{
    let str = n.toString();
    let btnP = document.getElementById('btn'+str);

    if ( integer[n]==0 ) { btnP.textContent = "" }
    else { btnP.textContent = integer[n]; }
}

up.addEventListener('click', function()
{
    var i, j, k;
    
    for ( i=0; i<4; i++ )
    {
        for ( j=i; j<12; j+=4 )
        {
            for ( k=j+4; k<16; k+=4 )
            {
                if ( integer[j]==integer[k] )
                {
                    integer[j] *= 2;
                    integer[k] = 0;
                }
                else if ( integer[k]!=0 ) { break; }
            }
        }

        for ( j=i; j<12; j+=4 )
        {
            if ( integer[j]==0 )
            {
                for ( k=j+4; k<16; k+=4 )
                {
                    if ( integer[k]!=0 )
                    {
                        integer[j] = integer[k];
                        integer[k] = 0;
                        
                        break;
                    }
                }
            }
        }
    }
    
    for ( i=0; i<16; i++ )
    {
        output( i );
    }

    add();
    find_largeNumber();
});

down.addEventListener('click', function()
{
    var i, j, k;

    for ( i=12; i<16; i++ )
    {
        for ( j=i; j>=4; j-=4 )
        {
            for ( k=j-4; k>=0; k-=4 )
            {
                if ( integer[j]==integer[k] )
                {
                    integer[j] *= 2;
                    integer[k] = 0;
                }
                else if ( integer[k]!=0 ) { break; }
            }
        }

        for ( j=i; j>=4; j-=4 )
        {
            if ( integer[j]==0 )
            {
                for ( k=j-4; k>=0; k-=4 )
                {
                    if ( integer[k]!=0 )
                    {
                        integer[j] = integer[k];
                        integer[k] = 0;

                        break;
                    }
                }
            }
        }
    }

    for ( i=0; i<16; i++ )
    {
        output( i );
    }

    add();
    find_largeNumber();
});

left.addEventListener('click', function()
{
    var i, j, k;

    for ( i=0; i<16; i+=4 )
    {
        for ( j=i; j<i+3; j++ )
        {
            for ( k=j+1; k<i+4; k++ )
            {
                if ( integer[j]==integer[k] )
                {
                    integer[j] *= 2;
                    integer[k] = 0;
                }
                else if ( integer[k]!=0 ) { break; }
            }
        }

        for ( j=i; j<i+3; j++ )
        {
            if ( integer[j]==0 )
            {
                for ( k=j+1; k<i+4; k++ )
                {
                    if ( integer[k]!=0 )
                    {
                        integer[j] = integer[k];
                        integer[k] = 0;

                        break;
                    }
                }
            }
        }
    }

    for ( i=0; i<16; i++ )
    {
        output( i );
    }

    add();
    find_largeNumber();
});

right.addEventListener('click', function()
{
    var i, j, k;

    for ( i=3; i<16; i+=4 )
    {
        for ( j=i; j>i-3; j-- )
        {
            for ( k=j-1; k>i-4; k-- )
            {
                if ( integer[j]==integer[k] )
                {
                    integer[j] *= 2;
                    integer[k] = 0;
                }
                else if ( integer[k]!=0 ) { break; }
            }
        }

        for ( j=i; j>i-3; j-- )
        {
            if ( integer[j]==0 )
            {
                for ( k=j-1; k>i-4; k-- )
                {
                    if ( integer[k]!=0 )
                    {
                        integer[j] = integer[k];
                        integer[k] = 0;

                        break;
                    }
                }
            }
        }
    }

    for ( i=0; i<16; i++ )
    {
        output( i );
    }

    add();
    find_largeNumber();
});

/*
https://stackoverflow.com/questions/3129099/how-to-flip-images-horizontally-with-html5
https://code.sololearn.com/Wj7ZWBg5m2OG/?ref=app#html

Things to add
SETTINGS  ☑
-options
    ◼reverse letters
    ◼unicorn mode
    ◼color selector
    ◼character selector
    ◼speed
    ◼fade
    ◼lead color
    ◼size slider

save settings to local storage
instead of having a dimming background, dim the exact same character x amount of times and then draw a solid black one.
let the letters stay solid fo a little before fading. don't fade them immediately
*/


// geting canvas by id c
var c = document.createElement('canvas'),
ctx = c.getContext("2d"),
hue = "#fff",
size = 30,
fade = 'hsla(0,0%,0%,.10)',
bgColor= "#000",
table = [],
time = 60,
body = document.getElementsByTagName('body')[0];

c.style.display='block';
c.style.position='fixed';
c.style.top=0;
c.style.zIndex='-1';
body.insertAdjacentElement('afterbegin',c);

body.style.backgroundColor=bgColor;
body.style.overflow='auto';
c.height = window.innerHeight;//making the canvas full screen
c.width = window.innerWidth;



/*CHARACTER SETS*/
var charSets = [
//"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&():",
//"10",
//"日一大年中会人本月長国出上十生子分東三行同今高金時手見市力米自前円合立内二事社者地京間田体学下目五後新明方部女八心四民対主正代言九小思七山実入回場野開万全定家北六問話文動度県水氏和政保表相党",
//"ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",
"アイウエオカキクケサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲコ"
]
var matrix = charSets[Math.floor( Math.random() * charSets.length )]
matrix = matrix.split(""); //converting the string into an array of single characters


//an array of drop - one per column
var drop = [];  //which drop across the screen (x-axis)
for(var x = 0; x < c.width/size; x++){
    drop[x] = c.height; //initial vertical start position (set to 0 for 'curtain' start)
    table[x]=[];
    for(var y=0;y<c.height/size;y++){
        table[x][y]='';
    }
}

//drawing the characters
var n=0;
function draw()
{        
    //hue=`hsla(${n++},100%, 50%,1)`;
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = size + "px arial"; //set size and font

    //looping over drop
    for( var i = 0; i < drop.length; i++ ){
                
    //hue=`hsla(${n++},100%, 50%,1)`;
        //hue=`hsla(${Math.floor( Math.random() * 360 )},100%, 50%,1)`;  //activate unicorn mode
        var y = drop[i];
        var char = matrix[ Math.floor( Math.random() * matrix.length ) ]; //random character

        if(table[i][y] !== undefined){
            ctx.font = `bold ${size}px arial`; //set size and font
            ctx.fillStyle=bgColor
            ctx.fillText(table[i][y], (i)*(size), y*(size)); //used to 'erase' letters as a drop comes down on them
            ctx.font = size + "px arial"; //set size and font
        }
        //ctx.shadowColor =hue;
        ctx.shadowBlur = 50;
        ctx.fillStyle = "#fff"; //white
        ctx.fillText(char, (i)*size, (drop[i])*size); //first drop is white

        
//prevents characters from being added to array if they were to be off screen anyway
        if(y<=Math.ceil(c.height/size)){
            table[i][y]=char;
        }
        //ctx.shadowColor=hue;
        ctx.fillStyle = hue; //chosen color
        ctx.fillText(table[i][y-1], (i)*size, (y-1)*size); //will be the same character as the white character before it

        ctx.shadowColor="transparent";
        //randomly drops rain after it crosses bottom of screen
        if( drop[i] * size > c.height && Math.random() > 0.975 ){
            drop[i] = 0;
        }else{
            //moves drop down
            drop[i]++;
        }
    }
    if(Math.random()>0){
        glitch();
    }
}
function glitch(){
    ctx.font = `bold ${size}px arial`; //set size and font
        //grab random coordinates
        var glitchX = Math.floor( Math.random() * table.length ),
            glitchY = Math.floor( Math.random() * table[0].length );
        //erase current character
            ctx.fillStyle=bgColor;
            ctx.fillText(table[glitchX][glitchY], glitchX*size, glitchY*size); //used to 'erase' letters as a drop comes down on them
        //replace table with random character
            table[glitchX][glitchY]= matrix[ Math.floor( Math.random() * matrix.length ) ];
            
    ctx.font = size + "px arial"; //set size and font
        //print that character over the same location
            ctx.fillStyle=hue;
            ctx.fillText(table[glitchX][glitchY], glitchX*size, glitchY*size);
    }


setInterval( draw, time );
//setInterval( glitch, 30 );

window.addEventListener('click',changeColor);
window.addEventListener('keypress',changeColor);

function changeColor(){
    hue=`hsla(${Math.floor( Math.random() * 360 )},100%, 50%,1)`;
    //console.clear();
    //console.log(table);
}
//Create the navigation elements
var nav = document.createElement('nav')
,   navUl = document.createElement('ul')

var links = [
{link:"https://bigmikesexp.github.io/Shitsngigs/phil/indexPhil.html", text:"Home"},
{link:"https://bigmikesexp.github.io/Shitsngigs/phil/google-homepage/index.html",text:"01:Google Home Page"},
{link:"#",text:"02:Second Project"},
{link:"#",text:"03:Third Project"}
]

nav.prepend(navUl);

document.getElementsByTagName('body')[0].prepend(nav);

function startNav(){
    for(var i=0;i<links.length;i++){
        document.getElementsByTagName('ul')[0].appendChild(document.createElement('li'));
        document.getElementsByTagName('li')[i].innerText = links[i].text;
        document.getElementsByTagName('li')[i].addEventListener('click', loadLink);
    }

    function loadLink(){
        var index = Array.prototype.indexOf.call(this.parentNode.children, this);
        window.open(links[index].link, "_self")
    }
}

startNav();

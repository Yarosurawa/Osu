const circles = document.getElementsByClassName('circles');
const outerCircles = document.getElementsByClassName('outerCircle');
const btn = document.getElementById('btn');
const fullscreen = document.getElementById('fullscreen');
const unfullscreen = document.getElementById('unfullscreen');
const body = document.querySelector('body');
let fullAccess = true;
let unFullAccess = false;
let AR = 5;
let hardness = 6;

fullscreen.onclick = function() {
    if (fullAccess) {
        unfullscreen.style.display = 'block';
        fullscreen.style.display = 'none';
        fullAccess = false;
        unFullAccess = true;
        if (body.requestFullscreen) {
        body.requestFullscreen();
        } 
    }
}

unfullscreen.onclick = function() {
    if (unFullAccess) {
        fullscreen.style.display = 'block';
        unfullscreen.style.display = 'none';
        fullAccess = true;
        unFullAccess = false;
        document.exitFullscreen()
    }
}

function render(i){
    setTimeout(function(){
        circles[i - 1].style.opacity = 0;
        circles[i - 1].style.display = "block";
        circles[i - 1].style.transition = "opacity " + AR / 10 +"s ease-in-out";
        outerCircles[i - 1].style.transition = 'transform ' + AR / 10 + "s linear"
        setTimeout(()=>{
            accessable = true;
            circles[i - 1].style.opacity = 1;
            outerCircles[i - 1].style.transform = 'scale(0.5)';
        }, (94000 - (i * 1000)) * (hardness / 10))
    }, 0)

    function act() {
        if (circles[i - 1].style.opacity > 0) {
            circles[i - 1].style.opacity = 0;
            circles[i - 1].style.transition = 'opacity ' + 0.1 + "s linear";
            outerCircles[i - 1].style.transition = 'transform ' + 0.1 + "s ease-in-out";
            outerCircles[i - 1].style.transform = 'scale(1.01)';
        }
    }

    circles[i - 1].onclick = function () {
        act()
    }

    function keyaction(e) {
        if (e.charCode == 122 || e.charCode == 120) {
            act()
        }
    }

    circles[i - 1].addEventListener("mouseover",function() {
        document.addEventListener("keypress", keyaction);
    });
    
    circles[i - 1].addEventListener("mouseout",function() {
        document.removeEventListener("keypress", keyaction, false);
    });
}

let count = 90
function callback() {requestAnimationFrame(function (){
    if(count > 86) {
        console.log(count);
    render(count)
    count--;
    callback()
    } else {
        return
    }
})}

btn.onclick = function(){
    btn.style.opacity = 0;
    callback();
};
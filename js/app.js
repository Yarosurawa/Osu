const circles = document.getElementsByClassName('circles');
const outerCircles = document.getElementsByClassName('outerCircle');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn')
const fullscreen = document.getElementById('fullscreen');
const unfullscreen = document.getElementById('unfullscreen');
const scoreh1 = document.getElementById('scoreh1');
const comboh1 = document.getElementById('comboh1');
const resultBoard = document.getElementById('resultBoard');
const resultScore = document.getElementById('resultScore');
const resultCombo = document.getElementById('resultCombo');
const body = document.querySelector('body');
let fullAccess = true;
let unFullAccess = false;
let AR = 6;
let hardness = 8;
let score = 0;
let combo = 0;

function end() {
    resultScore.textContent += score;
    resultCombo.textContent += combo;
    resultBoard.style.transform = "translateY(1200px)"
}

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
        circles[i - 1].style.zIndex = i + 2;
        circles[i - 1].style.transition = "opacity " + AR / 10 +"s ease-in-out";
        outerCircles[i - 1].style.transition = 'transform ' + AR / 10 + "s linear"
        setTimeout(()=>{
            circles[i - 1].style.left = Math.random() * 1280 + 'px'
            circles[i - 1].style.top = Math.random() * 930 + 'px'
            circles[i - 1].style.opacity = 1;
            outerCircles[i - 1].style.transform = 'scale(0.49)';
            setTimeout(()=> {
                if (circles[i - 1].style.opacity > 0) {
                    combo = 0;
                    comboh1.textContent = '';
                    circles[i - 1].style.opacity = 0;
                    circles[i - 1].style.transition = 'opacity ' + 0.1 + "s linear";
                    setTimeout(function(){circles[i - 1].parentNode.removeChild(circles[i - 1])}, 100)
                    if (i == 1) {
                        end()
                    } 
                }
            }, 1000)
        }, (94000 - (i * 1000)) * (hardness / 10))
    }, 0)

    function act() {
        if (circles[i - 1].style.opacity != 0) {
            score = score + 1;
            combo = combo + 1;
            setTimeout(() => {
                if (combo > 1) {
                    comboh1.style.opacity = 3;  
                    comboh1.textContent = combo + 'x'
                }
            })
            setTimeout( scoreh1.textContent = score, 5)
            circles[i - 1].style.opacity = 0;
            circles[i - 1].style.transition = 'opacity ' + 0.1 + "s linear";
            outerCircles[i - 1].style.transition = 'transform ' + 0.1 + "s ease-in-out";
            outerCircles[i - 1].style.transform = 'scale(1.01)';
            setTimeout(function(){circles[i - 1].parentNode.removeChild(circles[i - 1])}, 100) 
            if (i == 1) {
                end()
            } 
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
function callback() {
    scoreh1.style.display = "block";
    comboh1.style.display = "block";
    requestAnimationFrame(function (){
        if(count > 0) {
            render(count)
            count--;
            callback()
        } 
})}


restartBtn.onclick = function() {
   document.location.reload(); 
}

startBtn.onclick = function(){
    startBtn.style.opacity = 0;
    setTimeout(function(){scoreh1.style.opacity = 0.03;}, 200)  
    callback();
    setTimeout(function(){circles[i - 1].parentNode.removeChild(circles[i - 1])}, 100)   
};

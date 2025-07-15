const elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

const fullbu = document.querySelector('a#fullscreen');
fullbu.addEventListener('click',()=>{
    if (document.fullscreenElement) {
        closeFullscreen()
        fullbu.innerHTML = "フルスクリーン"
    } else {
        openFullscreen()
        fullbu.innerHTML = "フルスクリーン<br>解除"
    }

})

var bugset = false

var stop_a = false
let timeform = document.querySelector("input#timeform");

const timereset=()=>{
    stop_a = false;
    document.querySelector('span#attime').style.color='#00f';
    document.querySelector('audio').pause()
    document.querySelector('audio').currentTime=0;
}

document.querySelector('#timemain').addEventListener('click',()=>timeform.value="12:40")
document.querySelector('#timesub').addEventListener('click',()=>timeform.value="12:20")
document.querySelector('#reset').addEventListener('click',timereset)

timeform.addEventListener('change',timereset);
let now_time = setInterval(() => {
    let bug = document.querySelector('p#bug');

    let times = new Date()
    let time = `${String(times.getHours()).padStart(2, '0')}:${String(times.getMinutes()).padStart(2, '0')}:${String(times.getSeconds()).padStart(2, '0')}`;
    document.querySelector('span#nowtime').innerHTML = time;

    let now_time = new Date();
    let at_time = document.querySelector('input#timeform').value;
    let time1 = now_time.getFullYear() + "/" + (now_time.getMonth() + 1) + "/" + now_time.getDate() + " " + at_time.split(':')[0] + ":" + at_time.split(':')[1] + ":0";
    let res1 = new Date(time1);
    res1.setMinutes(res1.getMinutes());
    res1.setSeconds(res1.getSeconds()+1);
    let ifminus=false;
    let time2 = now_time.getTime() - res1.getTime();
    let res2_1 = Math.floor(time2 / (1000 * 60) * -1);
    let res2_2 = Math.floor(time2 / (1000) * -1);
    res2_1=`${res2_1}`;
    res2_2=`${res2_2}`;
    if(bugset)bug.innerHTML="a" + res2_2 + "b" + res2_1*60;
    // if(res2_1<0 && !res2_2<0){
    //     res2_1=60-res2_1
    // }
    if(res2_1<0 && res2_2<0){
        ifminus=true;
        res2_1=res2_1*(-1);
        res2_2=res2_2*(-1)+60;
        
    }
    // if(res2_2<0){
    //     res2_2=res2_1+times.getSeconds()
    // }
    
    if(bugset)bug.innerHTML+="a" + res2_2 + "b" + res2_1*60;

    let min = res2_1;
    let sec = res2_2-res2_1*60;
    

    if(bugset)bug.innerHTML+="m" + String(min).length + "s" + String(sec).length

    if(ifminus){
        document.querySelector('span#attime').style.color='#f00';
        min-=1
    }

    if(String(sec)=='60'){min+=1}
    if(String(min).length==1){min='0'+String(min)}
    if(ifminus)min='-'+min
    if(String(sec).length==1){sec='0'+String(sec)}
    if(String(sec)=='60'){sec='00'}
    
    let res3 = min + ":" + sec;
    document.querySelector('span#attime').innerHTML = res3;
    if(ifminus){
        if(!stop_a){
            document.querySelector('audio').play();
            stop_a=true
        }
    }
}, 100);
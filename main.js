const start=document.getElementById('start')
const stop=document.getElementById('stop')
const reset=document.getElementById('reset')
const minutes=document.getElementById('minutes')
const seconds=document.getElementById('seconds')
const card=document.getElementById('card')
const selectsection=document.getElementById('selectsection')
const activity=document.getElementById('activity')

let leftTime=1500;
let finalleftTime=1500;
selectsection.addEventListener('change', (event) => {
    finalleftTime = event.target.value;
    new_minutes = Math.floor(finalleftTime / 60).toString().padStart(2, "0");
    minutes.innerHTML = new_minutes;
    new_seconds =(finalleftTime % 60).toString().padStart(2, "0");
    seconds.innerHTML = new_seconds;
    leftTime = finalleftTime;
});



function updateMinutes(){
new_minutes=Math.floor(leftTime/60).toString().padStart(2,"0")
minutes.innerHTML=new_minutes
if (new_minutes<=3){
card.style.cssText=`
background-color:#ff0000b8;`
}
}
function updateSeconds(){
new_seconds=(leftTime % 60).toString().padStart(2,"0")
seconds.innerHTML=new_seconds
}

let interval=null;
function startTimer(){
    if (interval!==null)
        return
    
    else{interval=setInterval(()=>{
        leftTime--
        updateSeconds();
        updateMinutes();
        activity.innerHTML="Work"
        activity.style.color='green'
        if (leftTime==0) {
            clearInterval(interval)
            activity.innerHTML="rest"
            activity.style.color='red'
            let restTime=300
            restInterval=setInterval(()=>{
            restTime--
            new_minutes=Math.floor(restTime/60).toString().padStart(2,"0")
            minutes.innerHTML=new_minutes
           new_seconds=(restTime % 60).toString().padStart(2,"0")
            seconds.innerHTML=new_seconds
            },1000)
        }}
,1000)}
}


function stopTimer(){

    clearInterval(interval)
    activity.innerHTML="Stop"
    activity.style.color='red'
    interval=null
}
function resetTimer(){
    clearInterval(interval)
    new_minutes=Math.floor(finalleftTime/60).toString().padStart(2,"0")
    minutes.innerHTML=new_minutes
    new_seconds=(finalleftTime % 60).toString().padStart(2,"0")
    seconds.innerHTML=new_seconds
    leftTime=finalleftTime
    activity.innerHTML="- - -"
    activity.style.color='white'
}


start.addEventListener('click',startTimer)
stop.addEventListener("click",stopTimer)
reset.addEventListener("click",resetTimer)

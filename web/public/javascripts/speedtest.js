let imageAddr = 'https://tvga.ml/images/pt-flag.jpg';
imageAddr += '?n='+Math.random();
let startTime, endTime;
let downloadSize = 1175190;
let download = new Image();
download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
}
startTime = (new Date()).getTime();
download.src = imageAddr;

function showResults() {
    let duration = (endTime - startTime) / 1000; //Math.round()
    let bitsLoaded = downloadSize * 8;
    let speedBps = (bitsLoaded / duration).toFixed(2);
    let speedKbps = (speedBps / 1024).toFixed(2);
    let speedMbps = (speedKbps / 1024).toFixed(2);

    console.log(speedMbps);
    

    // if(speedMbps<1){
    // //LOAD_SMALL_VIDEO
    // }

    // else if(speedMbps<2){
    // //LOAD_MEDIUM_VIDEO
    // }

    // else {
    // //LOAD_LARGE_VIDEO
    // }

}
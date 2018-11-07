var imageAddr = "IMAGE_URL_HERE";
imageAddr += "?n="+Math.random();
var startTime, endTime;
var downloadSize = SIZE_OF_IMAGE_IN_BYTES;
var download = new Image();
download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
}
startTime = (new Date()).getTime();
download.src = imageAddr;

function showResults() {
    var duration = (endTime - startTime) / 1000; //Math.round()
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);

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
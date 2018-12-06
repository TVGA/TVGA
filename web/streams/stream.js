const nrc = require('node-run-cmd');
let canais = require('../../python/canais.json');
let hash = require('../../python/streamPath.json');
var ffmpeg = require('fluent-ffmpeg');

if(!hash) {
    hash = 'stream';
}

let grupo =grab('--grupo');
let canal = grab('--canal');
let username = grab('--username');
let password = grab('--password')


if(grupo && canal && username && password) {
    var streams = canais[grupo][canal]['id'];

    var dict = {};

    for (let i = 0; i < streams.length; i++) {
        const id = streams[i];
        
        ffmpeg.ffprobe('http://bestbuyiptv.link:6969/live/' + username + '/' + password + '/' + id + '.ts',function(err, metadata) {
            var videoQuality = 0;

            try {
                videoQuality = metadata['streams'][0]['height'];
                var checkAudio = metadata['streams'][1]['channel_layout'];
                var checkVideoProfile = metadata['streams'][0]['profile'];

                if(checkVideoProfile != 'High') {
                    videoQuality = videoQuality + 1;
                }

                if(checkAudio == 'unknown') {
                    videoQuality = 0;
                }
            } catch(e) {
                console.log('Stream Metadata Error')
            }

            dict[id] = videoQuality
        });
    }

    var checkDict = setInterval(function(){
        if(Object.keys(dict).length == streams.length) {
            clearInterval(checkDict);
            let stream = Object.keys(dict).reduce((a, b) => dict[a] >= dict[b] ? a : b);
            let url = 'http://bestbuyiptv.link:6969/live/' + username + '/' + password + '/' + stream + '.ts';

            let command = 'ffmpeg -i ' + url + ' -c:v copy -hls_time 10 -hls_list_size 5 -hls_flags delete_segments -f hls ../web/public/' + hash + '/' + canal + '.m3u8';

            let dataCallback = function(data) {
                console.log(data);
            };

            let options = { onData: dataCallback, verbose: true };

            nrc.run(command, options);
        }
    }, 325)
} else {
    console.log('Erro');
}

function grab(flag) {
    let index = process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}
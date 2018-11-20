const nrc = require('node-run-cmd');
let canais = require('../../python/canais.json');
let hash = require('../../python/hash.json');

function grab(flag) {
    let index = process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}

let grupo =grab('--grupo');
let canal = grab('--canal');
let username = grab('--username');
let password = grab('--password')

if(grupo && canal && username && password) {
    let url = 'http://bestbuyiptv.link:6969/live/' + username + '/' + password + '/' + canais[grupo][canal]['id'] + '.ts';

    let command = 'ffmpeg -i ' + url + ' -c:v copy -hls_time 3 -hls_list_size 3 -hls_flags delete_segments -f hls /home/tvga/tvga/web/public/stream-' + hash[0] + '/' + canal + '.m3u8';

    let dataCallback = function(data) {
        console.log(data);
    };

    let options = { onData: dataCallback, verbose: true };

    nrc.run(command, options);
} else {
    console.log('Erro');
}
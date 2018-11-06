const nrc = require('node-run-cmd');

function grab(flag) {
    let index = process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}

let canal = grab('--canal');

let canais = {
    'sporttv1' : 160,
    'elevensports1': 29089
}

if(canal) {
    console.log(canal);

    let username = 'imthe.bestfcktherest@gmail.com';
    let password = 'MJDXEhnNrq';

    let url = 'http://bestbuyiptv.link:6969/live/' + username + '/' + password + '/' + canais[canal] + '.ts';

    let command = 'ffmpeg -i ' + url + ' -c:v copy -hls_time 2 -hls_list_size 2 -hls_flags delete_segments -f hls ../public/stream/' + canal + '.m3u8';

    let dataCallback = function(data) {
        console.log(data);
    };

    let options = { onData: dataCallback, verbose: true };

    nrc.run(command, options);
} else {
    console.log('Erro: Nenhum canal especificado.');
}
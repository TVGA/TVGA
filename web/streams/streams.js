const nrc = require('node-run-cmd');

let streamLogin = require('./streamLogin.json');

let canais = [
    {
        'id': '7049',
        'nome': 'sporttv1'
    },
    {
        'id': '29089',
        'nome': 'elevensports1'
    }
]

let commands = []

Object.keys(streamLogin).forEach(key => {
    let login = streamLogin[key];

    let username = login.username;
    let password = login.password;

    let url = 'http://bestbuyiptv.link:6969/live/' + username + '/' + password + '/' + canais[key].id + '.ts';

    let command = 'ffmpeg -i ' + url + ' -c:v copy -hls_time 2 -hls_list_size 2 -hls_flags delete_segments -f hls ../public/stream/' + canais[key].nome + '.m3u8';

    commands.push(command);
});

let dataCallback = function(data) {
    console.log(data);
};

let options = { mode: 'parallel', onData: dataCallback, verbose: true };

nrc.run(commands, options);
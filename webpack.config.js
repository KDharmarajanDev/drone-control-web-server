const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['/devel/js/video.js', '/devel/js/visualization.js', '/devel/js/document-events.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/js')
    },
};
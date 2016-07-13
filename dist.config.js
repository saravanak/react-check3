module.exports = {
    entry: './src/index.jsx',
    output: {
        path         : __dirname + '/dist',
        library      : 'ReactCheck3',
        filename     : 'react-check3.js'
    },
    module: {
        loaders: require('./loaders.config')
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    }
}

module.exports = ({ file, options, env }) => ({
    exec: true,
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%', 'iOS >= 9', 'IE >= 9']
        },
        'precss': {}
    }
});

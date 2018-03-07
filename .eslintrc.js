module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            experimentalDecorators: true,
            jsx: true
        },
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    ecmaFeatures: {
        jsx: true
    },
    rules: {
        strict: [2, 'never'],
        'graphql/template-strings': [
            'error',
            {
                env: 'apollo',
                schemaPath: './api/schema.graphql'
            }
        ]
    },
    plugins: ['react', 'graphql']
};

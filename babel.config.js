module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ],
    env: {
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs'
            ]
        }
    }
};
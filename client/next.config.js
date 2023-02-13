// for file change detection every 300ms, next by default is not very good at detecting file changes
// This also is not 100% guranteed solution
module.exports = {
    webpack: (config) => {
        config.watchOptions.poll = 300;
        return config;
    },
};
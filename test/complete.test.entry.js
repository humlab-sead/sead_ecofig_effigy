var ctx = require.context('./', true, /\.spec\.js$/);
module.exports = ctx.keys().forEach(ctx);
module.exports = {
  apps : [{
    name   : "app",
    script : "./app.js"
  },

  {
    name: "koa-app",
    script: "./koa-app.js",
    // exec_mode: "cluster",
    // instances: 3

  }
]
}

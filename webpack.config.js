module.exports = (env) => {
  const e = env.dev ? "dev" : "prod";
  return require(`./webpack.${e}.js`)
}

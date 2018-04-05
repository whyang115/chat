module.exports = async (ctx, next) => {
  await ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "*");
  next();
};

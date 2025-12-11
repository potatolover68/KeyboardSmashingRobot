async function compareEdits(bot, fromrev, torev) {
  // im stupid, my algorithm doesn't even need diffs
  return await bot.request({
    action: 'compare',
    fromrev: fromrev,
    torev: torev,
  }).then(result => {
    return result.compare.body;
  }).catch(error => {
    console.error(error);
    return null;
  });
}

export default compareEdits;

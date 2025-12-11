async function compareEdits(bot, fromrev, torev) {
  // im stupid, my algorithm doesn't even need diffs, this function is completely useless
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

// now this function... this function is actually useful
function getFirstNLines(text, n) {
  return text.split('\n').slice(0, n).join('\n');
}

function makeTimestampLookNiceAndReadableAndNotJustAGiantStringOfNumbers(timestamp) {
  // Parse YYYYMMDDHHMMSS format
  const str = timestamp.toString();
  const year = str.substring(0, 4);
  const month = str.substring(4, 6);
  const day = str.substring(6, 8);
  const hour = str.substring(8, 10);
  const minute = str.substring(10, 12);
  const second = str.substring(12, 14);

  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  });
}


export {compareEdits, getFirstNLines, makeTimestampLookNiceAndReadableAndNotJustAGiantStringOfNumbers};
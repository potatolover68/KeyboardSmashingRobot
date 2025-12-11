function extractAFCSubmissionTemplates(body) {
  const results = [];
  const startRegex = /\{\{[Aa][Ff][Cc] submission\|/g;
  const customReasonRegex = /^\{\{[Aa][Ff][Cc] submission\|[Dd]\|reason\|/;
  let match;

  while ((match = startRegex.exec(body)) !== null) {
    const startIndex = match.index;
    let template;

    // Check if it's a custom reason template (can have nested templates)
    if (customReasonRegex.test(body.slice(startIndex))) {
      // Use brace counting for nested templates
      let braceCount = 2;
      let i = startIndex + match[0].length;

      while (i < body.length && braceCount > 0) {
        if (body[i] === '{' && body[i + 1] === '{') {
          braceCount++;
          i += 2;
        } else if (body[i] === '}' && body[i + 1] === '}') {
          braceCount--;
          i += 2;
        } else {
          i++;
        }
      }

      if (braceCount === 0) {
        template = body.slice(startIndex, i);
      }
    } else {
      // Simple case: no nested templates, find first }}
      const simpleMatch = body.slice(startIndex).match(/^\{\{[Aa][Ff][Cc] submission\|[^}]+\}\}/);
      if (simpleMatch) {
        template = simpleMatch[0];
      }
    }

    if (template) {
      results.push(template);
    }
  }

  // Sort by timestamp (highest/newest first), then append comment
  return results
    .map(template => {
      const tsMatch = template.match(/\|ts=(\d{14})\|?/);
      const timestamp = tsMatch ? parseInt(tsMatch[1], 10) : 0;
      return { template, timestamp };
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ template }) => template + '<!-- Do not remove this line! -->');
}

function extractAFCCommentTemplates(body) {
  const results = [];
  const startRegex = /\{\{[Aa][Ff][Cc] comment\|/g;
  let match;

  while ((match = startRegex.exec(body)) !== null) {
    const startIndex = match.index;
    let braceCount = 2; // We've matched {{
    let i = startIndex + match[0].length;

    // Walk through the string, counting braces
    while (i < body.length && braceCount > 0) {
      if (body[i] === '{' && body[i + 1] === '{') {
        braceCount++;
        i += 2;
      } else if (body[i] === '}' && body[i + 1] === '}') {
        braceCount--;
        i += 2;
      } else {
        i++;
      }
    }

    if (braceCount === 0) {
      results.push(body.slice(startIndex, i));
    }
  }

  return results;
}

function HandleAFCTemplateDeletion(bot, page) {
  
}

export { HandleAFCTemplateDeletion, extractAFCSubmissionTemplates, extractAFCCommentTemplates };
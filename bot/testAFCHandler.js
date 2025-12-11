import { extractAFCSubmissionTemplates, extractAFCCommentTemplates, RemoveAllAFCTemplates, appendAFCTemplatesToBody } from './AFCTemplateDeletionHandler.js';
import { getFirstNLines } from './helpers.js';

import fs from 'fs';
import path from 'path';

const devDir = 'dev';
const drafts = fs.readdirSync(devDir)
  .filter(file => file !== 'credits.txt')
  .map(file => path.join(devDir, file));

for (const draft of drafts) {
  console.log(`\n=== ${draft} ===`);
  const body = fs.readFileSync(draft, 'utf8');

  console.log('Submission templates:');
  const submissions = extractAFCSubmissionTemplates(body);
  console.log(submissions);

  console.log('\nComment templates:');
  const comments = extractAFCCommentTemplates(body);
  console.log(comments);

  console.log('\nAfter RemoveAllAFCTemplates: (first 15 lines)');
  const cleaned = RemoveAllAFCTemplates(body);
  console.log(getFirstNLines(cleaned, 50));
  console.log(`\nOriginal length: ${body.length}, Cleaned length: ${cleaned ? cleaned.length : 'undefined (no return value)'}`);

  console.log('\n--- Testing appendAFCTemplatesToBody ---');
  console.log('Re-adding templates to cleaned body...');
  const reconstructed = appendAFCTemplatesToBody(cleaned, comments, submissions);
  console.log('\nReconstructed (first 30 lines):');
  console.log(getFirstNLines(reconstructed, 30));
  console.log(`\nReconstructed length: ${reconstructed.length}`);
}
import { extractAFCSubmissionTemplates, extractAFCCommentTemplates } from './AFCTemplateDeletionHandler.js';
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
}
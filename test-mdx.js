/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Mock next-mdx-remote compiler behavior using standard require if possible
// to see if gray-matter and file reading work correctly.
try {
  const filePath = path.join(__dirname, 'content', 'react', 'react-state-management.mdx');
  console.log('Reading file:', filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log('File content read successfully.');
  
  const { data, content } = matter(fileContent);
  console.log('Frontmatter:', data);
  console.log('Content length:', content.length);
  
  console.log('Checking other MDX files...');
  ['react-performance-profiling', 'react-fiber-architecture', 'react-server-components', 'react-security-testing', 'react-interview-cracking'].forEach(slug => {
    const fPath = path.join(__dirname, 'content', 'react', `${slug}.mdx`);
    const fContent = fs.readFileSync(fPath, 'utf-8');
    const parsed = matter(fContent);
    console.log(`- ${slug}: Parsed frontmatter:`, parsed.data.title);
  });

  console.log('All files parsed successfully with gray-matter.');
} catch (err) {
  console.error('Error during parsing:', err);
}

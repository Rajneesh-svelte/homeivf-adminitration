const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  // Remove dark: variants that are redundant or clash
  { regex: /dark:bg-black\/[0-9]+/g, replacement: '' },
  { regex: /dark:bg-gray-[0-9]+\/[0-9]+/g, replacement: '' },
  { regex: /dark:bg-gray-[0-9]+/g, replacement: '' },
  { regex: /dark:text-white/g, replacement: '' },
  { regex: /dark:text-gray-[0-9]+/g, replacement: '' },
  { regex: /dark:border-gray-[0-9]+/g, replacement: '' },
  { regex: /dark:border-white\/[0-9]+/g, replacement: '' },
  { regex: /dark:bg-sidebar/g, replacement: '' },
  
  // Replace hardcoded slate/gray with theme variables
  { regex: /bg-white/g, replacement: 'bg-card' },
  { regex: /bg-gray-50/g, replacement: 'bg-background' },
  { regex: /bg-slate-50/g, replacement: 'bg-background' },
  { regex: /bg-slate-100/g, replacement: 'bg-background' },
  
  { regex: /text-gray-900/g, replacement: 'text-foreground' },
  { regex: /text-slate-900/g, replacement: 'text-foreground' },
  { regex: /text-gray-800/g, replacement: 'text-foreground' },
  { regex: /text-slate-800/g, replacement: 'text-foreground' },
  
  { regex: /border-gray-200/g, replacement: 'border-border' },
  { regex: /border-slate-200/g, replacement: 'border-border' },
  { regex: /border-gray-100/g, replacement: 'border-border' },
  { regex: /border-slate-100/g, replacement: 'border-border' },
];

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(({regex, replacement}) => {
      content = content.replace(regex, replacement);
    });
    
    // Clean up multiple spaces left by replacing with empty string
    content = content.replace(/\s+/g, ' ');
    
    if (content !== original) {
      // Just do basic string replacement for now without ruining formatting completely
      // To keep formatting, let's use a simpler approach on the original string
      let formatted = original;
      replacements.forEach(({regex, replacement}) => {
        formatted = formatted.replace(regex, replacement);
      });
      // clean double spaces inside classNames
      formatted = formatted.replace(/className="([^"]+)"/g, (match, p1) => {
          return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
      });

      fs.writeFileSync(filePath, formatted, 'utf8');
      console.log('Updated', filePath);
    }
  }
});

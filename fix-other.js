const fs = require('fs');

const files = [
  'src/components/layout/Sidebar.tsx',
  'src/components/layout/Header.tsx',
  'src/app/(dashboard)/layout.tsx'
];

const replacements = [
  { regex: /text-slate-700/g, replacement: 'text-foreground/90' },
  { regex: /text-slate-600/g, replacement: 'text-foreground/80' },
  { regex: /text-slate-500/g, replacement: 'text-foreground/60' },
  { regex: /text-slate-400/g, replacement: 'text-foreground/50' },
  { regex: /text-slate-800/g, replacement: 'text-foreground' },
  { regex: /text-slate-900/g, replacement: 'text-foreground' },
  { regex: /text-gray-700/g, replacement: 'text-foreground/90' },
  { regex: /text-gray-600/g, replacement: 'text-foreground/80' },
  { regex: /text-gray-500/g, replacement: 'text-foreground/60' },
  { regex: /text-gray-400/g, replacement: 'text-foreground/50' },
];

files.forEach(file => {
  if(fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(({regex, replacement}) => {
      content = content.replace(regex, replacement);
    });
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Fixed other layout files');

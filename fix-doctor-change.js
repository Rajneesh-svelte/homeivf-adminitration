const fs = require('fs');

let content = fs.readFileSync('src/components/DoctorChange.tsx', 'utf8');

const replacements = [
  { regex: /text-slate-700/g, replacement: 'text-foreground/90' },
  { regex: /text-slate-600/g, replacement: 'text-foreground/80' },
  { regex: /text-slate-500/g, replacement: 'text-foreground/60' },
  { regex: /text-slate-400/g, replacement: 'text-foreground/50' },
  { regex: /text-slate-800/g, replacement: 'text-foreground' },
  { regex: /text-slate-900/g, replacement: 'text-foreground' },
  { regex: /hover:bg-primary-100/g, replacement: 'hover:bg-primary-50 dark:hover:bg-primary-900/20' },
];

replacements.forEach(({regex, replacement}) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync('src/components/DoctorChange.tsx', content, 'utf8');
console.log('Fixed DoctorChange.tsx');

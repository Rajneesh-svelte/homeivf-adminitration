const fs = require('fs');
let content = fs.readFileSync('src/components/DoctorChange.tsx', 'utf8');

const replacements = [
  { regex: /bg-emerald-50 text-emerald-700 border-emerald-200/g, replacement: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
  { regex: /bg-rose-50 text-rose-700 border-rose-200/g, replacement: 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20' },
  { regex: /bg-amber-50 text-amber-700 border-amber-200/g, replacement: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' },
  
  // Action buttons
  { regex: /bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700/g, replacement: 'bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400' },
  { regex: /bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600/g, replacement: 'bg-rose-50 dark:bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400' },
  
  // Hover states for action buttons
  { regex: /hover:bg-emerald-100 hover:text-emerald-800/g, replacement: 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-800 dark:hover:text-emerald-300' },
  { regex: /hover:bg-rose-100 hover:text-rose-700/g, replacement: 'hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-700 dark:hover:text-rose-300' },
  
  // Primary 50/100 colored boxes
  { regex: /bg-primary-50/g, replacement: 'bg-primary-50 dark:bg-primary-900/20' },
  { regex: /bg-primary-100/g, replacement: 'bg-primary-100 dark:bg-primary-900/40' },
  { regex: /border-primary-100/g, replacement: 'border-primary-100 dark:border-primary-800' },
  { regex: /border-primary-200/g, replacement: 'border-primary-200 dark:border-primary-800/50' },
  { regex: /text-primary-800/g, replacement: 'text-primary-800 dark:text-primary-300' },
  { regex: /text-primary-700/g, replacement: 'text-primary-700 dark:text-primary-400' },
  
  // Leftover white
  { regex: /to-white/g, replacement: 'to-card' },
  { regex: /ring-white/g, replacement: 'ring-card' },
  
  // Specific pink section
  { regex: /bg-\[\#f4d7f34d\]/g, replacement: 'bg-[#f4d7f34d] dark:bg-pink-900/20' },
  { regex: /border-\[\#f8d3f6\]/g, replacement: 'border-[#f8d3f6] dark:border-pink-800/30' },
  
  // Modal background fixes
  { regex: /bg-rose-100 text-rose-600/g, replacement: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
  { regex: /border-rose-200\/50/g, replacement: 'border-rose-200/50 dark:border-rose-800/50' },
];

replacements.forEach(({regex, replacement}) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync('src/components/DoctorChange.tsx', content, 'utf8');
console.log('Fixed more colors');

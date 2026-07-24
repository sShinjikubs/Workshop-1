const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const mdPath = path.join(__dirname, 'UAT_Test_Cases.md');
const htmlPath = path.join(__dirname, 'UAT_Test_Cases.html');
const pdfPath = path.join(__dirname, 'UAT_Test_Cases.pdf');

const mdContent = fs.readFileSync(mdPath, 'utf8');

function mdToHtml(md) {
  let html = md;
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  let resultLines = [];

  for (let line of lines) {
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (line.includes('---')) continue;
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHtml = '<table><thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      } else {
        tableHtml += '<tr>' + cells.map(c => {
          if (c.includes('PASS')) return `<td><span class="badge pass">PASS</span></td>`;
          if (c.includes('FAIL')) return `<td><span class="badge fail">FAIL</span></td>`;
          return `<td>${c}</td>`;
        }).join('') + '</tr>';
      }
    } else {
      if (inTable) {
        inTable = false;
        tableHtml += '</tbody></table>';
        resultLines.push(tableHtml);
        tableHtml = '';
      }
      resultLines.push(line);
    }
  }
  if (inTable) {
    tableHtml += '</tbody></table>';
    resultLines.push(tableHtml);
  }

  html = resultLines.join('\n').replace(/<br\s*\/?>/gi, '<br>');
  return html;
}

const bodyContent = mdToHtml(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>UAT Test Cases Report - AudioMart</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');
  @page { size: A4; margin: 15mm; }
  body {
    font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.5; color: #1e293b; background: #ffffff; padding: 0; margin: 0;
  }
  h1 { color: #0f172a; font-size: 20px; border-bottom: 3px solid #0284c7; padding-bottom: 8px; margin-top: 0; }
  h2 { color: #1e293b; font-size: 16px; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 5px; margin-top: 24px; }
  h3 { color: #334155; font-size: 14px; margin-top: 16px; }
  p, li { font-size: 12px; }
  table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 11px; page-break-inside: avoid; }
  th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: left; vertical-align: top; }
  th { background-color: #f1f5f9; color: #0f172a; font-weight: 700; }
  tr:nth-child(even) { background-color: #f8fafc; }
  code { background-color: #f1f5f9; color: #0f172a; padding: 1px 5px; border-radius: 4px; font-family: 'Consolas', 'Courier New', monospace; font-size: 11px; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-weight: bold; font-size: 10px; text-align: center; }
  .badge.pass { background-color: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
  .badge.fail { background-color: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
</style>
</head>
<body>
${bodyContent}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml, 'utf8');
const edgePath = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const cmd = `${edgePath} --headless --disable-gpu --print-to-pdf="${pdfPath}" "${htmlPath}"`;

try {
  execSync(cmd);
  console.log('Re-generated AudioMart UAT_Test_Cases.pdf successfully!');
} catch (err) {
  console.error('Edge print error:', err.message);
}

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageOrientation, BorderStyle, LevelFormat, convertInchesToTwip, Footer,
  PageNumber, ExternalHyperlink, Table, TableRow, TableCell, WidthType, ShadingType,
} = require('docx');
const fs = require('fs');

const FONT = 'Calibri';
const SERIF = 'Cambria';

// ---------- helpers ----------
const P = (children, opts = {}) => new Paragraph({
  children, spacing: { after: 220, line: 312 }, ...opts,
});

// inline markdown-ish: **bold**, *italic*, `code`
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), font: FONT, size: 23, ...base }));
    const tok = m[0];
    if (tok.startsWith('**')) {
      out.push(new TextRun({ text: tok.slice(2, -2), bold: true, font: FONT, size: 23, ...base }));
    } else if (tok.startsWith('`')) {
      out.push(new TextRun({ text: tok.slice(1, -1), font: 'Consolas', size: 20, ...base }));
    } else {
      out.push(new TextRun({ text: tok.slice(1, -1), italics: true, font: FONT, size: 23, ...base }));
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), font: FONT, size: 23, ...base }));
  return out;
}

// quote runs: italic base; bold and code handled, code found even inside bold
function runsQ(text) {
  const base = { italics: true, color: '444444', font: FONT, size: 22 };
  const out = [];
  const emit = (str, extra) => {
    // split code spans out of any segment
    const re = /`[^`]+`/g; let last = 0, m;
    while ((m = re.exec(str)) !== null) {
      if (m.index > last) out.push(new TextRun({ ...base, ...extra, text: str.slice(last, m.index) }));
      out.push(new TextRun({ text: m[0].slice(1, -1), font: 'Consolas', size: 20, italics: true, color: '444444', ...(extra.bold ? { bold: true } : {}) }));
      last = m.index + m[0].length;
    }
    if (last < str.length) out.push(new TextRun({ ...base, ...extra, text: str.slice(last) }));
  };
  const reB = /\*\*[^*]+\*\*/g; let last = 0, m;
  while ((m = reB.exec(text)) !== null) {
    if (m.index > last) emit(text.slice(last, m.index), {});
    emit(m[0].slice(2, -2), { bold: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) emit(text.slice(last), {});
  return out;
}

const H1 = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: SERIF, size: 32, bold: true, color: '1a1a1a' })],
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 460, after: 220 },
});
const H2 = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: SERIF, size: 26, bold: true, color: '333333' })],
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 340, after: 180 },
});
const BULLET = (t) => new Paragraph({
  children: runs(t), numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 160, line: 312 },
});
const NUM = (t) => new Paragraph({
  children: runs(t), numbering: { reference: 'nums', level: 0 },
  spacing: { after: 160, line: 312 },
});
const QUOTE = (t) => new Paragraph({
  children: runsQ(t),
  indent: { left: convertInchesToTwip(0.4) },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: 'bbbbbb', space: 12 } },
  spacing: { before: 160, after: 200, line: 276 },
});
const RULE = () => new Paragraph({
  text: '', border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'cccccc', space: 8 } },
  spacing: { before: 240, after: 240 },
});

const children = [];
const blocks = JSON.parse(fs.readFileSync(__dirname + '/blocks.json', 'utf8'));

// ---------- title block ----------
children.push(new Paragraph({
  children: [new TextRun({ text: 'How One Coding Agent Learned from Its Own Mistakes', font: SERIF, size: 48, bold: true, color: '1a1a1a' })],
  spacing: { after: 120 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: 'A 120-day case study of capture, retrieval and memory drift', font: SERIF, size: 26, italics: true, color: '555555' })],
  spacing: { after: 80 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: 'One agent, one operator, one corpus. A hypothesis that fell, and the design that came out of it.', font: FONT, size: 21, color: '777777' })],
  spacing: { after: 260 },
}));
children.push(new Paragraph({
  children: [
    new TextRun({ text: 'Rogerio Faleiros', font: FONT, size: 22, bold: true }),
    new TextRun({ text: '   RFERP LLC   ·   August 2026', font: FONT, size: 22, color: '666666' }),
  ],
  spacing: { after: 200 },
}));
children.push(RULE());
children.push(new Paragraph({
  children: runs('**Scope, stated first rather than last.** This is a case study of a single corpus: one operator, one agent, 120 days. The corpus has commit and documentation discipline well above average, which is exactly why lessons were there to be found. Nothing here is a property of agents in general, and the design in the second half is derived from the case, not validated against an alternative. Review history: three rounds of investigation, one adversarial review of the artefact (23 Aug 2026) whose three blocking findings are corrected in the text, and three rounds of external editorial critique, each of which changed the text.', { color: '555555', italics: true }),
  spacing: { after: 320, line: 276 },
}));

const TW = 8640; // 6" em DXA
function tableFrom(rows) {
  return new Table({
    columnWidths: [2160, 6480],
    rows: rows.map((cells, ri) => new TableRow({
      children: cells.map((c, ci) => new TableCell({
        width: { size: ci === 0 ? 2160 : 6480, type: WidthType.DXA },
        shading: ci === 0 ? { type: ShadingType.CLEAR, fill: 'f2f2f2' } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({ children: runs(c), spacing: { after: 0, line: 280 } })],
      })),
    })),
  });
}

let tbl = [];
const flushTable = () => { if (tbl.length) { children.push(tableFrom(tbl)); children.push(new Paragraph({ text: '', spacing: { after: 220 } })); tbl = []; } };

for (const [kind, text] of blocks) {
  if (kind === 'TBL') { tbl.push(text.split(' || ')); continue; }
  flushTable();
  if (kind === 'H1') children.push(H1(text));
  else if (kind === 'H2') children.push(H2(text));
  else if (kind === 'Q') children.push(QUOTE(text));
  else if (kind === 'NUM') children.push(NUM(text));
  else if (kind === 'BUL') children.push(BULLET(text));
  else if (kind === 'REF') children.push(new Paragraph({
    children: runs(text), indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.35) },
    spacing: { after: 160, line: 300 },
  }));
  else children.push(P(runs(text)));
}
flushTable();

// ---------- document ----------
const doc = new Document({
  creator: 'Rogerio Faleiros',
  title: 'How an Agent Learns from Its Own Mistakes',
  description: 'A measured case, one hypothesis that fell, and the method that survived.',
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.2) } } } }] },
      { reference: 'nums', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.2) } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: '888888' })],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync(process.argv[2], b);
  console.log('written:', process.argv[2], b.length, 'bytes');
});

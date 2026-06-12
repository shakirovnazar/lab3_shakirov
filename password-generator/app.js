const el = (id)=>document.getElementById(id);
const lengthEl = el('length');
const lowerEl = el('lower');
const upperEl = el('upper');
const numbersEl = el('numbers');
const symbolsEl = el('symbols');
const output = el('output');
const generateBtn = el('generate');
const copyBtn = el('copy');

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUM = '0123456789';
const SYM = '!@#$%^&*()-_=+[]{};:,.<>?';

function generatePassword(len, opts){
  let chars = '';
  if(opts.lower) chars += LOWER;
  if(opts.upper) chars += UPPER;
  if(opts.numbers) chars += NUM;
  if(opts.symbols) chars += SYM;
  if(!chars) return '';
  let out = '';
  const cryptoObj = window.crypto || window.msCrypto;
  const arr = new Uint32Array(len);
  cryptoObj.getRandomValues(arr);
  for(let i=0;i<len;i++){
    out += chars[arr[i] % chars.length];
  }
  return out;
}

generateBtn.addEventListener('click', ()=>{
  const len = parseInt(lengthEl.value,10) || 16;
  const opts = {lower:lowerEl.checked, upper:upperEl.checked, numbers:numbersEl.checked, symbols:symbolsEl.checked};
  const pwd = generatePassword(len, opts);
  output.value = pwd;
});

copyBtn.addEventListener('click', async ()=>{
  if(!output.value) return;
  try{ await navigator.clipboard.writeText(output.value); copyBtn.textContent='Скопійовано'; setTimeout(()=>copyBtn.textContent='Копіювати',1500);}catch{ alert('Не вдалося скопіювати'); }
});

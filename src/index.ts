import express from 'express';
import { promises as fs } from 'fs';
import crypto from 'crypto';
import { obfuscate } from 'javascript-obfuscator';

const DOMAIN = 'http://localhost';
const app = express();

const renderJs = (code: string, obj: {[key: string]: string}) => {
  let str = code;
  Object.entries(obj).forEach(([key, val]) => {
    str = str.replace(new RegExp(`globalThis\\.__${key}__`, 'g'), `'${val}'`);
  });
  return str;
}

const getCode = async (path: string, obj: {[key: string]: string}) => {
  const clearCode = await fs.readFile(path, 'utf-8');
  return renderJs(clearCode, obj);
}

app.get('/', async (req, res) => {
  const randKey = crypto.randomBytes(16).toString('hex');
  const nth = Math.floor(Math.random() * 10).toString();
  const code = await getCode('./client/versions/null.js', {
    CODE: randKey,
    NTH: nth
  });
  const notReadableCode = obfuscate(code, {
    compact: true,
    domainLock: ['.margonem.pl'],
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArrayThreshold: 1
  });
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/javascript');
  res.send(notReadableCode.getObfuscatedCode());
});

app.listen(80);
console.log(`Listening on ${DOMAIN}`);

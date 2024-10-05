const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3456;

const users = [
  { id: 1, name: 'roland' },
  { id: 2, name: 'powidl' },
  { id: 3, name: 'quaxi' },
];

const roles = [
  {
    id: 1,
    name: 'rolle1',
    desc: 'rolle1 desc',
    assignments: [{ assignee: 1, reason: 'so halt11' }],
  },
  {
    id: 2,
    name: 'rolle2',
    desc: 'rolle2 desc',
    assignments: [
      { assignee: 1, reason: 'so halt21' },
      { assignee: 2, reason: 'so halt22' },
    ],
  },
  {
    id: 3,
    name: 'rolle3',
    desc: 'rolle3 desc',
    assignments: [
      { assignee: 1, reason: 'so halt31' },
      { assignee: 2, reason: 'so halt32' },
      { assignee: 3, reason: 'so halt33' },
    ],
  },
  { id: 4, name: 'rolle4', assignments: [] },
];

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});

app.get('/roles/:id', (req, res) => {
  console.log('/roles/:id');
  const roleId = Number(req.params.id);
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json(roles.filter((r) => r.id === roleId));
});

app.get('/roles', (req, res) => {
  console.log('/roles');
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json(roles);
});

app.get('/cors/roles/:id', cors(), (req, res) => {
  console.log('/cors/roles/:id');
  const roleId = Number(req.params.id);
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json(roles.filter((r) => r.id === roleId));
});

app.get('/cors/roles', cors(), (req, res) => {
  console.log('/cors/roles');
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json(roles);
});

console.log(`Listening to port ${PORT}`);
app.listen(PORT);

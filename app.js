import fetchDataUsingPuppeteer from './scripts/puppeteer-fetch.js';
import fetchDataUsingCheerio from './scripts/cheerio-fetch.js';
import express from 'express';
const app = express();

const port = 3000 || process.env.port;

app.get('/', (req, res) => res.send('Hello Fam!'));

app.get('/team/puppeteer', async (req, res) => {
  const data = await fetchDataUsingPuppeteer();
  res.send(data);
});
app.get('/team/cheerio', async (req, res) => {
  const data = await fetchDataUsingCheerio();
  res.send(data);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

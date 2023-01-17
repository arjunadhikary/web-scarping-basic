import { default as axios } from 'axios';
import chalk from 'chalk';
import ora from 'ora';

const REQUEST_COUNT = 8;
let total_time_puppeteer = [];
let total_time_cheerio = [];
axios.interceptors.request.use(
  function (config) {
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  function (error) {
    console.log(error);
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
  }
);
const checkResponseTime = async () => {
  const spinner = ora('Loading unicorns').start();
  spinner.color = 'yellow';
  spinner.text = 'Loading response and generating table';
  for (let index = 0; index < REQUEST_COUNT; index++) {
    const { duration: duration0 } = await axios(
      'http://127.0.0.1:3000/team/cheerio',
      {
        method: 'get',
      }
    );
    // console.log(`Fetch ${index + 1} time for cheerio was: ${duration0}ms`);
    total_time_cheerio.push(duration0);
    const { duration: duration1 } = await axios(
      'http://127.0.0.1:3000/team/puppeteer',
      {
        method: 'get',
      }
    );
    // console.log(`Fetch ${index + 1} time for puppeteer was: ${duration1}ms`);

    total_time_puppeteer.push(duration1);
  }

  spinner.stop();
  console.table({
    cheerio: total_time_cheerio,
    puppeteer: total_time_puppeteer,
  });
  const averageTimeCheerio =
    total_time_cheerio.reduce((a, sum) => a + sum, 0) / REQUEST_COUNT;
  const averageTimePuppeteer =
    total_time_puppeteer.reduce((a, sum) => a + sum, 0) / REQUEST_COUNT;
  console.log(
    chalk.blue(
      `Average Response time for Cheerio: ${parseInt(averageTimeCheerio)} ms`
    )
  );
  console.log(
    chalk.blue(
      `Average Response time for Cheerio: ${parseInt(averageTimePuppeteer)} ms`
    )
  );
};
checkResponseTime();

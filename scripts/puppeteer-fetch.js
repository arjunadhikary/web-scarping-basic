import puppeteer from 'puppeteer';
const fetchDataUsingPuppeteer = async () => {
  try {
    const team_member_list = [];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://codekavya.com');
    const our_team_selector =
      '#post-1256 > div > div > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-15e61d1.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > section > div > div >div';
    await page.waitForSelector(our_team_selector);
    const meet_our_team = await page.$$(our_team_selector);
    for (let index = 0; index < meet_our_team.length; index++) {
      const member = meet_our_team[index];
      const name_div = await member.$(
        'div > div > .elementor-widget-heading > div > h4'
      );
      const role_div = await member.$(
        'div > div > .elementor-widget-heading > div > p'
      );
      const name = await page.evaluate((el) => el.textContent, name_div);
      const role = await page.evaluate((el) => el.textContent, role_div);

      team_member_list.push({
        name,
        role,
      });
    }

    await browser.close();
    return team_member_list;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchDataUsingPuppeteer;

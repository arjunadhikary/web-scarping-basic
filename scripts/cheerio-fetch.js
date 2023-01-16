const { default: axios } = require('axios');
const cherrio = require('cheerio');

const fetchDataUsingCheerio = async () => {
  try {
    const team_member_list = [];

    const ck_site = await (await axios('https://codekavya.com')).data;
    const $ = cherrio.load(ck_site);
    const meet_our_team = $(
      '#post-1256 > div > div > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-15e61d1.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > section > div > div>div'
    );
    meet_our_team.each((_index, el) => {
      const name = $(el).find('h4').text();
      const role = $(el).find('p').text();
      team_member_list.push({
        name,
        role,
      });
    });
    return team_member_list;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = fetchDataUsingCheerio;

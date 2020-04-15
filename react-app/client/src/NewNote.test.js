const puppeteer = require('puppeteer');

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 500,
      height: 2400
    },
    userAgent: ''
  });
});

describe('Localization Tests', () => {
  test('h3 translates correctly', async () => {
    await page.goto('http://localhost:3000/create');
    await page.waitForSelector('h3');

    await page.select('select', 'en');

    const headerTextEn = await page.$eval('h3', e => e.innerHTML);
    expect(headerTextEn).toBe('Create new note');

    await page.select('select', 'ru');

    const headerTextRu = await page.$eval('h3', e => e.innerHTML);
    expect(headerTextRu).toBe('Создать новую запись');
  }, 16000);

  test('Save btn translates correctly', async () => {
    await page.goto('http://localhost:3000/create');
    await page.waitForSelector('button[type=submit]');

    await page.select('select', 'en');

    const btnTextEn = await page.$eval('button[type=submit]', e => e.innerHTML);
    expect(btnTextEn).toBe('Save');

    await page.select('select', 'ru');

    const btnTextRu = await page.$eval('button[type=submit]', e => e.innerHTML);
    expect(btnTextRu).toBe('Сохранить');
  }, 16000);
});

afterAll(() => {
  browser.close();
});

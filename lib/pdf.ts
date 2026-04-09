import puppeteer from 'puppeteer';

export const htmlToPdfBuffer = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    return Buffer.from(
      await page.pdf({
        format: 'A4',
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
      })
    );
  } finally {
    await browser.close();
  }
};

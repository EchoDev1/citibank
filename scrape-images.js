const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });
    await page.goto('https://online.citi.com/US/login.do', { waitUntil: 'networkidle2' });

    const imgs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.src);
    });

    console.log('--- FOUND IMAGES ---');
    imgs.forEach(src => {
        if (src.includes('jpg') || src.includes('png') || src.includes('jpeg')) {
            console.log(src);
        }
    });

    const bgImgs = await page.evaluate(() => {
        let bgs = [];
        document.querySelectorAll('*').forEach(el => {
            let bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg !== 'none' && bg.includes('url')) {
                bgs.push(bg);
            }
        });
        return bgs;
    });

    console.log('--- BACKGROUND IMAGES ---');
    bgImgs.forEach(src => console.log(src));

    await browser.close();
})().catch(err => console.error(err));

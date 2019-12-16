import * as puppeteer from 'puppeteer-core'

interface IContent {
  title: string
  link: string
  date: string
}

const scrape = async (): Promise<any> => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  })
  const page = await browser.newPage()
  await page.goto('https://saodaye.com/')

  const item = await page.$$eval('.post-item', e => {
    const itemHtml: Array<IContent> = []

    e.map(con => {
      // itemHtml[index] = con.querySelector('.entry-title a').innerHTML
      itemHtml.push({
        title: con.querySelector('.entry-title a').innerHTML,
        link: con.querySelector('.entry-title a').innerHTML,
        date: con.querySelector('.entry-date').innerHTML,
      })
    })
    // const itemHtml: Array<any> = []

    // e.map((con, index) => {
    //   itemHtml[index] = con.innerText
    // })
    return itemHtml
  })

  // const item = await page.$('.post-item')
  // const result = await page.$eval(
  //   '.post-item .entry-title a',
  //   el => el.innerText
  // )

  console.log(item)
  browser.close()
  // return result
}

scrape()

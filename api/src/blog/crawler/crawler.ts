import * as puppeteer from 'puppeteer-core'
import { IBlogContent } from '../blog'
import { data } from './data'

export const scrape = async (): Promise<IBlogContent[]> => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  })
  const page = await browser.newPage()
  const contentList = []

  for (const dataItem of data) {
    await page.goto(dataItem.url, {
      waitUntil: 'domcontentloaded',
    })

    contentList.push(
      await page.$$eval(
        dataItem.item,
        (e, dataItem) => {
          const itemHtml: Array<IBlogContent> = []

          e.map(con => {
            itemHtml.push({
              title: con.querySelector(dataItem.title).innerHTML,
              link: con.querySelector(dataItem.link).getAttribute('href'),
              date: con.querySelector(dataItem.date).innerHTML,
            })
          })
          return itemHtml
        },
        dataItem,
      ),
    )
  }

  browser.close()
  return contentList
}

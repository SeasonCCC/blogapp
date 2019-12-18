import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer-core'
import { IBlogContent, IBlogData } from './blog'
import { data } from './data'

@Injectable()
export class BlogService {
  async getLatestBlogs(): Promise<IBlogContent[][]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    })
    const page = await browser.newPage()
    const contentList: IBlogContent[][] = []

    for (const dataItem of data) {
      await page.goto(dataItem.url, {
        waitUntil: 'domcontentloaded',
      })
      contentList.push(await this.getData(page, dataItem))
    }

    browser.close()
    return contentList
  }

  async searchBlogs(s: string): Promise<IBlogContent[][]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    })
    const page = await browser.newPage()
    const contentList: IBlogContent[][] = []

    for (const dataItem of data) {
      await page.goto(dataItem.searchUrl + s, {
        waitUntil: 'domcontentloaded',
      })

      const itemElement = {
        item: dataItem.searchItem || dataItem.item,
        title: dataItem.searchTitle || dataItem.title,
        link: dataItem.searchLink || dataItem.link,
        date: dataItem.searchDate || dataItem.date,
      }

      contentList.push(await this.getData(page, itemElement))
    }

    // browser.close()
    return contentList
  }

  private async getData(
    page: puppeteer.Page,
    dataItem: IBlogData,
  ): Promise<IBlogContent[]> {
    // await page.goto(dataItem.url, {
    //   waitUntil: 'domcontentloaded',
    // })

    const content = await page.$$eval(
      dataItem.item,
      (e, dataItem) => {
        const itemHtml: IBlogContent[] = []

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
    )

    return content
  }
}

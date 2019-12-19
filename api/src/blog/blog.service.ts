import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer-core'
import { Blog } from './blog.entity'
import { IBlogContent, IBlogData } from './blog'
import { data } from './data'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class BlogService {
  @InjectRepository(Blog)
  private blogRepository: Repository<Blog>

  async getAllBlogs(): Promise<IBlogContent[]> {
    return this.blogRepository.find()
  }

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

  async searchBlogsOnline(s: string): Promise<IBlogContent[][]> {
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

      // const itemElement = {
      //    name: dataItem.name,
      //   item: dataItem.searchItem || dataItem.item,
      //   title: dataItem.searchTitle || dataItem.title,
      //   link: dataItem.searchLink || dataItem.link,
      //   date: dataItem.searchDate || dataItem.date,
      // }

      const itemElement = {
        name: dataItem.name,
        item: dataItem.item,
        title: dataItem.title,
        link: dataItem.link,
        date: dataItem.date,
      }

      contentList.push(await this.getData(page, itemElement))
    }

    browser.close()
    return contentList
  }

  async saveBlogs() {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    })
    const page = await browser.newPage()

    for (const dataItem of data) {
      for (let index = 1; index < 2; index++) {
        await page.goto(`${dataItem.url}page/${index}`, {
          waitUntil: 'domcontentloaded',
        })

        const contentList = await this.getData(page, dataItem)

        if (contentList.length === 0) {
          return false
        }

        for (const content of contentList) {
          const blog = await this.blogRepository.findOne({
            title: content.title,
            link: content.link,
          })

          if (!blog) {
            const newBlog = this.blogRepository.create(content)
            await this.blogRepository.save(newBlog)
          }
        }
      }
    }

    browser.close()
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
            source: dataItem.name,
          })
        })
        return itemHtml
      },
      dataItem,
    )

    return content
  }
}

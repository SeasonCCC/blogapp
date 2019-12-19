import { Controller, Get, Param } from '@nestjs/common'
import { IBlogContent } from './blog'
import { BlogService } from './blog.service'

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {
    this.blogService = blogService
  }

  @Get()
  getBlog(): Promise<IBlogContent[]> {
    return this.blogService.getAllBlogs()
  }

  @Get('saveBlogs')
  saveBlogs() {
    return this.blogService.saveBlogs()
  }

  @Get(':s')
  searchBlog(@Param('s') s: string) {
    return this.blogService.searchBlogsOnline(s)
  }
}

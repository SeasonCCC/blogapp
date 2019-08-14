import { createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator((data: string, req) => {
  // console.log(req.user.Promise)
  return data ? req.user && req.user[data] : req.user
})

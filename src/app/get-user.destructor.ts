// import { createParamDecorator } from '@nestjs/common';

// export const GetUser = createParamDecorator((data, req): any => {
//   console.log('user in GetUser deco: ', req.user);
//   return data ? data : req.user;
// });

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user['_doc'];
  }
);

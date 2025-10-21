import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CallBackType = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const callbackType = request.headers['x-cp-callback-type'];

    return callbackType ?? 'UNKNOWN';
  },
);

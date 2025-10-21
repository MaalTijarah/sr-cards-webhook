import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from '../interceptors';

export function Serialize(dto: any = class {}) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

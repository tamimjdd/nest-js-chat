import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class NotNullPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}

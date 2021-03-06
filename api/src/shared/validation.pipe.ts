/*
 * @Author: Season
 * @Date: 2020-04-02 10:14:20
 * @LastEditTime: 2020-04-14 11:50:12
 * @FilePath: \api\src\shared\validation.pipe.ts
 */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export default class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation Failed: No body submitted',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation Failed: ${this.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((err) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const property in err.constraints) {
          if (Object.prototype.hasOwnProperty.call(err.constraints, property)) {
            return err.constraints[property];
          }
        }
        return true;
      })
      .join(',');
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length !== 0) {
      return false;
    }
    return true;
  }
}

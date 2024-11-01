import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  getError(): string {
    throw new Error('This is a sample error message');
  }
}

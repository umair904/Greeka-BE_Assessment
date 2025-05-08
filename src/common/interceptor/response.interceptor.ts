import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          const ctx = context.switchToHttp().getResponse();
          const statusCode = ctx.statusCode;
  
          return {
            statusCode,
            message: this.getMessage(context),
            data,
          };
        }),
      );
    }
  
    private getMessage(context: ExecutionContext): string {
      const method = context.switchToHttp().getRequest().method;
      switch (method) {
        case 'POST':
          return 'Task created successfully';
        case 'GET':
          return 'Task(s) fetched successfully';
        case 'PUT':
        case 'PATCH':
          return 'Task updated successfully';
        case 'DELETE':
          return 'Task deleted successfully';
        default:
          return 'Success';
      }
    }
  }
  
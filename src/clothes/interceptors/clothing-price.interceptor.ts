import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class ClothingPriceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        map(
          result => result instanceof Array
            ? result.map(c => ({ ...c, price: c.price.toNumber() }))
            : ({ ...result, price: result.price.toNumber() })
        )
      );
  }
}
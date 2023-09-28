import { HttpStatus } from "@nestjs/common";
import {
	Injectable,
	NestInterceptor,
	CallHandler,
	ExecutionContext,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

/**
 * TODO apiSign
 */

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, API.Response<T>>
{
	intercept(
		_context: ExecutionContext,
		next: CallHandler<T & Omit<API.Response, "data">>,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	): Observable<API.Response<any>> {
		return next.handle().pipe(
			map((data) => {
				if (data?.constructor !== Object)
					return { data, msg: "请求成功", code: HttpStatus.OK };

				const { msg = "请求成功", code = HttpStatus.OK, ...re } = data;
				const newData =
					re?.["data"]?.constructor === Boolean
						? re?.["data"]
						: Object.keys(re).length
						? re
						: null;

				return { data: newData, msg, code };
			}),
		);
	}
}

import { ErrorBody } from './controllers/Errors';

enum ResultStatus {
  OK,
  ERROR,
}

export type ErrorType = ErrorBody;

export class Result<TResult> {
  constructor(
    readonly status: ResultStatus,
    readonly data?: TResult,
    readonly error?: ErrorType,
  ) {}

  public handle<A>(
    onSuccess: (res: TResult) => A,
    onError: (err: ErrorType) => A,
  ): A {
    return this.status === ResultStatus.OK
      ? onSuccess(this.data!)
      : onError({ message: this.error!.message, code: this.error!.code });
  }

  public isOk(): boolean {
    return !!this.data;
  }
}

export function ok<T>(result: T): Result<T> {
  return new Result(ResultStatus.OK, result, undefined);
}

export function error<T>(err: ErrorType): Result<T> {
  return new Result(ResultStatus.ERROR, {} as T, err);
}

export function resolver<T>(
  predicate: () => boolean,
  onOk: T,
  onErr: ErrorType,
): Result<T> {
  return predicate() ? ok(onOk) : error(onErr);
}

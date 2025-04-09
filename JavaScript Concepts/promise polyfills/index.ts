enum PromiseState {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected"
}

type PromiseResolve<T> = (value: T) => void;
type PromiseReject<T> = (reason: T) => void;
type PromiseThenCB<T> = (value: T | undefined) => void;
type PromiseCatchCB<T> = (reason: T | undefined) => void;
type PromiseFinallyCB = () => void;

type PromiseExecutor<T, K> = (resolve: PromiseResolve<T>, reject: PromiseReject<K>) => void;

class myPromise<T, K> {
  private _state: PromiseState = PromiseState.PENDING;
  private _successCBHandler: PromiseThenCB<T>[] = [];
  private _failureCBHandler: PromiseCatchCB<K>[] = [];
  private _finallyCBHandler: PromiseFinallyCB | undefined = undefined;
  private _value: T | undefined;
  private _reason: K | undefined;

  constructor(executor: PromiseExecutor<T, K>) {
    executor(this._promiseResolver.bind(this), this._promiseRejector.bind(this));
  }
  public then(handlerFn: PromiseThenCB<T>) {
    if (this._state === PromiseState.FULFILLED) {
      handlerFn(this._value);
    } else {
      this._successCBHandler.push(handlerFn);
    }
    return this;
  }
  private _promiseResolver(value: T) {
    if (this._state === PromiseState.FULFILLED) return;
    this._state = PromiseState.FULFILLED;
    this._value = value;
    this._successCBHandler.forEach((cb) => cb(value));
    if (this._finallyCBHandler) this._finallyCBHandler();
  }
  private _promiseRejector(reason: K) {
    if (this._state === PromiseState.REJECTED) return;
    this._state = PromiseState.REJECTED;
    this._reason = reason;
    this._failureCBHandler.forEach((cb) => cb(reason));
    if (this._finallyCBHandler) this._finallyCBHandler();
  }
  public catch(handlerFn: PromiseCatchCB<K>) {
    if (this._state === PromiseState.REJECTED) {
      handlerFn(this._reason);
    } else {
      this._failureCBHandler.push(handlerFn);
    }
    return this;
  }
  public finally(handlerFn: PromiseFinallyCB) {
    if (this._state !== PromiseState.PENDING) return handlerFn();
    else {
      this._finallyCBHandler = handlerFn;
    }
  }
}
function mycustomPromise() {
  return new myPromise<number, string>((resolve, reject) => {
    resolve(1);
  });
}
const p1 = mycustomPromise()
  .then((value) => {
    console.log(`Resolved ${value}`);
  })
  .catch((reason) => {
    console.log(`Rejected ${JSON.stringify(reason)}`);
  })
  .finally(() => {
    console.log("Finally");
  });

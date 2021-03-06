/**
 * @author WMXPY
 * @namespace Processor_Async
 * @description Verifier
 */

import { AsyncVerifyFunction } from "../declare";

export class AsyncDataVerifier<T extends any = any> {

    public static create<T extends any = any>(): AsyncDataVerifier<T> {

        return new AsyncDataVerifier<T>();
    }

    private _verifyFunctions: Array<AsyncVerifyFunction<T>>;

    private constructor() {

        this._verifyFunctions = [];
    }

    public get length(): number {

        return this._verifyFunctions.length;
    }

    public add(verifier: AsyncVerifyFunction<T>): this {

        this._verifyFunctions.push(verifier);
        return this;
    }

    public insert(verifier: AsyncVerifyFunction<T>): this {

        this._verifyFunctions.unshift(verifier);
        return this;
    }

    public addList(verifiers: Array<AsyncVerifyFunction<T>>): this {

        for (const verifier of verifiers) {
            this.add(verifier);
        }
        return this;
    }

    public clear(): this {

        this._verifyFunctions = [];
        return this;
    }

    public async verify(data: T): Promise<boolean> {

        for (const verifyFunction of this._verifyFunctions) {

            const verifyResult: boolean = await Promise.resolve(verifyFunction(data));
            if (!verifyResult) {
                return false;
            }
        }
        return true;
    }

    public clone(): AsyncDataVerifier<T> {

        const verifier: AsyncDataVerifier<T> = new AsyncDataVerifier<T>();
        verifier.addList(this._verifyFunctions);

        return verifier;
    }
}

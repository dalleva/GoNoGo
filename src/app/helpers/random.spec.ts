import { TestBed, inject } from '@angular/core/testing';

import { RandomnessHelper } from './random';

describe('RandomnessHelper', () => {
    const mathRandom = Math.random; //Keeps a pointer to actual Math.random
    afterEach(() => {
        Math.random = mathRandom;
    });
    it('should return an integer', () => {
        const val = RandomnessHelper.getRandomInt(0, 1);
        expect(val).toEqual(jasmine.any(Number));
    });

    it('should return the minimum value', () => {
        Math.random = () => 0;

        const val = RandomnessHelper.getRandomInt(1, 200);
        expect(val).toEqual(1);
    });

    it('should return the maximum value', () => {
        Math.random = () => 0.99999999;

        const val = RandomnessHelper.getRandomInt(1, 200);
        expect(val).toEqual(200);
    });

    it('should throw if minimum is bigger than maximum', () => {
        expect(() => RandomnessHelper.getRandomInt(2, 1)).toThrow();
    });

    it('should return a negative', () => {
        const val = RandomnessHelper.getRandomInt(-2, -1);
        expect(val).toBeLessThanOrEqual(-1);
        expect(val).toBeGreaterThanOrEqual(-2);
    });

    it('should accept floats and still return int', () => {
        Math.random = () => 0;

        const val = RandomnessHelper.getRandomInt(1.53, 2.38); //Should floor to (1, 2)
        expect(val).toEqual(1);
    });

    it('should return value if min = max', () => {
        const val = RandomnessHelper.getRandomInt(2, 2);
        expect(val).toEqual(2);
    });
});

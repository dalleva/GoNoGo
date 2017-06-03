
export class RandomnessHelper {

    // TODO: Unit test
    // returns random integer in interval [min, max]
    public static getRandomInt(min: number, max: number): number {
        if (min > max) {
            throw new RangeError('Maximum value cannot be under minimum value');
        }
        min = Math.floor(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

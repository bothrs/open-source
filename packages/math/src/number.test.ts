import { getRandomInt, toFixed } from "./number"

describe('@bothrs/math ~ Number', () => {
    it('Should correctly generate a random number', () => {
        const random1 = getRandomInt(10, 1000);
        const random2 = getRandomInt(10, 1000);
        const random3 = getRandomInt(10, 1000);

        expect(random1).not.toEqual(random2)
        expect(random1).not.toEqual(random3)
        expect(random2).not.toEqual(random3)
    })

    it('Should correctly round to a fixed amount of fraction digits', () => {
        expect(toFixed(3.1415, 2)).toEqual(3.14)
        expect(toFixed(3.998, 1)).toEqual(4)
        expect(toFixed(3.898, 1)).toEqual(3.9)
        expect(toFixed(3.9987, 3)).toEqual(3.999)
    })
})
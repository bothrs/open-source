import { toDegrees, toRadians } from "./conversion";

describe('@bothrs/math ~ Conversion', () => {
    it('Should convert degrees to radians', () => {
        expect(toRadians(0)).toEqual(0);
        expect(toRadians(45)).toEqual(0.7853981633974483);
        expect(toRadians(90)).toEqual(1.5707963267948966);
        expect(toRadians(135)).toEqual(2.356194490192345);
        expect(toRadians(180)).toEqual(Math.PI);
        expect(toRadians(225)).toEqual(3.9269908169872414);
        expect(toRadians(270)).toEqual(4.71238898038469);
    })

    it('Should convert radians to degrees', () => {
        expect(toDegrees(0)).toEqual(0);
        expect(toDegrees(0.7853981633974483)).toEqual(45);
        expect(toDegrees(1.5707963267948966)).toEqual(90);
        expect(toDegrees(2.356194490192345)).toEqual(135);
        expect(toDegrees(Math.PI)).toEqual(180);
        expect(toDegrees(3.9269908169872414)).toEqual(225);
        expect(toDegrees(4.71238898038469)).toEqual(270);
    })
})
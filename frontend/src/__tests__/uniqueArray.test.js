import uniqueArray from '../utils/uniqueArray';

describe('uniqueArray.js', () => {
    test('중복 제거 확인 number', () => {
        expect(uniqueArray([0,1,1])).toStringEqual([0,1]);
    });

    test('중복 제거 확인 string', () => {
        expect(uniqueArray(['가','나','나','다'])).toStringEqual(['가','나', '나','다']);
    });
})
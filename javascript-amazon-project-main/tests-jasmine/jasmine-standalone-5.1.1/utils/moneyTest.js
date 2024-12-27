import { formatmoney } from "../../../scripts/utils/money.js";
//console.log("Loaded successfully");
describe('test suite:testing formatmoney',()=>{
    it('converting dollars to cents',()=>{
        expect(formatmoney(2095)).toEqual('20.95');
    }),
    it('works for 0',()=>{
        expect(formatmoney(0)).toEqual('0.00');
    }),
    it('roundoff to nearest 0s',()=>{
        expect(formatmoney(2000.5)).toEqual('20.01');
    });

});

var voucher_codes = require('voucher-code-generator');

coupon = voucher_codes.generate({
    length: 8,
    count: 2,
    prefix: 'JJ111-'
});

console.log(coupon);
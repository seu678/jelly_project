var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');
//var EventSchema = require('./event').schema;

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true }, // primary key
    //userType은 유저가 donor이냐 recipient이냐를 나타내는 변수이다.
    // donor: 기부자(구매자)
    // recipient: 수혜자(받는이)
    // (미구현) seller: 펀딩 오픈사
    userType: {type: Number, required: true}, // 0: donor, 1: recipient
    name: {
        type: String,
        unique: true,
        //required: true,
        //index: true
    },  // 기부자 이름 or 닉네임
    email: {
        type: String,
        //required: true,
        unique: true,
        index: true
    }, // 기부자 이메일
    password: {
        type: String,
        //required: true
    }, // 기부자 아이디의 비밀번호
    // phoneNumber: {
    //     type: String,
    //     //required: true
    // }, // 기부자 핸드폰 번호
    // address: {
    //     type: String,
    //     //required: true
    // }, // 기부자 주소
    myProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        donateAmount: Number
    }], // 기부자가 지금까지 기부했던 기부 목록
    creditRecord: [{
        tid: {type: String, index: true},
        pgToken: {type: String},
        partnerOrderId: {type: String},
        partnerUserId: {type: String},
        itemName: {type: String},
        totalAmount: {type: Number},
        quantity: {type: Number},
        // createdAt: {}
    }], //사용자 결제 정보
    wallet: {type: Number},// 외부 지갑 사용시 // 젤리 총량
});
// 플러그인 설정
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 0, //시작 
    increment: 1 // 증가
});

// const model = mongoose.model('User', userSchema);

// export default model;
module.exports = mongoose.model('User', userSchema);



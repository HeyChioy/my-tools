// ==UserScript==
// @name         BiliBili 自动投币
// @namespace    BiliBiliAutoCoin.kyuuseiryuu
// @version      1.0
// @description  BiliBili 自动投币
// @author       KyuuSeiryuu
// @match        http://www.bilibili.com/video/av*
// @match        https://www.bilibili.com/video/av*
// @grant        GM_addStyle
// @homepage     https://github.com/HeyChioy/my-tools/tree/master/tampermonkey/BiliBiliCoin
// ==/UserScript==

(function() {
    'use strict';
    const storage = { id: 0 };
    const giveCoin = () => {
        GM_addStyle(`.coin-wrap.fade-in, .wnd-mask { display: none !important; }`);// 样式覆盖
        $('.b-icon.b-icon-a.b-icon-anim-coin').click();
        setTimeout(() => {
            $('.coin-sure.b-btn').click(); // 确认投币
        });
    };
    const formatHMS = (timeString) => {
        const arr = timeString.split(':');
        const len = arr.length;
        const hms = {
            s: +arr[len - 1] || 0,
            m: +arr[len - 2] || 0,
            h: +arr[len - 3] || 0
        };
        hms.m += parseInt(hms.s / 60, 10);
        hms.s = hms.s % 60;
        hms.h += parseInt(hms.m / 60, 10);
        hms.m = hms.m % 60;
        return hms;
    };
    const totalSeconds = (hms) => {
        return hms.h * 60 * 60 + hms.m * 60 + hms.s;
    };
    const checkTime = (totalTime, nowTime) => {
        const total = totalSeconds(formatHMS(totalTime));
        const now = totalSeconds(formatHMS(nowTime));
        return now / total > 0.3;
    };
    const startCheck = () => {
        console.info('自动投币启动');
        storage.id = setInterval(() => {
            const totalTime = $('.bilibili-player-video-time-total').text();
            const nowTime = $('.bilibili-player-video-time-now').text();
            if (checkTime(totalTime, nowTime)) {
                console.log('已投币～');
                clearInterval(storage.id);
                giveCoin();
            }
        }, 1000);
    };
    setTimeout(startCheck, 5000);
})();

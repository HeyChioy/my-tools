// ==UserScript==
// @name         BiliBili 自动投币
// @namespace    BiliBiliAutoCoin.kyuuseiryuu
// @version      1.3
// @description  BiliBili 自动投币
// @author       KyuuSeiryuu
// @match        http://www.bilibili.com/video/av*
// @match        https://www.bilibili.com/video/av*
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_download
// @homepage     https://github.com/HeyChioy/my-tools/tree/master/tampermonkey/BiliBiliCoin
// ==/UserScript==

(function() {
    'use strict';
    const storage = { id: 0 };
    const giveCoin = () => {
        GM_addStyle(`.coin-wrap.fade-in, .wnd-mask { display: none !important; }`);// 样式覆盖
        $('.block.coin').click();
        $(".v-title-line.v-coin.coin_btn").click();
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
    const completed = () => {
        const title = document.title;
        const image = 'http:' + $(".cover_image").attr('src');
        const text = '已投币，点击此处下载封面';
        const options = {
            title,
            text,
            image,
            onclick: () => {
                GM_download(image, title + image.substr(image.lastIndexOf('.')));
            }
        };
        GM_notification(options);
    };
    const startCheck = () => {
        if ($('.block.coin .t-right-top').text() === '已投币') return;
        storage.id = setInterval(() => {
            const totalTime = $('.bilibili-player-video-time-total').text();
            const nowTime = $('.bilibili-player-video-time-now').text();
            if (checkTime(totalTime, nowTime)) {
                clearInterval(storage.id);
                giveCoin();
                completed();
            }
        }, 1000);
    };
    setTimeout(startCheck, 5000);
})();


// ==UserScript==
// @name         BiliBili 自动投币
// @namespace    BiliBiliAutoCoin.kyuuseiryuu
// @version      0.1
// @description  BiliBili 自动投币
// @author       KyuuSeiryuu
// @match        http://www.bilibili.com/video/av*
// @match        https://www.bilibili.com/video/av*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const storage = { id: 0 };
    const giveCoin = () => {
        const styleSheet = `.coin-wrap.fade-in, .wnd-mask { display: none !important; }`;// 样式覆盖
        const s = document.createElement('style');
        s.innerText = styleSheet;
        document.body.appendChild(s);
        $('.b-icon.b-icon-a.b-icon-anim-coin').click();
        setTimeout(() => {
            $('.coin-sure.b-btn').click(); // 确认投币
        });
    };
    const checkTime = (totalTime, nowTime) => {
        return totalTime.split(':')[0] === nowTime.split(':')[0];
    };
    const startCheck = () => {
        console.info('当视频播放完后将自动投币');
        storage.id = setInterval(() => {
            const totalTime = $('.bilibili-player-video-time-total').text();
            const nowTime = $('.bilibili-player-video-time-now').text();
            if (checkTime(totalTime, nowTime)) {
                console.log('视频已播放完～');
                clearInterval(storage.id);
                giveCoin();
            }
        }, 1000);
    };
    setTimeout(startCheck, 5000);
})();
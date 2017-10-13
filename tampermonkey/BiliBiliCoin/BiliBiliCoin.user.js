// ==UserScript==
// @name         BiliBili 自动投币
// @namespace    BiliBiliAutoCoin.kyuuseiryuu
// @version      1.5
// @description  BiliBili 自动投币
// @author       KyuuSeiryuu
// @match        *://www.bilibili.com/video/av*
// @match        *://bangumi.bilibili.com/anime/*
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_download
// @homepage     https://github.com/HeyChioy/my-tools/tree/master/tampermonkey/BiliBiliCoin
// ==/UserScript==

(function() {
    'use strict';
    const storage = { id: 0, boot: 0, debug: false, level: 1, autoClear: true, maxLogStack: 20, maxBootTimes: 20 };
    const stack = { logStack: 0, bootTimes: 0 };
    const debug = (msg) => {
        const { debug: d, level, autoClear: a, maxLogStack: m } = storage;
        const { logStack: s } = stack;
        if (!d) return;
        const l = [console.log, console.warn][level];
        if (a && s >= m) {
            console.clear();
            stack.logStack = 0;
        }
        stack.logStack += 1;
        l('BiliBili 自动投币：' + msg);
    };
    const getCoverImage = () => {
        const src = 'http:' + $(".cover_image").attr('src');
        return {
            src,
            name: src ? document.title + src.substr(src.lastIndexOf('.')) : ''
        };
    };
    const appendCoverImageDownloadBtn = () => {
        const image = getCoverImage();
        const img = $(`<img src=${image.src} class='bili-cover-preview' width='250px' />`);
        GM_addStyle(`
            .bili-cover-preview {
                position: fixed;
                top: 10%;
                right: 10%;
                z-index: 30;
            }
        `);
        $('body').append(img);
        img.hide();
        if (!image.src || !image.name) return;
        const download = $('<div class="bgray-btn show">下载<br>封面</div>').click(() => {
            GM_download({
                url: image.src,
                name: image.name,
                saveAs: true
            });
        }).mouseover(() => {
            console.log('mouseover');
            img.show();
        }).mouseout(() => {
            console.log('mouseout');
            img.hide();
        });
        $('.bgray-btn-wrap').append(download);
    };
    const giveCoin = () => {
        debug('开始投币');
        GM_addStyle(`.coin-wrap.fade-in, .wnd-mask, .m-layer.m_layer.m-button { display: none !important; }`);// 样式覆盖
        $(".icon_btn_coin").click();
        $('.coin_btn').click();
        setTimeout(() => {
            $('.coin-sure.b-btn').click(); // 确认投币
            $('.b-btn.ok').click();
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
        if (total === 0) return false;
        return total === now || now / total > 0.3;
    };
    const completed = () => {
        debug('投币完成');
        const title = document.title;
        const image = getCoverImage();
        const text = `已投币! ${image.src && image.name ? '点击此处下载封面' : '' }`;
        const options = {
            title,
            text,
            image: image.src,
            onclick: () => GM_download({
                url: image.src,
                naem: image.name,
                saveAs: true
            })
        };
        GM_notification(options);
    };
    const startCheck = () => {
        if ($('.block.coin .t-right-top').text() === '已投币') {
            debug('该视频已投过硬币～');
            return;
        }
        debug('开始检测进度...');
        const totalTime = $('.bilibili-player-video-time-total').text();
        debug('总时长：' + totalTime);
        storage.id = setInterval(() => {
            const nowTime = $('.bilibili-player-video-time-now').text();
            debug('当前播放位置：' + nowTime);
            if (checkTime(totalTime, nowTime)) {
                clearInterval(storage.id);
                giveCoin();
                completed();
            }
        }, 1000);
    };
    const boot = () => {
        debug('---欢迎使用 BiliBili 自动投币---');
        storage.boot = setInterval(() => {
            let totalTime = $('.bilibili-player-video-time-total').text();
            const seconds = totalSeconds(formatHMS(totalTime));
            if (seconds !== 0) {
                debug('BiliBili 自动投币启动');
                clearInterval(storage.boot);
                startCheck();
                stack.bootTimes = 0;
            }
            stack.bootTimes += 1;
            if (stack.bootTimes > storage.maxBootTimes) {
                clearInterval(storage.boot);
                debug('不支持的番剧！');
            }
        }, 1000);
    };
    setTimeout(boot, 3000);
    appendCoverImageDownloadBtn();
})();


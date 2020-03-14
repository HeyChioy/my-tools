// ==UserScript==
// @name         Bilibili AD
// @namespace    http://tampermonkey.kyuuseiryuu.me/
// @version      1.0
// @description  Bilibili 隐藏广告
// @author       kyuuseiryuu
// @match        https://www.bilibili.com/
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector('#reportFirst2').remove(); // 隐藏推广
    setInterval(() => {
        document.querySelectorAll('.banner-card.b-wrap').forEach(e => {
            if (e.dataset.targetUrl) {
                console.log('发现广告！', e);
                e.remove();
            }
        });
    }, 300);
})();
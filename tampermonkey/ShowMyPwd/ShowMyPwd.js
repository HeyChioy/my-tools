// ==UserScript==
// @name         ShowMyPwd
// @namespace    http://chioy.cn/
// @version      0.1
// @description  Automatic show your password in browser console if your browser has saved your password.
// @author       KSR
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // Your code here...
    console.log("AutoShowPwd run in ", location.href);
    (function () {
        var ipt_pwd = document.querySelector("input[type='password']");
        if (!ipt_pwd) {
            return;
        }
        var btn = document.createElement('button');
        btn.innerText = "ShowPwd";
        btn.className = 'btn btn-primary';
        btn.style = "position:absolute;float:right;";
        btn.onclick = function () {
            ipt_pwd.value = prompt("Your Password", ipt_pwd.value) || ipt_pwd.value;
            return false;
        };
        ipt_pwd.parentElement.appendChild(btn);
    })();
    var id;
    id = setInterval(function () {
        try {
            var ipt_pwd = document.querySelector("input[type='password']");
            if (!!ipt_pwd && !!ipt_pwd.value) {
                console.log("Your Pwd:");
                console.log("%c" + ipt_pwd.value,"color:blue;");
                clearInterval(id);
            }
        } catch (e) {
            clearInterval(id);
            throw e;
        }
    }, 1000);
})();

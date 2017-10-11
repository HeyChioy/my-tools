// ==UserScript==
// @name         Show My Password
// @namespace    https://github.com/HeyChioy/my-tools/tree/master/tampermonkey/ShowMyPwd
// @version      0.2
// @description  Automatic show your password in browser console if your browser has saved your password.
// @author       KSR
// @include      *
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==

console.log("AutoShowPwd run in ", location.href);
(function () {
    'use strict';
    // Your code here...
    const buildBtn = (passwordInput, text = '🔒') => {
        var btn = document.createElement('div');
        btn.setAttribute('data-clipboard-text', passwordInput.value);
        btn.id = 'tampermonkey-showMyPwd';
        btn.innerText = text;
        const style = "position:absolute;right:0;" +
              "display:inline-block;" +
              "cursor:pointer;" +
              "padding:0.2em;" +
              "font-size: 2em;";
        btn.style = style;
        btn.onclick = function (envent) {
            prompt("Your Password", passwordInput.value);
            return false;
        };
        btn.onmouseover = () => {
            btn.innerText = '🔓';
            passwordInput.type = 'text';
        };
        btn.onmouseout = () => {
            btn.innerText = '🔒';
            passwordInput.type = 'password';
        };
        return btn;
    };
    const insert = (container, element) => {
        container.appendChild(element);
    };
    (function () {
        var passwordInput = document.querySelector("input[type='password']");
        if (!passwordInput) {
            return;
        }
        const btn = buildBtn(passwordInput);
        const container = passwordInput.parentElement;
        insert(container, btn);
    })();
    var id;
    id = setInterval(function () {
        try {
            var ipt_pwd = document.querySelector("input[type='password']");
            if (!!ipt_pwd && !!ipt_pwd.value) {
                console.log("Your Pwd:");
                console.log("%c" + ipt_pwd.value,"color:blue;font-size:2em;");
                clearInterval(id);
            }
        } catch (e) {
            clearInterval(id);
            throw e;
        }
    }, 1000);
})();

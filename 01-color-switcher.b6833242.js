!function(){var t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};var e=0;t.btnStart.addEventListener("click",(function(){t.btnStart.disabled="disabled",t.btnStop.removeAttribute("disabled"),e=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),500)})),t.btnStop.addEventListener("click",(function(){t.btnStop.disabled="disabled",t.btnStart.removeAttribute("disabled"),clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.b6833242.js.map

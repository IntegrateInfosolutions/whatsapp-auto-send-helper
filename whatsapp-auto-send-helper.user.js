// ==UserScript==
// @name         WhatsApp Auto Sender 2026
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically clicks send on WhatsApp Web and closes the tab.
// @match        https://web.whatsapp.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log("Tampermonkey Script Loaded on WhatsApp Web!");

    let actionTaken = false;

    let checkInterval = setInterval(function() {
        if (actionTaken) return;

        let sendButton = document.querySelector('button[aria-label="Send"]') ||
                         document.querySelector('span[data-icon="send"]')?.closest('button') ||
                         document.querySelector('footer button span[data-icon="send"]')?.closest('button');

        if (sendButton) {
            actionTaken = true;
            clearInterval(checkInterval);
            console.log("Send button found! Clicking...");

            sendButton.click();

            setTimeout(function() {
                console.log("Closing Tab...");
                window.close();
            }, 3000);
            return;
        }

        let okButton = document.querySelector('div[data-testid="popup-controls-ok"]') ||
                       document.querySelector('button[data-testid="popup-controls-ok"]') ||
                       document.querySelector('.w3-dialog button'); // Common fallback

        if (okButton) {
            actionTaken = true;
            clearInterval(checkInterval);
            console.log("Invalid Number or Error Popup Found! Clicking OK...");

            okButton.click();

            setTimeout(function() {
                window.close();
            }, 1500);
            return;
        }

    }, 2000);
})();

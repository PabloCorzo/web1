// ==UserScript==
// @name         Auto reject cookies
// @namespace    https://github.com/PabloCorzo
// @version      1.0
// @description  Automatically clicks "Reject" on cookie banners
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/*
 * QUÉ CONSIGO CON ESTE SCRIPT:
 * - Eliminar: el banner de cookies que aparece en casi todas las webs que uso
 *   (periódicos, tiendas, YouTube...) y que hay que cerrar a mano cada vez.
 * - Añadir: algo que las webs no ofrecen, recordar que SIEMPRE quiero rechazar.
 *   El script busca el botón de "Rechazar" del banner y lo pulsa solo, así que
 *   la web se queda sin cookies de seguimiento y sin el banner tapando la página.
 *
 * Cómo funciona:
 * 1. Primero prueba los botones de los gestores de cookies más usados
 *    (OneTrust, Cookiebot, Didomi), que tienen un id fijo.
 * 2. Si no, busca botones cuyo texto sea exactamente "Rechazar todo",
 *    "Reject all", etc. (texto exacto para no pulsar otros botones de la web).
 * 3. Como muchos banners se cargan tarde, un MutationObserver vigila la página
 *    durante 15 segundos y vuelve a intentarlo cada vez que cambia el DOM.
 */

(function () {
    'use strict';

    const SELECTORS = [
        '#onetrust-reject-all-handler',            // OneTrust
        '#CybotCookiebotDialogBodyButtonDecline',  // Cookiebot
        '#didomi-notice-disagree-button',          // Didomi
    ];

    const TEXTS = [
        'rechazar todo', 'rechazar todas', 'rechazar cookies', 'rechazar',
        'reject all', 'reject', 'decline', 'denegar',
    ];

    function findButton() {
        for (const sel of SELECTORS) {
            const button = document.querySelector(sel);
            if (button) return button;
        }
        const buttons = document.querySelectorAll('button, [role="button"]');
        return [...buttons].find(b => TEXTS.includes(b.textContent.trim().toLowerCase()));
    }

    function tryReject() {
        const button = findButton();
        if (!button) return false;
        button.click();
        console.log('[Auto reject cookies] Clicked:', button);
        return true;
    }

    if (tryReject()) return;

    const observer = new MutationObserver(() => {
        if (tryReject()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 15000);
})();

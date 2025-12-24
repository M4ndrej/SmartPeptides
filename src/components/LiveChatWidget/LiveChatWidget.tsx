"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __lc?: any;
    LiveChatWidget?: any;
  }
}

export function LiveChatWidget() {
  useEffect(() => {
    window.__lc = window.__lc || {};
    window.__lc.license = 19409493;
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    (function (n: Window, t: Document, c: any) {
      function i(args: any[]) {
        return e._h ? e._h.apply(null, args) : e._q.push(args);
      }
      const e: any = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function () {
          i(["on", c.call(arguments)]);
        },
        once: function () {
          i(["once", c.call(arguments)]);
        },
        off: function () {
          i(["off", c.call(arguments)]);
        },
        get: function () {
          if (!e._h)
            throw new Error(
              "[LiveChatWidget] You can't use getters before load."
            );
          return i(["get", c.call(arguments)]);
        },
        call: function () {
          i(["call", c.call(arguments)]);
        },
        init: function () {
          const s = t.createElement("script");
          s.async = true;
          s.type = "text/javascript";
          s.src = "https://cdn.livechatinc.com/tracking.js";
          t.head.appendChild(s);
        },
      };
      if (!n.__lc || !n.__lc.asyncInit) {
        e.init();
      }
      n.LiveChatWidget = n.LiveChatWidget || e;
    })(window, document, [].slice);
  }, []);

  return null;
}

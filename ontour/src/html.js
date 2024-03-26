export const html = `<html lang="en">
<head>
  <meta name="iframely" content="all">
  <meta name="robots" content="noindex">
  <meta charset="utf-8">
  <title>Boards - Mixpanel | Product Analytics</title>
  <link rel="icon" sizes="16x16"
    href="https://cdn.mxpnl.com/marketing-site/static/favicons/favicon-16x16.png"
    type="image/png">
  <link rel="icon" sizes="32x32"
    href="https://cdn.mxpnl.com/marketing-site/static/favicons/favicon-32x32.png"
    type="image/png">
  <link
    href="//cdn.mxpnl.com/static/asset-cache/3cfa161da84a748a41ca/common/iron.min.css"
    type="text/css" rel="stylesheet">
  <link
    href="//cdn.mxpnl.com/static/asset-cache/8fcb416c53dec23f70d2/reports/global-styles.min.css"
    type="text/css" rel="stylesheet">
  <link
    href="//cdn.mxpnl.com/static/asset-cache/3a6b35c9be7b08f7f25d/routes.min.css"
    type="text/css" rel="stylesheet">
  <script>
    (function() {
      const appEnv = "production";
      const productionEnv = "production";
      const stagingEnv = "staging";
    
      const getRollbarEnvFromURL = () => {
        const host = window.location.hostname;
    
        if (/^staging(-eu)?-\d+\.mixpanel\.com$/.test(host)) {
          return stagingEnv;
        }
    
        return productionEnv;
      };
    
      let _rollbarConfig = {
        accessToken: "b6e677aef7374cb9aabe14f524f7e85f",
        captureIp: "anonymize",
        captureUncaught: true,
        captureUnhandledRejections: true,
        autoInstrument: {
          errorOnContentSecurityPolicy: true,
          log: false,
        },
        maxItems: 240,
        payload: {
          environment: appEnv === productionEnv ? getRollbarEnvFromURL() : (appEnv || "development"),
          client: {
            javascript: {
              source_map_enabled: true,
              guess_uncaught_frames: true,
              code_version: "32cb0d3515f38170aa6f9399ea60aef776939c16",
            }
          },
          server: {
            root: "webpack://analytics/./",
          },
        },
        uncaughtErrorLevel: "error",
        ignoredMessages: [
          // reduce CSP noise for browser extensions
          "Security Policy Violation.*location.*-extension.*",
          "ResizeObserver loop limit exceeded",
          "ResizeObserver loop completed with undelivered notifications\."
        ]
      };
    
      // Rollbar Snippet
      !function(r){var e={};function o(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=r,o.c=e,o.d=function(r,e,n){o.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},o.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},o.t=function(r,e){if(1&e&&(r=o(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var t in r)o.d(n,t,function(e){return r[e]}.bind(null,t));return n},o.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return o.d(e,"a",e),e},o.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},o.p="",o(o.s=0)}([function(r,e,o){"use strict";var n=o(1),t=o(5);_rollbarConfig=_rollbarConfig||{},_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||"https://cdn.rollbar.com/rollbarjs/refs/tags/v2.26.1/rollbar.min.js",_rollbarConfig.async=void 0===_rollbarConfig.async||_rollbarConfig.async;var a=n.setupShim(window,_rollbarConfig),l=t(_rollbarConfig);window.rollbar=n.Rollbar,a.loadFull(window,document,!_rollbarConfig.async,_rollbarConfig,l)},function(r,e,o){"use strict";var n=o(2),t=o(3);function a(r){return function(){try{return r.apply(this,arguments)}catch(r){try{console.error("[Rollbar]: Internal error",r)}catch(r){}}}}var l=0;function i(r,e){this.options=r,this._rollbarOldOnError=null;var o=l++;this.shimId=function(){return o},"undefined"!=typeof window&&window._rollbarShims&&(window._rollbarShims[o]={handler:e,messages:[]})}var s=o(4),d=function(r,e){return new i(r,e)},c=function(r){return new s(d,r)};function u(r){return a((function(){var e=this,o=Array.prototype.slice.call(arguments,0),n={shim:e,method:r,args:o,ts:new Date};window._rollbarShims[this.shimId()].messages.push(n)}))}i.prototype.loadFull=function(r,e,o,n,t){var l=!1,i=e.createElement("script"),s=e.getElementsByTagName("script")[0],d=s.parentNode;i.crossOrigin="",i.src=n.rollbarJsUrl,o||(i.async=!0),i.onload=i.onreadystatechange=a((function(){if(!(l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)){i.onload=i.onreadystatechange=null;try{d.removeChild(i)}catch(r){}l=!0,function(){var e;if(void 0===r._rollbarDidLoad){e=new Error("rollbar.js did not load");for(var o,n,a,l,i=0;o=r._rollbarShims[i++];)for(o=o.messages||[];n=o.shift();)for(a=n.args||[],i=0;i<a.length;++i)if("function"==typeof(l=a[i])){l(e);break}}"function"==typeof t&&t(e)}()}})),d.insertBefore(i,s)},i.prototype.wrap=function(r,e,o){try{var n;if(n="function"==typeof e?e:function(){return e||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._rollbar_wrapped&&(r._rollbar_wrapped=function(){o&&"function"==typeof o&&o.apply(this,arguments);try{return r.apply(this,arguments)}catch(o){var e=o;throw e&&("string"==typeof e&&(e=new String(e)),e._rollbarContext=n()||{},e._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=e),e}},r._rollbar_wrapped._isWrap=!0,r.hasOwnProperty))for(var t in r)r.hasOwnProperty(t)&&(r._rollbar_wrapped[t]=r[t]);return r._rollbar_wrapped}catch(e){return r}};for(var p="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad".split(","),f=0;f<p.length;++f)i.prototype[p[f]]=u(p[f]);r.exports={setupShim:function(r,e){if(r){var o=e.globalAlias||"Rollbar";if("object"==typeof r[o])return r[o];r._rollbarShims={},r._rollbarWrappedError=null;var l=new c(e);return a((function(){e.captureUncaught&&(l._rollbarOldOnError=r.onerror,n.captureUncaughtExceptions(r,l,!0),e.wrapGlobalEventHandlers&&t(r,l,!0)),e.captureUnhandledRejections&&n.captureUnhandledRejections(r,l,!0);var a=e.autoInstrument;return!1!==e.enabled&&(void 0===a||!0===a||function(r){return!("object"!=typeof r||void 0!==r.page&&!r.page)}(a))&&r.addEventListener&&(r.addEventListener("load",l.captureLoad.bind(l)),r.addEventListener("DOMContentLoaded",l.captureDomContentLoaded.bind(l))),r[o]=l,l}))()}},Rollbar:c}},function(r,e,o){"use strict";function n(r,e,o,n){r._rollbarWrappedError&&(n[4]||(n[4]=r._rollbarWrappedError),n[5]||(n[5]=r._rollbarWrappedError._rollbarContext),r._rollbarWrappedError=null);var t=e.handleUncaughtException.apply(e,n);o&&o.apply(r,n),"anonymous"===t&&(e.anonymousErrorsPending+=1)}r.exports={captureUncaughtExceptions:function(r,e,o){if(r){var t;if("function"==typeof e._rollbarOldOnError)t=e._rollbarOldOnError;else if(r.onerror){for(t=r.onerror;t._rollbarOldOnError;)t=t._rollbarOldOnError;e._rollbarOldOnError=t}e.handleAnonymousErrors();var a=function(){var o=Array.prototype.slice.call(arguments,0);n(r,e,t,o)};o&&(a._rollbarOldOnError=t),r.onerror=a}},captureUnhandledRejections:function(r,e,o){if(r){"function"==typeof r._rollbarURH&&r._rollbarURH.belongsToShim&&r.removeEventListener("unhandledrejection",r._rollbarURH);var n=function(r){var o,n,t;try{o=r.reason}catch(r){o=void 0}try{n=r.promise}catch(r){n="[unhandledrejection] error getting "promise" from event"}try{t=r.detail,!o&&t&&(o=t.reason,n=t.promise)}catch(r){}o||(o="[unhandledrejection] error getting "reason" from event"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(o,n)};n.belongsToShim=o,r._rollbarURH=n,r.addEventListener("unhandledrejection",n)}}}},function(r,e,o){"use strict";function n(r,e,o){if(e.hasOwnProperty&&e.hasOwnProperty("addEventListener")){for(var n=e.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var t=function(e,o,t){n.call(this,e,r.wrap(o),t)};t._rollbarOldAdd=n,t.belongsToShim=o,e.addEventListener=t;for(var a=e.removeEventListener;a._rollbarOldRemove&&a.belongsToShim;)a=a._rollbarOldRemove;var l=function(r,e,o){a.call(this,r,e&&e._rollbar_wrapped||e,o)};l._rollbarOldRemove=a,l.belongsToShim=o,e.removeEventListener=l}}r.exports=function(r,e,o){if(r){var t,a,l="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(t=0;t<l.length;++t)r[a=l[t]]&&r[a].prototype&&n(e,r[a].prototype,o)}}},function(r,e,o){"use strict";function n(r,e){this.impl=r(e,this),this.options=e,function(r){for(var e=function(r){return function(){var e=Array.prototype.slice.call(arguments,0);if(this.impl[r])return this.impl[r].apply(this.impl,e)}},o="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad".split(","),n=0;n<o.length;n++)r[o[n]]=e(o[n])}(n.prototype)}n.prototype._swapAndProcessMessages=function(r,e){var o,n,t;for(this.impl=r(this.options);o=e.shift();)n=o.method,t=o.args,this[n]&&"function"==typeof this[n]&&("captureDomContentLoaded"===n||"captureLoad"===n?this[n].apply(this,[t[0],o.ts]):this[n].apply(this,t));return this},r.exports=n},function(r,e,o){"use strict";r.exports=function(r){return function(e){if(!e&&!window._rollbarInitialized){for(var o,n,t=(r=r||{}).globalAlias||"Rollbar",a=window.rollbar,l=function(r){return new a(r)},i=0;o=window._rollbarShims[i++];)n||(n=o.handler),o.handler._swapAndProcessMessages(l,o.messages);window[t]=n,window._rollbarInitialized=!0}}}}]);
      // End Rollbar Snippet
    
      if (!appEnv) {
        Rollbar.error("Rollbar environment not set; falling back to "development"");
      }
    })();
  </script>
  <script>MIXPANEL_CUSTOM_LIB_URL = '/libs/mixpanel.dev.min.js';</script>
  <script>
    (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
    for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.defer=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
    MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
    
    const sharedInitOpts = {
      persistence: 'localStorage',
      api_host: "${window.location.protocol}//${window.location.host}/tproxy",
      api_payload_format: 'json',
      track_pageview: true,
      ignore_dnt: true,
      error_reporter: function(msg, err) {
        if (window.Rollbar) {
          window.Rollbar.warn(msg, err);
        } else {
          console.error(msg, err);
        }
      },
      debug: false,
    };
    
    mixpanel.init("metrics-1", {
      ...sharedInitOpts,
      loaded: () => {
        // initialize GDPR functionality after main Mixpanel library is loaded
        // wait for DOMContentLoaded to ensure relevant DOM elements are ready
        if (window._gdprHasDOMContentLoaded) {
          window.gdprInit();
        } else {
          window.addEventListener('DOMContentLoaded', () => window.gdprInit(), {once: true});
        }
      },
      batch_autostart: false,
      stop_utm_persistence: true,
      track_pageview: 'url-with-path',
      record_sessions_percent: window.location.search.includes('rrwrecord=1') ? 100 : 1,
    });
    
    mixpanel.init("a97d6abb431eaf5735b8ba5688590bc2", sharedInitOpts, "infra_metrics");
    window.addEventListener('trackinfra', ({detail}) => mixpanel.infra_metrics.track(detail.eventName, detail.props));
    
    window.addEventListener('DOMContentLoaded', () => {window._gdprHasDOMContentLoaded = true}, {once: true});
    window.addEventListener('track', ({detail}) => mixpanel.track(detail.eventName, detail.props));
  </script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/e51bf3cb89c427339d23/runtime.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/01982c7f9d056e828a28/common/polyfills.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/fe7c3ab2927ff02641ed/common/node_modules.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/b9971eb98427c7dbb3ae/gdpr.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/60d9e4041bb7906c3c1c/common/iron.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/cdde3fbdc74717b54e77/reports/global-util.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/4e3daa39ed250805bbba/routes.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
  <script
    src="//cdn.mxpnl.com/static/asset-cache/2fe9584d12e221de50f6/reports/onload-init.min.js"
    type="text/javascript" crossorigin="anonymous" defer></script>
</head>
<body class="mobile-optimized new-chrome">
  <mp-browser-context-root>
    <div id="mixpanel-app-wrapper">
      <div class="mp-chrome-header-row-primary"></div>
      <div class="mp-chrome-header-row-secondary"></div>
      <div class="mp-chrome-shell-spinner"></div>
    </div>
  </mp-browser-context-root>
</body>
</html>`
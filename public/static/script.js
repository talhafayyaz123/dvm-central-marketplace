import React from "react";

const script = () => {
  var LHC_API = LHC_API || {};
  LHC_API.args = { mode: "widget", lhc_base_url: "//chat.germedusa.com/index.php/", wheight: 450, wwidth: 350, pheight: 520, pwidth: 500, domain: "https://www.dvmcentral.com/", leaveamessage: true, theme: 1, check_messages: true };
  (function () {
    var po = document.createElement("script");
    po.type = "text/javascript";
    po.setAttribute("crossorigin", "anonymous");
    po.async = true;
    var date = new Date();
    po.src = "//chat.germedusa.com/design/defaulttheme/js/widgetv2/index.js?" + ("" + date.getFullYear() + date.getMonth() + date.getDate());
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(po, s);
  })();
  return;
  //   <></>;

  //   <div>script</div>;
};

export default script;

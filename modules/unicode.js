var escapein = function (obj) {
    var s = "";
    if (obj.length == 0)
        return "";
    s = obj.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gtc;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\\/g, "&#3c;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
};
var escapeOut = function (obj) {
    var s = "";
    if (obj.length == 0)
        return "";
    s = obj.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gtc;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#3c;/g, "\\");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}
var GB2312UnicodeConverter = {
    ToUnicode: function (str) {
        str = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
        str = escapein(str)
        return str;
    }
    , ToGB2312: function (str) {
        str = escapeOut(str);
        str = unescape(str.replace(/\\u/gi, '%u'));
        return str;
    }
};
module.exports = {toUnicode:GB2312UnicodeConverter,escapein:escapein,escapeOut:escapeOut}
/**
 * Created by Wind on 2016/8/29.
 * 使用方式：
 * var tpl = $.loadTemplates('template.html');
 * var json = {str:'this is test'};
 * var templateId = 'temp1';
 * tpl.render(templateId, json)
 * .done(function(html){
 *       $('body').html(html);
 *   });
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery", "underscore"], function ($, _) {
            factory(window, $, _);
        });
    } else {
        // 全局模式
        factory(window, jQuery, _);
    }
}
(function (window, $, _) {
    "use strict";

    $.tplClassCache = {}, $.tplCache = {};
    var ENG_JSRENDER = 'jsRender',
        ENG_ARTTEMPLATE = 'artTemplate',
        ENG_UNDERSCORE = 'underscoreTemplate',

    //判定使用的是哪个模板引擎
    //暂时支持jsRender 和 artTemplate，underscore
        tplEngine = ($.views && $.views.jsviews) ? ENG_JSRENDER : window.template ? ENG_ARTTEMPLATE : _.template ? ENG_UNDERSCORE : '',

        Template = function (tplConfig, tplFileClass, templateTag, global, failCallback) {
            if (typeof(tplFileClass) == "undefined" || !tplFileClass.hasOwnProperty("tp")) {
                return;//如果tplFileClass没传参或者没有tp属性，就直接返回
            }
            var loaded = false, callbacks = $.Callbacks(), _templates = {};
            // var global = typeof(global) == 'undefined' ? true : !!global;
            var ajaxrguments = [], tplRootUrl = tplConfig.url;//模板的url
            var splitChar = ".";

            if ($.tplClassCache.hasOwnProperty(tplRootUrl + JSON.stringify(tplFileClass)) && $.tplClassCache[tplRootUrl + JSON.stringify(tplFileClass)] == null) {
                if (!!failCallback) {
                    failCallback();
                    return;
                }
            }

            var ajaxCall = function (tplFile, keyindex) {
                var parseTpl = function (html) {
                    var scripts = $(html).filter('script[type="x-html-template"]');
                    if (scripts.length > 0)
                        _templates[keyindex] = {};
                    scripts.each(function () {
                        var id = this.dataset.id;
                        if (!id) return;

                        switch (tplEngine) {
                            case ENG_UNDERSCORE:
                            {
                                _templates[keyindex][id] = _.template(this.innerHTML);
                                break;
                            }
                        }
                    });
                };
                if ($.tplCache.hasOwnProperty(tplFile) && $.tplCache[tplFile] != null) {
                    $.tplCache[tplFile].done(function (data) {
                        parseTpl(data);
                    });
                    return $.tplCache[tplFile];
                } else {
                    var call = $.ajax({
                        url: tplFile,
                        type: "GET",
                        contentType: "text/html",
                        async: true,
                        global: false,
                        success: function (data) {
                            // $.tplCache[tplFile] = data;
                            // parseTpl(data);
                            // $.tplCache[tplFile] = _templates[keyindex];
                            // callbacks.fire();
                        },
                        error: function () {
                            $.tplCache[tplFile] = null;
                            if (!!failCallback)
                                failCallback();
                        }

                    }).done(function (data) {
                        parseTpl(data);
                    });
                    $.tplCache[tplFile] = call;
                    return call;
                }
            };

            var deepIndex = 0;
            var doTpl = function (tplFileClass) {
                if (typeof tplFileClass != 'object') {
                    return false;
                }
                if (!('tp' in tplFileClass)) {
                    return false;
                }
                var OwntplFile = tplRootUrl + tplFileClass.tp;
                var callBack = ajaxCall(OwntplFile, deepIndex);
                if (callBack != null) {
                    ajaxrguments.push(callBack);
                }
                if ('parent' in tplFileClass) {
                    return doTpl(tplConfig[templateTag]['template'][tplFileClass.parent], deepIndex++);
                }
            };

            doTpl(tplFileClass);

            if (!$.tplClassCache.hasOwnProperty(tplRootUrl + JSON.stringify(tplFileClass)) || $.tplClassCache[tplRootUrl + JSON.stringify(tplFileClass)] == null)
                $.tplClassCache[tplRootUrl + JSON.stringify(tplFileClass)] = this;

            if (ajaxrguments.length > 0)
                $.when.apply(this, ajaxrguments).done(function () {
                    loaded = true;
                    callbacks.fire();
                });
            else {
                loaded = true;
                callbacks.fire();
            }

            this.render = function (tplId, json, helper) {
                var def = $.Deferred(),
                    _render = function () {
                        var html;
                        switch (tplEngine) {
                            case ENG_UNDERSCORE:
                            {
                                for (var keyIndex = deepIndex; keyIndex >= 0; keyIndex--) {
                                    if (!_templates[keyIndex])
                                        continue;
                                    if (keyIndex < deepIndex) {
                                        if (!!html) {
                                            for (var key in _templates[keyIndex]) {
                                                var keySplit = key.split(splitChar), object;
                                                if (keySplit.length > 1)
                                                    if (keySplit[0] == tplId)
                                                        object = $('<div>' + html + '</div>').find("#" + keySplit[1]);
                                                    else
                                                        continue;
                                                else
                                                    object = $('<div>' + html + '</div>').find("#" + key);
                                                if (!!object && object.length > 0) {
                                                    var replaceStr = object.get(0).outerHTML;
                                                    var htmlTemp = _templates[keyIndex][key](json).replace("&", "/0x231");
                                                    //注意&amp;替换可能产生问题
                                                    html = html.replace(replaceStr, $("<div>" + htmlTemp + "</div>").html()).replace("/0x231", "&").replace(/{{/g, "<").replace(/}}/g, ">");
                                                }
                                            }
                                        }
                                    } else if (!!_templates[keyIndex][tplId]) {
                                        var htmlTemp = _templates[keyIndex][tplId](json).replace("&", "/0x231");
                                        html = $("<div>" + htmlTemp + "</div>").html().replace("/0x231", "&").replace(/{{/g, "<").replace(/}}/g, ">"); //将所有html标签变小写
                                        continue;
                                    }
                                }
                                if (!!html)
                                    def.resolve(html);
                                else
                                    def.resolve("");
                                break;
                            }
                        }
                    };
                loaded ? _render() : callbacks.add(_render);

                return def.promise();
            };

        };

    $.extend({
        loadTemplates: function (tplConfig, tplFileClass, templateTag, global, failCallback) {
            if (typeof(tplConfig.url) != "undefined" && !/\/$/.test(tplConfig.url))
                tplConfig.url += "/";

            return $.tplClassCache[tplConfig.url + JSON.stringify(tplFileClass)] || new Template(tplConfig, tplFileClass, templateTag, global, failCallback);
        },
        findTemplateCode: function (Code, templates, template) {
            if (!empty(template)) {
                return $.findTemplateCode(template, templates);
            }
            if (Code in templates) {
                if ('ref' in templates[Code]) {
                    return $.findTemplateCode(templates[Code].ref, templates);
                }
                return templates[Code];
            }
            return $.findTemplateCode('default', templates);
        }
    });
}));

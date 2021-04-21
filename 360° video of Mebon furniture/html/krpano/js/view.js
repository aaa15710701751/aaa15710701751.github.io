embedpano({ swf: "/krpano/krpano.swf", xml: _config.xml, target: "pano-view", html5: "prefer", wmode: _wmode(), mobilescale: _mobilescale() }); $(function () { _krpano = new krpanoplugin(document.getElementById("krpanoSWFObject")); _krpano.hotspots = {}; _krpano.comments = {}; _krpano.scene_id = 0; _krpano.mobile = _krpano.get("device.mobile") }); var comment = {}; function _wmode() { return 0 < $("html.ie").length ? "opaque" : "direct" }
function _mobilescale() { var a; var b = document.createElement("canvas"); try { a = !(!window.WebGLRenderingContext || !b.getContext("webgl") && !b.getContext("experimental-webgl")) } catch (d) { a = !1 } var c = navigator.userAgent, b = -1 < c.indexOf("Android") || -1 < c.indexOf("Adr"), c = -1 < c.indexOf("UCBrowser"); return b && !a || b && c ? "0.3" : "0.6" }
var gnindex = 0;
function addSceneHotspot(a, b) {
    gnindex = 0;
    _krpano.scene_id = parseInt(a.replace("scene_", "")); a = _krpano.hotspots[_krpano.scene_id]; "undefined" == typeof a || b ? (b = get_hotspot(_krpano.scene_id), _krpano.hotspots[_krpano.scene_id] = {}, _krpano.comments[_krpano.scene_id] = {}, 1 === b.status && (b.data.comment_list && $.each(b.data.comment_list, function (a, b) { return; _krpano.addviewcomment(b); _krpano.comments[_krpano.scene_id][b.comment_id] = b }), b.data.hot_list && $.each(b.data.hot_list, function (a, b) {
        _krpano.addviewhotspot(b); _krpano.hotspots[_krpano.scene_id][b.hot_id] =
            b
    }))) : ($.each(a, function (a, b) { _krpano.addviewhotspot(b) }), $.each(_krpano.comments[_krpano.scene_id], function (a, b) { _krpano.addviewcomment(b) }))
    _krpano.call("showhotspot_enterVR();");
}

var navlist = [], startpic = "", endpic = "";
function initPanoUi(a) {
    $(".pano-ui").show(); _krpano.scene_id = _krpano.get("scene[0].name").split("_")[1]; _krpano.set("layer[skin_qrcode].url", _config.qrcode); for (var b in _config.adlist) "1" == _config.adlist[b].adtype ? _krpano.call("skin_init_adleft(" + _config.adlist[b].datastr + ")") : "2" == _config.adlist[b].adtype ? _krpano.call("skin_init_adright(" + _config.adlist[b].datastr + ")") : (_krpano.addhotspot("spot_bg" + _config.adlist[b].adid, {
        url: "/krpano/ad/explosion.png",
        enabled: "false", ath: "calc:random*90- 45", atv: "calc:random*60 - 30", zoom: !0, keep: !0, onloaded: "do_crop_animation(100,100, 20,spot_bg" + _config.adlist[b].adid + " , spot_" + _config.adlist[b].adid + ")", onlastframe: "set(hotspot[spot_" + _config.adlist[b].adid + "].alpha,1);"
    }), _krpano.addhotspot("spot_" + _config.adlist[b].adid, { id: _config.adlist[b].adid, url: "/krpano/ad/hb.jpg", ath: "calc:random*90- 45", atv: "calc:random*60 - 30", scale: .2, zoom: !0, keep: !0, alpha: 0, onclick: "openurl(" + _config.adlist[b].datastr + ",'_blank');" }));
    //a = _krpano.get("config.bg_music_src");

    //_krpano.mobile ? 1 == parseInt(_krpano.get("config.mobile_bg_music")) && 0 < a.length && _krpano.call("playsound(bgmusic, '" + a + "', 0)") :
    //1 == parseInt(_krpano.get("config.pc_bg_music")) && 0 < a.length && _krpano.call("playsound(bgmusic, '" + a + "', 0)");

    //背景音乐
    var bg_music_src = _krpano.get('config.bg_music_src');
    if (_krpano.mobile) {
        if (parseInt(_krpano.get('config.mobile_bg_music')) == 1) {
            if (_krpano.get('scene[0].bgmusic') != null) {
                _krpano.call("playsound(bgmusic, '" + _krpano.get('scene[0].bgmusic') + "', 100000)");
                _krpano.call("set(layer[music_con].playing, true);set(current_music,'" + _krpano.get('scene[0].bgmusic') + "')");
            }
            else {
                _krpano.call("playsound(bgmusic, '" + bg_music_src + "', 100000)");
                _krpano.call("set(layer[music_con].playing, true);set(current_music,'" + bg_music_src + "')");
            }

        }
    } else {
        if (parseInt(_krpano.get('config.pc_bg_music')) == 1) {
            if (_krpano.get('scene[0].bgmusic') != null) {
                _krpano.call("playsound(bgmusic, '" + _krpano.get('scene[0].bgmusic') + "', 100000)");
                _krpano.call("set(layer[music_con].playing, true);set(current_music,'" + _krpano.get('scene[0].bgmusic') + "')");
            }
            else {
                _krpano.call("playsound(bgmusic, '" + bg_music_src + "', 100000)");
                _krpano.call("set(layer[music_con].playing, true);set(current_music,'" + bg_music_src + "')");
            }
        }
    }

    1 == parseInt(_krpano.get("config.auto_rotate")) && (_krpano.set("autorotate.enabled", "true"), _krpano.set("autorotate.speed", _krpano.get("config.auto_rotate_speed"))); 1 == parseInt(_config.is_like) && _krpano.set("layer[like_btn].crop", _krpano.get("theme_config.like_crop_curr"));
    _krpano.set("layer[like_txt].html", _config.like_nums); _krpano.set("layer[skin_hits].html", ""); a = get_nav(_config.pano_id); for (b = 0; b < a.navlist.length; b++) { var c = parseInt(a.navlist[b].ath); 1E3 == c ? startpic = a.navlist[b].pic_url : 2E3 == c ? endpic = a.navlist[b].pic_url : navlist.push(a.navlist[b]) } 0 < navlist.length && _krpano.call("set(layer[nav_play].visible,true);initnavplay();")
} var navpos = 0, isstop = "true"; function setnvastate(a) { isstop = a; "true" == isstop && lookcallback() }
function navplay() {
    isstop = "true"; navpos = 0; navlist[navpos].scene_id != _krpano.scene_id && _krpano.call("loadscene(get(scene[scene_" + navlist[0].scene_id + "].name), null, MERGE);"); var a = _krpano.get("config.limitfov"), b = _krpano.get("view.ath"), c = _krpano.get("view.atv"); "" != startpic && _krpano.call("show_tour_guide_alert(" + startpic + ");"); _krpano.call("lookto(" + b + "," + c + "," + a + ",smooth(720,-720,720),true,true,delayedcall(3,js(lookcallback())));"); for (a = 0; a < navlist.length; a++) if ("" != navlist[a].music_url) {
        _krpano.call("skin_play_music(bgmusic);");
        break
    }
}
function lookcallback() {
    if ("false" != isstop) {
        var a = navpos, b = parseInt(a) + 1; if (b < navlist.length) {
            var c = _krpano.get("view.fov"); "" != navlist[a].music_url && (console.log(navlist[a].music_url), _krpano.call("playsound(" + navlist[a].music_url + "," + navlist[a].music_url + ",1);")); _krpano.call("lookto(" + navlist[a].ath + "," + navlist[a].atv + "," + c + ",tween(easeInOutQuad," + parseInt(navlist[a].movetime) + "),true,true,js(lookcallback()));"); navlist[a].scene_id != navlist[b].scene_id && _krpano.call("delayedcall(" + parseInt(navlist[a].movetime) + ", loadscene(get(scene[scene_" +
                navlist[b].scene_id + "].name), null, MERGE));")
        } else _krpano.call("onnavreturn();"), "" != endpic && _krpano.call("show_tour_guide_alert(" + endpic + ");"), _krpano.call("skin_play_music(bgmusic);"); navpos++
    }
} function hidePanoUi() { $(".pano-ui").hide(); _krpano.call("initnavplay();") } function showPanoUi() { $(".pano-ui").show(); _krpano.call("initnavplay();") } function sharePano(a) { a = $("#share-hide").html(); openModal("html", a, "\u5206\u4eab\u4f5c\u54c1", "small") }
function likePano() { "0" != _config.is_like && openModal("msg", "\u5df2\u7ecf\u8d5e\u8fc7\u4e86\u54e6~") }
function hideComment(a) {
    0 == parseInt(_krpano.get("layer[clearscreen_con].data-hidden")) ? (a = _krpano.comments[_krpano.scene_id], "undefined" != typeof a && $.each(a, function (a, c) { _krpano.call("removehotspot(comment_" + c.comment_id + ")") }), _krpano.set("layer[clearscreen_btn].crop", _krpano.get("theme_config.clearscreen_crop_curr")), _krpano.set("layer[clearscreen_con].data-hidden", "1")) : (addSceneHotspot("scene_" + _krpano.scene_id), _krpano.set("layer[clearscreen_btn].crop", _krpano.get("theme_config.clearscreen_crop_def")),
        _krpano.set("layer[clearscreen_con].data-hidden", "0"))
}
function commentFormPano() { _user.user_id ? (_krpano.addcommentavatar(), $(".comment-wrap").show(), _krpano.call("skin_hide_ui"), _krpano.set("hotspot[comment_public].visible", "true"), _krpano.set("hotspot[comment_avatar_public].visible", "true"), _krpano.set("hotspot[comment_text_public].visible", "true"), $("#comment-form #content").focus()) : (openModal("msg", "\u8bf7\u767b\u5f55\u540e\u624d\u80fd\u53d1\u8868\u8bf4\u4e00\u8bf4"), $("#login-modal").modal({ backdrop: "static" })) }
function mCommentFormPano() { _config.is_weixin ? (_krpano.addcommentavatar(), $(".comment-wrap").show(), _krpano.call("skin_hide_ui"), _krpano.set("hotspot[comment_public].visible", "true"), _krpano.set("hotspot[comment_avatar_public].visible", "true"), _krpano.set("hotspot[comment_text_public].visible", "true")) : openModal("msg", "\u8bf7\u4f7f\u7528\u5fae\u4fe1\u8bbf\u95ee\u518d\u4f7f\u7528\u8bf4\u4e00\u8bf4\u54e6") }
function hideCommentFormPano() { _krpano.set("hotspot[comment_public].visible", "false"); _krpano.set("hotspot[comment_avatar_public].visible", "false"); _krpano.set("hotspot[comment_text_public].visible", "false"); $(".comment-wrap").hide(); _krpano.call("skin_show_ui") }
function modalPano(a, b, c, d, e, f) {
    switch (a) {
        case "menu": switch (b) {
            case "1": 1 == f ? openModal("iframe", d, "", "content") : _krpano.call("openurl(" + d + ",'_blank');"); break;
            case "2": a = get_matbyid(d); b = ""; 1 == a.matinfo.isadd && (b = '<a class="button" target="_blank" href="' + a.matinfo.add2 + '">' + a.matinfo.add1 + "</a>");
                openModal("html", a.matinfo.contents + b, a.matinfo.title); break;
            case "3": return d = d.split("|"), openModal("iframe", "http://3gimg.qq.com/lightmap/v1/marker/?marker=coord:" +
                d[0] + "," + d[1] + ";title:" + d[2] + ";addr:" + d[2] + ";&referer=myapp;&key=R7PBZ-O5NRD-45Z4K-HU4DJ-V4PW3-E5FKW", c, "full");
            case "4": "mobile" == _config.client || "weixin" == _config.client ? _krpano.call("openurl(tel:" + d + ",'_blank');") : openModal("html", '<p style="text-align:center;font-size:20px;">' + d + "</p>", c, "small"); break;
            case "8": openModal("html", '<div class="player-audio" style="text-align:center"><audio controls="controls" autoplay="autoplay"><source type="audio/mpeg" src="' + d + '"></source>\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301HTML5\u64ad\u653e\u97f3\u9891</audio></div>', c, "small"); break;

            case '9':
                _krpano.call("stopsound(bgmusic);");
                console.log(d);
                if (d.indexOf('*') == -1) {
                    var html = '<div class="player-audio" style="text-align:center;height:520px;"><video controls="controls" autoplay="autoplay" style="width:auto;height:100%;"><source type="video/mp4" src="/' + d + '"></source>您的浏览器不支持HTML5播放视频</video></div>';
                    if (_config.client == "pc")
                        openModal('html', html, c, 'content');
                    else {
                        html = '<div class="player-audio" style="position:absolute;left:50%;top:50%; transform: translate(-50%, -50%);"><video controls="controls" autoplay="autoplay" style=""><source type="video/mp4" src="/' + d + '" width="100%" height="100%"></source>您的浏览器不支持HTML5播放视频</video></div>';
                        showDialogHtml(html);
                    }
                } else {
                    $('.image-preview').show();
                    //$('#videopreview').show();
                    $('#imagepreview').hide();
                    isviewprv = "video";

                    imageviewtitleList = d.split('*');
                    imageviewList = e.split('*');

                    imagetabclick(0);
                }
                break;
            case '11':

                $('.image-preview').show();
                $('#imagepreview').show();
                //$('#videopreview').hide();
                isviewprv = "img";

                imageviewtitleList = d.split('*');
                imageviewList = e.split('*');
                imagetabclick(0);

                break;
            case "10": -1 == e.indexOf("http:") ? openModal("iframe", "/krpano/data/404.html", c, "content") : 1 == f ? openModal("iframe", e, c, "content") : _krpano.call("openurl(" + e + ",'_blank');")
        } break; case "remark": return d = '<div style="min-height:400px">' + _config.remark + "</div>", openModal("html", d, "\u4f5c\u54c1\u7b80\u4ecb"); case "scene_remark": return d = _krpano.get("scene[get(currscene)].remark"), openModal("html", '<div style="min-height:400px">' + d + "</div>", "\u573a\u666f\u4ecb\u7ecd")
    }
}
function openModal(a, b, c, d) { switch (a) { case "iframe": $("body").createModal({ iframe: b, title: c, size: d }); break; case "html": $("body").createModal({ html: b, title: c, size: d }); break; case "msg": $("body").createModal({ msg: b, bgClose: !1 }) } }
krpanoplugin.prototype.addviewhotspot = function (hotspotdata) {
    var hotspotName = "hotspot_" + hotspotdata.hot_id;
    var textName = "hotspot_txt_" + hotspotdata.hot_id;
    // var ondown = "spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery); sub(drag_adjustx, mouse.stagex, hotspotcenterx); sub(drag_adjusty, mouse.stagey, hotspotcentery); asyncloop(pressed, sub(dx, mouse.stagex, drag_adjustx); sub(dy, mouse.stagey, drag_adjusty); screentosphere(dx, dy, ath, atv);); ";
    var ondown = "";
    var onclick = "js(_krpano.clcikhotspot(" + hotspotdata.hot_id + "));";
    var onover = "set(layer[" + textName + "].alpha,0.8)";
    var onout = "set(layer[" + textName + "].alpha,1)";
    //console.log(hotspotdata.scale)

    if (hotspotdata.isstatic == 1) {//固定平面热点
        _krpano.call("addlayer(" + hotspotName + ")");
        _krpano.call("set(layer[" + hotspotName + "].url," + _config.app_url + hotspotdata.diy_src + ");");
        _krpano.call("set(layer[" + hotspotName + "].x," + (gnindex * 60 + 10) + ");");
        _krpano.call("set(layer[" + hotspotName + "].width,50);");
        _krpano.call("set(layer[" + hotspotName + "].height,50);");
        _krpano.call("set(layer[" + hotspotName + "].y,200);");
        _krpano.call("set(layer[" + hotspotName + "].onclick," + onclick + ");");

        gnindex++;
    }
    else if (hotspotdata.diy_id == 0) {
        if (hotspotdata.type_id == 16) {
            var data_arr = hotspotdata.datastr.split('|');
            var hotspot = this.addhotspot(hotspotName, {
                id: hotspotdata.hot_id,
                ath: hotspotdata.ath,
                atv: hotspotdata.atv,
                url: _config.app_url + data_arr[2],
                linkedscene: null,
                text: hotspotdata.hot_name,
                handcursor: "false",
                scale: hotspotdata.scale,
                width: "20",
                edge: "buttom",
                zoom: "true",
                y: 0
            });
            this.addlayer(textName, {
                parent: hotspot,
                url: "%SWFPATH%/plugins/textfield.swf",
                html: hotspotdata.hot_name,
                alpha: "1",
                enabled: "true",
                align: "top",
                edge: "bottom",
                autowidth: "true",
                y: 0,
                backgroundcolor: "0x000000",
                backgroundalpha: "0.4",
                padding: "5 8",
                roundedge: '4',
                css: " font-size: 14px;color: #FFFFFF;font-family:黑体;",
                zorder: 1,
                keep: false,
                handcursor: true,
                onclick: onclick
            });
        }
        else {
            var data_arr = hotspotdata.datastr.split('|');
            var hotspot = this.addhotspot(hotspotName, {
                id: hotspotdata.hot_id,
                url: "%SWFPATH%/plugins/videoplayer.js",
                //url.html5:"%SWFPATH%/plugins/videoplayer.js",
                // url.flash:"%SWFPATH%/plugins/videoplayer.swf",
                videourl: data_arr[1],//"%SWFPATH%/data/10001/9/cats.mp4|%SWFPATH%/data/10001/9/cats.webm",
                posterurl: "%SWFPATH%/images/vdplay.jpg",
                distorted: "true",
                ath: hotspotdata.ath,
                atv: hotspotdata.atv,
                edge: "center",
                pausedonstart: false,
                //scale:"1.0",
                width: data_arr[2],
                height: data_arr[3],
                rx: "0",
                ry: "0",
                rz: "0",
                ox: "0",
                oy: "0",
                loop: "true",
                onclick: "togglepause();"
            });
        }
    }
    else {
        //热点
        var hotspot = this.addhotspot(hotspotName, {
            id: hotspotdata.hot_id,
            type: "image",
            url: hotspotdata.url,
            keep: "false",
            enabled: "true",
            scale: hotspotdata.scale,
            ath: hotspotdata.ath,
            atv: hotspotdata.atv,
            v: hotspotdata.v,
            edge: "bottom",
            bgcapture: true,
            ishotspot: true,
            handcursor: true,
            ondown: ondown,
            onclick: onclick,
            onover: onover,
            onout: onout
        });

        //热点名称
        if (hotspotdata.hot_name) {
            hotspotManageBgY = -20 + parseInt(hotspotdata.y) - 2;

            if (hotspotdata.diy_src.indexOf('g-8') == -1 && hotspotdata.diy_src.indexOf('g-9') == -1 && hotspotdata.diy_src.indexOf('g-10') == -1) {
                this.addlayer(textName, {
                    parent: hotspot,
                    url: "%SWFPATH%/plugins/textfield.swf",
                    html: hotspotdata.hot_name,
                    alpha: "1",
                    enabled: "true",
                    align: "top",
                    edge: "bottom",
                    autowidth: "true",
                    y: 0,
                    backgroundcolor: "0x000000",
                    backgroundalpha: "0.4",
                    padding: "5 8",
                    roundedge: '4',
                    css: " font-size: 14px;color: #FFFFFF;font-family:黑体;",
                    zorder: 1,
                    keep: false,
                    handcursor: true,
                    onclick: onclick
                });
            }
            else {
                this.addlayer(textName, {
                    parent: hotspot,
                    url: "%SWFPATH%/plugins/textfield.swf",
                    html: hotspotdata.hot_name,
                    alpha: "1",
                    enabled: "true",
                    align: "top",
                    edge: "bottom",
                    y: 110,
                    backgroundcolor: "0xffffff",
                    backgroundalpha: "0.0",
                    //padding: "5 8",
                    roundedge: '4',
                    css: hotspotdata.diy_src.indexOf('g-10') == -1 ? " font-size: 16px;color: #ffffff;font-family:黑体;height:100px;width:20px;white-space: pre-wrap;padding-left:4px;" : " font-size: 16px;color: #000000;font-family:黑体;height:100px;width:20px;white-space: pre-wrap;padding-left:4px;",
                    zorder: 1,
                    keep: false,
                    handcursor: true,
                    onclick: onclick,
                    visible: hotspotdata.hot_name != '' ? true : false,
                });

            }

        }
        _krpano.call("hotspot[" + hotspotName + "].loadstyle(" + hotspotdata.style + ")");
    }


    return this;
};

var zIndex = 0;
krpanoplugin.prototype.onhbclick = function (a) { openModal("msg", "\u60a8\u5df2\u62a2\u5230\u7ea2\u5305\uff01 ^_^") };
krpanoplugin.prototype.clcikhotspot = function (a) {

    a = _krpano.hotspots[_krpano.scene_id][a];
    var hottype = a.type_id.toString();
    switch (hottype) {
        case "1": _krpano.call("skin_loadscene(scene_" + a.data_id + ");"); break;
        case "5":
            openModal("msg", "暂不支持3D环物^_^")
            //$.ajax({
            //type: "POST", url: "/api.aspx", data: { action: "get_mat3dpic", mat_id: a.data_id }, dataType: "json", success: function (a) {
            //    var b = 0, d; for (d in a.mat3dlist) _krpano.call("txtadd(fname,frame," + b + ");"), _krpano.call("set(furl,/" + a.mat3dlist[d].picurl + ");"), _krpano.call("addplugin(get(fname));"), _krpano.call("plugin[get(fname)].loadstyle(frame);"),
            //    _krpano.call("copy(plugin[get(fname)].url,furl);"), b++; _krpano.call("set(framecount," + a.mat3dlist.length + ");"); _krpano.call("set(plugin[sdcontenttxt].html, '[p]" + a.title + "[/p]');"); _krpano.call("set(plugin[sdtitletxt].html, '[p]" + a.name + "[/p]');"); _krpano.call("buildframes();")
            //}});
            break;
        case "3": console.log(a.abank); 1 == a.abank ? openModal("iframe", a.v, "", "content") : _krpano.call("openurl(" + a.v + ",'_blank');"); break;
        case "6": modalPano("menu", "2", a.hot_name, a.data_id, "", a.abank); break;
        case "7": openModal("msg",
            "\u8fd9\u91cc\u4ec0\u4e48\u90fd\u6ca1\u6709 ^_^"); break;
        case "8": openModal("html", '<div class="player-audio" style="text-align:center"><audio controls="controls" autoplay="autoplay"><source type="audio/mpeg" src="' + a.v + '"></source>\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301HTML5\u64ad\u653e\u97f3\u9891</audio></div>', a.hot_name, "small"); break;
        case '9':
            _krpano.call("stopsound(bgmusic);");
            var html = '<div class="player-audio" style="text-align:center;padding:20px 20px;"><video controls="controls" autoplay="autoplay" style="width:100%;"><source type="video/mp4" src="' + a.v + '"></source>您的浏览器不支持HTML5播放视频</video></div>';
            openModal('html', html, a.hot_name, 'content');
            break;

        case "10": modalPano("menu", "10", a.hot_name, a.data_id, a.datastr, a.abank);
        case "11":
            openModal("msg", "暂不在线商品^_^")
        case '12':
            var hotspot = a;
            var arr = hotspot.datastr.split('|');
            var contents = "";
            for (var k = 0; k < arr.length; k++) {
                if (arr[k].length > 1)
                    contents += '<p><img src="/' + arr[k] + '" alt="幻灯片" /></p>';
            }


            layer.open({
                type: 1,
                title: ' ',
                shade: 0.6,
                //skin: 'layui-layer-rim', //加上边框
                area: ['1000px', '600px'], //宽高
                content: '<div class="layui-layer-content-custom">' + contents + '</div>'
            });

            zIndex = $('.layui-layer,layui-layer-page,layer-anim').css('z-index')
            var $oP = $('.layui-layer-content p');
            zIndex += 1

            var pos = 0;
            var imgWrap;
            var open;
            $oP.each(function (item) {
                $(this).css('position', 'relative')
                var aImg = $(this).find('img')
                aImg.css("width", "100%")
                var imgSrc = aImg.attr('src')
                imgWrap = $('<a data-fancybox="gallery">')

                imgWrap.attr('href', imgSrc)
                imgWrap.append(aImg);

                if (imgWrap.children().length > 0) {

                    $(this).append(imgWrap);
                    if (pos == 0) {
                        open = $(imgWrap)
                    }
                    pos++;
                }

            });
            open.trigger('click');

            layer.closeAll();
            break;

    }
};
krpanoplugin.prototype.clickvoice = function (a) { a = _krpano.comments[_krpano.scene_id][a]; _krpano.call("skin_play_music(comment, '" + a.content + "', '" + a.comment_id + "')") };
krpanoplugin.prototype.addviewcomment = function (a) {
    var b = "comment_avatar_" + a.comment_id, c = "comment_avatar_parent_" + a.comment_id, d = "comment_text_" + a.comment_id, e = this.addhotspot("comment_" + a.comment_id, { id: a.comment_id, type: "image", url: "/krpano/images/bg-comment.png", scale: 1, ath: a.ath, atv: a.atv, crop: "0|0|30|14", handcursor: !1, is_comment: !0 }), c = this.addlayer(c, { parent: e, type: "container", maskchildren: "true", align: "top", edge: "bottom", height: "30", width: "30", bgroundedge: "15" }); this.addlayer(b, {
        parent: c, url: a.avatar,
        align: "bottom", edge: "bottom", height: "30", width: "30", handcursor: !1
    }); "10" == a.type_id ? this.addlayer(d, { parent: e, url: "%SWFPATH%/plugins/textfield.swf", html: a.contents, align: "top", edge: "left", autowidth: "true", x: "22", y: "-16", backgroundcolor: "0x000000", backgroundalpha: "0.4", padding: "5 8", roundedge: "4", css: " font-size: 12px;color: #FFFFFF;font-family:\u9ed1\u4f53;", handcursor: !1 }) : (b = "comment_voice_" + a.comment_id, d = "comment_voice_playing_" + a.comment_id, c = "js(_krpano.clickvoice(" + a.comment_id + "));", e = this.addlayer("comment_voice_parent_" +
        a.comment_id, { parent: e, type: "container", align: "top", edge: "left", height: "26", width: "32", x: "22", y: "-14", bgroundedge: "4", bgcolor: "0x000000", bgalpha: "0.4" }), this.addlayer(b, { parent: e, url: "/statics/krpano/images/bg-voice.png", crop: "0|52|26|26", x: "2", align: "bottom", edge: "bottom", height: "26", width: "26", enabled: "true", onclick: c }), this.addlayer(d, { parent: e, url: "/statics/krpano/images/bg-voice.png", x: "2", align: "bottom", edge: "bottom", height: "26", width: "26", enabled: "true", onclick: c, visible: "false" }), _krpano.call("layer[comment_voice_playing_" +
            a.comment_id + "].loadstyle(comment_voice_style)")); return this
};
krpanoplugin.prototype.addcommentavatar = function () {
    var a = comment.atv = _krpano.get("view.vlookat"), b = comment.ath = _krpano.get("view.hlookat"); this.addhotspot("comment_public", { type: "image", url: "/krpano/images/bg-comment.png", scale: 1, ath: b, atv: a, crop: "0|0|30|14", handcursor: !1 }); this.addhotspot("comment_avatar_public", { type: "image", url: _user.avatar, scale: 1, align: "top", edge: "bottom", ath: b, atv: a, width: 35, height: 35, oy: "-7", handcursor: !0, ondown: "spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery); sub(drag_adjustx, mouse.stagex, hotspotcenterx); sub(drag_adjusty, mouse.stagey, hotspotcentery); asyncloop(pressed, sub(dx, mouse.stagex, drag_adjustx); sub(dy, mouse.stagey, drag_adjusty); screentosphere(dx, dy, ath, atv);set(hotspot[comment_public].atv,get(atv)); set(hotspot[comment_public].ath,get(ath));set(hotspot[comment_text_public].atv,get(atv)); set(hotspot[comment_text_public].ath,get(ath));set(hotspot[comment_avatar_public].atv,get(atv)); set(hotspot[comment_avatar_public].ath,get(ath));roundval(ath, 3);roundval(atv, 3);js(_krpano.movecommentavatar(get(atv),get(ath));););" }); this.addhotspot("comment_text_public",
        { url: "%SWFPATH%/plugins/textfield.swf", html: "\u62d6\u52a8\u5934\u50cf\u5230\u9700\u8981\u8bc4\u8bba\u7684\u5730\u65b9...", scale: 1, align: "top", edge: "left", ath: b, atv: a, ox: "25", oy: "-25", backgroundcolor: "0x000000", backgroundalpha: "0.4", padding: "5 8", roundedge: "4", css: " font-size: 15px;color: #FF9900;font-family:\u9ed1\u4f53;", handcursor: !0, ondown: "spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery); sub(drag_adjustx, mouse.stagex, hotspotcenterx); sub(drag_adjusty, mouse.stagey, hotspotcentery); asyncloop(pressed, sub(dx, mouse.stagex, drag_adjustx); sub(dy, mouse.stagey, drag_adjusty); screentosphere(dx, dy, ath, atv);set(hotspot[comment_public].atv,get(atv)); set(hotspot[comment_public].ath,get(ath));set(hotspot[comment_text_public].atv,get(atv)); set(hotspot[comment_text_public].ath,get(ath));set(hotspot[comment_avatar_public].atv,get(atv)); set(hotspot[comment_avatar_public].ath,get(ath));roundval(ath, 3);roundval(atv, 3);js(_krpano.movecommentavatar(get(atv),get(ath));););" });
    return this
}; krpanoplugin.prototype.movecommentavatar = function (a, b) { comment.atv = a; comment.ath = b };
$("#comment-form").submit(function () {
    var a = $(this), b = a.find(".btn-primary"); b.attr("disabled", !0); a = { user_id: _user.user_id, pano_id: _config.pano_id, scene_id: _krpano.scene_id, content: a.find("#content").val(), ath: comment.ath, atv: comment.atv, avatar: _user.avatar, nickname: _user.nickname, openid: _user.openid, action: "add_comment" }; if ("" == content) return openModal("msg", "\u8bf7\u586b\u5199\u8bf4\u4e00\u8bf4\u5185\u5bb9"), !1; $.post("/api.aspx", a, function (a) {
        1 == a.status ? (hideCommentFormPano(), a.data.avatar = _user.avatar,
            a.data.ath = comment.ath, a.data.atv = comment.atv, _krpano.addviewcomment(a.data), _krpano.hotspots[_krpano.scene_id] = void 0) : openModal("msg", a.msg); b.attr("disabled", !1)
    }, "json"); return !1
});





$(function () {
    initNavMenu();
})

function showNavMenu() {

    if ($(window).width() <= 768) {
        $('.menu').show()
        $('.masthead').hide()
        $('.pano-page').css('bottom', 40)
    } else {
        $('.menu').hide()
        $('.masthead').show()
        $('.pano-page').css('bottom', 0)
    }
}

function showDH() {
    console.log('111');
    console.log(voicejson);
    //try{
    if (voicejson && voicejson.length > 0) {
        _krpano.call("set(layer[map_yuyin].visible,true)");
        _krpano.call("set(layer[map_tuwen].visible,true)");
    }
    //}catch(e){

    //}
}

function initNavMenu() {

    var data = getnavmenu();
    //if (_config.menustyle == 0 || _config.client == 'mobile') {
    for (var m = data.menulist.length - 1; m >= 0; m--) {
        if (data.menulist[m].parent_id == 0) {

            var isexist = existchild(data.menulist[m].menu_id);
            var pcchild = '<li class="level-0"><a data-id="' + data.menulist[m].menu_id + '">' + data.menulist[m].title + '</a>' + (isexist == true ? '<i class="trangle-down"></i>' : '');
            var mobilechild = '<div class="menu-item" data-id="' + data.menulist[m].menu_id + '"><a class="menu-text">' + data.menulist[m].title + '</a>';

            if (isexist == true) {
                pcchild += '<ol class="child-nav">';
                mobilechild += '<ul class="sub-menu">';
                for (var n = 0; n < data.menulist.length; n++) {
                    if (data.menulist[n].parent_id != 0) {
                        if (data.menulist[m].menu_id == data.menulist[n].parent_id) {

                            pcchild += '<li class="level-1 active"  data-id="' + data.menulist[n].menu_id + '"><a>' + data.menulist[n].title + '</a></li>';
                            mobilechild += '<li class="sub-menu-item" data-id="' + data.menulist[n].menu_id + '"><a>' + data.menulist[n].title + '</a></li>';
                        }
                    }
                }
                pcchild += '</ol>';
                mobilechild += '</ul>';
            }

            pcchild += '</li>';
            mobilechild += '</div>';
            $(".primary").append(pcchild);
            $(".menu").append(mobilechild);
        }

    }

    if (data.menulist.length == 0) return;

    setTimeout("showNavMenu()", 2000);

    function getmenuinfo(mid) {
        for (var k = 0; k < data.menulist.length; k++) {
            if (mid == data.menulist[k].menu_id) {
                return data.menulist[k];
            }
        }
        return null;
    }

    function existchild(pid) {
        for (var k = 0; k < data.menulist.length; k++) {
            if (pid == data.menulist[k].parent_id) {
                return true;
            }
        }
        return false;
    }

    if ($(window).width() > 768) {
        var topNav = (function () {
            var nav = $('.nav-user')
            var subMenu = $('.primary')
            var navItem = subMenu.find('.level-0')

            navItem.hover(function () {
                var childNav = $(this).find('.child-nav')


                childNav.show()
            }, function () {
                var childNav = $(this).find('.child-nav')

                childNav.hide()
            })

            navItem.delegate('> a', 'click', function () {

                var mid = $(this).data('id');

                var datainfo = getmenuinfo(mid);
                modalPano('menu', datainfo.type_id.toString(), datainfo.title, datainfo.data, datainfo.datastr, datainfo.abank);

            })

            navItem.delegate('.child-nav .level-1', 'click', function () {

                var mid = $(this).data('id');

                var datainfo = getmenuinfo(mid);
                console.log(datainfo)
                modalPano('menu', datainfo.type_id.toString(), datainfo.title, datainfo.data, datainfo.datastr, datainfo.abank);

            })


        })()
    }
    else if ($(window).width() <= 768) {

        var bottomNav = (function () {
            var oMenu = $('.menu')
            var menuItem = oMenu.children()


            $(menuItem).each(function (idx, els) {
                var item = $(els)
                var subMenu = item.find('.sub-menu')
                var iconBox = item.find('.menu-text')
                var html = '<div class="icon-box"><span></span><span></span><span></span></div>'

                if (item.children().length > 1) {
                    iconBox.append(html)
                }

            })

            $(menuItem).on('click', function (ev) {

                ev = ev || window.event
                // ev.stopPropagation()

                var idx = $(this).index()
                var item = $(this).find('.sub-menu')

                if (item.length <= 0) {
                    var mid = $(this).data('id')
                    var datainfo = getmenuinfo(mid);
                    console.log(datainfo);
                    var link = $(this).find('a')
                    link.attr('href', "javascript:modalPano('menu', " + datainfo.type_id + ", '" + datainfo.title + "', '" + datainfo.data + "', '" + datainfo.datastr + "', '" + datainfo.abank + "');");
                }
                else {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active')
                    } else {
                        $(this).addClass('active').siblings().removeClass('active')
                    }
                }


            })


            $('.sub-menu-item').each(function (idx, el) {

                var _this = $(el)
                var link = _this.find('a');
                var mid = $(this).data('id')
                var datainfo = getmenuinfo(mid);
                link.attr('href', "javascript:modalPano('menu', " + datainfo.type_id + ", '" + datainfo.title + "', '" + datainfo.data + "', '" + datainfo.datastr + "', '" + datainfo.abank + "');");
            })



        })()

    }

}

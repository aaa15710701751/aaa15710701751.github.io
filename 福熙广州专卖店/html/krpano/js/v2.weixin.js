//微信相关
var _sec = 0, secTimer;
$(function () {

    //微信授权
    $('#wx-login').click(function () {
        location.href = "/api_weixin.aspx?pano_id=" + _config.pano_id;
    })

    //提交说一说 文字
    $('#wx-submit').click(function () {

        var text = $.trim($('.comment-wrap #comment-text').val());

        if (text.length < 1) {
            return openModal('msg', '先说点什么吧~');
        }
        if (text.length > 20) {
            return openModal('msg', '内容太长了哦，20个字符内~');
        }

        var data = {
            wx_user_id: _user.user_id,
            pano_id: _config.pano_id,
            scene_id: _krpano.scene_id,
            content: text,
            ath: comment.ath,
            atv: comment.atv
        };
        $.ajax({
            type: 'POST',
            url: _config.app_url + '?api-wx_comment.htm',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status != 1) {
                    return openModal('msg', data.msg);
                } else {
                    $('.comment-wrap .comment-type a:first').click();
                    $('.comment-wrap').hide();
                    hideCommentFormPano();
                    data.data.avatar = _user.avatar;
                    data.data.ath = comment.ath;
                    data.data.atv = comment.atv;
                    _krpano.addviewcomment(data.data);
                    _krpano.hotspots[_krpano.scene_id] = undefined;
                    return openModal('msg', '发表说一说成功~');
                }
            }
        })
    })


    //切换说一说类型
    $('.comment-wrap .comment-type a').click(function () {
        $('.comment-wrap .comment-type a').removeClass('current');
        $(this).addClass('current');
        $('.comment-wrap .hide-type .hide').hide();
        var c = $(this).parent().attr('class');
        $('.comment-wrap .hide-type .' + c).show();

        if (c == 'voice') {
            $('.comment-wrap .bottom').hide();
        } else {
            $('.comment-wrap .bottom').show();
        }
    })

    //开始录音
    $('.comment-wrap .voice .start').click(function () {
        var click = $(this).data('click');
        if (click == '1') return;

        if (!_user.user_id) {
            $('.comment-wrap .comment-type a:first').click();
            return openModal('msg', '还没有授权哦，请点击授权按钮~');
        }

        wx.startRecord({
            cancel: function () {
                reset_second();
                $('.comment-wrap .voice .start').data('click', '0');
                return openModal('msg', '您拒绝了录音哦~');
            }
        });

        $(this).data('click', '1').find('a').text('正在录音');
        $('.comment-wrap .hide-type .voice').addClass('voice-current');
        secTimer = setInterval(function () {
            set_voice_second();
        },
        1000);
    })

    //停止录音
    $('.comment-wrap .voice .stop').click(function () {
        var start = $('.comment-wrap .voice .start');
        var is_start = start.data('click');

        if (_sec < 3) {
            reset_second();
            $('.comment-wrap .voice .start').data('click', '0');
            return openModal('msg', '录音时间太短了哦（3秒以上）');
        }

        if (is_start == '1') {
            reset_second();
            wx.stopRecord({
                success: function (res) {
                    var localId = res.localId;
                    upload_voice(localId);
                    start.find('a').text('正在上传');
                }
            });
        }
    })
})

//重设秒数
function reset_second() {
    _sec = 0;
    clearInterval(secTimer);
    $('.comment-wrap .voice .start a').text('录音');
    $('.comment-wrap .hide-type .voice').removeClass('voice-current');
    $('.comment-wrap .voice .second h5').text('0 秒');
}

//设置秒数
function set_voice_second() {
    _sec++;
    $('.comment-wrap .voice-current .second h5').text(_sec + ' 秒');

    if (_sec >= 59) {
        $('.comment-wrap .voice .stop').click();
    }
}

//提交录音至微信服务器
function upload_voice(localId) {
    wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID
        isShowProgressTips: 1, // 进度提示
        success: function (res) {
            upload_server(res.serverId);
        }
    });
}

// 上传到服务器
function upload_server(serverId) {
    var data = '&pano_id=' + _config.pano_id + '&scene_id=' + _krpano.scene_id + '&media_id=' + serverId + '&ath=' + comment.ath + '&atv=' + comment.atv + '&wx_user_id=' + _user.user_id;
    $.ajax({
        url: _config.app_url + "?api-wx_voice.htm" + data,
        success: function (data) {
            reset_second();
            $('.comment-wrap .voice .start').data('click', '0');
            $('.comment-wrap .cancel-btn').click();
            if (data.status != 1) {
                return openModal('msg', data.msg);
            } else {
                $('.comment-wrap .comment-type a:first').click();
                $('.comment-wrap').hide();
                hideCommentFormPano();
                data.data.avatar = _user.avatar;
                data.data.ath = comment.ath;
                data.data.atv = comment.atv;
                _krpano.addviewcomment(data.data);
                _krpano.hotspots[_krpano.scene_id] = undefined;
                return openModal('msg', '发表说一说成功~');
            }
        }
    });
}
$('document').ready(function () {
    var link = location.href;
    //link = link.replace(/\/$/,'');
    $.ajax({
        url: wxShareUrl,
        dataType: 'json',
        //jsonp: 'callback',
        data: {url: link},
        success: function (json) {
            wxData = $.extend(wxData,json);
            wx.config({
                debug: wxData.debug || false,
                appId: wxData.appId,
                timestamp: wxData.timestamp,
                nonceStr: wxData.nonceStr,
                signature: wxData.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });
        },
        error: function () {
            if( wxData.debug ){
                alert('请求微信分享接口失败~');
            }
            console.log('请求微信分享接口失败~');
        }
    })
})
function wxShare(data){
    wx.ready(function () {
        wxData = $.extend(wxData,data);
        wx.onMenuShareAppMessage({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            trigger: function (res) {},
            success: function (res) {
                _czc.push([")trackEvent","cola","分享完成"]);
            },
            cancel: function (res) {},
            fail: function (res) {}
        });
        wx.onMenuShareTimeline({
            title: wxData.title,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            trigger: function (res) {},
            success: function (res) {
                _czc.push([")trackEvent","cola","分享完成"]);
            },
            cancel: function (res) {},
            fail: function (res) {}
        });
        wx.onMenuShareQQ({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            success: function () {
                _czc.push([")trackEvent","cola","分享完成"]);
            },
            cancel: function () {}
        });
    });
}

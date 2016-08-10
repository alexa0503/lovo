$('document').ready(function () {
    $.ajax({
        url: wxShareUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {url: location.href},
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
            if( data.debug ){
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
            success: function (res) {},
            cancel: function (res) {},
            fail: function (res) {}
        });
        wx.onMenuShareTimeline({
            title: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            trigger: function (res) {},
            success: function (res) {
            },
            cancel: function (res) {},
            fail: function (res) {}
        });
        wx.onMenuShareQQ({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            success: function () {},
            cancel: function () {}
        });
    });
}

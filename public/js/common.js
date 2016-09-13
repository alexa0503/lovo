//找到url中匹配的字符串
function findInUrl(str) {
    url = location.href;
    return url.indexOf(str) == -1 ? false : true;
}
//获取url参数
function queryString(key) {
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
}

//产生指定范围的随机数
function randomNumb(minNumb, maxNumb) {
    var rn = Math.round(Math.random() * (maxNumb - minNumb) + minNumb);
    return rn;
}

var wHeight;
var orgHeight;
var link1 = "http://coupon.m.jd.com/coupons/show.action?key=f3c85d54173642cc9364e658e919048c&roleId=3633901&to=home.m.jd.com/wallet/coupons
";
var link2 = "http://coupon.m.jd.com/coupons/show.action?key=f3c85d54173642cc9364e658e919048c&roleId=3633901&to=home.m.jd.com/wallet/coupons
";
$(document).ready(function () {
    wHeight = $(window).height();
    orgHeight = $(window).height();
    if (wHeight < 832) {
        wHeight = 832;
    }

    var bli = orgHeight / 1008;
    $('.page').css('-webkit-transform', 'scale(' + bli + ')');

    if (orgHeight < 1008) {
        $('.page').css('-webkit-transform-origin', "50% 50%");
    }

    $('.h832').css('padding-top', (wHeight - 832) / 2 + 'px');
    $('.pageOuter').height(orgHeight);
    $('.bgOuter').height(orgHeight);
    $('.bg1').height(orgHeight + 292);
    $('.bg2').height(orgHeight + 292);
    $('.page').height(orgHeight);
    var linkNumb=randomNumb(1,2);
    if(linkNumb==1){
        $('.pageActBtn1').attr('href',link1);
    }
    else{
        $('.pageActBtn1').attr('href',link2);
    }
});

var manifest, manifest2, manifest3, manifest4;
var preload, preload2, preload3, preload4;
var bgm, bgm1, bgm2;
//定义相关JSON格式文件列表
function setupManifest() {
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", this.loadHandler, this);
    createjs.Sound.registerSound({src: "/images/bgm.mp3", id: "bgm"});
    createjs.Sound.registerSound({src: "/images/bgm1.mp3", id: "bgm1"});
    createjs.Sound.registerSound({src: "/images/bgm2.mp3", id: "bgm2"});

    manifest = [];
    manifest.push({
        src: "/images/10.png"
    });
    manifest.push({
        src: "/images/11.png"
    });
    manifest.push({
        src: "/images/12.png"
    });
    manifest.push({
        src: "/images/21.png"
    });
    manifest.push({
        src: "/images/22.png"
    });
    manifest.push({
        src: "/images/23.png"
    });
    manifest.push({
        src: "/images/24.png"
    });
    manifest.push({
        src: "/images/25.png"
    });

    manifest.push({
        src: "/images/bg2.png"
    });

    manifest.push({
        src: "/images/actImgFail1.png"
    });

    manifest.push({
        src: "/images/actImgFail2.png"
    });

    startPreload();
}

function setupManifest2() {
    manifest2 = [];
    manifest2.push({
        src: "/images/31.png"
    });
    manifest2.push({
        src: "/images/32.png"
    });
    manifest2.push({
        src: "/images/41.png"
    });
    manifest2.push({
        src: "/images/42.png"
    });
    /*manifest2.push({
     src: "/images/51.png"
     });*/
    manifest2.push({
        src: "/images/61.png"
    });
    manifest2.push({
        src: "/images/62.png"
    });
    manifest2.push({
        src: "/images/63.png"
    });
    manifest2.push({
        src: "/images/64.png"
    });
    manifest2.push({
        src: "/images/65.png"
    });
    manifest2.push({
        src: "/images/66.png"
    });
    manifest2.push({
        src: "/images/codeBg.png"
    });
    startPreload2();
}

function setupManifest3() {
    manifest3 = [];
    manifest3.push({
        src: "/images/71.png"
    });
    manifest3.push({
        src: "/images/81.png"
    });
    manifest3.push({
        src: "/images/82.png"
    });
    manifest3.push({
        src: "/images/83.png"
    });
    manifest3.push({
        src: "/images/84.png"
    });
    manifest3.push({
        src: "/images/93.png"
    });

    manifest3.push({
        src: "/images/actImg1.png"
    });
    manifest3.push({
        src: "/images/actImg2.png"
    });
    manifest3.push({
        src: "/images/actImg3.png"
    });
    manifest3.push({
        src: "/images/actImg4.png"
    });
    manifest3.push({
        src: "/images/actImg5.png"
    });
    manifest3.push({
        src: "/images/actImg6.png"
    });
    manifest3.push({
        src: "/images/actImg7.png"
    });

    startPreload3();
}

function setupManifest4() {
    manifest4 = [];
    manifest4.push({
        src: "/images/101.png"
    });
    manifest4.push({
        src: "/images/102.png"
    });
    manifest4.push({
        src: "/images/103.png"
    });
    manifest4.push({
        src: "/images/111.png"
    });
    manifest4.push({
        src: "/images/121.png"
    });
    manifest4.push({
        src: "/images/131.png"
    });
    manifest4.push({
        src: "/images/132.png"
    });

    manifest4.push({
        src: "/images/ai1.png"
    });
    manifest4.push({
        src: "/images/ai2.png"
    });
    manifest4.push({
        src: "/images/ai3.png"
    });
    manifest4.push({
        src: "/images/ai4.png"
    });
    manifest4.push({
        src: "/images/ai5.png"
    });
    manifest4.push({
        src: "/images/ai6.png"
    });
    manifest4.push({
        src: "/images/ai7.png"
    });
    manifest4.push({
        src: "/images/ai8.png"
    });

    startPreload4();
}


function startPreload() {
    preload = new createjs.LoadQueue(false);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.loadManifest(manifest);
}

function startPreload2() {
    preload2 = new createjs.LoadQueue(false);
    preload2.on("progress", handleFileProgress2);
    preload2.on("complete", loadComplete2);
    preload2.loadManifest(manifest2);
}

function startPreload3() {
    preload3 = new createjs.LoadQueue(false);
    preload3.on("progress", handleFileProgress3);
    preload3.on("complete", loadComplete3);
    preload3.loadManifest(manifest3);
}

function startPreload4() {
    preload4 = new createjs.LoadQueue(false);
    preload4.on("progress", handleFileProgress4);
    preload4.on("complete", loadComplete4);
    preload4.loadManifest(manifest4);
}

var loadImgHeight1 = 0;
var loadImgHeight2 = 0;
var loadImgHeight3 = 0;
var loadImgHeight4 = 0;

//已加载完毕进度
function handleFileProgress(event) {
    loadImgHeight1 = preload.progress * 64;
    $(".loadImg2").height(loadImgHeight1 + loadImgHeight2 + loadImgHeight3 + loadImgHeight4);
    setTimeout(function () {
        $('.loadImg5 span').html(Math.round((preload.progress + preload2.progress + preload3.progress + preload4.progress) * 25));
    }, 100);
}

function handleFileProgress2(event) {
    loadImgHeight2 = preload2.progress * 64;
    $(".loadImg2").height(loadImgHeight1 + loadImgHeight2 + loadImgHeight3 + loadImgHeight4);
    setTimeout(function () {
        $('.loadImg5 span').html(Math.round((preload.progress + preload2.progress + preload3.progress + preload4.progress) * 25));
    }, 100);
}

function handleFileProgress3(event) {
    loadImgHeight3 = preload3.progress * 64;
    $(".loadImg2").height(loadImgHeight1 + loadImgHeight2 + loadImgHeight3 + loadImgHeight4);
    setTimeout(function () {
        $('.loadImg5 span').html(Math.round((preload.progress + preload2.progress + preload3.progress + preload4.progress) * 25));
    }, 100);
}

function handleFileProgress4(event) {
    loadImgHeight4 = preload4.progress * 64;
    $(".loadImg2").height(loadImgHeight1 + loadImgHeight2 + loadImgHeight3 + loadImgHeight4);
    setTimeout(function () {
        $('.loadImg5 span').html(Math.round((preload.progress + preload2.progress + preload3.progress + preload4.progress) * 25));
    }, 100);
}

//全度资源加载完毕
var isLoadEnd1 = false;
var isLoadEnd2 = false;
var isLoadEnd3 = false;
var isLoadEnd4 = false;

function loadComplete(event) {
    isLoadEnd1 = true;
    if (isLoadEnd1 && isLoadEnd2 && isLoadEnd3 && isLoadEnd4) {
        goPage1();
    }
}

function loadComplete2(event) {
    isLoadEnd2 = true;
    if (isLoadEnd1 && isLoadEnd2 && isLoadEnd3 && isLoadEnd4) {
        goPage1();
    }
}

function loadComplete3(event) {
    isLoadEnd3 = true;
    if (isLoadEnd1 && isLoadEnd2 && isLoadEnd3 && isLoadEnd4) {
        goPage1();
    }
}

function loadComplete4(event) {
    isLoadEnd4 = true;
    if (isLoadEnd1 && isLoadEnd2 && isLoadEnd3 && isLoadEnd4) {
        goPage1();
    }
}

function loadImg() {
    setupManifest();
    setupManifest2();
    setupManifest3();
    setupManifest4();
}

var isGo1 = false;

function goPage1() {
    if (!isGo1 && isConnect) {
        isGo1 = true;
        $('body').removeClass('noImg');
        $('.page0').fadeOut(500);
        if (pageNumb == 1) {
            $('.page1').fadeIn(500);
            setTimeout(function () {
                page1Act();
            }, 500);
            _czc.push(["_trackEvent", "LOVO_jd", "首页"]);
        } else {
            $('.page5').fadeIn(500);
            setTimeout(function () {
                page5Act();
            }, 500);
        }
    }
}

function loadHandler(event) {
    // 这会引发针对每个已注册的声音。
    bgm = createjs.Sound.play("bgm", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1});
}

function page1Act() {
    $('.page1Logo').addClass('upShow1').show();
    $('.page11').addClass('upShow2').show();
    $('.page12').addClass('upShow3').show();
    //$('.page13').addClass('upShow4').show();
    $('.page14').addClass('upShow5').show();
    $('.page15').addClass('upShow6').show();
    $('.page16').addClass('upShow7').show();
    setTimeout(function () {
        $('.page14').removeClass('upShow5').addClass('page15Act');
        $('.page15').removeClass('upShow6').addClass('page15Act');
        $('.page1Btn2,.page1Btn3').show();
    }, 2000);
}

var isGo2 = false;

function goPage2() {
    if (!isGo2) {
        isGo2 = true;
        $('.page1').fadeOut(500);
        $('.page2').fadeIn(500);
        setTimeout(function () {
            page2Act();
            _czc.push(["_trackEvent", "LOVO_jd", "等待好友加入"]);
        }, 500);
    }
}

function page2Act() {
    countdownInterval = setInterval(function () {
        countdown();
    }, 1000);
}

var countdownInterval;

function countdown() {
    var cdt = parseInt($('.countdown').html());
    cdt = cdt - 1;
    if (cdt < 0) {
        nomanCountdown();
    } else {
        $('.countdown').html(cdt);
    }
}

function nomanCountdown() {
    clearInterval(countdownInterval);
    $('.page2').hide();
    $('.page3').show();
    $('.page34').addClass('page34Act');
    setTimeout(function () {
        $('.page31').fadeIn(500);
    }, 200);
}

function tryAgain() {
    window.location.reload();
}

function getMobile2() {
    clearInterval(countdownInterval);
    $('.page2').hide();
    $('.page4').show();
    _czc.push(["_trackEvent", "LOVO_jd", "好友加入成功"]);
}

function page5Act() {
    socket.emit('join', id, function (res) {
        console.log(res);
        if (res.ret != 0) {
            isConnect = false;
            showError(res.msg);
        }
    });
}

function getAct() {
    $('.page').hide();
    $('.pageAct').show();

    $('.actImgFail1').hide();
    $('.actImgFail2').hide();
    $('.actImgFailBtn').hide();

    setTimeout(function () {
        $('.bg2').show();
    }, 900);

    setTimeout(function () {
        $('.pageActLogo').fadeIn(500);
        $('.pageActImg1').addClass('upShowA1').show();
        $('.pageActImg2').addClass('upShowA2').show();
        $('.pageActImg3').addClass('upShowA3').show();
        $('.pageActBtn1').delay(500).fadeIn(500);
    }, 3200);

    setTimeout(function () {
        bgm.stop();
        bgm1 = createjs.Sound.play("bgm1");
        setTimeout(function () {
            bgm2 = createjs.Sound.play("bgm2");
            setTimeout(function () {
                bgm = createjs.Sound.play("bgm", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1});
            }, 3500);
        }, 500);
    }, 850);

    setTimeout(function () {
        // $('.pageRes13').addClass('pageRes13Act').show();
        // $('.pageRes13').touchwipe({
        //     min_move_x: 40, //横向灵敏度
        //     min_move_y: 40, //纵向灵敏度
        //     wipeUp: function() {
        //         goProduct();
        //     }, //向上滑动事件
        //     preventDefaultEvents: true //阻止默认事件
        // });
        //$('.pageRes13').on('click',function(){goProduct();});
        $('.bg2').hide();
        _czc.push(["_trackEvent", "LOVO_jd", "恭喜您获得红包"]);
    }, 3300);

    $('.aImg1').addClass('aImg1Act').show();
    $('.ai1').addClass('ai1Act').show();
    $('.ai2').addClass('ai2Act').show();
    $('.ai3').addClass('ai3Act').show();
    $('.ai4').addClass('ai4Act').show();
    $('.ai5').addClass('ai5Act').show();
    $('.ai6').addClass('ai6Act').show();
    $('.ai7').addClass('ai7Act').show();
    $('.ai8').addClass('ai8Act').show();

    $('.actImg51').addClass('actImg51Act').show();
    $('.actImg52').addClass('actImg52Act').show();
    $('.actImg53').addClass('actImg53Act').show();
    $('.actImg54').addClass('actImg54Act').show();
    $('.actImg55').addClass('actImg55Act').show();
    $('.actImg56').addClass('actImg56Act').show();
    $('.actImg57').addClass('actImg57Act').show();

    $('.actStep1').addClass('actStep1Hide');

    if (pageNumb == 1) {
        $('.a1Bottle').addClass('a1BottleAct');
        $('.a1Cap').addClass('a1CapAct');
        $('.actImg4').addClass('actImg4Act').show();
        $('.actImg6').addClass('actImg6Act').show();
        $('.actImg7').addClass('actImg7Act').show();
    } else if (pageNumb == 2) {

    }
}

function getActFail() {
    $('.page').hide();
    $('.pageAct').show();

    setTimeout(function () {
        $('.bg2').show();
    }, 900);

    // setTimeout(function() {
    //     $('.pageActImg1').addClass('upShowA1').show();
    //     $('.pageActImg2').addClass('upShowA2').show();
    //     $('.pageActImg3').addClass('upShowA3').show();
    //     $('.pageActBtn1,.pageActBtn2').delay(500).fadeIn(500);
    // }, 3200);
    setTimeout(function () {
        $('.aImg1').removeClass('aImg1Act').hide();
        $('.actImgFail1').addClass('upShow3').show();
        $('.actImgFail2').addClass('upShow4').show();
        $('.actImgFailBtn').addClass('upShow5').show();
    }, 3000);

    setTimeout(function () {
        bgm.stop();
        //bgm1=createjs.Sound.play("bgm1");
        setTimeout(function () {
            //bgm2=createjs.Sound.play("bgm2");
            setTimeout(function () {
                bgm = createjs.Sound.play("bgm", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1});
            }, 3000);
        }, 500);
    }, 850);

    setTimeout(function () {
        //$('.pageRes13').addClass('pageRes13Act').show();
        // $('.pageRes13').touchwipe({
        //     min_move_x: 40, //横向灵敏度
        //     min_move_y: 40, //纵向灵敏度
        //     wipeUp: function() {
        //         goProduct();
        //     }, //向上滑动事件
        //     preventDefaultEvents: true //阻止默认事件
        // });
        //$('.pageRes13').on('click',function(){goProduct();});
        $('.bg2').hide();
        _czc.push(["_trackEvent", "LOVO_jd", "恭喜您获得红包"]);
    }, 3300);

    $('.aImg1').addClass('aImg1Act');
    $('.ai1,.ai2,.ai3,.ai4,.ai5,.ai6,.ai7,.ai8').hide();
    // $('.ai1').addClass('ai1Act');
    // $('.ai2').addClass('ai2Act');
    // $('.ai3').addClass('ai3Act');
    // $('.ai4').addClass('ai4Act');
    // $('.ai5').addClass('ai5Act');
    // $('.ai6').addClass('ai6Act');
    // $('.ai7').addClass('ai7Act');
    // $('.ai8').addClass('ai8Act');


    $('.actImg51,.actImg52,.actImg53,.actImg54,.actImg55,.actImg56,.actImg57').hide();
    // $('.actImg51').addClass('actImg51Act');
    // $('.actImg52').addClass('actImg52Act');
    // $('.actImg53').addClass('actImg53Act');
    // $('.actImg54').addClass('actImg54Act');
    // $('.actImg55').addClass('actImg55Act');
    // $('.actImg56').addClass('actImg56Act');
    // $('.actImg57').addClass('actImg57Act');

    //$('.actStep1').addClass('actStep1Hide');

    if (pageNumb == 1) {
        $('.actImg4,.actImg6,.actImg7').hide();
        // $('.a1Bottle').addClass('a1BottleAct');
        // $('.a1Cap').addClass('a1CapAct');
        // $('.actImg4').addClass('actImg4Act');
        // $('.actImg6').addClass('actImg6Act');
        // $('.actImg7').addClass('actImg7Act');
    } else if (pageNumb == 2) {

    }
}

function showLoading() {
    $('.loadingBg').show();
    $('.loadingGif').show();
}

function closeLoading() {
    $('.loadingBg').hide();
    $('.loadingGif').hide();
}

function showRule() {
    $('.pageRuleBg').show();
    $('.pageRule').show();
}

function closeRule() {
    $('.pageRuleBg').hide();
    $('.pageRule').hide();
}

function getLottery() {
    showLoading();
    //ajax 开红包

    //成功中奖
    /*closeLoading();
     $('.pageAct').hide();
     $('.pageRes1').show();*/

    //已经开过红包
    /*closeLoading();
     $('.pageAct').hide();
     $('.pageRes2').show();*/

    //开红包失败 或者 未中奖
    /*closeLoading();
     $('.pageAct').hide();
     $('.pageRes3').show();*/

    //口令
    productCloseTo = 2;
    closeLoading();
    $('.pageAct').hide();
    $('.pageRes4').show();
    _czc.push(["_trackEvent", "LOVO_jd", "恭喜您获得奖品"]);
}

function showError(err_msg) {
    $('body').removeClass('noImg');
    $('.page').hide();
    $('.pageError').show();
    $('#err_msg').html(err_msg);
}
function hideError() {
    $('.pageError').hide();
    $('.page4').show();
    $('.page5').show();
}

var productCloseTo = 1;
function goProduct() {
    if (productCloseTo == 1) {
        $('.pageAct').addClass('upHidden');
    }
    else {
        $('.pageRes4').addClass('upHidden');
    }
    $('.pageProduct').addClass('downShow').show();
    _czc.push(["_trackEvent", "LOVO_jd", "下拉有惊喜"]);
}

function closeProduct() {
    if (productCloseTo == 1) {
        $('.pageAct').removeClass('upHidden').show();
    }
    else {
        $('.pageRes4').removeClass('upHidden').show();
    }
    $('.pageProduct').removeClass('downShow').hide();
}

function showCode(code, trackNumb) {
    $('.code2').html(code);
    $('.pageRuleBg').show();
    $('.pageProductCode').fadeIn(500);
    _czc.push(["_trackEvent", "LOVO_jd", "产品" + trackNumb]);
}

function closePageProductCode() {
    $('.pageRuleBg').hide();
    $('.pageProductCode').fadeOut(500);
}

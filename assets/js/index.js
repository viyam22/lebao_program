$(function() {
  var result = localStorage.getItem('result') 
    ? localStorage.getItem('result').split(',').pop()
    : '-1';
  var RESULT = ['0', '1', '2', '3', '4', '5'];
  var resultHash;
$.fn.longPress = function(fn0, fn1, fn2) {
  var oldTime, newTime, costTime;
  this.on('touchstart', function(event) {
    event.preventDefault();
    oldTime = Date.now();
    fn0();
  });
  this.on('touchend', function(event) {
    event.preventDefault();
    newTime = Date.now();
    costTime = newTime - oldTime;
    if (costTime <= 1500) {
      if (fn2) {
        fn2();
      }
    } else {
      fn1();
    }
  });
}
var listenHashChange = function(dosome) {
  if( ("onhashchange" in window) && ((typeof document.documentMode==="undefined") || document.documentMode==8)) {  
    window.onhashchange = dosome;
  } else {  
    //兼容性写法之后再来 
  }
}

var preload = function(callback) {
  $('.loading').removeClass('hide');
  var imgSrc = [
    'http://oqwhnnwix.bkt.clouddn.com/finger.png',
    'http://oqwhnnwix.bkt.clouddn.com/home.png', 
    'http://oqwhnnwix.bkt.clouddn.com/home-logo.png',
    'http://oqwhnnwix.bkt.clouddn.com/tunnel.png',
    'http://oqwhnnwix.bkt.clouddn.com/cloud.png',
    'http://oqwhnnwix.bkt.clouddn.com/word/1.png',
    'http://oqwhnnwix.bkt.clouddn.com/word/2.png',
    'http://oqwhnnwix.bkt.clouddn.com/word/3.png',
    'http://oqwhnnwix.bkt.clouddn.com/word/4.png',
    'http://oqwhnnwix.bkt.clouddn.com/word/5.png',    
    'http://oqwhnnwix.bkt.clouddn.com/word/6.png',
    'http://oqwhnnwix.bkt.clouddn.com/result-share.png',
    'http://oqwhnnwix.bkt.clouddn.com/link/transition_v.png',
    'http://oqwhnnwix.bkt.clouddn.com/result-test-again.png',
    'http://oqwhnnwix.bkt.clouddn.com/longPress.png'
  ];
  if (result !== '-1') {
    imgSrc.push('http://oqwhnnwix.bkt.clouddn.com/link/result'+ result +'.png');
    imgSrc.push('http://oqwhnnwix.bkt.clouddn.com/link/result_cloud'+ result +'.png');
  }
  var loaded = 0;
<<<<<<< HEAD
  var toload = imgSrc.length - 1;
=======
  var toload = imgSrc.length;
>>>>>>> e07e64ecfec764822640c06d75652a56a8d0624d
  for (var i = 0; i < toload; i++) {
    var img = new Image();

    img.onload = function() {
      loaded ++;
      var percent = parseInt(loaded / toload * 100);
      $('.loading-text').text(percent + '%');
      if (percent === 100) {
        callback();
      }
    }
    img.src = imgSrc[i];
  }
  console.log(imgSrc);    
};

var removeShow = function() {
  $('.index').removeClass('show');
  $('.test').removeClass('show');
  $('.result0').removeClass('show');
  $('.result1').removeClass('show');
  $('.result2').removeClass('show');
  $('.result3').removeClass('show');
  $('.result4').removeClass('show');
}

var changePage = function() {
  removeShow();
  var hash = !!~location.hash.indexOf('#/result') ? '#/result' : location.hash;
  switch(hash) {
    case '#/index':
      $('.index').addClass('show');
      setResult();
      preload(function() {
        $('.loading').addClass('hide');
      });
      break;
    case '#/test': 
      $('.test').addClass('show');
      break;
    case '#/result':
      result = result === -1 ? location.hash.split('#/result')[1] : result;
      $('.result').addClass('show');
      preload(function() {
        showResultPage();
        $('.loading').addClass('hide');
      });
      break;
  }
}

var stringToArr = function(storageItem) {
  //将缓存字符串改成数组
  var arr = storageItem.split(',');
  return arr;
}
var setResult = function() {
  //将原有性格数组和缓存数组结合
  var storageArr = localStorage.getItem('result') ? RESULT.concat(stringToArr(localStorage.getItem('result'))) : RESULT;
  //随机数组下标
  var randomIndex = storageArr[Math.floor(Math.random() * storageArr.length)];
  result = storageArr[randomIndex];
  $('.result').addClass('result' + randomIndex);
}


var showResultPage = function() {
  $('.result').addClass('show resultCloud' + result + ' moveResultCloud');
  setTimeout(function() {
    $('.result').removeClass('show resultCloud' + result + ' moveResultCloud');
    $('.result').addClass('show result' + result + ' moveResult' + result);
  }, 2000);
  setTimeout(function() {
    $('.result').removeClass('show result' + result + ' moveResult' + result);
    $('.result').addClass('show result' + result + ' moveResultFaster' + result);
  }, 4800);
  setTimeout(function() {
    $('.result-btn-wrap').addClass('show');
  }, 6000);
} 
void function() {
  console.log('result', result)
  listenHashChange(changePage);
  result = result === -1 ? location.hash.split('#/result')[1] : result;
  if (result === '-1') {
    //说明未测试过
    if (location.hash === '#/index') {
      changePage();
    } else {
      location.hash = '#/index';
    }
  } else {
    //测试过
    // if (!!~location.hash.indexOf('#/result')) {
      changePage();
    // } 
    // else {
      location.hash = '#/result' + result;
    // }
  }
  var animateWord;
  $('.test-btn').longPress(function() {
    $('.word').removeClass('transition');
    var i = 0;
    animateWord = setInterval(function() {
      if (i % 2 === 0) {
        $('.word' + ((i - 4) % 6)).removeClass('moveToBottomRight');
        $('.word' + i % 6).addClass('moveToBottomRight');
      } else {
        $('.word' + ((i - 4) % 6)).removeClass('moveToBottomLeft');
        $('.word' + i % 6).addClass('moveToBottomLeft');
      }
      i++;
    }, 500);
  }, function() {
    $('.test-btn').addClass('hide');
    $('.word').addClass('transition');
    //图片文字回动，
    $('.word').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
    clearInterval(animateWord);
    //出现云
    setTimeout(function() {
      $('.test-cloud').addClass('show moveCloud');
      $('.cloud-background').addClass('show moveCloud');
    }, 3000);
    //缓存随机结果
    var storageResult = localStorage.getItem('result') ? stringToArr(localStorage.getItem('result')).concat([result]) : [result];
    // console.log('缓存', storageResult);
    localStorage.setItem('result', storageResult);
    //跳转到结果页面
    setTimeout(function() {
      location.hash = '#/result' + result;
      showResultPage();
    }, 4000);
  }, function() {
    $('.word').addClass('transition');
    $('.word').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
    clearInterval(animateWord);
    $('.test-tip').css({'opacity': 1});
    setTimeout(function() {
      $('.test-tip').css({'opacity': 0});
    }, 500);
  });
  $('.testAgain').on('click', function() {
    // localStorage.removeItem('result');
    $('.result-btn-wrap').removeClass('show');
    $('.test-btn').removeClass('hide');
    $('.test-cloud').removeClass('show moveCloud');
    $('.cloud-background').removeClass('show moveCloud');
    $('.result').removeClass('show result' + result + ' moveResultFaster' + result);
    location.hash = '#/index';
  });
  $('.share').on('click', function() {
    $('.share-tip').addClass('show');
  });
  $('.share-tip').on('click', function() {
    $('.share-tip').removeClass('show');
  });
<<<<<<< HEAD

  // wx.config({
  //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //   appId: '', // 必填，公众号的唯一标识
  //   timestamp: '', // 必填，生成签名的时间戳
  //   nonceStr: '', // 必填，生成签名的随机串
  //   signature: '',// 必填，签名，见附录1
  //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  // });

=======
  console.log(location.href);
  $.ajax({
    type: 'post',
    url: 'http://192.168.0.53:2222/getsignature',
    data: {
        url: location.href.split('#')[0]
    },
    success: function(r) {
      r = JSON.parse(r);
      wx.config({
        debug: true,
        appId: r.appId,
        timestamp: r.timestamp,
        nonceStr: r.nonceStr,
        signature: r.signature,
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
      });
      wx.ready(function(){
        wx.onMenuShareTimeline({
          title: '乐堡 | 吹气',
          imgUrl: 'http://7xi3je.com1.z0.glb.clouddn.com/image_1471951817.437828.jpg',
          link: 'http://www.isaac-wjl.com/yefun',
          desc: 'WhatYouNeed | 的文章专栏与分类。'
        });
        wx.onMenuShareAppMessage({
          title: '乐堡 | 吹气',
          imgUrl: 'http://7xi3je.com1.z0.glb.clouddn.com/image_1471951817.437828.jpg',
          link: 'http://www.isaac-wjl.com/yefun',
          desc: 'WhatYouNeed | 的文章专栏与分类。'
        });
      });
      wx.error(res => console.log(res.errMsg));
    },
    error: function(err) {
      console.log(err);
    }
  });
>>>>>>> e07e64ecfec764822640c06d75652a56a8d0624d
}(); 


});


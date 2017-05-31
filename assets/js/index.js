$(function() {
  var result = localStorage.getItem('result') 
    ? localStorage.getItem('result').split(',').pop()
    : '-1';
  var RESULT = ['0', '1', '2', '3', '4'];
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
  console.log('preload');
  var imgSrc = [
    'http://yefun.top/assets/images/finger.png',
    'http://yefun.top/assets/images/home.png', 
    'http://yefun.top/assets/images/home-logo.png',
    'http://yefun.top/assets/images/tunnel.png',
    'http://yefun.top/assets/images/cloud.png',
    'http://yefun.top/assets/images/word/1.png',
    'http://yefun.top/assets/images/word/2.png',
    'http://yefun.top/assets/images/word/3.png',
    'http://yefun.top/assets/images/word/4.png',
    'http://yefun.top/assets/images/word/5.png',    
    'http://yefun.top/assets/images/word/6.png',
    'http://yefun.top/assets/images/result-share.png',
    'http://yefun.top/assets/images/result-test-again.png'
  ];
  if (result !== '-1') {
    // imgSrc.push('http://yefun.top/assets/images/result'+ result +'.png');
    imgSrc.push('./assets/images/result'+ result +'.png');    
  }
  var loaded = 0;
  var toload = imgSrc.length
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
  $('.result').addClass('show result' + result + ' moveResult' + result);

  setTimeout(function() {
    $('.result-btn-wrap').addClass('show');
  }, 5000);
} 
void function() {
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
    if (!!~location.hash.indexOf('#/result')) {
      changePage();
    } 
    // else {
    //   location.hash = '#/result';
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
    $('.word').addClass('transition');
    //图片文字回动，
    $('.word').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
    clearInterval(animateWord);
    //出现云
    setTimeout(function() {
      $('.test-cloud').addClass('show moveCloud');
    }, 2000);
    //缓存随机结果
    var storageResult = localStorage.getItem('result') ? stringToArr(localStorage.getItem('result')).concat([result]) : [result];
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
    $('.test-cloud').removeClass('show moveCloud');
    $('.result').removeClass('show result' + result + ' moveResult' + result);
    location.hash = '#/index';
  });

  // wx.config({
  //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //   appId: '', // 必填，公众号的唯一标识
  //   timestamp: '', // 必填，生成签名的时间戳
  //   nonceStr: '', // 必填，生成签名的随机串
  //   signature: '',// 必填，签名，见附录1
  //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  // });

}(); 

  // var SHARE = [{
  //   title: 'WhatYouNeed 作者列表',
  //   imgUrl: 'http://7xi3je.com1.z0.glb.clouddn.com/image_1471951817.437828.jpg',
  //   link: 'http://blog.whatyouneed.cc/#/page/author',
  //   desc: 'WhatYouNeed 作者列表'
  // }]

});
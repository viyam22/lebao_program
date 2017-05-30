$(function() {
  var result;
  var RESULT = ['0', '1', '2', '3', '4'];
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
  var imgSrc = [
    'https://forprogram.github.io/assets/images/home.png', 
    'https://forprogram.github.io/assets/images/einstein.png',
    './assets/images/archimedes.png',
    './assets/images/beethoven.png',
    './assets/images/picasso.png',
    './assets/images/tolstoy.png',
    'https://forprogram.github.io/assets/images/home-logo.png',
    'https://forprogram.github.io/assets/images/tunnel.png',
    'https://forprogram.github.io/assets/images/cloud.png',
    'https://forprogram.github.io/assets/images/word/1.png',
    'https://forprogram.github.io/assets/images/word/2.png',
    'https://forprogram.github.io/assets/images/word/3.png',
    'https://forprogram.github.io/assets/images/word/4.png',
    'https://forprogram.github.io/assets/images/word/5.png',    
    'https://forprogram.github.io/assets/images/word/6.png',
    'https://forprogram.github.io/assets/images/result-share.png',
    'https://forprogram.github.io/assets/images/result-test-again.png'
  ];
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
  switch(location.hash) {
    case '':
    case '#/test': 
      $('.test').addClass('show');
      break;
    case '#/result':
      $('.result').addClass('show');
      break;
    case '#/':
      $('.index').addClass('show');
      setResult(); //跳到首页就随机结果，并设置想要img的src
      break;
  }
}

var stringToArr = function(storageItem) {
  var arr = storageItem.split(',');
  return arr;
}

var checkIsTest = function() {
  var i = localStorage.getItem('result');
  if (i) {
    $()
    location.hash = '#/result';
  } else {
    location.hash = '#/';
  }
}
var setResult = function() {
  var storageArr = localStorage.getItem('result') ? RESULT.concat(stringToArr(localStorage.getItem('result'))) : RESULT;
  var randomIndex = storageArr[Math.floor(Math.random() * storageArr.length)];
  result = storageArr[randomIndex];
  var storageResult = localStorage.getItem('result') ? stringToArr(localStorage.getItem('result')).concat([randomIndex]) : [randomIndex];
  localStorage.setItem('result', storageResult);
  $('.result').addClass('result' + result);
}

void function() {
  changePage();
  listenHashChange(changePage);//初始化就监听hash变化
  checkIsTest();//检查是否已经测试过，测试过就跳到相应result页面，没有就跳到#/页面
  preload(function() {
    if (location.hash === '#/result') {
      var result = stringToArr(localStorage.getItem('result')).pop();
      $('.result').addClass('show result' + result + ' moveResult' + result);
      setTimeout(function() {
        $('.result-btn-wrap').addClass('show');
      }, 5000);
    }
    $('.loading').addClass('hide');

  });

  var animateWord;
  $('.test-btn').longPress(function() {
    $('.test-btn').addClass('test-btn-active');
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
    $('.test-cloud').addClass('show moveCloud');
    //跳转到结果页面
    setTimeout(function() {
      location.hash = '#/result';
      $('.result').addClass('show result' + result + ' moveResult' + result);
      setTimeout(function() {
        $('.result-btn-wrap').addClass('show');
      }, 5000);
    }, 4000);
  }, function() {
    $('.word').addClass('transition');
    $('.word').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
    clearInterval(animateWord);
    $('.test-p').css({'opacity': 1});
    setTimeout(function() {
      $('.test-p').css({'opacity': 0});
    }, 500);
    $('.test-btn').removeClass('test-btn-active');
  });
  $('.testAgain').on('click', function() {
    // localStorage.removeItem('result');
    $('.result-btn-wrap').removeClass('show');
    $('.test-cloud').removeClass('show moveCloud');
    $('.result').removeClass('show result' + result + ' moveResult' + result);
    $('.test-btn').removeClass('test-btn-active');
    location.hash = '#/';
  });
}(); 
});
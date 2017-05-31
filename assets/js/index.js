$(function() {
  var result = localStorage.getItem('result') 
    ? localStorage.getItem('result').split(',').pop()
    : '-1';
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
    imgSrc.push('http://yefun.top/assets/images/result'+ result +'.png');  
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
  switch(location.hash) {
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
      $('.result').addClass('show');
      preload(function() {
        showResultPage();
        $('.loading').addClass('hide');
      });
      break;
  }
}

var stringToArr = function(storageItem) {
  var arr = storageItem.split(',');
  return arr;
}
var setResult = function() {
  var storageArr = localStorage.getItem('result') ? RESULT.concat(stringToArr(localStorage.getItem('result'))) : RESULT;
  var randomIndex = storageArr[Math.floor(Math.random() * storageArr.length)];
  result = storageArr[randomIndex];
  var storageResult = localStorage.getItem('result') ? stringToArr(localStorage.getItem('result')).concat([randomIndex]) : [randomIndex];
  localStorage.setItem('result', storageResult);
  $('.result').addClass('result' + result);
}


var showResultPage = function() {
  $('.result').addClass('show result' + result + ' moveResult' + result);
  setTimeout(function() {
    $('.result-btn-wrap').addClass('show');
  }, 5000);
} 
void function() {
  listenHashChange(changePage);
  if (result === '-1') {
    //说明未测试过
    if (location.hash === '#/index') {
      changePage();
    } else {
      location.hash = '#/index';
    }
  } else {
    //测试过
    if (location.hash === '#/result') {
      changePage();
    } else {
      location.hash = '#/result';
    }
  }
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
      showResultPage();
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
    location.hash = '#/index';
  });
}(); 
});
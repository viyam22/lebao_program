$(function() {
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
var moveImg = function() {
  setTimeout(function() {
      $('.result1-btn-wrap').addClass('show');
      $('.result1-out').addClass('show');
  }, time);
}

var animateNode = function(nodeClass) {
  $(nodeClass).animate();
}

var removeShow = function() {
  $('.index').removeClass('show');
  $('.test').removeClass('show');
  $('.result1').removeClass('show');
  $('.result2').removeClass('show');
}

var changePage = function() {
  removeShow();
  switch(location.hash) {
    case '':
    case '#/':
      $('.index').addClass('show');
      break;
    case '#/test': 
      $('.test').addClass('show');
      break;
    case '#/result1':
      $('.result1').addClass('show');
      localStorage.setItem('result', '1');
      setTimeout(function() {
        $('.result1-btn-wrap').addClass('show');
        $('.result1-out').addClass('show');
      }, 2600);
      break;
    case '#/result2':
      $('.result2').addClass('show');
      localStorage.setItem('result', '2');
      break;
  }
}

var checkIsTest = function() {
  //localStorage.setItem('result', '1');  //1 2 3 4分别代表一种性格
  var i = localStorage.getItem('result');
  if (i) {
    location.hash = '#/result' + i;
  } else {
    location.hash = '#/';
  }
}
var setResult = function() {
  var result = parseInt(Math.random()*4);
  return result;
}
// var moveImg = function(father, imageName, count) {
//   var str = '';
//   for (var i = 0; i < count; i++) {
//     str += '<img class="" href="./assets/images/">'+ imageName + i +'</img>';
//   }
//   $(father).html(str);
//   $(imageName)[0].onload = function() {
//     count--;
//     if (count === 0) {
//       //图片加载完成，开始动画
//       setInterval(function() {

//       }, 300);
//     }
//   }
// }
void function() {
  changePage();
  listenHashChange(changePage);
  checkIsTest();
  var animateWord;
  $('.test-btn').longPress(function() {
    $('.test-btn').addClass('test-btn-active');
    $('.word').removeClass('transition');
    var i = 1;
    animateWord = setInterval(function() {
      if (i % 2 === 0) {
        $('.word' + i).addClass('moveToBottomRight');
      } else {
        $('.word' + i).addClass('moveToBottomLeft');
      }
      i++;
      if (i === 7) {
        i = 1;
        //此处之后再改好看
        $('.word1').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
        $('.word2').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
        $('.word3').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
        $('.word4').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
        $('.word5').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
        setTimeout(function() {
        $('.word6').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');;
        }, 1000);
      }
    }, 1000);
  }, function() {
    $('.word').addClass('transition');
    //图片文字回动，
    $('.word').removeClass('moveToBottomLeft').removeClass('moveToBottomRight');
    clearInterval(animateWord);
    //出现云
    $('.cloud').addClass('show');
    setTimeout(function() {
      //根据随机数跳转到一个性格
      location.hash = '#/result1';
    }, 2000);
  }, function() {
    isRun = false;
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
    localStorage.removeItem('result');
    $('.result1-btn-wrap').removeClass('show');
    $('.cloud').removeClass('show');
    $('.test-btn').removeClass('test-btn-active');
    $('.img1').removeClass('moveToTop');
    $('.img2').removeClass('moveToTop');
    location.hash = '#/';
  });


}(); 
});
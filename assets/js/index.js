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
var moveImg = function(imgClass, imgCount, time) {
  console.log('fuck');
  var i = 0;
  var interval = setInterval(function() {
    $(imgClass).eq(i).removeClass('top');
    $(imgClass).eq(++i).addClass('top');
    if (i === imgCount) {
      $('.result1-btn-wrap').addClass('show');
      clearInterval(interval);
    }
  }, time);

  // $(imgClass)[0].onload = function() {
  //   a++;
  //   console.log(a);
  //   if (a === imgCount) {
  //     var interval = setInterval(function() {
  //       $(imgClass).eq(i).removeClass('top');
  //       $(imgClass).eq(++i).addClass('top');
  //       if (i === imgCount) {
  //         $('.result1-btn-wrap').addClass('show');
  //         clearInterval(interval);
  //       }
  //     }, time);
  //   }
  // };
  
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
      moveImg('.result1-bg', 9, 400);
      break;
    case '#/result2':
      $('.result2').addClass('show');
      localStorage.setItem('result', '2');
      break;
  }
}

//是否已经测试过
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

  $('.test-btn').longPress(function() {
    $('.test-btn').addClass('test-btn-active');
  }, function() {
    //图片文字动，并根据随机数跳转到一个性格
    location.hash = '#/result1';
  }, function() {
    //图片文字回动，按钮恢复
    $('.test-p').addClass('show');
    setTimeout(function() {
      $('.test-p').removeClass('show');
    }, 1000);
    $('.test-btn').removeClass('test-btn-active');
  });

  $('.testAgain').on('click', function() {
    localStorage.removeItem('result');
    $('.result1-btn-wrap').removeClass('show');
    $('.test-btn').removeClass('test-btn-active');
    location.hash = '#/';
  });


}(); 
});
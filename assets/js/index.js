$(function() {
  var result = localStorage.getItem('result') 
    ? localStorage.getItem('result').split(',').pop()
    : '-1';
  var RESULT = ['0', '1', '2', '3', '4', '5'];
  var resultHash;
  var TITLE = ['#野出趣#我就是 潮爆IQ博士,世界无法阻止我卖萌', 
  '#野出趣#我就是浴缸力学大师，宇宙这么大，周末去野一把', 
  '#野出趣#我就是捏住命运咽喉的男人，黑白键一出手，随时开躁', 
  '#野出趣#我就是抽象派狂人，老子就是艺术',
  '#野出趣#我就是逃课贵族，朋友圈学霸是怎样炼成的？',
  '#野出趣#我就是人类爸爸，以人民的名义，吃一口禁果']
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
    imgSrc.push('http://oqwhnnwix.bkt.clouddn.com/link/result0'+ result +'.png');
    imgSrc.push('http://oqwhnnwix.bkt.clouddn.com/link/result_cloud'+ result +'.png');
  }
  var loaded = 0;
  var toload = imgSrc.length;
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
  listenHashChange(changePage);
  result = result === -1 ? location.hash.split('#/result')[1] : result;
  var title = result === -1 ? '野出趣' : TITLE[result];
  $('title').text(title);
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
      console.log('----', location.search);
      location.hash = '#/result' + result;
      // location.replace('')
      $('title').html(TITLE[result]);
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
    $('title').text('野出趣');
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

  // var weixinShareLogo = '../assets/images/headImg.png';		
  // $('body').prepend('<div style=" overflow:hidden; width:0px; height:0; margin:0 auto; position:absolute; top:-800px;"><img src="'+ weixinShareLogo +'"></div>')	};

  // console.log(location.href);
  // $.ajax({
  //   type: 'post',
  //   url: 'http://119.29.26.21:2222/getsignature',
  //   data: {
  //       url: location.href.split('#')[0]
  //   },
  //   success: function(r) {
  //     r = JSON.parse(r);
  //     wx.config({
  //       debug: true,
  //       appId: r.appId,
  //       timestamp: r.timestamp,
  //       nonceStr: r.nonceStr,
  //       signature: r.signature,
  //       jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage', 'chooseImage', 'playVoice']
  //     });
  //     wx.ready(function(){
  //       wx.onMenuShareTimeline({
  //         title: '野出趣',
  //         imgUrl: 'http://oqwhnnwix.bkt.clouddn.com/home-logo.png',
  //         link: location.href,
  //         desc: '世界无法阻止我卖萌'
  //       });
  //       wx.onMenuShareAppMessage({
  //         title: '野出趣',
  //         imgUrl: 'http://7xi3je.com1.z0.glb.clouddn.com/image_1471951817.437828.jpg',
  //         link: location.href,
  //         desc: '世界无法阻止我卖萌'
  //       });
  //     });
  //     wx.error(res => console.log(res.errMsg));
  //   },
  //   error: function(err) {
  //     console.log(err);
  //   }
  // });
}(); 


});


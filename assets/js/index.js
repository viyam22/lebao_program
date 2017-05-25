$(function() {
var listenHashChange = function(dosome) {
  if( ("onhashchange" in window) && ((typeof document.documentMode==="undefined") || document.documentMode==8)) {  
    window.onhashchange = dosome;
  } else {  
    //兼容性写法之后再来 
  }
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
    case '#/':
      $('.index').addClass('show');
      break;
    case '#/test': 
      $('.test').addClass('show');
      break;
    case '#/result1':
      $('.result1').addClass('show');
      localStorage.setItem('result', '1');
      break;
    case '#/result2':
      $('.result2').addClass('show');
      localStorage.setItem('result', '1');
      break;
  }
}

//是否已经测试过
var checkIsTest = function() {
  //localStorage.setItem('result', '1');  //1 2 3 4分别代表一种性格
  var i = localStorage.getItem('result');
  if (i) {
    location.hash = '#/result' + i;
  }
}

void function() {
  location.hash = '#/';
  listenHashChange(changePage);
  checkIsTest();

  $('.index').on('click', function() {
    location.hash = '#/test';
  });
  $('.test').on('click', function() {
    location.hash = '#/result1';
  });
  $('.testAgain').on('click', function() {
    localStorage.removeItem('result');
    location.hash = '#/';
  });
}(); 

});
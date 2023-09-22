"use strict";

/* -jQuery- Menu Settings
-------------------------------------------------------------*/

$(function() {
  let lastInnerWidth = window.innerWidth;
  let scrollBar = window.innerWidth - $(window).width();
  const behavior  = $('html').css('scroll-behavior');
  const menuTransition = 400;
  let bodyScrollY;
  const bodyTop = Number($('body').css('top').replace('px', ''));

  navInit();

  $(window).on('resize', function(){
    if ( lastInnerWidth != window.innerWidth ){
      if ( $('.menu-trigger').prop('open') ){
        $('html').removeClass('open');
        $('#backdrop-gNav').fadeOut('fast');
        $('.main-menu').attr('aria-hidden', true);
        $('.menu-trigger').prop('open', false);
      }

      navInit();
      lastInnerWidth = window.innerWidth;
    }

    scrollBar = window.innerWidth - $(window).width();
  });

  $('#backdrop-gNav, .main-menu').on('click', function(){
    if ( $('.menu-trigger').prop('open') ){
      navClose();
    }
  });

  $('.menu-trigger summary').on('click', function(event){
    if ( $('.menu-trigger summary').is(':visible') ){
      if ( $('.menu-trigger').prop('open') ){
        event.preventDefault();
        navClose();
      }else{
        navOpen();
      }
    }
  });

  function navInit(){
    if ( $('.menu-trigger summary').is(':visible') ){
      $('.menu-trigger').prop('open', false);
      $('.main-menu').attr('aria-hidden', true);
    }else{
      $('.menu-trigger').prop('open', true);
      $('.main-menu').attr('aria-hidden', false);
    }
  }

  function navOpen(){
    bodyScrollY = $(window).scrollTop();

    if ( scrollBar == 0 ){
      $('html').addClass('no-scroll');
    }

    $('html').addClass('open').css('scroll-behavior', 'auto');
    $('body').css('top', bodyTop - bodyScrollY);
    $('#backdrop-gNav').fadeIn('fast');
    $('.main-menu').attr('aria-hidden', false);
  }

  function navClose(){
    $('.menu-trigger').addClass('close');
    $('html').removeClass('open').removeClass('no-scroll');
    $('#backdrop-gNav').fadeOut('fast');
    $('.main-menu').attr('aria-hidden', true);
    $('body').css('top', bodyTop);
    $(window).scrollTop(bodyScrollY);
    $('html').css('scroll-behavior', behavior);

    setTimeout(function(){
      if ( $('.menu-trigger summary').is(':visible') ){
        $('.menu-trigger').prop('open', false);
      }
      $('.menu-trigger').removeClass('close');
    },menuTransition);
  }
});


/* Backdrop BG Function
-------------------------------------------------------------*/
const backDropBG = document.querySelector('#backdrop-gNav');
backDropBG.addEventListener('click', function() {
  this.classList.removeClass('nav-open');
});



/* Back to Page Top
-------------------------------------------------------------*/
const pagetop_btn = document.querySelector(".js-pagetop");
pagetop_btn.addEventListener("click", scroll_top);
function scroll_top() {
  window.scroll({ top: 0, behavior: "smooth" });
}
/*
// スクロールされたら表示
window.addEventListener("scroll", scroll_event);
function scroll_event() {
  if (window.scrollY > 100) {
    pagetop_btn.style.opacity = "1";
  } else if (window.scrollY < 100) {
    pagetop_btn.style.opacity = "0";
  }
}
*/


/* Smooth Scroll to Anchor Link
-------------------------------------------------------------*/
/*
const pagelink = document.querySelectorAll('.js-pagelink');
for( let i = 0; i < pagelink.length; i++ ) {
  pagelink[i].addEventListener('click', smoothScroll, false);
}
// Receive siteHeader Height
const siteHeader = document.querySelector('#siteHdr').clientHeight;

function smoothScroll(e) {
  e.preventDefault();
  // Element to transition to
  let pagelinkId = e.target.hash;
  let pagelinkSection = document.querySelector(pagelinkId);
  // Scroll position
  let scrollPosition = window.scrollY + pagelinkSection.getBoundingClientRect().top - siteHeader;
  // Scroll to move
  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth"
  });
}
*/


/* Remove Anchor Link
-------------------------------------------------------------*/
(function(){
  window.addEventListener("click" , check_click);
  function check_click(e){
    let target = e.target;
    if(!target || target.tagName !== "A"){return;}
    let href = target.getAttribute("href");
    if(href.indexOf("#") === -1){return;}
    if(href.match(/^[http:|https:|\/\/]/)){return;}
    setTimeout(hash_link_url_adjust , 0);
  }
  function hash_link_url_adjust(href){
    let sp = location.href.split("#");
    history.pushState(null, null, sp[0])
  };
})()


/* Header Navi Button - js-hdrNavBtn
-------------------------------------------------------------*/

// Open & Close Button
/*
const hdrNavBtn = document.querySelector('#js-hdrNavBtn');
hdrNavBtn.addEventListener('click', function (e) {
  this.classList.toggle('js-active');
});
*/

// Aria-Label Rewrite --- Incomplete Code
/*
const hdrNavBtnClass = document.querySelector('button.hdrNavBtn');
const hdrNavBtnAria = document.querySelector('#js-hdrNavBtn').getAttribute('aria-label');
if (hdrNavBtnClass.classList.contains('js-active')) {
  hdrNavBtnAria.setAttribute('aria-label','メニューを閉じる');
} else {
  hdrNavBtnAria.setAttribute('aria-label','メニューを開く');
}
*/
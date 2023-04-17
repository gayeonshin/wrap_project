// Home
$(function(){
    $('.text1').css("transform","translateX(0px)").css("opacity","1");
    $('.text2').css("transform","translateX(0px)").css("opacity","1");
});

// Profile
// popup이 나타났다가 사라지는 효과
$(function () {
    $(".info").mouseover(function () {
        $(this).find(".popup").stop().fadeIn();
        $(this).find(".popup3").stop().fadeIn().css('display', 'flex');
    }).mouseout(function () {
        $(this).find(".popup").stop().fadeOut();
        $(this).find(".popup3").stop().fadeOut();
    });
});

// popup이 마우스를 따라 이동하는 효과
document.addEventListener("mousemove", e => {
    gsap.to(".popup", {
        x: e.clientX-600,
        y: e.clientY-700
    })
})

// Portfolio
// card swiper
/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
var animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 120 + 17
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

// Protfolio popup 효과
$(function(){
  $('.carousel-box').each(function(index){    
    $(this).click(function(){
      $('.project').fadeIn();
      $('.fade').hide();
      $('.brand').children('a').fadeIn().removeClass('active');
      $('.brand').eq(index).children('a').fadeIn().addClass('active');
      $(`.content${index+1}`).fadeIn().css('display','flex');
    });
  });

  $('.close').click(function(){
    $('.project').fadeOut();
  });
});

// Portfolio popup 클릭 이벤트 핸들러 효과
$(function(){
  $('.brand').each(function(index){
    $(this).click(function(){
      $('.brand').children('a').removeClass('active');
      $(this).children('a').addClass('active');
      $(`.fade`).hide();
      $(`.content${index+1}`).fadeIn().css('display','flex');
    });
  });
});

// Portfolio 이미지에 mouseover하면 스크롤되는 효과
$(function(){
  $('.hovering').mouseover(function(){
    $('.hovering').css('display','none');
  }).mouseout(function(){
    $('.hovering').css('display','block');
  });
});

//Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    slideChange: function () {
  
      // Home, Profile intro animation
      var ws=this.activeIndex;

      console.log(this.activeIndex);

      if(ws==0){
        $('.text1').css("transform","translateX(0px)").css("opacity","1");
        $('.text2').css("transform","translateX(0px)").css("opacity","1");
        $('.box2').css("transform","translateX(-500px)").css("opacity","0");
      }

      if(ws==1){
        $('.text1').css("transform","translateX(-300px)").css("opacity","0");
        $('.text2').css("transform","translateX(300px)").css("opacity","1");
        $('.box2').css("transform","translateX(0px)").css("opacity","1");
      }

      // Profile 제목 animation
      var textWrapper = document.querySelector('.box2 h2');
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<h2>$&</h2>");

      anime.timeline({loop: false})
      .add({
        targets: '.box2 h2',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
      })

      // Profile 인적사항 animation
      var textWrapper = document.querySelector('.info span');
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span>$&</span>");

      anime.timeline({ loop: false })
      .add({
        targets: '.info span',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        delay: (el, i) => 70 * (i + 1)
      })

      // animate()
      
      // Portfolio 제목 animation
      var textWrapper = document.querySelector('.box3 h2');
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<h2>$&</h2>");

      anime.timeline({loop: false})
      .add({
        targets: '.box3 h2',
        translateY: ["0.4em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
      })
    }
  }  
});
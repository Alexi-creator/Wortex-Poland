"use strict"

// slider ползунок, функцию пишем без оберток(область видимости)
    
function outputUpdate(vol) {
  let output = document.querySelector('#volume');
  output.value = vol;
  output.style.left = vol * 0.94 + '%';
};

document.addEventListener('DOMContentLoaded', function() {

  // при клике на play на главном блоке, меняется видео (тест)
  let video = document.querySelector('.header__video')
  let play = document.querySelector('.play-header')
  play.addEventListener('click', () => {
    video.setAttribute('src', 'video/video-test.mp4')
    play.style.display = 'none'
  })

  // burger menu
  let burgerMenu = document.querySelectorAll('.burger-wrap')
  let menuPopup = document.querySelector('.menuPopup')
  burgerMenu.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('active')
      let parent = this.parentElement
      let menu = parent.querySelector('.header__nav')
      if (menu) {
        menu.classList.toggle('active')
      }
      else {
        menuPopup.classList.toggle('active')
        document.documentElement.classList.toggle('lock')
      }
    })
  })

  // select 

  let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
        this.querySelector('.select__icon').classList.toggle('active');
    }

    function selectChoose() {
        let text = this.innerHTML,
        select = this.closest('.select'),
        currentText = select.querySelector('.select__current');
        currentText.innerHTML = text;
        select.classList.remove('is-active');
        select.querySelector('.select__icon').classList.toggle('active');
    }

  };

  select();


  // animation slideIn for a block FAQ
  
  const faqSection = document.querySelector('.faq')
  let arrPerson = document.querySelectorAll('.content-faq__chat-person')
  let arrManager = document.querySelectorAll('.content-faq__chat-manager')

  window.addEventListener('scroll', () => {
    let top = faqSection.getBoundingClientRect().top
    let height = faqSection.getBoundingClientRect().height
    let percent = top * 100 / height
    if (percent < 65.0) {
      arrPerson.forEach(function(elem) {
        elem.classList.add('active')
      })
      arrManager.forEach(function(elem) {
        elem.classList.add('active')
      })
    }
  })


  // animation scroll to sections

  const btnHome = document.querySelectorAll('.btn-home')
  const btnAbout = document.querySelectorAll('.btn-about')
  const btnFaq = document.querySelectorAll('.btn-faq')
  const btnCooperation = document.querySelectorAll('.btn-cooperation')
  const btnServices = document.querySelectorAll('.btn-services')
  const btnContacts = document.querySelectorAll('.btn-contacts')

  const arr = [btnHome, btnAbout, btnFaq, btnCooperation, btnServices, btnContacts]

  const navHeader = document.querySelector('.header__nav')

  for (let elem of arr) {
    elem.forEach(item => {
      item.addEventListener('click', findClassBlock)
    })
    
  }

  function findClassBlock() {
    this.classList.forEach(elem => {
      if (elem.startsWith("btn")) {
        let classBlock = elem.slice(4) 
        SlideToBlock(classBlock)
      }
    })
    
  }

  function SlideToBlock(classBlock) {
    let section = document.querySelector('.' + classBlock)
    burgerMenu.forEach(elem => {
      elem.classList.remove('active')
      navHeader.classList.remove('active')
    })
    section.scrollIntoView({behavior: "smooth"})
    menuPopup.classList.remove('active')
    document.documentElement.classList.remove('lock')
  }



})
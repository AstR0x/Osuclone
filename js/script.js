$(document).ready(function () {

  clickSound1 = new Audio();
  clickSound1 = new Audio();
  clickSound2 = new Audio();
  clickSound3 = new Audio();
  clickSound4 = new Audio();
  clickSound5 = new Audio();

  music = new Audio();
  music.src = 'sounds/music.mp3';

  clickSound1.src = 'sounds/clickSound1.mp3';
  clickSound2.src = 'sounds/clickSound2.mp3';
  clickSound3.src = 'sounds/clickSound3.mp3';
  clickSound4.src = 'sounds/clickSound4.mp3';
  clickSound5.src = 'sounds/clickSound5.mp3';

  var sounds = [clickSound1, clickSound2, clickSound3, clickSound4, clickSound5];

  let point = 0;
  const tryAgainBtn = $('.try-again-button');
  const grid = $('#grid');
  const gridChild = $('#grid div');
  const clock = $('.clock');
  const score = $('.score');
  const scoreBlock = $('.score-block');
  const timeBlock = $('.time-block');
  const buttonStart = $('.button-start');
  const finishScore = $('.finish-score');

  buttonStart.click(function () {
    let time = performance.now();
    buttonStart.fadeOut(150);
    setTimeout(function () {
      music.play();
      grid.css({'display': 'grid'});
      getCircle();
      scoreBlock.show();
      timeBlock.show();
      setInterval(getTime, 1000);
    }, 150);

    function getCircle() {
      let amountOfCircle = getRandomNumber(3, 6);
      let randomArray = getRandomArray(amountOfCircle);
      for (let i = 1; i <= amountOfCircle; i++) {
        gridChild.eq(randomArray[i - 1])
          .css({'visibility':'visible', 'opacity':'1', 'padding-top':'12px', 'background-color': `rgb( 
             ${getRandomNumber(0, 200)},
             ${getRandomNumber(0, 200)},
             ${getRandomNumber(0, 200)})`
          })
          .text(i)
          .attr('id', `circleNumber${i}`);

        if (i == amountOfCircle) {
          gridChild.eq(randomArray[i - 1]).addClass('circle lastCircle');
        }
        else {
          gridChild.eq(randomArray[i - 1]).addClass('circle');
        }
      }
      if ($('.lastCircle').hasClass('circle')) {
        clickCircle();
      }
    }

    function clickCircle() {
      let circle = $('.circle');
      circle.each(function () {
        let circleNumber;
        $(this).click(function () {
          let id = ($(this).attr('id'));
          id = id[12];
          for (let i = 1; i <= id; i++) {
            circleNumber = $(`#circleNumber${i}`);
            if (i == id) {
              circleNumber.text('\u2713').css({'padding-top':'6px'});
            } else {
              circleNumber
                .text('\u274c')
                .css({'background-color': '#ff3333', 'padding-top':'6px'});
            }
            circleNumber.animate({'opacity': '0', 'visiblity': 'hidden'}, 300)
              .removeClass('circle')
              .removeAttr('id');
            if (!$('.lastCircle').hasClass('circle')) {
              $('.lastCircle').removeClass('lastCircle');
              getCircle();
            }
          }
          point += 1;
          score.text(point);
          getSound();
        });
      })
    };

    function getRandomArray(amount) {
      let arrayOfRandomNumber = [];
      let randomNumber;
      arrayOfRandomNumber[0] = getRandomNumber(0, 59);
      for (let i = 1; i < amount;) {
        randomNumber = getRandomNumber(0, 59);
        if (arrayOfRandomNumber.indexOf(randomNumber) !== -1) {
          continue;
        }
        arrayOfRandomNumber[i] = randomNumber;
        i++;
      }
      console.log(arrayOfRandomNumber);
      return arrayOfRandomNumber;
    }

    function getRandomNumber(min, max) {
      return Math.round((Math.random() * (max - min) + min))
    }

    function getSound() {
      sounds[getRandomNumber(0, 4)].play();
    }

    function getTime() {
        clock.text(Math.round((performance.now() - time) / 1000));
        if (parseInt(clock.text()) >= 60) {
          timeIsOver();
      }
    }
    
    function timeIsOver() {
      grid.fadeOut();
      timeBlock.fadeOut();
      scoreBlock.fadeOut();
      setTimeout(function() {
        finishScore.fadeIn().text(`Time is over!\nYour score: ${point}`);
      }, 1500);
      setTimeout(function() {
        tryAgainBtn.fadeIn();
      }, 4500);
      tryAgainBtn.click(function() {
        location.reload();
      });
    }


  });
});
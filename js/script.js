$(document).ready(function () {


    let clickSound1 = new Audio();
    let clickSound2 = new Audio();
    clickSound1.src = 'sounds/clickSound1.mp3';
    clickSound2.src = 'sounds/clickSound2.mp3';



  let grid = $('#grid');
  let gridChild = $('#grid div');
  let score = 0;
  let scoreBlock = $('.score');
  const buttonStart = $('.button-start');

  buttonStart.click(function () {
    buttonStart.fadeOut(150);
    setTimeout(function () {
      grid.css({'display': 'grid'});
      getCircle();
      scoreBlock.show();
    }, 150);

    function getCircle() {
      let amountOfCircle = getRandomNumber(3, 6);
      let randomArray = getRandomArray(amountOfCircle);
      for (let i = 1; i <= amountOfCircle; i++) {
        gridChild.eq(randomArray[i - 1])
          .css({
            'visibility': 'visible',
            'opacity': '1', 'font-size': '48px',
            'padding-top': '14px',
            'background-color': `rgb( 
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
          id = id[id.length - 1];
          for (let i = 1; i <= id; i++) {
            circleNumber = $(`#circleNumber${i}`);
            if (i == id) {
              circleNumber.text('\u2713').css({
                'font-size': '48px',
                'padding-top': '8px'
              });
            } else {
              circleNumber
                .text('\u274c')
                .css({
                  'background-color': '#ff3333',
                  'font-size': '48px',
                  'padding-top': '8px'
                });
            }
            circleNumber.animate({'opacity': '0', 'visiblity': 'hidden'}, 300)
              .removeClass('circle')
              .removeAttr('id');
            if (!$('.lastCircle').hasClass('circle')) {
              $('.lastCircle').removeClass('lastCircle');
              getCircle();
            }
          }
          score += 100;
          scoreBlock.text(score);
          getSound();
        });
      })
    };

    function getRandomArray(amount) {
      let arrayOfRandomNumber = [];
      let randomNumber;
      arrayOfRandomNumber[0] = getRandomNumber(1, 54);
      for (let i = 1; i < amount;) {
        randomNumber = getRandomNumber(1, 54);
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
      if (getRandomNumber(0, 1)) {
        clickSound1.play();
      } else {
        clickSound2.play();
      }
    }
  });
});
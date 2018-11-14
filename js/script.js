$(document).ready(function () {
  let grid = $('#grid');
  let gridChild = $('#grid div');
  var mass = [];
  let scoreBlock = $('.score');
  let score = 0;
  const buttonStart = $('.button-start');

  buttonStart.click(function() {
    buttonStart.fadeOut(150);
    setTimeout(function(){
      grid.css({'display':'grid'});
      getCircle();
      clickCircle();
    }, 150);

    function getCircle() {
      let amountOfCircle = getRandomNumber(3, 6);
      let numberOfCircle;
      for(var i = 1; i <= amountOfCircle; i++) {
        numberOfCircle = getRandomNumber(1, 55);
        gridChild.eq(numberOfCircle)
          .css({'visibility':'visible',
            'background-color':`rgb(
             ${getRandomNumber(0,200)},
             ${getRandomNumber(0,200)},
             ${getRandomNumber(0,200)})`})
          .text(i)
          .attr('id', `circleNumber${i}`)
          .addClass('circle')
      }
    }

    function clickCircle() {
      let circle = $('.circle');
      circle.each(function(index, elem) {
          mass[index] = $(`#circleNumber${index + 1}`);
      });

      circle.each(function(index, elem) {
        $(this).click(function() {
           $(this).css( {'visibility':'hidden'} );
           if(index !== 1) {
             if(mass[index - 1].css('visibility') === 'hidden') {
               score += 100;
             } else {
               score -= 100;
             }
           }
          console.log(score);
        })
      })
    };

    function getRandomNumber(min, max) {
      return Math.round((Math.random() * (max - min) + min))
    }
  })
});
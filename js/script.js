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
      var randomArray = getRandomArray(amountOfCircle);
      let numberOfCircle;
      for(var i = 1; i <= amountOfCircle; i++) {
        // numberOfCircle = getRandomNumber(1, 55);

        gridChild.eq(randomArray[i - 1])
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
       circle.each(function() {
         var count = 0;
         $(this).click(function() {
           var id = ($(this).attr('id'));
           id = id[id.length - 1];
           for(var i = 1; i <= id; i++) {
            $(`#circleNumber${i}`).fadeOut(150);
           }


         })

      })
    };

    function getRandomArray(amount) {
      let arrayOfRandomNumber = [];
      let randomNumber;
      arrayOfRandomNumber[0] = getRandomNumber(1, 55);
      for(var i = 1; i < amount;) {
        randomNumber = getRandomNumber(1, 55);
        if(arrayOfRandomNumber.indexOf(randomNumber) !== -1) {
          continue;
        }
        arrayOfRandomNumber[i] = randomNumber;
        i++;
      }
      return arrayOfRandomNumber;
    }

    function getRandomNumber(min, max) {
      return Math.round((Math.random() * (max - min) + min))
    }


  })
});
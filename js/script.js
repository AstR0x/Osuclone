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
        console.log(randomArray);
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
             if(i == id) {
               $(`#circleNumber${i}`).text('\u2713').css( { 'font-size':'+=8px', 'padding-top':'-=10px' } );
             } else {
               $(`#circleNumber${i}`).text('\u274c').css( { 'background-color':'#ff3333','font-size':'+=8px', 'padding-top':'-=10px'} );
             }
             $(`#circleNumber${i}`).animate( { 'opacity':'0', 'visiblity':'hidden' }, 300);
           }
           score += 100;
           console.log(score);
         });

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
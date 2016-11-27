//1. so we have a total of six images, each of the images will haev a different rotating value that will change each time the game starts over
//2. each gem when selected will add to the current score until it reachs a rotating value, placed in some kind of array
//3. Once it reaches a rotating value and the score equals the array score the player wins, else the player loses
//4. wins and losses will be added to a counter along with total score

//Variables========================================

var wins = 0; //counter counter
var losses = 0;//losses counter
var valueCounter = 0; //counts and adds inputted score from user
var targetNumberArray = [104, 101, 180, 115, 130, 160, 140]; //acutal number target Array
var targetNumber; //the actual target number

//Gem Object to get random values and the images
var gems = {
	powerGem: {
		arr: [2, 5, 7],
		img: "assets/images/powergem.gif",
		value: 0
	},
	mindGem: {
		arr: [1, 11, 3],
		img: "assets/images/mindgem.gif",
		value: 0
	},
	realityGem: {
		arr: [4, 10, 9],
		img: "assets/images/realitygem.gif",
		value: 0
	},
	spaceGem: {
		arr: [15, 8, 18],
		img: "assets/images/spacegem.gif",
		value: 0
	},
	timeGem: {
		arr: [17, 6, 12],
		img: "assets/images/timegem.gif",
		value: 0
	},
	soulGem: {
		arr: [16, 13, 15],
		img: "assets/images/soulgem.gif",
		value: 0
	}
};

//Functions============================================

$(document).ready(function() {

	//Created a function to run to reset all values expect for wins and losses

	playGame = function () {	
	//getting a random target number from the array
		targetNumber = targetNumberArray[Math.floor(Math.random() * targetNumberArray.length)]

		//resets values and target number
		valueCounter = 0

		$("#target").html(targetNumber);
		$("#value").html(valueCounter);

		//empties out the div conatining all the gems

		$("#gems").empty();

		

		//Below need to convert Object.keys(gems.gemValue) into a number in a variable first, in order to create dynamic images and numbers

		
		for (var key in gems){
		//key will be powerGem, mindGem, etc
		//gems[key] will be the object that powerGem points to
		console.log('key', key);
		console.log('gems[key]', gems[key]);
			for (var gemKey in gems[key]){
				//gemKey will be arr, img, value
				//gems[key][gemKey] will be [2, 5, 7], "assets/images/powergem.gif",
				if (gemKey == 'arr'){
					gems[key].value = gems[key][gemKey][Math.floor(Math.random()*gems[key][gemKey].length)];
					console.log("value of this Gem: " + gems[key].value);

				};	

				// creates seperate images with new values for all, also creates IDs and classes

				if (gemKey == 'img'){
					var img = $('<img>').attr('class', 'gemImages').attr('id' , key).attr('src', gems[key].img).attr('data-value', gems[key].value );
					$("#gems").append(img);

				};				
			};//closese second for var key
		};//closes first var key
	

		//makes the images clickable and creates a variable to assign the data value of actual new assigned value 

		$('.gemImages').on('click' , function(){ 

				var newGemValue = ($(this).data('value'));

				console.log(newGemValue);

				//adds the value to the counter on the page

				$("#value").html(valueCounter += newGemValue);

				//wins and loss counters with reset

				if (valueCounter == targetNumber) {
					wins ++;
					$("#wins").html(wins);
					playGame();

				}else if (valueCounter >= targetNumber) {
					losses ++;
					$("#losses").html(losses);
					playGame();
				};	


		});// closes onClick
	}; //closes playGame
	
	playGame();	

}); //closes document readey
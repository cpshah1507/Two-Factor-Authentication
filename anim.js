var tiles = new Array(); // For Tiles Game
var tilesRotatedY = 3; // For User with one authentication
var tilesRotatedX = 6; // For User with two authentication
var userCorrectGuess = 0;

$(document).ready(function(){
	$('.homePage .leftHalfWrapper').animate({left:'-30%'},1000);
	$('.homePage .rightHalfWrapper').animate({right:'-30%'},1000,function(){
		$(this).hide();
		$('.leftHalfWrapper').hide();
		$('.homePageWrapper').show();
		$('body').css('overflow','visible');
		$('.header, .gameIcon, .infoIcon, .videoIcon, .homeIcon').fadeIn(1000);
	});
	
	/* Code for Navigation of Icons */
	$('.icon').click(function(){
		if($('body').hasClass('homePage') && $(this).hasClass('homeIcon'))
			return true;
		var thisIcon = $(this);
		if(!$('body').hasClass('homePage'))
		{
			if(thisIcon.hasClass("gameIcon"))
				window.location.href = "game.html";
			else if(thisIcon.hasClass("videoIcon"))
				window.location.href = "video.html";
			else if(thisIcon.hasClass("infoIcon"))
				window.location.href = "info.html";
			else if(thisIcon.hasClass("homeIcon"))
				window.location.href = "index.html";
		}
		
		
		$('.homePageWrapper').hide();
		$('.leftHalfWrapper, .rightHalfWrapper').show();
		$('.leftHalfWrapper').animate({left:'-70%'},1000);
		$('.rightHalfWrapper').animate({right:'-70%'},1000,function(){
			$(this).hide();
			$('.leftHalfWrapper').hide();
			if(thisIcon.hasClass("gameIcon"))
				window.location.href = "game.html";
			else if(thisIcon.hasClass("videoIcon"))
				window.location.href = "video.html";
			else if(thisIcon.hasClass("infoIcon"))
				window.location.href = "info.html";
			else if(thisIcon.hasClass("homeIcon"))
				window.location.href = "index.html";	
		});	
	});
	
	/* For Games Home Page */
	if($('body').hasClass('gamePage'))
	{
		$(document).mousemove(function(e){
			if(e.pageX > 210 && e.pageX < 610 && e.pageY > 200 && e.pageY < 455)
				$('body.gamePage .cardWrapper .sherlockCard').removeClass('cardAnimBack').addClass('cardAnim');
			else
				$('body.gamePage .cardWrapper .sherlockCard').addClass('cardAnimBack').removeClass('cardAnim');
		});
	}
	$('body.gamePage .cardWrapper').click(function(){
		window.location.href = "sherlockHome.html";
	})
	$('body.gamePage .cardSecondWrapper').click(function(){
		window.location.href = "officeHome.html";
	});
	
	/* For Sherlock Home Page */
	$('.sherlockHomePage .playButton').click(function(){
		$(this).hide();
		$('.wrapper').css('background-image','url("images/The_Reichenbach_Fall.png")');
		$('.story').html('Instructions:<br/><ul><li>Memorize the pattern</li><li>Select what you saw to get Moriarty\'s password!</li></ul>');
		$('.storyPopUp').animate({height:'300px','top':'180px'},1000,function(){
			setTimeout(function(){
				window.location.href = "sherlock1.html";
			},1000);
		});
	});

	/* For Office Page */
	$('.officeHomePage .playButton').click(function(){
		$(this).hide();
		$('.managerTitle, .ceoTitle').hide();
		$('.story').html('Instructions:<br/><ul><li>Identify the access card</li><li>Click on the same access card in the room.</li><li style="font-weight:bold">You will have 10 seconds to find it!</ul>');
		//$('.storyPopUp').animate({height:'300px','top':'180px'},1000,function(){
			setTimeout(function(){
				window.location.href = "findCard1.html";
			},3000);
			//});
		
	});
	/* For Tiles Game */
	
	if($('body').hasClass('googleAccountPage'))
	{
		var tilesAnimated;
		if($('body').hasClass('userX'))
			tilesAnimated = tilesRotatedX;
		else
			tilesAnimated = tilesRotatedY;
			
		for(i = 0;i<tilesAnimated;i++)
		{
			var isSameElement = false;
			num = Math.floor(Math.random()*9);
			console.log(num);
			for(j=0;j<tiles.length;j++)
			{
				if(num == tiles[j])
				{
					isSameElement = true;
					break;
				}
			}
			
			if(isSameElement == true)
			{
				i--;
				continue;
			}
			else
			{
				tiles[i] = num;
				$('.tile').eq(num).addClass('animTile');
			}
		}
	}
	
	$('.googleAccountPage .tile').click(function(){
		var tilesAnimated;
		if($('body').hasClass('userX'))
			tilesAnimated = tilesRotatedX;
		else
			tilesAnimated = tilesRotatedY;
			
		var isGuessCorrect = false;
		if($(this).hasClass('animCompleteTile'))
			return true;
		for(var i=0; i<$('.tile').length;i++)
		{
			
			if($(this).index() == tiles[i])
			{
				userCorrectGuess++;
				isGuessCorrect = true;
				$(this).addClass('animCompleteTile');
				if(userCorrectGuess == tilesAnimated)
				{
					if($('body').hasClass('googleAccountPage'))
					{
						if($('body').hasClass('userX'))
							window.location.href = "passwordHacked2.html";
						else
							window.location.href = "passwordHacked1.html";
					}
				}
			}
		}
		if(isGuessCorrect == false)
			//alert('User Lost!');
			{
				$('.tile').click(function(){
					return false;
				})
				$('.loseMsg').fadeIn(1000);
				setTimeout(function(){
				window.location.href = "sherlockHome.html";
				},2000);
			}
	});
	
	if($('body').hasClass('infoPage'))
	{
		$('html,body').css('overflow','visible');
		$('.leftSideBar, .rightSideBar').css('position','fixed');
	}
	//$('.videoPage .video-js').css('height','400px');
	
	/* Script for find thing in picture game */

	if($('body').hasClass('findCardPage') || $('body').hasClass('findCardPageUserX'))
	{
		$('.cardImage').fadeIn(1000).delay(1000).fadeOut(500,function(){
			var i = 10;
			if(i >= 0)
			{
				$('.timeSeconds').html(i);
				i--;
			}
			setInterval(function(){
				if(i >= 0)
				{
					$('.timeSeconds').html(i);
					i--;
				}	
				else
				{
					alert('You Lose!');
					window.location.href="officeHome.html";
				}
			},1000);
			$('.picture, .timer, .timerWrapper, .timeSeconds').fadeIn(500);
			$('.timer').addClass('timerAnim');
		});

	}
	
	/* Script for finding the Card */
	$('body.findCardPage .picture').click(function(e){
		if(e.pageX > 450 && e.pageX < 510 && e.pageY > 510 && e.pageY < 560)
		{
			window.location.href = "cardSuccess1.html";	
		}
	});
	
	if($('body').hasClass('cardFound1'))
	{
		setTimeout(function(){
		window.location.href = "officeDoor1.html";	
		},3000);
	}
	
	if($('body').hasClass('passwordHacked1'))
	{
		setTimeout(function(){
		window.location.href = "hackMoriarty1.html";	
		},3000);
	}
	
	if($('body').hasClass('cardFound2'))
	{
		setTimeout(function(){
		window.location.href = "officeDoor2.html";	
		},3000);
	}
	
	if($('body').hasClass('passwordHacked2'))
	{
		setTimeout(function(){
		window.location.href = "hackMoriarty2.html";	
		},3000);
	}
	
	
	$('body.findCardPageUserX .picture').click(function(e){
		if(e.pageX > 235 && e.pageX < 285 && e.pageY > 590 && e.pageY < 605)
			window.location.href = "cardSuccess2.html";
	});
	
	/* Script for Card Sucess */
	if($('body').hasClass('cardSuccessPage'))
	{
		$('.newCardImage').animate({width:'332px'},3000,function(){
			window.location.href= "cardFound1.html";
		});
	}
	if($('body').hasClass('cardSuccessPageUserX'))
	{
		$('.newCardImage').animate({width:'332px'},3000,function(){
			window.location.href= "cardFound2.html";
		});
		
	}
	if($('body').hasClass('managerHacked'))
	{
		setTimeout(function(){
				window.location.href= "findCard2.html";
		},2000);
	}
	
	/* Script for Office Page */
	if($('body').hasClass('officeDoorPage') || $('body').hasClass('officeDoorPageUserX'))
	{
		$("#draggable").draggable({drag:function(){
			var pos = $('#draggable').position();
			if(pos.left > 515 && pos.left < 750 && pos.top > 290 && pos.top < 400)
				{
					$('#draggable').remove();
					
					if($('body').hasClass('officeDoorPage'))
					{
						$('.officeDoor').css('background-image','url("images/doors_card_reader_success.jpg")');
						$('.instructions').html('Success!!');
						setTimeout(function(){
							window.location.href = "managerHacked.html";
						},2000);
					}
					else
					{
						$('.officeDoor').css('background-image','url("images/doors_pin_reader_success.jpg")');
						$('.instructions').html('Enter PIN to proceed...!!!');
						setTimeout(function(){
							window.location.href = "officeFinal.html";
						},3000);
					}
				}
			}
		});
	}
	
	$('.hackMoriarty1 .login').click(function(){
		window.location.href= "MoriartyHacked1.html";
	});
	
	$('.hackMoriarty2 .login').click(function(){
		window.location.href= "MoriartyHacked2.html";
	});
	
	
	if($('body').hasClass('MoriartyHacked1'))
	{
		setTimeout(function(){
				window.location.href= "sherlock2.html";
		},3000);
	}
	
	if($('body').hasClass('MoriartyHacked2'))
	{
		setTimeout(function(){
				window.location.href= "sherlockFinal.html";
		},3000);
	}
	
	
});
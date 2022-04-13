

var currentIndex = 0;

var wordToSend = "";

var currentWord = "";

var maxWord = 7;

var tries = 0;

var wordToGuess = "";



function updateColor()
{
    currentWord = currentWord.toLowerCase();
	console.log("wordToGuess: " + wordToGuess);
    console.log("currnet word: " + currentWord);
	// Clear the colour
	for (let i = 0; i < maxWord; i++)
	{						
		var container = document.getElementById( "container" + i );
		container.style["background-color"] = "grey";
	}
		
	// Make them orange when they are matched but not at the same position
	for (let i = 0; i < currentWord.length; i++)
	{						
		var container = document.getElementById( "container" + i );
		
		for (let j = 0; j < wordToGuess.length; j++)
		{
			if( i != j )
			{
				let guessLetter = currentWord.charAt(i);
				let solutionLetter = wordToGuess.charAt(j);
				
				if( guessLetter == solutionLetter )
				{
					container.style["background-color"] = "#d3952a";
				}
			}
		}
	}
	
	// Make them green - when the character at I in the currentWord entered equals the current at I from wordToGuess
	for (let i = 0; i < wordToGuess.length; i++)
	{						
		var container = document.getElementById( "container" + i );
		let guessLetter = currentWord.charAt(i);
		let solutionLetter = wordToGuess.charAt(i);

		if( guessLetter == solutionLetter )
		{
			container.style["background-color"] = "#3daa40";
		}
	}	
}

function updateTries()
{
	tries += 1;

	if( currentWord === wordToGuess )
	{
		document.getElementById( "site-share" ).text = "You got it in " + tries + " tries.";
	}
	else
	{
		document.getElementById( "site-share" ).text = "Tries: " + tries;
	}			
}

function processChar( newChar )
{
	if( currentIndex < maxWord )
	{
	    currentWord = currentWord.substring(0, currentIndex) + newChar + currentWord.substring(currentIndex + 1);
		
		var container = document.getElementById( "container" + currentIndex );
		
		// Set the default container colour
		container.style["background-color"] = "grey";
		
		// Set the box
		var element = document.getElementById( "letter" + currentIndex );
		element.text = newChar;
		
		if( currentIndex < maxWord )
		{
			currentIndex++;
		}
	}	
}

function selectSpace()
{
	// Space from touch keyboard
	processChar(" ");
}

function selectKey(newChar)
{
	// From touch keyboard
	processChar(newChar);
}

function selectEnter()
{
	// From touch keyboard
	updateColor();

	//console.log("guess");
	updateTries();
}		

function selectDelete()
{
	if( currentWord.length > 0 )
	{	
		currentIndex = Math.min( currentIndex, currentWord.length - 1);
		
		// Set the text to reflect the deleted letter	
		var element = document.getElementById( "letter" + currentIndex );
		element.text = "";	
		currentWord = currentWord.substring(0, currentIndex) + ' ' + currentWord.substring(currentIndex + 1);
		
		// Set the container colour to grey
		var container = document.getElementById( "container" + currentIndex );
		container.style["background-color"] = "grey";
			
		// Remove trailing spaces
		currentWord = currentWord.trim();
		console.log("Deleted: " + currentWord);
	}
}		

function keyboardPressed(event)
{	
	if( ( event.code != "Return" ) && ( event.code != "Enter" ) )
	{
		console.log("index="+currentIndex);
		
		var newChar = String.fromCharCode(event.keyCode);
		newChar = newChar.replace(/([a-z])/,function(s){return s.toUpperCase()});
		
		processChar( newChar );
	}
	else if( ( event.code == "Return" ) || ( event.code == "Enter" ) )
	{
		selectEnter();
	}
}

function keyboardUp(event)
{
	if( ( event.code == "Delete" ) || ( event.code == "Backspace" ) )
	{
		selectDelete();
	}
}

function selectCell(index)
{
	currentIndex = index;
	console.log("Select: " + index);
}		

function documentLoaded()
{
		
    document.getElementById( "site-help" ).text = "Guess the word.";
    document.addEventListener('keypress', keyboardPressed );
    document.addEventListener('keyup', keyboardUp );
    
    wordToGuess = document.getElementById("test-class").innerText.toLowerCase();
    console.log("Query string:" + wordToGuess );
    document.getElementById("test-class").hidden=true

    
}

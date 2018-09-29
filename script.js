jQuery(function($){

    gridArray = [];
    gridPaths = [];
    pathValues = [];

	BadBoggle = {

		init: function(){
			BadBoggle.registerEventHandlers();
		},

		registerEventHandlers: function(){
			$('#mazeForm').on( 'submit', BadBoggle.processGrid );
        },
        
        processGrid( event ){
            event.preventDefault();
            var boggleGrid = $('#mazeEntry').val();
            gridArray = BadBoggle.convertGridToArray( boggleGrid );

            BadBoggle.findPaths(gridArray);
            BadBoggle.findPathValues();
        },

        convertGridToArray( grid ){
            // Convert grid into an array with each line as an index
            var lineArray = grid.split(/\r?\n/);

            // Convert each line into an array of characters
            lineArray.forEach(function(value, index){
                lineArray[index] = value.split('');
            });

            return lineArray;
        },

        findPaths( grid ){
            grid.forEach(function(yValue, yCoord){
                yValue.forEach(function(xValue, xCoord){
                    BadBoggle.searchPath( 
                        [[yCoord, xCoord]],
                        yCoord,
                        xCoord
                    );
                });
            });
        }, 

        searchPath( pastPositions, currY, currX ){
            var wentSomewhere = false;
            
            //Try to go up
            if( BadBoggle.validPath(pastPositions, currY - 1, currX) ){
                BadBoggle.searchPath( 
                    pastPositions.concat([[currY - 1, currX]]),
                    currY - 1,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go right    
            if( BadBoggle.validPath(pastPositions, currY, currX + 1) ){
                BadBoggle.searchPath( 
                    pastPositions.concat([[currY, currX + 1]]),
                    currY,
                    currX + 1
                );

                wentSomewhere = true;
            }

            //Try to go down    
            if( BadBoggle.validPath(pastPositions, currY + 1, currX) ){
                BadBoggle.searchPath( 
                    pastPositions.concat([[currY + 1, currX]]),
                    currY + 1,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go left    
            if( BadBoggle.validPath(pastPositions, currY, currX - 1) ){
                BadBoggle.searchPath( 
                    pastPositions.concat([[currY, currX - 1]]),
                    currY,
                    currX - 1
                );

                wentSomewhere = true;
            }

            // If all paths are exhausted, add the path to the array
            if( wentSomewhere === false ){
                var pathString = '';
                pastPositions.forEach(function(coords){
                    pathString += gridArray[coords[0]][coords[1]];
                });
                gridPaths.push( pathString );
            }
        },

        validPath( pastPositions, newY, newX ){
            // If new position doesn't exist, return false
            if( undefined === gridArray[newY] || undefined === gridArray[newY][newX] ){
                return false;
            }

            var alreadyVisited = false;
            // If new position has been visited before, return false
            pastPositions.forEach(function(coords){
                if( coords[0] === newY && coords[1] === newX ){
                    alreadyVisited = true;
                }
            });

            if( alreadyVisited === true ){
                return false;
            }

            return true;
        },

        findPathValues(){
            gridPaths.forEach(function(path){
                var pathCharacters = path.split('');
                var highPoint = BadBoggle.charValue( pathCharacters[0] );
                var currValue = 0;
                var bestString = '';

                // Find the high point
                pathCharacters.forEach(function(character){
                    currValue += BadBoggle.charValue( character );
                    if( currValue > highPoint ){
                        highPoint = currValue;
                    }
                });

                // Find the point at which high point was reached
                currValue = 0;
                pathCharacters.forEach(function(character){
                    bestString += character;
                    currValue += BadBoggle.charValue( character );
                    if( currValue === highPoint ){
                        pathValues.push({string: bestString, value: highPoint});
                    }
                });
            });
        },

        charValue( character ){
            if( BadBoggle.isAVowel( character ) ) return 3;
            if( character === 'y' ) return -10;
            return -2;
        },

        isAVowel( character ){
            var vowels = ['a', 'e', 'i', 'o', 'u'];
            var isAVowel = false;

            vowels.forEach(function( vowel ){
                if( character === vowel ){
                    isAVowel = true;
                }
            });

            return isAVowel;
        }
    };
 

    BadBoggle.init(); 
});

jQuery(function($){

    gridArray = [];
    gridPaths = [];

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

            BadBoggle.calculatePathValues(gridArray);

            console.log('paths', gridPaths); //@DEBUG
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

        calculatePathValues( grid ){
            
            grid.forEach(function(yValue, yCoord){
                console.log('yValue', yValue); //@DEBUG
                yValue.forEach(function(xValue, xCoord){
                    BadBoggle.searchPath( 
                        [yCoord, xCoord],
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
                searchPath( 
                    pastPositions.push(array(currY -1, currX)),
                    currY - 1,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go right    
            if( BadBoggle.validPath(pastPositions, currY, currX + 1) ){
                searchPath( 
                    pastPositions.push(array(currY, currX + 1)),
                    currY,
                    currX + 1
                );

                wentSomewhere = true;
            }

            //Try to go down    
            if( BadBoggle.validPath(pastPositions, currY + 1, currX) ){
                searchPath( 
                    pastPositions.push(array(currY + 1, currX)),
                    currY + 1,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go left    
            if( BadBoggle.validPath(pastPositions, currY, currX - 1) ){
                searchPath( 
                    pastPositions.push(array(currY, currX - 1)),
                    currY,
                    currX - 1
                );

                wentSomewhere = true;
            }

            // If all paths are exhausted, add the path to the array
            if( wentSomewhere === false ){
                gridPaths.push( stringSoFar );
            }
        },

        validPath( pastPositions, newY, newX ){
            // If new position doesn't exist, return false
            if( undefined === gridArray[newY][newX] ) return false;

            // If new position doesn't contain a vowel, return false
            if( false === BadBoggle.isAVowel( gridArray[newY][newX] ) ) return false;

            var alreadyVisited = false;
            // If new position has been visited before, return false
            pastPositions.forEach(function(position){
                if( position[0] === newY && position[1] === newX ){
                    alreadyVisited = true;
                }
            });

            if( alreadyVisited === true ){
                return false;
            }

            return true;
        },

        isAVowel( character ){
            var vowels = ['a', 'e', 'i', 'o', 'u'];

            vowels.forEach(function( vowel ){
                if( character === vowel ) return true;
            });

            return false;
        }
    };
 

    BadBoggle.init(); 
});

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

            // console.log('gridArray', gridArray[2][3]); //@DEBUG



            BadBoggle.calculatePathValues(gridArray);
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
            
            var paths = [];
            grid.forEach(function(yValue, yCoord){
                console.log('yValue', yValue); //@DEBUG
                yValue.forEach(function(xValue, xCoord){
                    
                });
            });



            
        }, 

        searchPath( stringSoFar, currY, currX, lastY, lastX ){
            var wentSomewhere = false;
            
            //Try to go up
            if( BadBoggle.validPath(currY - 1, currX, lastY, lastX) ){
                searchPath( 
                    stringSoFar + gridArray[currY][currX],
                    currY - 1,
                    currX,
                    currY,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go right    
            if( BadBoggle.validPath(currY, currX + 1, lastY, lastX) ){
                searchPath( 
                    stringSoFar + gridArray[currY][currX],
                    currY,
                    currX + 1,
                    currY,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go down    
            if( BadBoggle.validPath(currY + 1, currX, lastY, lastX) ){
                searchPath( 
                    stringSoFar + gridArray[currY][currX],
                    currY + 1,
                    currX,
                    currY,
                    currX
                );

                wentSomewhere = true;
            }

            //Try to go left    
            if( BadBoggle.validPath(currY, currX - 1, lastY, lastX) ){
                searchPath( 
                    stringSoFar + gridArray[currY][currX],
                    currY,
                    currX - 1,
                    currY,
                    currX
                );

                wentSomewhere = true;
            }

            // If all paths are exhausted, add the path to the array
            if( wentSomewhere === false ){
                gridPaths.push( stringSoFar );
            }
        },

        validPath( newY, newX, lastY, lastX ){
            // If this index doesn't exist, return false
            if( undefined === gridArray[newY][newX] ) return false;

            // If this is the previous position, return false
            if( currY === lastY && currX === lastX ) return false;

            return true;
        }
    };
 

    BadBoggle.init(); 
});

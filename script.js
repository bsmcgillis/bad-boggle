jQuery(function($){
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

            console.log('grid', boggleGrid); //@DEBUG
        }
	};
	
    BadBoggle.init(); 
});

class Timeline {
	constructor() {

		
		$("#timeline").slider({
		    max: 2000,
		    min: -20000,
		    step: 1000,
		    value: 10000,
		    slide: function(event, ui) {
		      //console.log(ui.value);
		    }
	  	}).each(function() {

	    // Add labels to slider whose values 
	    // are specified by min, max

	    // Get the options for this slider (specified above)
	    //console.log($(this).data().uiSlider.options);
	    var opt = $(this).data().uiSlider.options;

	    // Get the number of possible values
	    var maxVal = opt.max - opt.min;
	    var items = maxVal / opt.step;

	    var timelineWidth = ( $("#timeline").width() / $(window).width() ) * 100;
	    var leftStepSize = timelineWidth / items;
	    var accOffset = 1;
	    var currentNumber = opt.min;
	    var yearPresentation = "";

	    for(let i = 0; i <= items; i++) {

	    	if(currentNumber < 0) {
	    		yearPresentation = currentNumber+" BCE";
	    	}
	    	else {
	    		yearPresentation = currentNumber+" CE";
	    	}

    		var el = $('<label class=\"timelineYearLabel\">' + yearPresentation + '</label>').css('left', accOffset+"vw");
	    	$("#timelineLabelsContainer").append(el);
	    	accOffset+= leftStepSize;
	    	if(accOffset > 100) { accOffset = 100; }
	    	currentNumber += opt.step;
	    }

	  });
	  

	}



}
/**
 * The main module
 *
 * @context page, blogpost
 */
var $ = require('speakeasy/jquery').jQuery;
var projectorMode = false;

function goProjectorMode() {
	if (!projectorMode) {
		projectorMode = true;
		
		jQuery("#header").css('min-height', 0);
		jQuery("#header").slideUp(800);
		jQuery("#navigation").hide();
		jQuery("#title-heading .logo").animate( { width: "hide", paddingLeft: "hide", paddingRight: "hide", marginLeft: "hide", marginRight: "hide" }, 800);
		
		jQuery("#personal-info-sidebar").animate( { width: "hide", paddingLeft: "hide", paddingRight: "hide", marginLeft: "hide", marginRight: "hide" }, 800,
			function() { jQuery("#main").removeClass("has-personal-sidebar")});
		
		if (jQuery("#blog-sidebar")) {
			jQuery("#blog-sidebar").animate( { width: "hide", paddingLeft: "hide", paddingRight: "hide", marginLeft: "hide", marginRight: "hide" }, 800,
			function() { jQuery("#main").removeClass("has-blog-sidebar")} );
		}
		
		var splitterSidebar = jQuery("#splitter-sidebar")
		if (splitterSidebar.width() > 0) {
			jQuery("#splitter").trigger("resize", [ 0 ]);
			jQuery("#splitter-sidebar").hide();
			jQuery("#splitter-sidebar").next().fadeOut();
		}
		
		jQuery(".page-metadata, #footer, #labels-section, #children-section, #comments-section").fadeOut(800);

		// hide the sidebar in the doc theme better (re-use JS?)
		// jQuery("#splitter-sidebar").hide();
		// jQuery(".vsplitbar").hide();

		increase(jQuery('#title-heading'), 1.8, 2.0);
		increase(jQuery('.wiki-content h1'), 1.8, 2.0);
		increase(jQuery('.wiki-content h2'), 1.5, 1.5);
		increase(jQuery('.wiki-content h3'), 1.5, 1.5);
		increase(jQuery('.wiki-content h4'), 1.5, 1.5);
		increase(jQuery('.wiki-content h5'), 1.5, 1.5);
		increase(jQuery('.wiki-content h6'), 1.5, 1.5);

		increase(jQuery('.wiki-content li, .wiki-content p, .wiki-content td, .wiki-content th, .wiki-content .code'), 1.5, 1.5);
		
	}
}

function increase(content, fontFactor, lineFactor) {
	var curFontSize = content.css('fontSize');
	var curLineHeight = content.css('line-height');
	if (content && curFontSize) {
		var newSize = increaseAttributeValue(curFontSize, fontFactor);
		content.animate({'fontSize': newSize}, 700);
   		var newHeight = increaseAttributeValue(curLineHeight, lineFactor)
		content.animate({'line-height': newHeight}, 600);		
	}
}

function increaseAttributeValue(attr, factor) {
	var num = parseFloat(attr, 10);
    num *= factor;
    var stringEnding = attr.slice(-2);
    return num + stringEnding;
}

// eventually we could reverse everything here - but right now, let's just reload if we're in proj mode
function undoProjectorMode() {
	if (projectorMode)
	{
		var curtainImg = require('speakeasy/resources').getImageUrl(module, 'frontcurtain.jpg');
		console.log('Can\'t find curtains? ' + curtainImg)
/*		var curtainImg = 'http://dl.dropbox.com/u/48692/frontcurtain.jpg';*/
		jQuery('.wiki-content').append('<div class="leftcurtain"><img src="' + curtainImg + '"/></div><div class="rightcurtain"><img src="' + curtainImg + '"/></div>');

		jQuery(".leftcurtain").stop().animate({width:'50%'}, 2000 );
		jQuery(".rightcurtain").stop().animate({width:'51%'}, 2000 );
		window.setInterval(function () {
			window.location.reload();
		}, 5000);
	}
}

$(document).ready(function() {
	$('.projector-mode-web-item').click(function(e) { e.preventDefault(); goProjectorMode(); });
	AJS.whenIType("shift+x").execute(function() { goProjectorMode(); });
	AJS.whenIType("esc").execute(function() { undoProjectorMode(); });
});

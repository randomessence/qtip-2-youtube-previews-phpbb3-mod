// <![CDATA[
$(document).ready(function()
{
	// Use each method to gain access to all youtube links
	$('a[href*="vimeo.co"]').each(function() {
		var videoID, html, id;
 
		// Setup a unique ID for the iframe element
		id = 'player_' + $.fn.qtip.nextid;
 
		// Grab video ID from the url (supports youtu.be and youtube.com links)
		videoID = this.href.match(/http:\/\/(?:www\.)?vimeo.com\/(\d+)/);
 
		// If we couldn't parse the URL, continue on to the next link...
		if (!videoID || videoID.length < 2) { return; }
		else { videoID = videoID[1]; }
 
		// Setup Vimeo HTML5 iframe embed HTML
		html = '<iframe src="http://player.vimeo.com/video/' + videoID + '?api=1&autoplay=1&player_id='+id+'" ' +
			'width="275" height="155" frameborder="0" id="'+id+'"></iframe>';
 
		// Create our tooltip
		$(this).qtip(
		{
			// Stick in a dummy <div /> we can use to embed the player and set it's ID
			content: html,
			position: {
				at: 'top center',
				my: 'bottom left',
				viewport: $(window) // Keep it on-screen at all times if possible
			},
			show: {
				event: 'click', // Show it on click...
				solo: true, // ...and hide all others when its shown
			},
			hide: 'unfocus', // Hide when the tooltip loses focus
			style: {
				classes: 'qtip-youtube', // Use a custom tooltip classes
				width: 275, height: 160
			},
			events: {
				render: function(event, api) {
					var iframe = $('iframe', this)[0];
					$f(iframe).addEvent('ready', function(player_id) {
						// Set the API player
						api.player = $f(player_id);
 
						// Mute it on load
						api.player.api('setVolume', 1);
					});
				},
				hide: function(event, api) {
					// Pause the video on hide
					api.player.api('pause');
				}
			}
		})
		// Prevent the link from being followed when we click it
		.click(false);
 
	});
});
// ]]>
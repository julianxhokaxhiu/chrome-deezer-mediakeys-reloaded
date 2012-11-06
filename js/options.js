jQuery(function($){
	var loadConfig = function(r){
		// PLAY/PAUSE
		var o = JSON.parse(window.localStorage.getItem(CFG.PLAY));
		if(!o||r)o=DEFEVENTS.PLAY;
		$('#ctrl_pp').attr('checked',o.ctrlKey);
		$('#alt_pp').attr('checked',o.altKey);
		$('#shift_pp').attr('checked',o.shiftKey);
		$('#key_pp').val(String.fromCharCode(o.keyCode).toUpperCase());
		// PREV
		o = JSON.parse(window.localStorage.getItem(CFG.PREV));
		if(!o||r)o=DEFEVENTS.PREV;
		$('#ctrl_prev').attr('checked',o.ctrlKey);
		$('#alt_prev').attr('checked',o.altKey);
		$('#shift_prev').attr('checked',o.shiftKey);
		$('#key_prev').val(String.fromCharCode(o.keyCode).toUpperCase());
		// NEXT
		o = JSON.parse(window.localStorage.getItem(CFG.NEXT));
		if(!o||r)o=DEFEVENTS.NEXT;
		$('#ctrl_next').attr('checked',o.ctrlKey);
		$('#alt_next').attr('checked',o.altKey);
		$('#shift_next').attr('checked',o.shiftKey);
		$('#key_next').val(String.fromCharCode(o.keyCode).toUpperCase());
	};
	var saveConfig = function(){
		if($('#key_pp').val().match(/[A-Z0-9]/))window.localStorage.setItem(CFG.PLAY,JSON.stringify({ctrlKey:$('#ctrl_pp').is(':checked'),altKey:$('#alt_pp').is(':checked'),shiftKey:$('#shift_pp').is(':checked'),keyCode:$('#key_pp').val().charCodeAt(0)}));
		else alert('Play/Pause Key not correct');
		if($('#key_prev').val().match(/[A-Z0-9]/))window.localStorage.setItem(CFG.PREV,JSON.stringify({ctrlKey:$('#ctrl_prev').is(':checked'),altKey:$('#alt_prev').is(':checked'),shiftKey:$('#shift_prev').is(':checked'),keyCode:$('#key_prev').val().charCodeAt(0)}));
		else alert('Prev Key not correct');
		if($('#key_next').val().match(/[A-Z0-9]/))window.localStorage.setItem(CFG.NEXT,JSON.stringify({ctrlKey:$('#ctrl_next').is(':checked'),altKey:$('#alt_next').is(':checked'),shiftKey:$('#shift_next').is(':checked'),keyCode:$('#key_next').val().charCodeAt(0)}));
		else alert('Next Key not correct');
	};
	var viewAlert = function(s){
		$.jGrowl('Operation complete!',{header:s+' settings',position:'bottom-right'});
	};
	$('.key').keydown(function(e){
		if(e.keyCode=='13')e.preventDefault();
		$(this).val('');
	}).keyup(function(e){
		$(this).val($(this).val().toUpperCase());
	});
	$('#save').click(function(){saveConfig();viewAlert('Save')});
	$('#load').click(function(){loadConfig();viewAlert('Load')});
	$('#reset').click(function(){loadConfig(true);viewAlert('Reset')});
	loadConfig();
});
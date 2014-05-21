chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	var found = false;
	var isKBKey = function(k){
		var v = JSON.parse(window.localStorage.getItem(k));
		var r = false;
		if((request.keyCode==v.keyCode)&&(request.ctrlKey==v.ctrlKey)&&(request.altKey==v.altKey)&&(request.shiftKey==v.shiftKey))r = true;
		return r;
	}
	init();
	if(request.type||request.cmd){
		if(request.type=='tabid')chrome.windows.getCurrent(function(win){chrome.tabs.query({'windowId':win.id,'active':true},function(t){if(t){sendResponse({isdz:(t[0].url.search('deezer.com')>0)})}})});
		else if(request.cmd){
			chrome.windows.getAll({populate:true},function(w){
				$.each(w,function(i,v){
					$.each(v.tabs,function(i,v){
						if((!found)&&(v.url.search('deezer.com')>0)){
							found=true;
							chrome.tabs.sendMessage(v.id,request.cmd)
						}
					})
				});
			});
		}
	}else{
		var r = request;
		if(isKBKey(CFG.PLAY))r = {keyCode:MKVAL.PLAY};
		else if(isKBKey(CFG.PREV))r = {keyCode:MKVAL.PREV};
		else if(isKBKey(CFG.NEXT))r = {keyCode:MKVAL.NEXT};
		sendResponse(r);
	}
	return true
});
chrome.commands.onCommand.addListener(function(command){
	console.log('hello', command);
});
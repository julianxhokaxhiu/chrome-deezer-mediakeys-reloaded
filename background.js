chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	var found=false;
	if(request.type||request.cmd){
		if(request.type=='tabid')chrome.windows.getCurrent(function(win){chrome.tabs.query({'windowId':win.id,'active':true},function(t){if(t){sendResponse({isdz:(t[0].url.search('www.deezer.com')>0)})}})});//chrome.tabs.getSelected(null,function(t){sendResponse({isdz:(t.url.search('www.deezer.com')>0)})});
		else if(request.cmd){
			chrome.windows.getAll({populate:true},function(w){
				$.each(w,function(i,v){
					$.each(v.tabs,function(i,v){
						if((!found)&&(v.url.search('www.deezer.com')>0)){
							found=true;
							chrome.tabs.sendMessage(v.id,request.cmd)
						}
					})
				});
			});
		}
	}else{
		for(i=0;i<window.localStorage.length;i++){
			var v = $.parseJSON(window.localStorage.getItem(window.localStorage.key(i)));
			if((request.keyCode==v.keyCode)&&(request.ctrlKey==v.ctrlKey)&&(request.altKey==v.altKey)&&(request.shiftKey==v.shiftKey)){
				found=true;
				if(i==CFG.PLAY)sendResponse({keyCode:179});
				else if(i==CFG.PREV)sendResponse({keyCode:177});
				else if(i==CFG.NEXT)sendResponse({keyCode:176});
			}
		}
		if(!found)sendResponse(request);
	};
	return true
});
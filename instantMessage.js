var instantMessage = new Object();

instantMessage.createMessageContainer = function() {
	function C(x) { return document.createElement(x); }
	function or(a, b) { return (a === undefined) ? b : (a || b); }
	var addTimeout = 300;
	var removeTimeout = 300;
	var stayTimeout = 0;
	var perFrame = 20;
	
	function indexOf(arr, obj) {
		var i = 0;
		while (i < arr.length) {
			if (arr[i] === obj) {
				return i;
			}
			++i;
		}
		return null;
	}
	
	var iM = new Object;
	iM.element = document.createElement("div");
	iM.element.className = "message-container";
	iM._list = new Array();
	
	iM.createMessage = function(arg) {
		if (arg.content === undefined) throw new SyntaxError("createMessage()'s argument must have 'content' property");
		var content = arg.content,
		 title = or(arg.title, "Message"),
		 _at = or(arg.addTimeout, addTimeout);
		 _st = or(arg.stayTimeout, stayTimeout);
		
		var msg = new Object(),
		 objContainer = document.createElement("div"),
		 objTitle = document.createElement("div"),
		 objContent = document.createElement("div");
		
		objTitle.className = "message-title";
		objTitle.appendChild(document.createTextNode(title));
		objContent.className = "message-content";
		objContent.appendChild(document.createTextNode(content));
		objContainer.className = "message-wrapper";
		objContainer.appendChild(objTitle);
		objContainer.appendChild(objContent);
		objContainer.onclick = function () { iM.removeMessage(msg); }
		this.element.appendChild(objContainer);
		
		msg.element = objContainer;
		msg._rc = Math.floor(or(arg.removeTimeout, removeTimeout) / perFrame);
		
		var count = Math.floor(_at / perFrame);
		if (count !== 0) {
			var height = objContainer.scrollHeight;
			objContainer.style.position = "relative";
			objContainer.style.top = height + "px";
			var param = {
				cur: count,
				step: height / count,
				wait: _st
			}
			msg._int = setInterval(function() {
				if (--param.cur === 0) {
					msg.element.style.position = "static";
					msg.element.style.top = "0px";
					clearInterval(msg._int);
					msg._int = null;
					msg._wait = param.wait ? setTimeout(function() {
						iM.removeMessage(msg);
					}, param.wait) : null;
					param = null;
				} else {
					msg.element.style.top = param.cur * param.step + "px";
				}
			}, perFrame);
		} else {
			msg._int = null;
			msg._wait = _st ? setTimeout(function() {
				iM.removeMessage(msg);
			}, _st) : null;
		}
		
		msg._exit = null;
		msg._done = false;
		this._list.push(msg);
		return msg;
	}
	
	iM.removeMessage = function(arg) {
		var i = indexOf(this._list, arg);
		if (i !== null) {
			var msg = this._list[i];
			if (msg._int !== null) {
				clearInterval(msg._int);
				msg._int = null;
			}
			if (msg._wait !== null) {
				clearTimeout(msg._wait);
				msg._wait = null;
			}
			if (msg._exit === null && !msg._done) {
				if (msg._rc !== 0) {
					var param = {
						width: msg.element.scrollWidth,
						cur: msg._rc,
						step: msg.element.scrollWidth / msg._rc
					}
					msg.element.style.position = "relative";
					msg._exit = setInterval(function() {
						if (--param.cur === 0) {
							msg.element.parentNode.removeChild(msg.element);
							clearInterval(msg._exit);
							param = null;
							msg._exit = null;
							msg._done = true;
						} else {
							msg.element.style.left = (param.width - param.cur * param.step) + "px";
						}
					}, perFrame);
				} else {
					msg.element.parentNode.removeChild(msg.element);
					msg._done = true;
				}
			}
		}
	}
	
	return iM;
}
	

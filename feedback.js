"use strict";

const _ftCfg = {

    URLServer : 'http://localhost/feedbackjs/api/phpmysql.php',

    MilisecondsShowMessage : 2000,

    AJAXSuccess : function(msg){
        try{
            let r = JSON.parse(msg);
            if (!r.error){
                _ftSetMessage(r.data, 'success');
                _ftfbClearLocal();
            }
            else{
                _ftSetMessage(r.error.message);
            }
        }
        catch(e){
            _ftSetMessage(e.message);
        }
    },

    AJAXError : function(msg){
        _ftSetMessage(msg);
    },

    BeforeAJAX : function(form){
        form.append('location', window.location.host);
    },

    Headers : {
        s : 'ge2wJZfY9U9XMex7WDKbN6wzakoHrK01',
        a : 'B8f1bAz419fvqGtDOW853eAI'
    },

    EnableUseLocalStorage : true,

    LocalItemName : 'FTFB_Feedback_FormData',

    FeedbackDefaultShow : false,

    FeedbackBoxWidth : '300px',//

    FeedbackBoxHeight : '450px',//

    FeedbackBoxLayer : 999999,//

    FeedbackPositionX : 'left',//

    FeedbackPositionY : 'top',//

    FeedbackBackgroundColor : '#fff',//

    FeedbackBorderColor : '#5ca2e0',//

    FeedbackHeadBackgroundColor : '#5ca2e0',//

    FeedbackHeadTextColor : '#fff',//

    FeedbackHeadHeight : '30px',//

    FeedbackHeadTextSize : '16px',//

    FeedbackIconSize : '16px',//

    FeedbackShowScrollBarY : true, //

    FeedbackShowScrollBarX : false, //

    FeedbackDistanceRows : '15px', //

    FeedbackTextboxBorderColor : '#5ca2e0',//

    FeedbackTextboxBackgroundColor : '#fff',//

    FeedbackButtonBackgroundColor : '#5ca2e0',//

    FeedbackButtonTextColor : '#fff',

    FeedbackMessagePosition : 'bottom'

};

const _ftFormCtrl = [
    { name : 'Function', tags : [ { tag : 'textbox', attr : { type : 'text', name : 'funcs', placeholder : 'Enter function...' } } ] },
    { name : 'Link', tags : [ { tag : 'textbox', attr : { type : 'text', name : 'links', placeholder : 'Enter link...' } } ] },
    { name : 'Username', tags : [ { tag : 'textbox', attr : { type : 'text', name : 'username', placeholder : 'Enter Username...' } } ] },
    { name : 'Description', tags : [ { tag : 'textarea', attr : { name : 'description', rows : 7, placeholder: 'Enter description detail...' } } ] },
    { name : 'Attachment', tags : [ { tag : 'textbox', attr : { type : 'file', name : 'attach[]', multiple : true } } ] },
    { tags : [ 
        { tag : 'button', value : 'Feedback', attr : { type : 'submit' } }, 
        { tag : 'button', value : 'Clear', attr : { type : 'button' }, events : { click : '_clearButton' } } 
    ] }
];

const fnCf = {

    c : _ftCfg,

    w : window.innerWidth,

    h : window.innerHeight,

    t : function(v){
        return /%$/g.test(v);
    },

    i : function(v){
        return parseInt(v.replace(/%|px/g, ''));
    },

    s : function(v, s){
        return v + (!0 === s ? 0 : 'px');
    },

    p : function(v, s){
        return this.s(parseInt(this.t(v) ? this.i(v) * this.w / 100 : this.i(v)), s);
    },

    fbPosX : function(){
        return this.c.FeedbackPositionX === 'left' ? 'left' : 'right';
    },

    fbPosY : function(){
        return this.c.FeedbackPositionY === 'top' ? 'top' : 'bottom';
    },

    fbWidth : function(s){
        return this.p(/^[1-9](%|px|(0(0?%|\dpx)|[1-9](%|\dpx)))$/g.test(this.c.FeedbackBoxWidth) ? this.c.FeedbackBoxWidth : '300px', s);
    },

    fbHeight : function(s){
        return this.p(/^[1-9](%|px|(0(0?%|\dpx)|[1-9](%|\dpx)))$/g.test(this.c.FeedbackBoxHeight) ? this.c.FeedbackBoxHeight : '450px', s);
    },

    fbLayer : function(){
        return /^\d{1,6}$/g.test(this.c.FeedbackBoxLayer) ? this.c.FeedbackBoxLayer : 999999;
    },

    fbBdrCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackBorderColor) ? this.c.FeedbackBorderColor : '#5ca2e0';
    },

    fbBgCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackBackgroundColor) ? this.c.FeedbackBackgroundColor : '#fff';
    },

    fbHBgCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackHeadBackgroundColor) ? this.c.FeedbackHeadBackgroundColor : '#5ca2e0';
    },

    fbHHeight : function(s){
        return this.p(/^[1-9]\dpx$/g.test(this.c.FeedbackHeadHeight) ? this.c.FeedbackHeadHeight : '30px', s);
    },

    fbHTxtCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackHeadTextColor) ? this.c.FeedbackHeadTextColor : '#fff';
    },

    fbHTxtSz : function(s){
        return this.p(/^[12]\dpx$/g.test(this.c.FeedbackHeadTextSize) ? this.c.FeedbackHeadTextSize : '16px', s);
    },

    fbHIcoSz : function(s){
        return this.p(/^(1\d|20)px$/g.test(this.c.FeedbackIconSize) ? this.c.FeedbackIconSize : '16px', s);
    },

    fbFmHeight : function(s){
        return this.s(this.fbHeight(true) - this.fbHHeight(true) - 2, s);
    },

    fbScrollX : function(){
        return true === this.c.FeedbackShowScrollBarY ? ';overflow-x:auto' : '';
    },

    fbScrollY : function(){
        return true === this.c.FeedbackShowScrollBarY ? ';overflow-y:auto' : '';
    },

    fbDstRw : function(s){
        return this.p(/^([12]\d|30)px$/g.test(this.c.FeedbackDistanceRows) ? this.c.FeedbackDistanceRows : '15px', s);
    },

    fbTbBdrCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackTextboxBorderColor) ? this.c.FeedbackTextboxBorderColor : '#5ca2e0';
    },

    fbTbBgCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackTextboxBackgroundColor) ? this.c.FeedbackTextboxBackgroundColor : '#fff';
    },

    fbBtnBgCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackButtonBackgroundColor) ? this.c.FeedbackButtonBackgroundColor : '#5ca2e0';
    },

    fbBtnBdrCor : function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackButtonBackgroundColor) ? this.c.FeedbackButtonBackgroundColor : '#5ca2e0';
    },

    fbBtnTxtCor: function(){
        return /^#([\da-f]{3}){1,2}$/gi.test(this.c.FeedbackButtonTextColor) ? this.c.FeedbackButtonTextColor : '#fff';
    },

    enStorage : function(){
        return !!this.c.EnableUseLocalStorage;
    },

    lcItem : function(){
        return (!!this.c.LocalItemName && String === this.c.LocalItemName.constructor) ? this.c.LocalItemName : 'FTFB_Feedback_FormData';
    },

    path : function(){
        return this.c.URLServer;
    },

    closeMsg : function(){
        return /^[1-9]\d{3}$/g.test(this.c.MilisecondsShowMessage) ? this.c.MilisecondsShowMessage : 2000;
    },

    fbMsgPos : function(){
        return 'top' === this.c.FeedbackMessagePosition ? 'top' : 'bottom';
    },

    fbHeader : function(){
        return !!this.c.Headers && Object === this.c.Headers.constructor ? this.c.Headers : {};
    },

    fbShow : function(){
        return !!this.c.FeedbackDefaultShow && true === this.c.FeedbackDefaultShow;
    },

    symm : function(v){
        switch(v){
            case 'top': return 'bottom';
            case 'bottom': return 'top';
            case 'left': return 'right';
            case 'right': return 'left';
            default: return null;
        }
    }

};

const _ftfbCSS = function(){

    let b = fnCf.fbPosX() + ':0;' + fnCf.fbPosY() + ':0' + ';z-index:' + fnCf.fbLayer() + ';width:' + fnCf.fbWidth() + ';height:' 
        + fnCf.fbHeight() + ';border:1px solid ' + fnCf.fbBdrCor() + ';background:' + fnCf.fbBgCor();
    let h = ';background:' + fnCf.fbHBgCor() + ';height:' + fnCf.fbHHeight();
    let a = ';color:' + fnCf.fbHTxtCor() + ';font-size:' + fnCf.fbHTxtSz();
    let i = ';width:' + fnCf.fbHIcoSz() + ';height:' + fnCf.fbHIcoSz();
    let o = ';min-height:' + fnCf.fbFmHeight() + ';max-height:' + fnCf.fbFmHeight() + fnCf.fbScrollX() + fnCf.fbScrollY();
    let p = ';border:1px solid ' + fnCf.fbTbBdrCor() + ';background:' + fnCf.fbTbBgCor();
    let t = ';background:' + fnCf.fbBtnBgCor() + ';border:1px solid ' + fnCf.fbBtnBgCor() + ';color:' + fnCf.fbBtnTxtCor();
    let m = fnCf.fbMsgPos() + ':' + ('top' === fnCf.fbMsgPos() ? fnCf.fbHHeight(true) + 'px' : 0) + ';' + fnCf.fbPosX() + ':-' + fnCf.fbWidth();

    return {
        box : "position:fixed;border-top-left-radius:4px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;box-sizing:border-box;transition:all ease 0.3s;" + b,
        head : "position:absolute;cursor:pointer;width:100%;transition:all ease 0.3s" + h,
        headH2 : "line-height:30px;box-sizing:border-box;padding:0 30px;margin:0;" + a,
        headIcons : "position:absolute;top:0;left:5px;height:30px;width:30px;",
        headSpanIcon : "margin-top:4px;border:1px solid #fff;border-radius:50%;display:inline-block;position:relative" + i,
        headIconI : "display:inline-block;width:5px;height:5px;border-right:1px solid #fff;border-bottom:1px solid #fff;top:5px;left:4px;position:absolute;transition:all ease 0.3s",
        body : "padding:15px;box-sizing:border-box;position:absolute;bottom:0" + o,
        bodyUl : "list-style:none;margin:0;padding:0;",
        bodyLiOdd : "margin-bottom:" + fnCf.fbDstRw(),
        bodyControl : "width:100%;padding:3px 8px;border-radius:4px;outline:0;box-sizing:border-box" + p,
        bodyButton : "font-weight:bold;padding:5px 15px;margin-right:5px;cursor:pointer;border-radius:4px;outline:0" + t,
        message : "position:absolute;border:2px solid #b25747;background:rgba(178, 87, 71, 0.2);padding:10px;font-size:12px;font-weight:bold;color:#b25747;width:100%;box-sizing:border-box;transition:all ease 0.3s;" + m
    };
}

const d = document;
const css = _ftfbCSS.apply();
const _ftLcItem = fnCf.lcItem();

var _ftEl = { headClick : false, buttons : {}, controls : {} };

const _ftAJAXToServer = function(data, cb){
    let xhttp = new XMLHttpRequest();
    xhttp.open('post', fnCf.path(), true);

    let header = fnCf.fbHeader();
    for(let k in header) xhttp.setRequestHeader(k, header[k]);

    xhttp.onload = function(){
        cb(xhttp);
    }
    xhttp.send(data);
};

const _ftSetMessage = function(msg, type){
    var elMsg = _ftEl.message;
    elMsg.innerHTML = msg.toString();

    if ('success' === type){
        elMsg.style.color = '#63b75b';
        elMsg.style.background = 'rgba(99, 183, 91, 0.2)';
        elMsg.style.border = '2px solid #63b75b';
    }
    else{
        elMsg.style.color = '#b25747';
        elMsg.style.background = 'rgba(178, 87, 71, 0.2)';
        elMsg.style.border = '2px solid #b25747';
    }

    elMsg.style[fnCf.fbPosX()] = 0;
    setTimeout(function(){
        elMsg.style[fnCf.fbPosX()] = '-' + fnCf.fbWidth();
    }, fnCf.closeMsg());
};

var _ftCtrl = {

    _clearButton : function(){
        _ftEl.form.reset();
        if (fnCf.enStorage()) _ftfbClearLocal();
    },

    _formSubmit : function(event){
        event.preventDefault();
        if ('submit' in _ftEl.buttons){
            _ftEl.buttons.submit.disabled = true;
            let hasData = false, formData = new FormData();

            for (let name in _ftEl.controls){
                let type = _ftEl.controls[name].getAttribute('type');

                if ('file' === type){
                    let files = _ftEl.controls[name].files;
                    if (files.length){
                        for (let i = 0; i < files.length; ++i){
                            formData.append(name + '[]', files[i], files[i].name);
                        }
                    }
                    continue;
                }

                let value = _ftEl.controls[name].value.trim();
                hasData = hasData || value.length;
                formData.append(name, value);
            }

            if (hasData){
                try{
                    _ftCfg.BeforeAJAX(formData);
                    _ftAJAXToServer(formData, function(xhttp){
                        if (xhttp.readyState === 4){
                            _ftCfg.AJAXSuccess(xhttp.responseText)
                            _ftCtrl._clearButton();
                        }
                        else{
                            _ftCfg.AJAXError(xhttp.responseText);
                        }
                        _ftEl.buttons.submit.disabled = false;
                    });
                }catch(e){
                    _ftCfg.AJAXError('UNKNOWN: ' + e.message);
                    _ftEl.buttons.submit.disabled = false;
                }
            }
            else{
                _ftSetMessage('Please enter data');
                _ftEl.buttons.submit.disabled = false;
            }
        }
    }
    
};

const _ftHandlerEvent = function(DOMElement, eventName, handlerFunction){
    if (!!DOMElement){
        if ('addEventListener' in DOMElement) DOMElement.addEventListener(eventName, handlerFunction);
        else if ('attachEvent' in DOMElement) DOMElement.attachEvent('on' + eventName, handlerFunction);
        else DOMElement['on' + eventName] = handlerFunction;
    }
};

const _ftDiv = function(id, cls){
    let div = d.createElement('div');
    if (!!id && String === id.constructor) div.setAttribute('id', id);
    if (!!cls && String === cls.constructor) div.setAttribute('class', cls);
    return div;
};

const _ftfbBox = function(){
    var ftfbBox = _ftDiv('ftfb2018');
    
    ftfbBox.setAttribute('style', css.box);
    _ftEl.box = ftfbBox;

    return ftfbBox;
};

const _ftClkIco = function(event){
    let i = _ftEl.i, c = i.classList.contains('mini');
    i.setAttribute('class', c ? 'maxi' : 'mini');
    i.style.left = c ? '6px' : '4px';
    i.style.transform = c ? 'rotate(135deg)' : 'rotate(-45deg)';
};

const _ftClkHead = function(e){
    if (!!e) e.preventDefault();
    
    let posY = fnCf.fbPosY();
    let posX = fnCf.fbPosX();

    let c = _ftEl.headClick;
    let p = ('bottom' !== posY);

    _ftEl.h2.style.width = c ? '100%' : 'auto';

    _ftEl.box.style[posY] = c ? 0 : '-' + fnCf.s(fnCf.fbFmHeight(true) + 1);
    _ftEl.box.style[posX] = c ? 0 : '-' + fnCf.s(parseInt(_ftEl.h2.clientWidth / 2));

    _ftEl.head.style[posY] = p ? (c ? 0 : null) : 0;
    _ftEl.head.style[fnCf.symm(posY)] = p ? (c ? null : 0) : null;
    _ftEl.body.style[posY] = p ? (c ? null : 0) : null;
    _ftEl.body.style[fnCf.symm(posY)] = p ? (c ? 0 : null) : 0;
    
    _ftEl.icons.style[posX] = null;
    let h = ('right' === posX);

    _ftEl.h2.style.textAlign = h ? posX : fnCf.symm(posX);
    _ftEl.icons.style[fnCf.symm(posX)] = '5px';
    _ftEl.icons.style[posX] = null;
    _ftEl.icons.style.textAlign = h ? posX : fnCf.symm(posX);
    
    _ftEl.headClick = !c;
    _ftClkIco.apply();
};

const _ftfbHead = function(){
    var ftfbHead = _ftDiv('ftfb-head');
    ftfbHead.setAttribute('style', css.head)
    
    var h2 = d.createElement('h2');
    h2.setAttribute('style', css.headH2);
    h2.innerText = 'Feedback';
    _ftEl.h2 = h2;

    var icons = _ftDiv('ftfb-icons');
    icons.setAttribute('style', css.headIcons);
    _ftEl.icons = icons;

    var icon = d.createElement('span');
    icon.setAttribute('class', 'ftfb-icon');
    icon.setAttribute('style', css.headSpanIcon);

    var mima = d.createElement('i');
    mima.setAttribute('style', css.headIconI);

    _ftEl.i = mima;
    _ftClkIco.apply();

    icon.appendChild(mima);
    icons.appendChild(icon);

    ftfbHead.appendChild(h2);
    ftfbHead.appendChild(icons);

    _ftHandlerEvent(ftfbHead, 'click', _ftClkHead);

    _ftEl.head = ftfbHead;

    return ftfbHead;
};

const _ftList = () => {
    let ul = d.createElement('ul');
    ul.setAttribute('style', css.bodyUl);
    return ul;
};
const _ftItem = (c, s) => {
    let li = d.createElement('li');
    if (!!s && String === s.constructor) li.setAttribute('style', s);
    if (!!c) li.appendChild(c);
    return li;
};

const _ftOption = function(info){
    let el = d.createElement('option');
    el.setAttribute('value', info.value);
    el.innerText = info.text;
    return el;
};

const _ftfbAddListener = function(el, events){
    for (let name in events) {
        if (events[name] in _ftCtrl) _ftHandlerEvent(el, name, _ftCtrl[events[name]]);
    }
}

const _ftfbClearLocal = function(){
    localStorage.removeItem(_ftLcItem);
}

const _ftfbSetLocal = function(){
    let data = {};
    let controls = _ftEl.controls;

    for (let name in controls){
        let type = controls[name].getAttribute('type');
        if ('file' !== type){
            data[name] = controls[name].value;
        }
    }

    localStorage.setItem(_ftLcItem, JSON.stringify(data));
}

const _ftfbRestoreLocal = function(){
    let data = localStorage.getItem(_ftLcItem);
    if (!!data) data = JSON.parse(data);
    
    for (let name in data){
        if (name in _ftEl.controls){
            _ftEl.controls[name].value = data[name];
        }
    }
}

_ftCtrl.textbox = function(tag){
    let el = d.createElement('input');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    el.setAttribute('style', css.bodyControl);
    
    let nameElement = tag.attr.name || tag.attr.id || null;
    if (!!nameElement) _ftEl.controls[nameElement] = el;
    
    return el;
};

_ftCtrl.select = function(tag){
    let el = d.createElement('select');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    for (let opt of tag.opts)el.appendChild(_ftOption(opt));
    
    el.setAttribute('style', css.bodyControl);
    
    let nameElement = tag.attr.name || tag.attr.id || null;
    if (!!nameElement) _ftEl.controls[nameElement] = el;
    
    return el;
};

_ftCtrl.textarea = function(tag){
    let el = d.createElement('textarea');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    if (!!tag.content) el.innerHTML = tag.content.toString();
    
    el.setAttribute('style', css.bodyControl);
    el.style.resize = 'vertical';
    
    let nameElement = tag.attr.name || tag.attr.id || null;
    if (!!nameElement) _ftEl.controls[nameElement] = el;
    
    return el;
}

_ftCtrl.button = function(tag){
    let el = d.createElement('button');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    if (!!tag.value) el.innerHTML = tag.value;
    
    el.setAttribute('style', css.bodyButton);
    if (tag.events) _ftfbAddListener(el, tag.events);
    
    let typeElement = tag.attr.type || null;
    if (!!typeElement) _ftEl.buttons[typeElement] = el;
    
    return el;
}

const _ftLabel = function(name){
    let el = d.createElement('label');
    el.innerHTML = name;
    return el;
};

const _ftRow = function(info, list){
    if (!!info.name){
        let elLabel = _ftLabel(info.name);
        let elLiLabel = _ftItem(elLabel, 'margin-bottom:3px;');
        list.appendChild(elLiLabel);
    }

    let elLiControl = null;

    for (let tag of info.tags){
        if (tag.tag in _ftCtrl){
            let elControl = _ftCtrl[tag.tag](tag);
            if (elLiControl) elLiControl.appendChild(elControl);
            else elLiControl = _ftItem(elControl, css.bodyLiOdd);
        }
    }

    if (elLiControl) list.appendChild(elLiControl);
};

const _ftForm = function(){
    var form = d.createElement('form');

    form.setAttribute('id', "ftfb-form");
    form.setAttribute('method', "post");
    
    var ftfbList = _ftList.apply();
    form.appendChild(ftfbList);

    for (let pos in _ftFormCtrl) _ftRow(_ftFormCtrl[pos], ftfbList);
    if (fnCf.enStorage()){
        let controls = _ftEl.controls;
        _ftfbRestoreLocal();
        for (let name in controls) _ftHandlerEvent(controls[name], 'keyup', _ftfbSetLocal);
    }

    if ('_formSubmit' in _ftCtrl) _ftHandlerEvent(form, 'submit', _ftCtrl._formSubmit);
    _ftEl.form = form;

    return form;
};

const _ftfbBody = function(){
    var ftfbMain = _ftDiv('ftfb-body');
    ftfbMain.setAttribute('style', css.body);

    var ftfbForm = _ftForm.apply();
    ftfbMain.appendChild(ftfbForm);

    _ftEl.body = ftfbMain;

    return ftfbMain;
};

const _ftfbMessage = function(){
    var ftfbMsg = _ftDiv('ftfb-message');
    ftfbMsg.setAttribute('style', css.message);
    _ftEl.message = ftfbMsg;
    return ftfbMsg;
}

const _ftfbLoaded = function(){
    // Variable body element;
    var ftfbBody = d.getElementsByTagName('body')[0];

    // Variable FTFB Box
    var ftfbBox = _ftfbBox.apply();

    // Variable FTFB Head
    var ftfbHead = _ftfbHead.apply();//initFTFBHead.apply();

    // Variable FTFB Body
    var ftfbMain = _ftfbBody.apply();  //initFTFBBody.apply();

    // Variable FTFB Message
    var ftfbMsg = _ftfbMessage.apply();//  initMessage.apply();

    // Append head and body and message inside box FTFB
    ftfbBox.appendChild(ftfbHead);
    ftfbBox.appendChild(ftfbMain);
    ftfbBox.appendChild(ftfbMsg);

    // Append box FTFB inside body element
    ftfbBody.appendChild(ftfbBox);
    if (!fnCf.fbShow()) _ftClkHead.apply();
};

_ftHandlerEvent(window, 'load', _ftfbLoaded);
"use strict";

var ftfbServerAPI = 'http://docs.financal.vn/feedback.php';

var ftfbLocalItem = 'FTFB_Feedback_FormData';

var ftfbTimeShowMessage = 2000;

var enableLocalStorage = true;

var ftfbAJAXSuccess = function(){
    console.log('ccc');
};

var ftfbAJAXError = function(){
    console.log('dddd');
};

var formControl = {
    cFunction : { name : 'Function', tags : [ { tag : 'textbox', attr : { type : 'text', name : 'function', placeholder : 'Enter function...' } } ] },
    cLink : { name : 'Link', tags : [ { tag : 'textbox', attr : { type : 'text', name : 'link', placeholder : 'Enter link...' } } ] },
    cDescription : { name : 'Description', tags : [ { tag : 'textarea', attr : { name : 'description', rows : 7, placeholder: 'Enter description detail...' } } ] },
    cAttach : { name : 'Attachment', tags : [ { tag : 'textbox', attr : { type : 'file', name : 'attachment', multiple : true } } ] },
    cButton : { tags : [ 
        { tag : 'button', value : 'Feedback', attr : { type : 'submit' } }, 
        { tag : 'button', value : 'Clear', attr : { type : 'button' }, events : { click : '_clearButton' } } 
    ] }
};

var css = {
    box : "position:fixed;bottom:0;right:0;width:300px;height:450px;z-index:999999;border:1px solid #5ca2e0;border-top-left-radius:4px;background:#fff;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;box-sizing:border-box;transition:all ease 0.3s",
    head : "background:#5ca2e0;height:30px;position:relative;cursor:pointer;",
    headH2 : "line-height:30px;color:#fff;padding:0 30px;font-size:16px;margin:0;",
    headIcons : "position:absolute;top:0;left:5px;height:30px;width:30px;",
    headSpanIcon : "width:16px;height:16px;margin-top:4px;border:1px solid #fff;border-radius:50%;display:inline-block;position:relative;",
    headIconI : "display:inline-block;width:5px;height:5px;border-right:1px solid #fff;border-bottom:1px solid #fff;top:5px;left:4px;position:absolute;transition:all ease 0.3s",
    body : "padding:15px;min-height:385px;max-height:385px;overflow-y:auto;",
    bodyUl : "list-style:none;margin:0;padding:0;",
    bodyLiOdd : "margin-bottom: 15px;",
    bodyControl : "width:100%;padding:3px 8px;background:#fff;border:1px solid #5ca2e0;border-radius:4px;outline:0;box-sizing:border-box;",
    bodyButton : "border:1px solid #5ca2e0;background:#5ca2e0;color:#fff;font-weight:bold;padding:5px 15px;margin-right:5px;cursor:pointer;border-radius:4px;outline:0;",
    message : "position:absolute;bottom:0;right:-350px;border:2px solid #b25747;background:rgba(178, 87, 71, 0.2);padding:10px;font-size:12px;font-weight:bold;color:#b25747;width:100%;box-sizing:border-box;transition:all ease 0.3s;"
};

var d = document;

var ftfbElement = { headClick : false, buttons : {}, controls : {} };

var ajaxToServer = function(data, cb){
    let xhttp = new XMLHttpRequest();
    xhttp.open('post', ftfbServerAPI, true);
    xhttp.onload = function(){
        cb(xhttp);
    }
    xhttp.send(data);
};

var setMessage = function(msg, type){
    var elMsg = ftfbElement.message;
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

    elMsg.style.right = 0;
    setTimeout(function(){
        elMsg.style.right = '-350px';
    }, ftfbTimeShowMessage);
};

var fnControl = {

    _clearButton : function(){
        ftfbElement.form.reset();
        if (enableLocalStorage) _ftfbClearLocal();
    },

    _formSubmit : function(event){
        event.preventDefault();
        if ('submit' in ftfbElement.buttons){
            ftfbElement.buttons.submit.disabled = true;
            let hasData = false, formData = new FormData();

            for (let name in ftfbElement.controls){
                let type = ftfbElement.controls[name].getAttribute('type');

                if ('file' === type){
                    let files = ftfbElement.controls[name].files;
                    if (files.length){
                        for (let i = 0; i < files.length; ++i){
                            formData.append(name + '[]', files[i], files[i].name);
                        }
                    }
                    continue;
                }

                let value = ftfbElement.controls[name].value.trim();
                hasData = hasData || value.length;
                formData.append(name, value);
            }

            if (hasData){
                try{
                    ajaxToServer(formData, function(xhttp){
                        if (xhttp.readyState === 4){
                            ftfbAJAXSuccess(xhttp.responseText);
                            if (enableLocalStorage) _ftfbClearLocal();
                        }
                        else{
                            ftfbAJAXError(xhttp.responseText);
                        }
                        ftfbElement.buttons.submit.disabled = false;
                    });
                }catch(e){
                    ftfbAJAXError('Unknown error');
                    ftfbElement.buttons.submit.disabled = false;
                }
            }
            else{
                setMessage('Please enter data');
                ftfbElement.buttons.submit.disabled = false;
            }
        }
    }
    
};

var handlerEvent = function(DOMElement, eventName, handlerFunction){
    if (!!DOMElement){
        if ('addEventListener' in DOMElement) DOMElement.addEventListener(eventName, handlerFunction);
        else if ('attachEvent' in DOMElement) DOMElement.attachEvent('on' + eventName, handlerFunction);
        else DOMElement['on' + eventName] = handlerFunction;
    }
};

var createDiv = function(id, cls){
    let div = d.createElement('div');
    if (!!id && String === id.constructor) div.setAttribute('id', id);
    if (!!cls && String === cls.constructor) div.setAttribute('class', cls);
    return div;
};

var initFTFBBox = function(){
    var ftfbBox = createDiv('ftfb2018');
    
    ftfbBox.setAttribute('style', css.box);
    ftfbElement.box = ftfbBox;

    return ftfbBox;
};

var changeClickIcon = function(event){
    let i = ftfbElement.i, c = i.classList.contains('mini');
    i.setAttribute('class', c ? 'maxi' : 'mini');
    i.style.left = c ? '6px' : '4px';
    i.style.transform = c ? 'rotate(135deg)' : 'rotate(-45deg)';
};

var changeClickHead = function(event){
    event.preventDefault();
    let c = ftfbElement.headClick;
    ftfbElement.box.style.bottom = c ? 0 : '-420px';
    ftfbElement.box.style.right = c ? 0 : '-170px';
    ftfbElement.headClick = !c;
    changeClickIcon.apply();
};

var initFTFBHead = function(){
    var ftfbHead = createDiv('ftfb-head');
    ftfbHead.setAttribute('style', css.head)
    
    var h2 = d.createElement('h2');
    h2.setAttribute('style', css.headH2);
    h2.innerText = 'Feedback';

    var icons = createDiv('ftfb-icons');
    icons.setAttribute('style', css.headIcons);

    var icon = d.createElement('span');
    icon.setAttribute('class', 'ftfb-icon');
    icon.setAttribute('style', css.headSpanIcon);

    var mima = d.createElement('i');
    mima.setAttribute('style', css.headIconI);

    ftfbElement.i = mima;
    changeClickIcon();

    icon.appendChild(mima);
    icons.appendChild(icon);

    ftfbHead.appendChild(h2);
    ftfbHead.appendChild(icons);

    handlerEvent(ftfbHead, 'click', changeClickHead);

    ftfbElement.head = ftfbHead;

    return ftfbHead;
};

var initList = () => {
    let ul = d.createElement('ul');
    ul.setAttribute('style', css.bodyUl);
    return ul;
};
var initItem = (c, s) => {
    let li = d.createElement('li');
    if (!!s && String === s.constructor) li.setAttribute('style', s);
    if (!!c) li.appendChild(c);
    return li;
};

var createOption = function(info){
    let el = d.createElement('option');
    el.setAttribute('value', info.value);
    el.innerText = info.text;
    return el;
};

function _ftfbAddListener(el, events){
    for (let name in events) {
        if (events[name] in fnControl) handlerEvent(el, name, fnControl[events[name]]);
    }
}

function _ftfbClearLocal(){
    localStorage.removeItem(ftfbLocalItem);
}

function _ftfbSetLocal(){
    let data = {};
    let controls = ftfbElement.controls;

    for (let name in controls){
        let type = controls[name].getAttribute('type');
        if ('file' !== type){
            data[name] = controls[name].value;
        }
    }

    localStorage.setItem(ftfbLocalItem, JSON.stringify(data));
}

function _ftfbRestoreLocal(){
    let data = localStorage.getItem(ftfbLocalItem);
    if (!!data) data = JSON.parse(data);
    
    for (let name in data){
        if (name in ftfbElement.controls){
            ftfbElement.controls[name].value = data[name];
        }
    }
}

fnControl.textbox = function(tag){
    let el = d.createElement('input');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    el.setAttribute('style', css.bodyControl);
    
    let nameElement = tag.attr.name || tag.attr.id || null;
    if (!!nameElement) ftfbElement.controls[nameElement] = el;
    
    return el;
};

fnControl.select = function(tag){
    let el = d.createElement('select');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    for (let opt of tag.opts)el.appendChild(createOption(opt));
    
    el.setAttribute('style', css.bodyControl);
    
    let nameElement = tag.attr.name || tag.attr.id || null;
    if (!!nameElement) ftfbElement.controls[nameElement] = el;
    
    return el;
};

fnControl.textarea = function(tag){
    let el = d.createElement('textarea');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    if (!!tag.content) el.innerHTML = tag.content.toString();
    
    el.setAttribute('style', css.bodyControl);
    el.style.resize = 'vertical';
    
    let nameElement = tag.attr.name || tag.attr.id || null;
    if (!!nameElement) ftfbElement.controls[nameElement] = el;
    
    return el;
}

fnControl.button = function(tag){
    let el = d.createElement('button');
    
    for (let a in tag.attr) el.setAttribute(a, tag.attr[a]);
    if (!!tag.value) el.innerHTML = tag.value;
    
    el.setAttribute('style', css.bodyButton);
    if (tag.events) _ftfbAddListener(el, tag.events);
    
    let typeElement = tag.attr.type || null;
    if (!!typeElement) ftfbElement.buttons[typeElement] = el;
    
    return el;
}

var createLabel = function(name){
    let el = d.createElement('label');
    el.innerHTML = name;
    return el;
};

var createRowForm = function(info, list){
    if (!!info.name){
        let elLabel = createLabel(info.name);
        let elLiLabel = initItem(elLabel);
        list.appendChild(elLiLabel);
    }

    let elLiControl = null;

    for (let tag of info.tags){
        if (tag.tag in fnControl){
            let elControl = fnControl[tag.tag](tag);
            if (elLiControl) elLiControl.appendChild(elControl);
            else elLiControl = initItem(elControl, css.bodyLiOdd);
        }
    }

    if (elLiControl) list.appendChild(elLiControl);
};

var initControl = function(tag){
    let inp = d.createElement(tag);
    inp.setAttribute('style', css.bodyControl);
    return inp;
};

var initForm = function(){
    var form = d.createElement('form');

    form.setAttribute('id', "ftfb-form");
    form.setAttribute('method', "post");
    
    var ftfbList = initList.apply();
    form.appendChild(ftfbList);

    for (let name in formControl) createRowForm(formControl[name], ftfbList);
    if (enableLocalStorage){
        let controls = ftfbElement.controls;
        _ftfbRestoreLocal();
        for (let name in controls) handlerEvent(controls[name], 'keyup', _ftfbSetLocal);
    }

    if ('_formSubmit' in fnControl) handlerEvent(form, 'submit', fnControl._formSubmit);
    ftfbElement.form = form;

    return form;
};

var initFTFBBody = function(){
    var ftfbMain = createDiv('ftfb-body');
    ftfbMain.setAttribute('style', css.body);

    var ftfbForm = initForm.apply();
    ftfbMain.appendChild(ftfbForm);

    ftfbElement.body = ftfbMain;

    return ftfbMain;
};

var initMessage = function(){
    var ftfbMsg = createDiv('ftfb-message');
    ftfbMsg.setAttribute('style', css.message);
    ftfbElement.message = ftfbMsg;
    return ftfbMsg;
}

var ftfbLoaded = function(){
    // Variable body element;
    var ftfbBody = d.getElementsByTagName('body')[0];

    // Variable FTFB Box
    var ftfbBox = initFTFBBox.apply();

    // Variable FTFB Head
    var ftfbHead = initFTFBHead.apply();

    // Variable FTFB Body
    var ftfbMain = initFTFBBody.apply();

    // Variable FTFB Message
    var ftfbMsg = initMessage.apply();

    // Append head and body and message inside box FTFB
    ftfbBox.appendChild(ftfbHead);
    ftfbBox.appendChild(ftfbMain);
    ftfbBox.appendChild(ftfbMsg);

    // Append box FTFB inside body element
    ftfbBody.appendChild(ftfbBox);
};

handlerEvent(window, 'DOMContentLoaded', ftfbLoaded);
var isParent = function(obj,parentObj){
    //如果对比自身，返回false
    if(obj == parentObj){
      return false
    }
    while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
        if (obj == parentObj){
            return true;
        }
        obj = obj.parentNode;
    }
    return false;
}
var remove_elems = function(sel_elems){
  new_elems = []
  //返回数组中没有父元素的元素
  var sel_elem = function(){
    for(j=0;j<sel_elems.length;j++){
      if(isParent(sel_elems[i],sel_elems[j])){
        return false
      }
    }
    return sel_elems[i]
  }
  //如果一个元素在数组中没有父元素,就push入新数组
  for(var i=0;i<sel_elems.length;i++){
    if(sel_elem()){
      new_elems.push(sel_elem())
    }
  }
  return new_elems
}
var get_sel_elems = function(){
  //https://developer.mozilla.org/zh-CN/docs/Web/API/Selection

  var  selObj = window.getSelection()
  var  anchor_elem = selObj.anchorNode.parentElement
  var  focus_elem = selObj.focusNode.parentElement
  //特殊处理anchorNode并排序
  if(anchor_elem.getBoundingClientRect().top < focus_elem.getBoundingClientRect().top){
    start_elem = anchor_elem
    end_elem = focus_elem
  }else{
    end_elem = anchor_elem
    start_elem = focus_elem
  }
  //select开头与结尾经常缺少内容,因此需要修补
  var fix_start = function(elem){
    var _elem = null
    if(['TR','THEAD','PRE','P','H1','H2','H3','H4','H5','H6','LI'].indexOf(elem.parentElement.tagName) !== -1){
      _elem = elem.parentElement
    }
    if(['TR','THEAD','PRE'].indexOf(elem.parentElement.parentElement.tagName) !== -1){
      _elem = elem.parentElement.parentElement
    }
    return _elem || elem
  }
  start_elem = fix_start(start_elem)
  end_elem = fix_start(end_elem)

  var  all_elems = document.querySelectorAll('*')
  var  sel_elems = []

  sel_elems.push(start_elem)
  for(var i=0;i<all_elems.length;i++){
      if (selObj.containsNode(all_elems[i])){
          var tagname = all_elems[i].tagName.toLowerCase()
            //将相对路径改为绝对路径
            if(tagname == 'a'){all_elems[i].href = all_elems[i].href}
            if(tagname == 'img'){all_elems[i].src = all_elems[i].src}
            sel_elems.push(all_elems[i])

      }
  }
  if(start_elem != end_elem){
    sel_elems.push(end_elem)
  }

  //清除重复出现的子元素
  sel_elems = remove_elems(sel_elems)
  //得到outerHTMl
  for(var i=0;i<sel_elems.length;i++){
    sel_elems[i] = sel_elems[i].outerHTML
  }
  console.log(sel_elems)
  return sel_elems
}


var get_md = function(){
  sel_elems = get_sel_elems()
  for(i=0;i<sel_elems.length;i++){
    sel_elems[i] = html2md(sel_elems[i])
  }
  return sel_elems.join('\n')
}

var copy_as_md = function(){

  var listener = function(event){
    event.preventDefault();
      let clipboardData = event.clipboardData || window.clipboardData,
          text = window.getSelection().toString();
      text = get_md()
      clipboardData.setData('text/plain', text); // 将处理好的 text 写入剪贴板
      clipboardData.setData('text', text); // IE 兼容
  }
  document.addEventListener('copy', listener)
  document.execCommand('copy')
  document.removeEventListener('copy', listener)

}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'copy as md'){
      copy_as_md()
      sendResponse('Hello background.');
    }
});

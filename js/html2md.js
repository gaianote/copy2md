// 接受outerHTML，tagname作为参数，返回tag为elem列表
// 可以使用elem.attr访问elem属性...
var param_html = function(outerHTML,tagname){

  //接受tagname 比如h1 返回选择h1的正则表达式，只能选择闭合的tag
  //如果添加参数rule 则会返回result[0]组成的列表，否则返回分组
  var get_tag_reg= function(tagname,rule = ''){
    //tagname = b;选中<b>而不会选中<br>
    tag_start = '(<' + tagname + '>|<' + tagname + ' [\\s\\S]*?>)'
    tag_content = '([\\s\\S]*?)'
    tag_end = '(</' + tagname + '>)'
    reg = tag_start + tag_content + tag_end
    //reg 如果加了g 就无法再捕获分组了,会返回所有匹配到的结果(resule[0])
    if(tagname == 'img'){
      reg = '(<img [\\s\\S]*?>)'
    }
    return new RegExp(reg,rule)
  }

  //接受elem.tag.start作为参数,返回一个对象
  var get_tag_attr = function(tag_start){
    let attr_reg = /[\S]+?[\s]*?=[\s]*?(?:'.*?'|".*?")/g
    let tag_attr = {}
    if(tag_start && tag_start.match(attr_reg) ){
      tag_start.match(attr_reg).forEach(result => {
        match = result.match(/([\S]+?)[\s]*?=[\s]*?(?:'(.*?)'|"(.*?)")/)
        //console.log(match)
        tag_attr[match[1]] = match[2] || match[3]
        })
    }
    return tag_attr
  }

  var packing_elems = function(outerHTML,tagname){
    elems_outerHTML = outerHTML.match(get_tag_reg(tagname,'g'))
    elems = []
    if (elems_outerHTML == null) return null;
    if(tagname == 'img'){
      for (elem_outerHTML of elems_outerHTML){
        elem_info = elem_outerHTML.match(get_tag_reg(tagname))
        elem = {}
        elem.outerHTML = elem_info[0]
        elem.tag = {}
        elem.tag.start = elem_info[0]
        elem.attr = get_tag_attr(elem.tag.start)
        elems.push(elem)
      }
      return elems
    }
    for (elem_outerHTML of elems_outerHTML){
      elem_info = elem_outerHTML.match(get_tag_reg(tagname))
      elem = {}
      elem.outerHTML = elem_info[0]
      elem.tag = {}
      elem.tag.start = elem_info[1]
      elem.tag.end = elem_info[3]
      elem.content = elem_info[2]
      elem.attr = get_tag_attr(elem.tag.start)
      elems.push(elem)
    }
    return elems
  }
return packing_elems(outerHTML,tagname)
}

// var replace
// var html = document.documentElement.outerHTML



/*
1. 将<pre></pre>内的标签清空
2. 将<.*?><.*?>之间的空白情空
3. 按照规则转换
4. 转换&gt;等
*/
var html2md = function(html){
    var elems_tag = {
    'h1':['# ','\n'],
    'h2':['## ','\n'],
    'h3':['### ','\n'],
    'h4':['#### ','\n'],
    'h5':['##### ','\n'],
    'h6':['###### ','\n'],
    'li':['* ','\n'],
    'p':['','\n'],
    'tr':['','|\n'],
    'td':['|',''],
    'th':['|',''],
    'code' : ['`','`'],
    'b':['**','**'],
    'i':['*','*'],
    'strong':['**','**'],
    'span':['',''],
    'a':['',''],
    'img':['',''],

    }

  //将一个block_elem替换为markdown语法的
  var param_elem_to_markdown = function(tagname,start,end){
    if (param_html(html,tagname) == null) {return false}

    else if(tagname == 'a'){
      for (var elem of param_html(html,tagname)){
        // 去除锚点
        if(!elem.content){continue}
        markdown = '['+ elem.content.trim() +']('+ elem.attr.href +')'
        html = html.replace(elem.outerHTML,markdown)
      }
    }
    else if(tagname == 'img'){
      for (var elem of param_html(html,tagname)){
        markdown = '![img]('+ elem.attr.src +')\n'
        html = html.replace(elem.outerHTML,markdown)
      }
    }
    else if(tagname == 'pre'){
      for (var elem of param_html(html,tagname)){
        if(elem.content){markdown = start + elem.content.replace(/<br>|<\/br>/g,'\n').replace(/<.*?>/g,'') + end}
        else{markdown = start + end}
        html = html.replace(elem.outerHTML,markdown)
      }
    }
    else {
      for (var elem of param_html(html,tagname)){
        if(elem.content){markdown = start + elem.content.replace(/[\n\r]/g,'').replace(/\s+?/g,' ') + end}
        else{markdown = start + end}
        html = html.replace(elem.outerHTML,markdown)
      }
    }

  }
  param_elem_to_markdown('pre','```\n','\n```\n')
  empty_node = /(?<=<.*?>)[\s]+?(?=<.*?>)/g
  html = html.replace(empty_node,'')
  for (var tagname in elems_tag){
    param_elem_to_markdown(tagname,elems_tag[tagname][0],elems_tag[tagname][1])
  }
  html = html.replace(/<.*?>/g,'')
  html = html.replace(/&gt;/g,'>')
  html = html.replace(/&lt;/g,'<')
  return html
}




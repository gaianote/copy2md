// empty_node = /(?<=<.*?>)[\s]+?(?=<\.*>)///匹配html标签之间的空白字符
// h1 = /(<h1.*?>)([\s\S]*?)(<\/h1>)/
// h2 = /(<h2.*?>)([\s\S]*?)(<\/h2>)/
// h3 = /(<h3.*?>)([\s\S]*?)(<\/h3>)/
// h4 = /(<h4.*?>)([\s\S]*?)(<\/h4>)/
// h5 = /(<h5.*?>)([\s\S]*?)(<\/h5>)/
// h6 = /(<h6.*?>)([\s\S]*?)(<\/h6>)/
// li = /(<li.*?>)([\s\S]*?)(<\/li>)/
// p = /(<p.*?>)([\s\S]*?)(<\/p>)/

// br = /<\/br>|<br>/
// b = /(<b>)(.*?)(<\/b>)/
// strong = /(<strong>)(.+?)(<\/strong>)/
// italic = /(<i>)(.+?)(<\/i>)/

// img = /<img.*?src="(.*?)".*?>/
// td = /<\/td><td>|<tr>|<\/th><th>/
// tr = /<\/tr>/
// thead = /<\/thead>/
// link = /<a [\s\S]*?href="(.*?)".*?>(.+?)<\/a>/
// //处理pre 因为pre里面的换行是有意义的
// span = /<span.*?>|<\/span>/
// pre = /<pre.*?>|<\/pre.*?>/
// code = /<code.*?>|<\/code.*?>/
// other_tag = /<.*?>|<\/.*?>/
// html_r = '&gt;'
// html_l = '&lt;'
// //将所有匹配规则放入数组reg,注意排序顺序不能改变
// const reg_list = [
// span,empty_node,
// h1,h2,h3,h4,h5,h6,li,
// b,strong,italic,br,tr,td,thead,img,link,pre,p,code,other_tag,html_l,html_r]


// var html2md = function(outerHTML){
//   reg_list.forEach((item) => {
//     while(outerHTML.match(item)){
//      result = outerHTML.match(item)
//      outerHTML = replace(outerHTML,result,item)
//     }
//   })
//   return outerHTML
// }

// var replace = function(outerHTML,result,item){
//   var block_tag = function(replace_str){
//     // p = /(<p.*?>)([\s\S]*?)(<\/p>)/
//     _result = result[0].replace(result[1],replace_str).replace(result[2],result[2].replace(/[\r|\n]/g,'').trim()).replace(result[3],'\n')
//     console.log(_result)
//     return outerHTML.replace(result[0],_result)
//   }
//   var both_tag = function(replace_str){
//     console.log(result[0],result[1],result[2],result[3])
//     _result = result[0].replace(result[1],replace_str).replace(result[2],result[2].replace(/[\r|\n]/g,'').trim()).replace(result[3],replace_str)
//     return outerHTML.replace(result[0],_result)
//   }
//   if(item == h1){return block_tag('# ')}
//   if(item == h2){return block_tag('## ')}
//   if(item == h3){return block_tag('### ')}
//   if(item == h4){return block_tag('#### ')}
//   if(item == h5){return block_tag('##### ')}
//   if(item == h6){return block_tag('###### ')}
//   if(item == li){return block_tag('* ')}
//   if(item == p){return block_tag('')}

//   if(item == b){return both_tag('**')}
//   if(item == strong){return both_tag('**')}
//   if(item == italic){return both_tag('*')}
//   if(item == pre){return outerHTML.replace(result[0],'\n' + '```'+ '\n')}
//   if(item == span){
//     return outerHTML.replace(result[0],'')}
//   if(item == code){return outerHTML.replace(result[0],'`')}
//   if(item == img){
//     return outerHTML.replace(result[0],'![img](' + result[1] + ')')}
//   if(item == link){
//     return outerHTML.replace(result[0],'['+ result[2].trim() +'](' + result[1].trim() + ')')}
//   if(item == td){return outerHTML.replace(result[0],'|')}
//   if(item == tr){return outerHTML.replace(result[0],'|' + '\n')}
//   if(item == thead){return outerHTML.replace(result[0],'|----------|----------|' + '\n')}
//   if(item == br){return outerHTML.replace(result[0],'\n')}

//   if(item == other_tag){return outerHTML.replace(result[0],'')}
//   if(item == empty_node){
//     return outerHTML.replace(result[0],'')}
//   if(item == html_l){return outerHTML.replace(result[0],'<')}
//   if(item == html_r){return outerHTML.replace(result[0],'>')}
// }

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
    var block_elems = {
    'h1':['# ','\n'],
    'h2':['## ','\n'],
    'h3':['### ','\n'],
    'h4':['#### ','\n'],
    'h5':['##### ','\n'],
    'h6':['###### ','\n'],
    'li':['* ','\n'],
    'p':['','\n']
    }

    var inline_elems = {
      'code' : '`',
      'b':'**',
      'i':'*',
      'strong':'**',
      'span':'',
      'a':'',
      'img':''
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
        markdown = '[img]('+ elem.attr.src +')'
        html = html.replace(elem.outerHTML,markdown)
      }
    }
    else if(tagname == 'pre'){
      for (var elem of param_html(html,tagname)){
        if(elem.content){markdown = start + elem.content.replace(/<.*?>/g,'') + end}
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
  for (var tagname in block_elems){
    param_elem_to_markdown(tagname,block_elems[tagname][0],block_elems[tagname][1])
  }
  for (var tagname in inline_elems){
    param_elem_to_markdown(tagname,inline_elems[tagname],inline_elems[tagname])
  }
  html = html.replace(/<.*?>/g,'')
  html = html.replace(/&gt;/g,'>')
  html = html.replace(/&lt;/g,'<')
  return html
}




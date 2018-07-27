empty_node = /(?<=<.*?>)[\s]+?(?=<\.*>)///匹配html标签之间的空白字符
h1 = /(<h1.*?>)([\s\S]*?)(<\/h1>)/
h2 = /(<h2.*?>)([\s\S]*?)(<\/h2>)/
h3 = /(<h3.*?>)([\s\S]*?)(<\/h3>)/
h4 = /(<h4.*?>)([\s\S]*?)(<\/h4>)/
h5 = /(<h5.*?>)([\s\S]*?)(<\/h5>)/
h6 = /(<h6.*?>)([\s\S]*?)(<\/h6>)/
li = /(<li.*?>)([\s\S]*?)(<\/li>)/
p = /(<p.*?>)([\s\S]*?)(<\/p>)/

br = /<\/br>|<br>/
b = /(<b>)(.*?)(<\/b>)/
strong = /(<strong>)(.+?)(<\/strong>)/
italic = /(<i>)(.+?)(<\/i>)/

img = /<img.*?src="(.*?)".*?>/
td = /<\/td><td>|<tr>|<\/th><th>/
tr = /<\/tr>/
thead = /<\/thead>/
link = /<a [\s\S]+?href="(.*?)".*?>(.+?)<\/a>/
//处理pre 因为pre里面的换行是有意义的
span = /<span.*?>|<\/span>/
pre = /<pre.*?>|<\/pre.*?>/
code = /<code.*?>|<\/code.*?>/
other_tag = /<.*?>|<\/.*?>/
html_r = '&gt;'
html_l = '&lt;'
//将所有匹配规则放入数组reg,注意排序顺序不能改变
const reg_list = [
span,empty_node,
h1,h2,h3,h4,h5,h6,li,
b,strong,italic,br,tr,td,thead,img,link,pre,p,code,other_tag,html_l,html_r]


var html2md = function(outerHTML){
  reg_list.forEach((item) => {
    while(outerHTML.match(item)){
     result = outerHTML.match(item)
     outerHTML = replace(outerHTML,result,item)
    }
  })
  return outerHTML
}

var replace = function(outerHTML,result,item){
  var block_tag = function(replace_str){
    // p = /(<p.*?>)([\s\S]*?)(<\/p>)/
    _result = result[0].replace(result[1],replace_str).replace(result[2],result[2].replace(/[\r|\n]/g,'').trim()).replace(result[3],'\n')
    console.log(_result)
    return outerHTML.replace(result[0],_result)
  }
  var both_tag = function(replace_str){
    console.log(result[0],result[1],result[2],result[3])
    _result = result[0].replace(result[1],replace_str).replace(result[2],result[2].replace(/[\r|\n]/g,'').trim()).replace(result[3],replace_str)
    return outerHTML.replace(result[0],_result)
  }
  if(item == h1){return block_tag('# ')}
  if(item == h2){return block_tag('## ')}
  if(item == h3){return block_tag('### ')}
  if(item == h4){return block_tag('#### ')}
  if(item == h5){return block_tag('##### ')}
  if(item == h6){return block_tag('###### ')}
  if(item == li){return block_tag('* ')}
  if(item == p){return block_tag('')}

  if(item == b){return both_tag('**')}
  if(item == strong){return both_tag('**')}
  if(item == italic){return both_tag('*')}
  if(item == pre){return outerHTML.replace(result[0],'\n' + '```'+ '\n')}
  if(item == span){
    return outerHTML.replace(result[0],'')}
  if(item == code){return outerHTML.replace(result[0],'`')}
  if(item == img){
    return outerHTML.replace(result[0],'![img](' + result[1] + ')')}
  if(item == link){
    return outerHTML.replace(result[0],'['+ result[2].trim() +'](' + result[1].trim() + ')')}
  if(item == td){return outerHTML.replace(result[0],'|')}
  if(item == tr){return outerHTML.replace(result[0],'|' + '\n')}
  if(item == thead){return outerHTML.replace(result[0],'|----------|----------|' + '\n')}
  if(item == br){return outerHTML.replace(result[0],'\n')}

  if(item == other_tag){return outerHTML.replace(result[0],'')}
  if(item == empty_node){
    return outerHTML.replace(result[0],'')}
  if(item == html_l){return outerHTML.replace(result[0],'<')}
  if(item == html_r){return outerHTML.replace(result[0],'>')}
}



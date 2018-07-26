empty_node = /(?<=>)[\s]+?(?=<)/ //匹配html标签之间的空白字符
h1 = /<h1.*?>([\s\S]*?)<\/h1>/
h2 = /<h2.*?>([\s\S]*?)<\/h2>/
h3 = /<h3.*?>([\s\S]*?)<\/h3>/
h4 = /<h4.*?>([\s\S]*?)<\/h4>/
h5 = /<h5.*?>([\s\S]*?)<\/h5>/
h6 = /<h6.*?>([\s\S]*?)<\/h6>/
li = /<li.*?>([\s\S]*?)<\/li>/
p = /<\/p>/
br = /<\/br>|<br>/
b = /<b>(.+?)<\/b>/
italic = /<i>(.+?)<\/i>/
img = /<img.*?src="(.*?)".*?>/
td = /<\/td><td>|<tr>|<\/th><th>/
tr = /<\/tr>/
thead = /<\/thead>/
link = /<a [\s\S]+?href="(.*?)".*?>(.+?)<\/a>/
//处理pre 因为pre里面的换行是有意义的
tag_in_pre = /<pre.*?>[\s\S]*?(<span.*?>|<\/span>)[\s\S]*?<\/pre.*?>/
pre = /<pre.*?>|<\/pre.*?>/
code = /<code.*?>|<\/code.*?>/
other_tag = /<.*?>|<\/.*?>/

//将所有匹配规则放入数组reg,注意排序顺序不能改变
const reg_list = [tag_in_pre,empty_node,h1,h2,h3,h4,h5,h6,b,italic,li,p,br,tr,td,thead,img,link,pre,code,other_tag]


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
  if(item == h1){return outerHTML.replace(result[0],'# '+ result[1].trim() + '\n')}
  if(item == h2){return outerHTML.replace(result[0],'## '+ result[1].trim() + '\n')}
  if(item == h3){return outerHTML.replace(result[0],'### '+ result[1].trim() + '\n')}
  if(item == h4){return outerHTML.replace(result[0],'#### '+ result[1].trim() + '\n')}
  if(item == h5){return outerHTML.replace(result[0],'##### '+ result[1].trim() + '\n')}
  if(item == h6){return outerHTML.replace(result[0],'###### '+ result[1].trim() + '\n')}
  if(item == li){return outerHTML.replace(result[0],'* '+ result[1].trim() + '\n')}
  if(item == b){return outerHTML.replace(result[0],'**'+ result[1].trim() + '**')}
  if(item == italic){return outerHTML.replace(result[0],'*' + result[1].trim() + '*')}
  if(item == pre){return outerHTML.replace(result[0],'\n' + '```'+ '\n')}
  if(item == tag_in_pre){return outerHTML.replace(result[0],result[0].replace(result[1],''))}
  if(item == code){return outerHTML.replace(result[0],'`')}
  if(item == img){
    return outerHTML.replace(result[0],'![img](' + result[1] + ')')}
  if(item == link){
    return outerHTML.replace(result[0],'['+ result[2].trim() +'](' + result[1].trim() + ')')}
  if(item == td){return outerHTML.replace(result[0],'|')}
  if(item == tr){return outerHTML.replace(result[0],'|' + '\n')}
  if(item == thead){return outerHTML.replace(result[0],'|----------|----------|' + '\n')}
  if(item == br){return outerHTML.replace(result[0],'\n')}
  if(item == p){return outerHTML.replace(result[0],'\n')}
  if(item == other_tag){return outerHTML.replace(result[0],'')}
  if(item == empty_node){return outerHTML.replace(result[0],'')}
}


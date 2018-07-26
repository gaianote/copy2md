empty_node = /(?<=<.*?>)[\s]+?(?=<\.*>)///匹配html标签之间的空白字符
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
span = /<span.*?>|<\/span>/
pre = /<pre.*?>|<\/pre.*?>/
code = /<code.*?>|<\/code.*?>/
other_tag = /<.*?>|<\/.*?>/
html_r = '&gt;'
html_l = '&lt;'
//将所有匹配规则放入数组reg,注意排序顺序不能改变
const reg_list = [span,empty_node,h1,h2,h3,h4,h5,h6,b,italic,li,p,br,tr,td,thead,img,link,pre,code,other_tag,html_l,html_r]


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
  if(item == span){
    console.log('span:' + outerHTML.replace(result[0],''))
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
  if(item == p){return outerHTML.replace(result[0],'\n')}
  if(item == other_tag){return outerHTML.replace(result[0],'')}
  if(item == empty_node){
    console.log('empty_node:' + outerHTML.replace(result[0],''))
    return outerHTML.replace(result[0],'')}
  if(item == html_l){return outerHTML.replace(result[0],'<')}
  if(item == html_r){return outerHTML.replace(result[0],'>')}
}


html = `<div class="highlight-python"><div class="highlight"><pre><span class="gp">&gt;&gt;&gt; </span><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">url_for</span>
<span class="gp">&gt;&gt;&gt; </span><span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>
<span class="gp">&gt;&gt;&gt; </span><span class="nd">@app.route</span><span class="p">(</span><span class="s">'/'</span><span class="p">)</span>
<span class="gp">... </span><span class="k">def</span> <span class="nf">index</span><span class="p">():</span> <span class="k">pass</span>
<span class="gp">...</span>
<span class="gp">&gt;&gt;&gt; </span><span class="nd">@app.route</span><span class="p">(</span><span class="s">'/login'</span><span class="p">)</span>
<span class="gp">... </span><span class="k">def</span> <span class="nf">login</span><span class="p">():</span> <span class="k">pass</span>
<span class="gp">...</span>
<span class="gp">&gt;&gt;&gt; </span><span class="nd">@app.route</span><span class="p">(</span><span class="s">'/user/&lt;username&gt;'</span><span class="p">)</span>
<span class="gp">... </span><span class="k">def</span> <span class="nf">profile</span><span class="p">(</span><span class="n">username</span><span class="p">):</span> <span class="k">pass</span>
<span class="gp">...</span>
<span class="gp">&gt;&gt;&gt; </span><span class="k">with</span> <span class="n">app</span><span class="o">.</span><span class="n">test_request_context</span><span class="p">():</span>
<span class="gp">... </span> <span class="k">print</span> <span class="n">url_for</span><span class="p">(</span><span class="s">'index'</span><span class="p">)</span>
<span class="gp">... </span> <span class="k">print</span> <span class="n">url_for</span><span class="p">(</span><span class="s">'login'</span><span class="p">)</span>
<span class="gp">... </span> <span class="k">print</span> <span class="n">url_for</span><span class="p">(</span><span class="s">'login'</span><span class="p">,</span> <span class="nb">next</span><span class="o">=</span><span class="s">'/'</span><span class="p">)</span>
<span class="gp">... </span> <span class="k">print</span> <span class="n">url_for</span><span class="p">(</span><span class="s">'profile'</span><span class="p">,</span> <span class="n">username</span><span class="o">=</span><span class="s">'John Doe'</span><span class="p">)</span>
<span class="gp">...</span>
<span class="go">/</span>
<span class="go">/login</span>
<span class="go">/login?next=/</span>
<span class="go">/user/John%20Doe</span>
</pre></div>
</div>`




console.log(html2md(html))

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
pre = /<pre.*?<code.*?>|<\/code.*?<\/pre.*?>|<pre.*?>|<\/pre.*?>/
code = /<code.*?>|<\/code.*?>/
other_tag = /<.*?>|<\/.*?>/

//将所有匹配规则放入数组reg,注意排序顺序不能改变
const reg_list = [empty_node,h1,h2,h3,h4,h5,h6,b,italic,li,p,br,tr,td,thead,img,link,pre,code,other_tag]


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


html = `<li class="toctree-l1"><a class="reference internal" href="WritingTests.html">Writing Avocado Tests</a><ul>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#basic-example">Basic example</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#test-statuses">Test statuses</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#saving-test-generated-custom-data">Saving test generated (custom) data</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#accessing-test-data-files">Accessing test data files</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#accessing-test-parameters">Accessing test parameters</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#running-multiple-variants-of-tests">Running multiple variants of tests</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#advanced-logging-capabilities">Advanced logging capabilities</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#unittest-testcase-heritage"><code class="docutils literal notranslate"><span class="pre">unittest.TestCase</span></code> heritage</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#setup-and-cleanup-methods">Setup and cleanup methods</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#running-third-party-test-suites">Running third party test suites</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#fetching-asset-files">Fetching asset files</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#test-output-check-and-output-record-mode">Test Output Check and Output Record Mode</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#test-log-stdout-and-stderr-in-native-avocado-modules">Test log, stdout and stderr in native Avocado modules</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#setting-a-test-timeout">Setting a Test Timeout</a></li>
<li class="toctree-l2"><a class="reference internal" href="https://avocado-framework.readthedocs.io/en/63.0/WritingTests.html#skipping-tests">Skipping Tests</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#cancelling-tests">Cancelling Tests</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#docstring-directives">Docstring Directives</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#python-unittest-compatibility-limitations-and-caveats">Python <code class="docutils literal notranslate"><span class="pre">unittest</span></code> Compatibility Limitations And Caveats</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#environment-variables-for-tests">Environment Variables for Tests</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#simple-tests-bash-extensions">SIMPLE Tests BASH extensions</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#simple-tests-status">SIMPLE Tests Status</a></li>
<li class="toctree-l2"><a class="reference internal" href="WritingTests.html#wrap-up">Wrap Up</a></li>
</ul>
</li>`

console.log(html2md(html))
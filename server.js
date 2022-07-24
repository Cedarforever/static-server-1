var http = require('http')
var fs = require('fs')
var url = require('url')
const { text } = require('stream/consumers')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    
    response.statusCode = 200
    const filepath = path === '/' ? '/index.html' : path
    const index = filepath.lastIndexOf('.')
    console.log(index)
    const suffix = filepath.substring(index)
    const hushMapFileType = {
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.html' : 'text/html',
        '.xml' : 'text/xml',
        '.png' : 'image/png',
        '.jpg' : 'image/jpeg',
        '.gif' : 'image/gif'
    }
    response.setHeader('Content-Type', `${hushMapFileType[suffix] || 'text/html' };charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public${filepath}`)
    } catch (error) {
        response.statusCode = 404
        content = '您输入的文件路径不存在'
    } 
    response.write(content)
    response.end()


  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
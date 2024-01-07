const fs = require('fs');
function split() {
  var text,id
  var file = fs.readFileSync('./Growing Pains - 1x01 - Pilot (ENG).srt','UTF-8')
  file=file.split('\n\n')
  for (var i = 0; i < file.length; i++) {
    var [startTime,endTime] = file[i].match(/(\d{2}:\d{2}:\d{2},\d{3})/img)
    id = file[i].match(/\d{1,}/img)[0]
    text=file[i].slice(file[i].indexOf('<i>'))
    file[i]={id,startTime,endTime,text}
  }
  console.log(file[10]);
}
split()
//(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})

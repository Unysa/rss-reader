const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

function save(){
  var new_data = document.getElementById('input').value;

  if(localStorage.getItem('data') == null){
    localStorage.setItem('data', '[]');
  }

  var old_data = JSON.parse(localStorage.getItem('data'));
  old_data.push(new_data);
  localStorage.setItem('data', JSON.stringify(old_data));
}

/*function view(){
  if(localStorage.getItem('data') != null){
    document.getElementById('output').innerHTML = JSON.parse(localStorage.getItem('data'));
  }
}*/

function load(){
  if(localStorage.getItem('data') != null){
    feeds = JSON.parse(localStorage.getItem('data'));
  }
  return false;
}

function reset_data(){
  localStorage.clear();
}

var feeds = [];

function view(){
  inputvalue = document.getElementById('input').value;
  feeds.push(inputvalue);
  console.log(feeds);
  save();
  return false;
}

function parse(){
  let parser = new RSSParser();
  for(let i = 0; i < feeds.length; i++)
  {
    parser.parseURL(CORS_PROXY + feeds[i], function(err, feed) {
      if (err) throw err;
      console.log(feed.title);
      document.write(feed.title + "<br><br>");
      feed.items.forEach(function(entry) {
        console.log(entry.title + ':' + entry.link);
        document.write(entry.title + "<br>");
        document.write(entry.link + "<br><br>");
      });
    })
  }
  return false;
}
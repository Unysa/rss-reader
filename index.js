const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

var feeds = [{rss: "rss", category:"category"}];

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function addValue(){
  //var arr = JSON.parse(localStorage.getItem('data'));
  var textToAdd  = document.getElementById("input2").value;
  var option 		 = document.createElement("option");
  var x					 = document.getElementById("myCategory");
  
  option.text = textToAdd;
  x.add(option);
}


function save(){
  var new_data = {
    "rss":"data1",
    "category":"data2",
 };
  new_data.rss = document.getElementById('input').value;
  var e = document.getElementById("myCategory");
  new_data.category = e.options[e.selectedIndex].text;
  if(localStorage.getItem('data') == null){
    localStorage.setItem('data', '[]');
  }

  var old_data = JSON.parse(localStorage.getItem('data'));
  old_data.push(new_data);
  localStorage.setItem('data', JSON.stringify(old_data));
}

function load(){
  if(localStorage.getItem('data') != null){
    feeds = JSON.parse(localStorage.getItem('data'));
  }
  return false;
}

function reset_data(){
  localStorage.clear();
}

function addRss(){
  var inputvalue = [];
  var temp = {rss: "rss", category:"category"};
  inputvalue[0] = document.getElementById('input').value;
  var e = document.getElementById("myCategory");
  inputvalue[1] = e.options[e.selectedIndex].text;
  temp.rss = inputvalue[0];
  temp.category = inputvalue[1];

  feeds.push(temp);
  console.log(feeds); 

  save();
  return false;
}

function parse(){
  $('p').empty();
  let parser = new RSSParser();
  
    feeds.forEach((element)=>{ 
      console.log(element.rssLink);
      if(element.category == document.getElementById("myCategory").value)
      {
        parser.parseURL(CORS_PROXY + element.rss, function(err, feed) {
          if (err) throw err;
          console.log(feed.title);
          $('p').append(feed.title.bold() + "<br><br>").html();
          feed.items.forEach(function(entry) {
            console.log(entry.title + ':' + entry.link);
            $('p').append(entry.title + "<br>").html();
            $('p').append(entry.link + "<br><br>").html();
            
          });
        });
      }
    });
  return false;
}
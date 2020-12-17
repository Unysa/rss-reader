const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

var feeds = [{rss: "rss", category:"category"}];
//var feed = {rss: "rss", category:"category"};

// if(localStorage.getItem('data') != null){
//   feeds = JSON.parse(localStorage.getItem('data'));
// }

// function showDropdown() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

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
  var textToAdd  = document.getElementById("input2").value;
  var x					 = document.getElementById("myCategory");
  var option 		 = document.createElement("option");
  option.text    = textToAdd;
  x.add(option);
}

// function newCategoryList(){
//   var categoryList = [];
//   for(var a=0; a<feeds.length; a++){
//     var unique = true;
//     for(var b=0; b<categoryList.length; b++){
//       if(feeds[a].categoryName == categoryList[b].name) 
//         unique = false;
//     }
//     if(unique) categoryList.push({
//       name: feeds[a].categoryName
//     });
//   }
//   return categoryList;
// }

// function listCategories(id) {
//   $('#home-category-list').append('<li class="nav" data-id="'+id+'">'+categoryList[id].name+'</li>');
// }

// function listActivities(id){
//   $('#home-activity-list').html('');
//   var cat = categoryList[id];
//   for(var a=0; a<feeds.length; a++){
//     if(feeds[a].categoryName == cat.name){
//       newActivity(a);
//     }
//   }
// }

// function newActivity(id){  
//   var title = $('<h3>'+feeds[id].categoryName+'</h3>');
//   var content = $('<p>'+feeds[id].content+'</p>');
//   var li = $('<li>').append(title, content).appendTo($('#home-activity-list'));
// }

// var categoryList = newCategoryList();

// $.each(categoryList, listCategories);

// $("#home-category-list").on("click singletap", "li", function(){
//   var id = $(this).data("id");
//   listActivities(id);
//   $("html, body").animate({ scrollTop: $(document).height() }, "slow");
// });

// newActivity(0);

function save(){
  var new_data = [];
  new_data[0] = document.getElementById('input').value;
  var e = document.getElementById("myCategory");
  new_data[1] = e.options[e.selectedIndex].text;
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
  let parser = new RSSParser();
  //for(let i = 0; i < feeds.length; i++)
  //{
    feeds.forEach((element, index, array)=>{ 
      console.log(element.category);
      parser.parseURL(CORS_PROXY + feeds[i], function(err, feed) {
        if (err) throw err;
        console.log(feed.title);
        document.write(feed.title.bold() + "<br><br>");
        feed.items.forEach(function(entry) {
          console.log(entry.title + ':' + entry.link);
          document.write(entry.title + "<br>");
          document.write(entry.link + "<br><br>");
        });
      });
    });
  //}
  return false;
}
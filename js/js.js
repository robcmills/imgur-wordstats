

var storage_str = '[';
gen_str = function() {
  comments.forEach(function(comment) {
    storage_str = storage_str.concat(JSON.stringify(comment));
    storage_str = storage_str.concat(',');
  });
  storage_str = storage_str.concat(']');
};

// var url = 'https://api.imgur.com/3/gallery.json',
// var url = 'https://api.imgur.com/3/gallery/{id}/comments/best'
var gallery_url = 'https://api.imgur.com/3/gallery/hot/viral',
img_comments_url = 'https://api.imgur.com/3/gallery/image/{id}/comments',

header = {'Authorization': 'Client-ID b37988f15bb617f'},
local_response = {},
images = [],
comments = [];

$(document).ready(function(){
  
window.jqxhr = $.ajax({
    url: gallery_url,
    headers: header
  })
  .success(function(gallery_response) { 
    console.log("success getting gallery", gallery_response);
    images = gallery_response.data;
  })
  .fail(function() {
    console.log("error getting gallery");
  })
  .then(function() {
    console.log('then')
    images.forEach(function(img) {
      $.ajax({
        url: img_comments_url.replace('{id}', img.id),
        headers: header
      })
      .success(function(comments_response) { 
        console.log("success getting comments", comments_response);
        comments = comments.concat(comments_response.data);
      })
      .fail(function() {
        console.log("error getting comments");
      });
    });
  });

});
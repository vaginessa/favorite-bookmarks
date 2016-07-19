//global variables
var $bookmarkTitleInput =$('#bookmark-title');
var $bookmarkUrlInput = $('#url');
var $submitBookmark = $('#submit');
var $bookmarkList = $('#bookmarks');
var $clearReadBookmarks = $('#clearReadBookmarks');
var bookmarkCount = 0;

//bookmark counters
function totalBookmarks() {
  $('#bookmark-tally').html(bookmarkCount);
}

function readBookmarks () {
  $('#read-tally').html($('.read').length);
}

function unreadBookmarks() {
 $('#unread-tally').html((bookmarkCount)-($('.read').length));
}

//submit button will save the title and url that the user inputs
$submitBookmark.on('click', function (event) {
  event.preventDefault();

  var title = $bookmarkTitleInput.val();
  var url = $bookmarkUrlInput.val();

if (!validUrl(url)) {
  return alert('Please enter a valid URL address');
}

generateBookmark(title, url).appendTo($bookmarkList);

function generateBookmark(title, url) {
  return $('<article class="bookmarkInfo">' +
            '<ul>' +
              '<li>' + title + ' ' +
                '<a href="' + url + '">' + url + '</a>' +
                '<div>' +
                  '<button class="read-button">Mark as Read</button>' +
                  '<button class="remove-button">Remove</button>' +
                '</div>' +
              '</li>' +
            '</ul>' +
          '</article>'
        )
  }
  clearInputFields();
  bookmarkCount ++;
  totalBookmarks();
  unreadBookmarks();
});

//enables submit button when valid input is entered
function toggleSubmitButton() {
  if ($bookmarkTitleInput.val() !== '' && $bookmarkUrlInput.val() !== '') {
    $($submitBookmark).prop('disabled', false)
  }
  else {
    $($submitBookmark).prop('disabled', true)
  };
}

//Add class "read" to bookmarks and counts them
$bookmarkList.on('click', '.read-button', function() {
  $(this).toggleClass('read');
    if (($('.read').length) > 0) {
      $('#clearReadBookmarks').prop('disabled', false)
    } else {
      $('#clearReadBookmarks').prop('disabled', true)
    }
  readBookmarks();
  unreadBookmarks();
});

//Removes bookmark completely from the page
$bookmarkList.on('click', '.remove-button', function() {
  $(this).parent().parent().remove();
  bookmarkCount --;
  totalBookmarks();
  readBookmarks();
  unreadBookmarks();
})

//Clears bookmarks that have "mark as read" selected
$clearReadBookmarks.on('click', function() {
  read = $('.read').length
  $('.read').parent().parent().parent().parent().remove();
  bookmarkCount = bookmarkCount - read;
  readBookmarks();
  totalBookmarks();
});

//Clears input fields after clicking the submit button
function clearInputFields() {
  $bookmarkTitleInput.val('');
  $bookmarkUrlInput.val('');
  $bookmarkTitleInput.focus();
}

//url validator
function validUrl(url) {
  var urlTest = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlTest.test(url);
}

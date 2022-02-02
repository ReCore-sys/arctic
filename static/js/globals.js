// If the user presses shift + esc, run close()
$(document).keydown(function (e) {
  if (e.keyCode == 27 && e.shiftKey) {
    close();
  }
});
var activedir = "";
var activefile = "test";
var backgroundfiles = [];
var editoractive = false;

$(document).resize(function () {
  $(".base-container").css(
    "height",
    $(window).height() - $(".header").height()
  );
  $(".base-container").css("width", "85vw");
});

// Here we just set the contents of the primary editor
function SetEditorContent(content, lang) {
  golog("Setting editor content");
  $("welcome").remove();
  // If we already have a code block, remove it
  if ($("pre").length > 0) {
    $("pre").remove();
  }

  if ($(".maintext").length == 0) {
    $(".base-container").append(
      "<pre><code class='maintext lang-" +
        lang +
        "' contenteditable='true'></code></pre>"
    );
    editoractive = true;
  }
  $(".maintext").text(content);
  Prism.highlightAll();
}

// Using the glory of async, sleep for x seconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

nochangekey = [17, 16, 18, 27, 37, 38, 39, 40];

// if the editor is active and the user presses a key, run this function
$(document).keydown(function (e) {
  if (editoractive) {
    if ($("code").focus()) {
      // If the key the user pressed is not in the nochangekey array,
      // run the function to highlight the file
      if (!nochangekey.includes(e.keyCode)) {
        pos = $("code").caret();
        golog("Caret position: " + pos);
        Prism.highlightAll();
        $("code").caret(pos);
      }
    }
  }
});

// Pretty simple function that just removes all children of the item, then adds text
function cleartext(item, text) {
  $(item).empty();
  $(item).append(text);
}

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

$(document).on("resize", function () {
  $(".base-container").css(
    "height",
    $(window).height() - $(".header").height()
  );
  $(".base-container").css("width", "85vw");
});

// Here we just set the contents of the primary editor
function SetEditorContent(content, lang) {
  window.go.main.App.Golog("Setting editor content");
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

//using datetime, sleep for ms milliseconds
function sleep(ms) {
  var dt = new Date();
  dt.setTime(dt.getTime() + ms);
  while (new Date().getTime() < dt.getTime()) {}
}

function asyncsleep(ms) {
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

const nochangekey = [17, 16, 18, 27, 37, 38, 39, 40];

// if the editor is active and the user presses a key, run this function
$(document).on("keydown", function (e) {
  if (editoractive) {
    if ($("code").focus()) {
      // If the key the user pressed is not in the nochangekey array,
      // run the function to highlight the file
      if (!nochangekey.includes(e.keyCode)) {
        let pos = $("code").caret();
        console.log(pos);
        let prev = $("code").text();
        Prism.highlightAll();
        diff = checkdiff(prev, $("code").text());
        //$("code").caret(pos);
      }
    }
  }
});

// Pretty simple function that just removes all children of the item, then adds text
function cleartext(item, text) {
  $(item).empty();
  $(item).append(text);
}

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel,
    range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

/**-----------------------
 *     Socket stuff
 *------------------------*/

/**-----------------------
 *    Checks the difference between two strings
 *------------------------*/
function checkdiff(raw, html) {
  let rawlen = raw.length;
  let htmllen = html.length;
  var diff = htmllen - rawlen;
  return diff;
}

if (true) {
  //If ctrl+shift+i is pressed, create an iframe to ./inspector/Main.html
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.keyCode == 81) {
      document.location.href = "./inspector/Main.html";
      return false;
    }
  });
}

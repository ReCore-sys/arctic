// Using the dirpicker() function, set the returned value to `activedir`

var activedir = "";
var activefile = "";
var backgroundfiles = [];

function openFolder() {
  activedir = dirpicker();
  var targetarea = $(".base-container");
  targetarea.empty();
  targetarea.append("<div class='textholder'></div>");

  if (activefile != "") {
    golog("Active file in welcome: " + activefile);
    file = JSON.parse(getfilecontent(activefile, true));
    setEditorContent(file.Content);
    activefile = activedir + "/" + file.Name;
  } else {
    $(".textholder").append('<h2 class="filetitle">No file selected</h2>');
  }
  golog("We got this far");
  files = JSON.parse(getfiles(activedir));
  golog("We got this far as well");
  addtosidebar(files);
}

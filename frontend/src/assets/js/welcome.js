// Using the dirpicker() function, set the returned value to `activedir`

var activedir = "";
var activefile = "";
var backgroundfiles = [];

async function openFolder() {
  d = await await window.go.main.App.Dirpicker();
  var targetarea = $(".base-container");
  targetarea.empty();
  targetarea.append("<div class='textholder'></div>");
  if (activefile != "") {
    file = await await window.go.main.App.Getfilecontent([activefile, "true"]);
    setEditorContent(file.Content);
    activefile = d + file.Name;
  } else {
    $(".textholder").append('<h2 class="filetitle">No file selected</h2>');
  }
  activedir = d;
  window.go.main.App.Golog("Opening folder: " + d);
  f = await await window.go.main.App.Getfiles([d, "false"]);
  files = JSON.parse(f);
  addtosidebar(files);
}

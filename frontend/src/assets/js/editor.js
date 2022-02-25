//This is the big file we run most of the editor's logic with

// Whenever a file is clicked in the sidebar, this function is called to handle it
async function fileclick(fileid) {
  window.go.main.App.Golog("File clicked: " + fileid);
  let rawfile = $("#" + fileid);
  window.go.main.App.Golog("Got the raw file");
  let file = rawfile.attr("path");
  window.go.main.App.Golog("Clicked " + file);
  // Check if the sidebar element already exists
  if ($(".sidebar").length == 0) {
    // If not, create it
    $(".body").append("<div class='sidebar'></div>");
  }
  target = $("#" + fileid);

  window.go.main.App.Golog("Target path: " + file);
  window.go.main.App.Golog("Raw: " + file);
  goodfile = await window.go.main.App.Getfilecontent([file, "true"]);
  window.go.main.App.Golog("Got file content");

  if (goodfile.Type == "file") {
    window.go.main.App.Golog("It's a file");
    // Get the last part of the path
    file = await window.go.main.App.Getfilecontent([file, "true"]);
    console.log("Got file content");
    console.log(file);

    cleartext($(".filetitle"), goodfile.Name);
    SetEditorContent(goodfile.Content, goodfile.Lang);
    $(".active").removeClass("active");
    $("#" + fileid).addClass("active");
  } else {
    window.go.main.App.Golog("It's a directory");
    //window.go.main.App.Golog(JSON.stringify(goodfile));
    btns = $(".filebutton");
    for (var i = 0; i < btns.length; i++) {
      button = btns[i];
      text = $(button).contents().get(0).nodeValue;
      $(button).empty();
      button.append(text);
    }
    // if "active" is in the classes, remove it
    if (target.hasClass("active")) {
      target.removeClass("active");
    } else {
      $(".active").removeClass("active");
      $(target).addClass("active");
      console.log("FILE: " + file);
      files = await await window.go.main.App.Getfiles([file]);
      console.log("Got files");
      console.log(files);
      window.go.main.App.Golog(JSON.stringify(files));
      files = JSON.parse(files);
      for (var i = 0; i < files.length; i++) {
        window.go.main.App.Golog(files[i].Name);
        id = Math.random().toString(16).substring(2, 18);
        target.append(
          "<button class='filebutton' id=\"" +
            id +
            "\" path='" +
            target.attr("path") +
            "/" +
            files[i].Name +
            '" onclick=\'fileclick("' +
            id +
            "\")'>" +
            files[i].Name +
            "</button>"
        );
      }
    }
  }
}

// Check if there are any elements with the class "filebutton"
if ($(".filebutton").length > 0) {
  $(".filebutton").on("click", function () {
    me = this;
    window.go.main.App.Golog("Raw from filebutton: " + JSON.stringify(me));
    fileclick($(me).attr("path"), me);
  });
}

//Loop through the files array and create a button for each file in the sidebar element
function addtosidebar(files) {
  for (var i = 0; i < files.length; i++) {
    path = activedir + files[i].Name;
    // Generate random 16 character hex string
    id = Math.random().toString(16).substring(2, 18);
    window.go.main.App.Golog("ID: " + id);
    $(".sidebar").append(
      '<li class="filebutton" id="' +
        id +
        '" onclick="fileclick(' +
        "'" +
        id +
        "'" +
        ')"' +
        ' path="' +
        path +
        '">' +
        files[i].Name +
        "</li>\n"
    );
  }
}

// If the user pressed ctrl + d, get all items with the class "filebutton"
$("html").keydown(function (e) {
  if (e.keyCode == 68 && e.ctrlKey) {
    if ($(".filebutton").length > 0) {
      data = getactives();
      data = JSON.stringify(data);
      //gowrite(data);
    } else {
    }
  }
  if (e.keyCode == 70 && e.ctrlKey) {
    html = $("html").html();
    window.go.main.App.Golog(html);
  }
});

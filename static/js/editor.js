//This is the big file we run most of the editor's logic with

// Whenever a file is clicked in the sidebar, this function is called to handle it
function fileclick(fileid) {
  golog("File clicked: " + fileid);
  rawfile = $("#" + fileid);
  golog("Got the raw file");
  file = rawfile.attr("path");
  golog("Clicked " + file);
  // Check if the sidebar element already exists
  if ($(".sidebar").length == 0) {
    // If not, create it
    $(".body").append("<div class='sidebar'></div>");
  }

  golog("Target path: " + file);
  golog("Raw: " + file);
  goodfile = getfilecontent(file, true);
  golog("Got file content");

  if (goodfile.Type == "file") {
    golog("It's a file");
    // Get the last part of the path
    file = getfilecontent(file, true);

    cleartext($(".filetitle"), file.Name);
    SetEditorContent(file.Content, file.Lang);
    $(".active").removeClass("active");
    $("#" + activefile).addClass("active");
  } else {
    golog("It's a directory");
    golog(JSON.stringify(goodfile));
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
      reloadfolder();
    } else {
      $(".active").removeClass("active");
      $(target).addClass("active");
      files = JSON.parse(getfiles(file));
      golog(JSON.stringify(files));
      for (var i = 0; i < files.length; i++) {
        golog(files[i].Name);
        target.append(
          "<button class='filebutton' id=\"" +
            files[i].Name +
            '" onclick=\'fileclick("' +
            f +
            "/" +
            files[i].Name +
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
    golog("Raw from filebutton: " + JSON.stringify(me));
    fileclick($(me).attr("path"), me);
  });
}

//Loop through the files array and create a button for each file in the sidebar element
function addtosidebar(files) {
  for (var i = 0; i < files.length; i++) {
    path = activedir + "/" + files[i].Name;
    // Generate random 16 character hex string
    id = Math.random().toString(16).substring(2, 18);
    golog("ID: " + id);
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
    golog(html);
  }
});

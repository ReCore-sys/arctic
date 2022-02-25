# Arctic

Does it work? Barely.
Made with golang, jquery, and suffering.

## Tech stack:

- Main logic: [Golang](https://golang.org/), [JavaScript](https://www.javascript.com/)
- Static file serving: [Packr](https://github.com/gobuffalo/packr/v2)
- Webview: [Ultralight](https://ultralig.ht/) ([Muon](https://github.com/ImVexed/muon) used as bridge between Ultralight and Golang)
- Stylesheet preprocessor: [Sass](http://sass-lang.com/)
- Syntax highlighter: [Prism](https://prismjs.com/)
- Language detection: [Enry](https://github.com/src-d/enry/v2)
  <sub>Wait, what did I actually code then?</sub>

## Usage:

### Downloading:

Head over to the [releases](https://github.com/ReCore-sys/Arctic/releases) page, grab the latest .7z. Extract it to wherever you want then run the Arctic.exe inside.

### Building:

Git clone this bad boy and head into the folder. You will need golang installed but thats about it. Run `go build` to create a binary, then run it.<br>
If you wanna package it into that .7z file, make sure you have python installed as well as the python packages py7zr and shutil, then run the package.py file with your python interpreter.<br>
Or ya know, you can just run the commands below :P

```sh
git clone https://github.com/ReCore-sys/arctic
cd arctic
go build
arctic.exe
```

## Development

If you wanna help out, great! Fork the repo, do your magic then submit a pull request. If it isn't terrible, I'll merge it and we can all have a nicer, more functional version of this mess.

### Stuff to do

- Sort out the application of stylesheets/scripts
- Split the html into different files somehow
- Create a way to convert ts files to a valid extension
- Unfuck the directory picker
- Config files :)
- Installer

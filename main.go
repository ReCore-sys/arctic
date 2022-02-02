package main

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/ImVexed/muon"
	"github.com/sqweek/dialog"

	"log"
	"net/http"

	arclib "github.com/ReCore-sys/arctic/golibs"
	"github.com/gobuffalo/packr/v2"
	"github.com/lxn/win"
)

func serveonweb(box http.Handler) {
	http.Handle("/", box)
	http.ListenAndServe(":8080", nil)
}
func main() {
	// Any static asset packer of your liking (ex. fileb0x)
	box := packr.New("static", "./static")
	servebox := http.FileServer(box)
	//go serveonweb(servebox)

	width := uint32(win.GetSystemMetrics(win.SM_CXSCREEN))
	height := uint32(win.GetSystemMetrics(win.SM_CYSCREEN))
	cfg := &muon.Config{
		Title:       "Arctic",
		Height:      height,
		Width:       width,
		X:           0,
		Y:           0,
		Resizeable:  true,
		Borderless:  false,
		Titled:      true,
		Maximizable: true,
	}

	m := muon.New(cfg, servebox)
	// Bind all the needed functions to the js side of things
	m.Bind("close", close)
	m.Bind("dirpicker", dirpicker)
	m.Bind("getfiles", getfiles)
	m.Bind("getfilecontent", getfilecontent)
	m.Bind("golog", golog)

	// Show the Window and start the Runtime

	if err := m.Start(); err != nil {
		panic(err)
	}
}

func dirpicker() string {
	dirbuilder := dialog.Directory()
	dirbuilder = dirbuilder.Title("Choose a directory")
	dirbuilder = dirbuilder.SetStartDir("C:/Users/ReCor/Documents/OtherCode/ide")
	browse, err := dirbuilder.Browse()
	if err != nil {
		log.Println(err)
	}
	return browse
	//return "C:/Users/ReCor/Documents/OtherCode/ide/"

}

func getfiles(dir string) string {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Println(err)
	}
	var paths []filereturn
	for _, f := range files {
		filedata := getfilecontent(dir+"/"+f.Name(), false)
		paths = append(paths, filedata)
	}
	// Convert the paths var into a json string
	jsonstring, err := json.Marshal(paths)
	if err != nil {
		log.Println(err)
	}
	stringform := string(jsonstring)
	return stringform
}

type filereturn struct {
	Name    string
	Content string
	Type    string
	Lang    string
}

func getfilecontent(path string, cont bool) filereturn {
	// First, check if it is a dir or a file
	if path == "" {
		log.Println("No path given")
		return filereturn{}
	}
	f, err := os.Stat(path)
	if err != nil {
		log.Println(err)
	}
	if f.IsDir() {
		name := f.Name()
		content := "Directory"
		ftype := "dir"
		return filereturn{name, content, ftype, "None"}
	}
	if err != nil {
		log.Println(err)
	}
	name := f.Name()
	var content []byte
	if cont {
		content, err = ioutil.ReadFile(path)
		if err != nil {
			log.Println(err)
		}
	} else {
		content = []byte("File")
	}
	ftype := "file"
	lang, err := arclib.DetectLanguage(path)
	if err != nil {
		log.Println(err)
	}
	return filereturn{name, string(content), ftype, lang}

}

func golog(s string) {
	if s == "" {
		log.Println("-None-")
	} else {
		println(s)
	}
}

func close() {
	// Close the window
	os.Exit(0)
}

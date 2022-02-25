package main

import (
	"embed"
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"

	wails "github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"

	"log"

	arclib "github.com/ReCore-sys/arctic/golibs"
)

var (
	funcs map[string]interface{}
	mlog  = arclib.Logger{
		Name:  "Main",
		Color: "green",
	}
	wlog = arclib.Logger{
		Name:  "WebServer",
		Color: "blue",
	}
	wslog = arclib.Logger{
		Name:  "WebSocket",
		Color: "magenta"}
	glog = arclib.Logger{
		Name:  "GoLog",
		Color: "yellow",
	}
	webserveport = "8080"
	wsport       = "10000"
	//go:embed frontend
	assets embed.FS
)

func main() {
	mlog.Log("Starting")
	mlog.Log("Creating packr box")
	mlog.Log("Converting to http FileServer")

	app := NewApp()
	cfg := &options.App{
		Title:      "Basic Demo",
		Width:      1024,
		Height:     768,
		Assets:     assets,
		OnStartup:  app.startup,
		OnShutdown: app.shutdown,
		Bind: []interface{}{
			app,
		},
	}
	mlog.Log("Creating muon instance")
	wails.Run(cfg)
	// Show the Window and start the Runtime
	mlog.Log("Showing muon window")

}

func (b *App) Dirpicker() string {
	/*dirbuilder := dialog.Directory()
	dirbuilder = dirbuilder.Title("Choose a directory")
	dirbuilder = dirbuilder.SetStartDir("C:/Users/ReCor/Documents/OtherCode/ide")
	browse, err := dirbuilder.Browse()
	if err != nil {
		log.Println(err)
	}
	return browse*/
	return "C:/Users/ReCor/Documents/OtherCode/arc/"

}

func (b *App) Getfiles(inp []string) string {
	//replace any %2F with /
	dir := inp[0]
	dir = strings.Replace(dir, "%2F", "/", -1)
	println("Dir: ", dir)
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Println(err)
	}
	var paths []Filereturn
	for _, f := range files {
		filedata := b.Getfilecontent([]string{dir + "/" + f.Name(), "false"})
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

// Filereturn is a struct for the file return
type Filereturn struct {
	Name    string
	Content string
	Type    string
	Lang    string
}

// Getfilecontent does what it says
func (b *App) Getfilecontent(inp []string) Filereturn {
	// First, check if it is a dir or a file
	cont := (inp[1] == "true")
	path := inp[0]
	if path == "" {
		log.Println("No path given")
		return Filereturn{}
	}
	f, err := os.Stat(path)
	if err != nil {
		log.Println(err)
	}
	if f.IsDir() {
		name := f.Name()
		content := "Directory"
		ftype := "dir"
		return Filereturn{name, content, ftype, "None"}
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
	return Filereturn{name, string(content), ftype, lang}

}

func (b *App) Golog(s string) {
	if s == "" {
		log.Println("-None-")
	} else {
		println(s)
	}
}

func (b *App) Close() {
	// Close the window
	os.Exit(0)
}

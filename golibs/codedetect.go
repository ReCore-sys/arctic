package arclib

import (
	"io/ioutil"
	"strings"

	"path"

	"github.com/src-d/enry/v2"
)

// DetectLanguage returns the language of the given file
func DetectLanguage(filepath string) (string, error) {
	// Get the file contents
	contents, err := ioutil.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	//
	filepath = path.Base(filepath)

	// Detect the language
	lang := strings.ToLower(enry.GetLanguage(filepath, contents))
	lang = strings.Trim(lang, " ")
	lang = strings.Trim(lang, " ")
	println("Lang: ", lang)

	return lang, err
}

// TODO: Add a map between what enry produces and what prism recognises as a code. For example, enry returns "C++" but prism need "cpp"

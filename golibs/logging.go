package arclib

import "time"

// Logger : A struct that holds the name and color of the logger
type Logger struct {
	Name  string
	Color string
}

// Log : Log a message to the logger
func (l *Logger) Log(s string) {
	name := l.Name
	color := l.Color
	// Convert the color to a terminal color
	switch color {
	case "red":
		color = "\033[31m"
	case "green":
		color = "\033[32m"
	case "yellow":
		color = "\033[33m"
	case "blue":
		color = "\033[34m"
	case "magenta":
		color = "\033[35m"
	case "cyan":
		color = "\033[36m"
	case "white":
		color = "\033[37m"
	default:
		color = "\033[0m"
	}
	currtime := time.Now().Format("2006-01-02 15:04:05")
	println(currtime + " " + color + "[" + name + "]: " + s + "\033[0m")

}

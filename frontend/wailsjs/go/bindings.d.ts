export interface go {
  "main": {
    "App": {
		Close():Promise<void>
		Dirpicker():Promise<string>
		Getfilecontent(arg1:Array<string>):Promise<Filereturn>
		Getfiles(arg1:Array<string>):Promise<string>
		Golog(arg1:string):Promise<void>
		Greet(arg1:string):Promise<string>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}

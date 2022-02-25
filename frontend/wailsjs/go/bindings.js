// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
const go = {
  "main": {
    "App": {
      /**
       * Close
       * @returns {Promise<void>} 
       */
      "Close": () => {
        return window.go.main.App.Close();
      },
      /**
       * Dirpicker
       * @returns {Promise<string>}  - Go Type: string
       */
      "Dirpicker": () => {
        return window.go.main.App.Dirpicker();
      },
      /**
       * Getfilecontent
       * @param {Array<string>} arg1 - Go Type: []string
       * @returns {Promise<Filereturn>}  - Go Type: main.Filereturn
       */
      "Getfilecontent": (arg1) => {
        return window.go.main.App.Getfilecontent(arg1);
      },
      /**
       * Getfiles
       * @param {Array<string>} arg1 - Go Type: []string
       * @returns {Promise<string>}  - Go Type: string
       */
      "Getfiles": (arg1) => {
        return window.go.main.App.Getfiles(arg1);
      },
      /**
       * Golog
       * @param {string} arg1 - Go Type: string
       * @returns {Promise<void>} 
       */
      "Golog": (arg1) => {
        return window.go.main.App.Golog(arg1);
      },
      /**
       * Greet
       * @param {string} arg1 - Go Type: string
       * @returns {Promise<string>}  - Go Type: string
       */
      "Greet": (arg1) => {
        return window.go.main.App.Greet(arg1);
      },
    },
  },

};
export default go;
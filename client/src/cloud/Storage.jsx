import * as dropbox from 'dropbox'

const accessToken = "tJtpEjrKWGAAAAAAAAAAERTRou1qDz1e-DlKRk7nN1ovlvuncklMkK0qKE6pEzdo"
var dbx

class Storage{

    constructor(username){
        console.log("loggedin with name: ", username)
        dbx = new dropbox({accessToken: accessToken})
        dbx.filesListFolder({path: ''})
            .then((response) => {
                console.log("response: ", response)
            })
            .catch((error) => {
                console.log("An error occurred while searching for files: ", error)
            })
    }
}

export default Storage
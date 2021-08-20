const {hideVisu} = require('./hide')
const {login} =  require('./login')

//executar programa
async function run(){

    await login()
    await hideVisu()
}

run()
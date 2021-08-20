const puppeteer = require('puppeteer')
const fs = require('fs')

async function requestStop(){

    const promisse = new Promise((resolve,reject)=>{

        try{

            page.on('request',request=>{
        
                if(request.url().includes('/seen/')){
                    request.abort()
                    resolve(true)
                }else{
                    request.continue()
                }
        
            })
        }catch{
            reject(false)
        }

    })
}





async function hideVisu(){

    const browser = await puppeteer.launch({
        headless:false
    })
    const page = await browser.newPage()

    page.setRequestInterception(true)

    //analisando request e bloqeuando
    page.on('request',request=>{
        
        if(request.url().includes('/seen/')){
            request.abort()
            resolve(true)
        }else{
            request.continue()
        }

    })

    //carregando página do instagram
    await page.goto('https://www.instagram.com/')
    //pegando cookies
    const cookies = JSON.parse(fs.readFileSync('./cookies.json','utf-8'))
    //setando os cookies na página
    await page.setCookie(...cookies)
    await page.reload()
    await page.goto('https://www.instagram.com/direct/inbox/')
<<<<<<< HEAD
    console.log(`
                 -------------------------------------------------------
=======
    console.log(`-------------------------------------------------------
>>>>>>> f9e0f1045f8864ee607e173335ba7d830f2eff95
                |                                                       |
                |   Já é possivel ver as mensagens sem ser detectado.   |
                |                                                       |
                --------------------------------------------------------
                `)
    

}



module.exports= {hideVisu}
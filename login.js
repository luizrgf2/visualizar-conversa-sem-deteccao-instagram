const puppeteer = require('puppeteer')
const env = require('dotenv')
const fs = require('fs')



env.config()

const username = process.env.USERINST
const senha = process.env.SENHA



async function login(){

    const browser = await puppeteer.launch({
        headless:false
    })

    const page = await browser.newPage()

    //entrado na página do instagram
    await page.goto('https://www.instagram.com/')

    await page.waitForSelector('#loginForm > div > div:nth-child(1) > div > label > input')


    //verificando se já existe um usuário logado

    const verfificador = fs.existsSync('./cookies.json')

    if(!verfificador){
        console.log("Fazendo Login......")
        //inserindo dados de login
        await page.type('#loginForm > div > div:nth-child(1) > div > label > input',username) //username
        await page.waitForTimeout(1000)
        await page.type("#loginForm > div > div:nth-child(2) > div > label > input",senha) //senha
        await page.waitForTimeout(1000)
        //clicando no botão
        await page.click('#loginForm > div > div:nth-child(3) > button')
        //esperando meu perfil ser carregado
        await page.waitForSelector(".olLwo")
        //salvando cookies
        
        const cookiesPage = await page.cookies()
        fs.writeFileSync('./cookies.json',JSON.stringify(cookiesPage,null,2),{encoding:"utf-8"})
        console.log('Login feito com sucesso')
        page.close()
        browser.close()
        
    }else{
        console.log("Já existe um usuário, retomando..")
        browser.close()
  
    }    






}

login()
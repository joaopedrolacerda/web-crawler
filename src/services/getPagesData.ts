
import puppeteer from "puppeteer";

interface tweet {
  auth: IAuth;
  cpf: string;
}
interface IAuth {
  userName: string,
  password: string
}

interface ITweet {
  data?: object;
  created_at?: string;
  id?: Number;
  id_str?: string;
  text?: string;
}

class GetPagesData {
  private tweets: any[];


  constructor() {
    this.tweets = [];
  }

  public async execute({ auth,cpf }: any): Promise<any> {
    try {
      const url = "http://extratoclube.com.br/"
      const browser = await puppeteer.launch({
        headless: true,
      })
      const page = await browser.newPage();
     

      
      await page.goto(url)
      await page.setViewport({ width: 1240, height: 700 })

      const elementHandle = await page.waitForSelector('frame');

      const frame = await elementHandle?.contentFrame()



      // console.log(frame)
      const username = await frame?.$('#user')

      const password = await frame?.$('#pass')

      await username?.type(auth.userName)
      await password?.type(auth.password)

      const submit = await frame?.$('#botao')

      await submit?.click();
      await frame?.waitForNavigation();
      const textToClick = 'FECHAR';
      const menu = 'Menu de opções'
      const extratos = 'Extratos'
      await frame?.waitForSelector('[title="Fechar"]')
      // const buttonclose = await frame?.$('ion-button')
      const close = await frame?.$x(`//*[text()="${textToClick}"]`) as any
      await frame?.waitForSelector('[title="Fechar"]')
      const clickout = await frame?.$('[title="Fechar"]')

      await frame?.waitForSelector('[title="Fechar"]')
      await page.waitForTimeout(2000)
      
      await close[0].click()


        //app-extrato
        await frame?.waitForSelector('ion-item')
        await page.waitForTimeout(2000)

        const tete = await frame?.$x(`//*[text()="Extratos"]`) as any
        console.log("tete",tete)

        await tete[0]?.click()

        await page.waitForTimeout(2000)

        const findbeneficios = "Encontrar Benefícios de um CPF"
        const extratosButton = "Extrato online"
        await frame?.waitForSelector('button')

        const encontraItem = await frame?.$x(`//*[text()="${findbeneficios}"]`) as any
        const extratoItem = await frame?.$x(`//*[text()="${extratosButton}"]`) as any

      // //   // Scroll to the end of the page
        //const tete = await frame?.$('span')

        await page.waitForTimeout(2000)
        await extratoItem[0]?.hover()

        await extratoItem[0]?.click()

      //  page.setDefaultTimeout(2000);

        await frame?.waitForSelector('button')

        // const encontraItem = await frame?.$x(`//*[text()="${findbeneficios}"]`)
        //const tete = await frame?.$('span')
        await page.waitForTimeout(2000)

          encontraItem[0]?.hover()
          encontraItem[0]?.click()

      //     page.setDefaultTimeout(2000);

          await page.waitForTimeout(2000)

          await frame?.waitForSelector('input')

          const inputFrame = await frame?.$('input')

          await inputFrame?.type(cpf)

          console.log('console.log input', inputFrame)

          const searchButton = ' Procurar'

          const searchButtonn = await frame?.$x(`//*[text()="${searchButton}"]`) as any
          console.log('inputframe')
          await page.waitForTimeout(2000)
          
          await searchButtonn[0]?.hover()
          await searchButtonn[0]?.click()


          const inputSelector = 'ion-label'
          await frame?.waitForSelector(inputSelector)
          const inputElement = await frame?.$(inputSelector)
          let value = await frame?.evaluate(el => el?.textContent, inputElement)
        
          return {response: {"beneficios":value}}


    } catch (error) {
      throw new Error('ocorreu um erro ao buscar tweet');
    }
  }

}

export default GetPagesData;

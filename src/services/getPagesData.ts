
import puppeteer, { Page } from "puppeteer";

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
      const page = await this.configPage()
      const frame = await this.getFrame(page)

      await this.login(frame,auth)

      await this.closeModal(frame, page)

      await this.closeMenu(frame,page)

      await this.clickToFocus(frame,page)

      await this.selectItem(frame,page)
      
      await this.TypeAndSearch(frame,page,cpf)

        
      const benefits = await this.getData(frame,page)

      console.log(benefits)
      return {response: {"beneficios": benefits}}


    } catch (error) {
      console.log(error)
      throw new Error('Ocorreu um erro inesperado');
    }
  }

  public async configPage(){
    const url = "http://extratoclube.com.br/"
    const browser = await puppeteer.launch({
      headless: false,
    })
    const page = await browser.newPage();
   
    await page.goto(url)
    await page.setViewport({ width: 1240, height: 700 })

    return page
  }

  public async getFrame(page:any){
      const elementHandle = await page.waitForSelector('frame');

      const frame = await elementHandle?.contentFrame()

      return frame

  }

  public async login(frame:any, auth:any){

    const username = await frame?.$('#user')

    const password = await frame?.$('#pass')

    await username?.type(auth.userName)
    await password?.type(auth.password)

    const submit = await frame?.$('#botao')

    await submit?.click();
    await frame?.waitForNavigation();
  }

  public async closeModal(frame: any,page: any){

    const textToClick = 'FECHAR';

    await frame?.waitForSelector('[title="Fechar"]')
    const close = await frame?.$x(`//*[text()="${textToClick}"]`) as any
    await frame?.waitForSelector('[title="Fechar"]')

    await frame?.waitForSelector('[title="Fechar"]')
    await page.waitForTimeout(2000)
    
    await close[0]?.click()
  }
  public async closeMenu(frame:any,page:any){
    await frame?.waitForSelector('ion-item')
    await page.waitForTimeout(2000)

    const extract = await frame?.$x(`//*[text()="Extratos"]`) as any

    await extract[0]?.click()

  }


  public async clickToFocus(frame:any,page:any){
    await page.waitForTimeout(2000)

    const extractsButton = "Extrato online"
    await frame?.waitForSelector('button')

    const findItem = await frame?.$x(`//*[text()="${extractsButton}"]`) as any

    await page.waitForTimeout(2000)

    await findItem[0]?.click()
  }
  public async selectItem(frame:any, page:any){
    await page.waitForTimeout(2000)

    const findbeneficios = "Encontrar Benefícios de um CPF"
    await frame?.waitForSelector('button')

    const encontraItem = await frame?.$x(`//*[text()="${findbeneficios}"]`) as any

    await frame?.waitForSelector('button')


    await page.waitForTimeout(2000)

    encontraItem[0]?.hover()
    encontraItem[0]?.click()

    await page.waitForTimeout(2000)
  }

   public async TypeAndSearch(frame:any, page:any,cpf:String){
    await frame?.waitForSelector('input')

    const inputFrame = await frame?.$('input')

    await inputFrame?.type(cpf)


    const searchButton = ' Procurar'

    const searchButtonn = await frame?.$x(`//*[text()="${searchButton}"]`) as any
    await page.waitForTimeout(2000)
    
    await searchButtonn[0]?.hover()
    await searchButtonn[0]?.click()
   }

   public async getData(frame:any,pages:any){
    const inputSelector = 'ion-label'
    await frame?.waitForSelector(inputSelector)
    const inputElement = await frame?.$(inputSelector)
    let value = await frame?.evaluate(el => el?.textContent, inputElement)
    return value
   }
}

export default GetPagesData;

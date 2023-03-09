import { GetPagesData} from '../../services'
import puppeteer from "puppeteer";

jest.mock('puppeteer')
describe('getPagesData service', () => {
  let sut: GetPagesData

  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(async () => {
    // await getBrowser();
    // page = await getPage();
    // await page.goto('https://www.example.com');
    sut = new GetPagesData()
  });

  afterAll(async () => {
  });


  describe('execute', () => {
    it('should get data', async () => {
      const mockBrowser = {
        newPage: jest.fn(),
        close: jest.fn(),
      };
      const mockPage = {
        goto: jest.fn(),
        evaluate: jest.fn(() => 'mock data'),
        setViewport: jest.fn(() => 'alou'),
        waitForSelector: jest.fn(() => {elementHandle: () => {}}),
        waitForTimeout: jest.fn(() => {})
      };
      const mockFrame = {
        $: jest.fn(),
        contentFrame: jest.fn(),
        $x: jest.fn(() => []),
        waitForNavigation: jest.fn(() => {}),
        waitForSelector: jest.fn(() =>{}),
        evaluate: jest.fn((el) =>  "12312312")
      };

      (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);
      (mockBrowser.newPage as jest.Mock).mockResolvedValue(mockPage);
      (mockPage.waitForSelector as jest.Mock).mockResolvedValue(mockFrame);
      (mockPage.waitForSelector as jest.Mock).mockResolvedValue(mockFrame);
      (mockFrame.contentFrame as jest.Mock).mockResolvedValue(mockFrame)

      const expectedValue = await sut.execute({auth: {userName:"alo", password: "alo"}, cpf: "12312312"})

      expect(expectedValue).toBeDefined()
      expect(expectedValue.response.beneficios).toEqual('12312312')
    })

    it('should return some error when try open puppeteer', async () => {
      try {
        const mockBrowser = {
          newPage: jest.fn(),
          close: jest.fn(),
        };
        const mockPage = {
          goto: jest.fn(),
          evaluate: jest.fn(() => 'mock data'),
          setViewport: jest.fn(() => 'alou'),
          waitForSelector: jest.fn(() => {elementHandle: () => {}}),
          waitForTimeout: jest.fn(() => {})
        };
        const mockFrame = {
          $: jest.fn(),
          contentFrame: jest.fn(),
          $x: jest.fn(() => []),
          waitForNavigation: jest.fn(() => {}),
          waitForSelector: jest.fn(() =>{}),
          evaluate: jest.fn((el) =>  "12312312")
        };
  
        (puppeteer.launch as jest.Mock).mockRejectedValue(new Error('Ocorreu um erro inesperado'));
        (mockBrowser.newPage as jest.Mock).mockResolvedValue(mockPage);
        (mockPage.waitForSelector as jest.Mock).mockResolvedValue(mockFrame);
        (mockPage.waitForSelector as jest.Mock).mockResolvedValue(mockFrame);
        (mockFrame.contentFrame as jest.Mock).mockResolvedValue(mockFrame)
  
        const expectedValue = await sut.execute({auth: {userName:"alo", password: "alo"}, cpf: "12312312"})
  
        expect(expectedValue).toBeDefined()
        expect(expectedValue.response.beneficios).toEqual('12312312')
      } catch (error: any) {
        expect(error).toBeDefined()
        expect(error.message).toEqual('Ocorreu um erro inesperado')
      }
      
    })
  })
  
})

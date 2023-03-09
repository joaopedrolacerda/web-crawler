import { PagesController } from "../../controllers"
import { mock, MockProxy } from 'jest-mock-extended'
import { GetPagesData } from "../../services"

jest.mock('../../services/getPagesData')
// jest.mock('puppeteer')
jest.setTimeout(100000);
describe('pagesDatacontroller', () => {
  let getPagesData: any

  let sut: PagesController
  let request: any;
  let response: any;

  beforeEach(() => {
    const mockBody = {
      auth: {
        username: "teste",
        password: "teste"
      },
      cpf: "1231231"
    }
    getPagesData = mock()
    getPagesData.execute.mockReturnValue('alou')

    sut = new PagesController()
    request = {
      body: {}
    };

    response = {
      send: jest.fn((param) => param),
      json: jest.fn((json) => json ),
      status: jest.fn((status) => status).mockReturnThis(),
    };
  })
  it('should be return error when username is emptyß', async () => {
    request.body = {
      "auth": {
        "userName": null,
        "password": "testekonsi"
      },
      "cpf": "099.387.965-91"
    }
    const pageDataController = await sut.find(request, response)
    //Nome de usuario Não pode ser vazio
    expect(pageDataController).toBeDefined()
    expect(pageDataController[0].constraints.isNotEmpty).toBeDefined()
    expect(pageDataController[0].constraints.isNotEmpty).toEqual('Nome de usuario Não pode ser vazio')
  })
  it('should be return error when password is emptyß', async () => {
    request.body = {
      "auth": {
        "userName": 'testekonsi',
        "password": null
      },
      "cpf": "099.387.965-91"
    }
    const pageDataController = await sut.find(request, response)
    //Nome de usuario Não pode ser vazio
    expect(pageDataController).toBeDefined()
    expect(pageDataController[0].constraints.isNotEmpty).toBeDefined()
    expect(pageDataController[0].constraints.isNotEmpty).toEqual('senha Não pode ser vazio')
  })

  it('should be return error when cpf is emptyß', async () => {
    request.body = {
      "auth": {
        "userName": 'testekonsi',
        "password": 'testekonsi'
      },
      "cpf": null
    }
    const pageDataController = await sut.find(request, response)
    //Nome de usuario Não pode ser vazio
    console.log(response.status)
    expect(pageDataController).toBeDefined()
    expect(pageDataController[0].constraints.isNotEmpty).toBeDefined()
    expect(pageDataController[0].constraints.isNotEmpty).toEqual('Cpf Não pode ser vazio')
  })
  it("should be return data", async () => {
    const mockedAuthService = GetPagesData as jest.MockedClass<typeof GetPagesData>; // typecast to jest.MockedClass

    mockedAuthService.prototype.execute = jest.fn().mockResolvedValue({"beneficios": "alo"}); // mock the implementation of getUserData

    request.body = {
      "auth": {
        "userName": 'testekonsi',
        "password": 'testekonsi'
      },
      "cpf": '099.387.965-91'
    }
    const result = await new mockedAuthService().execute(request.body);
    

    const pageDataController = await sut.find(request, response)

    expect(pageDataController).toBeDefined()
    expect(pageDataController.beneficios).toBeDefined()
    expect(mockedAuthService.prototype.execute).toHaveBeenCalled()
  })
  it("should be return some error", async () => {  
      const mockedAuthService = GetPagesData as jest.MockedClass<typeof GetPagesData>; // typecast to jest.MockedClass

      mockedAuthService.prototype.execute = jest.fn().mockRejectedValue( new Error('ocorreu um erro erro ao buscar dados'))
  
      request.body = {
        "auth": {
          "userName": 'testekonsi',
          "password": 'testekonsi'
        },
        "cpf": '099.387.965-91'
      }
      const pageDataController = await sut.find(request, response)
      
      expect(pageDataController).toBeDefined()
      expect(pageDataController.error.message).toEqual('ocorreu um erro erro ao buscar dados')
 
  })
})

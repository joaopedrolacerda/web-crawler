import { PagesController } from "../../controllers"

import { mocked } from 'ts-jest/utils'
import { mock, MockProxy } from 'jest-mock-extended'
import {GetPagesData} from "../../services"
import { response,request } from "express"

jest.mock('../../services/getPagesData')
describe('pagesDatacontroller', () => {
  let getPagesData: MockProxy<GetPagesData>
  let sut: PagesController
  beforeEach(() => {
    getPagesData = mock()
    getPagesData.execute.mockResolvedValue(
      {
        "resultados": "1231231"
      }
      )
     sut = new PagesController()
  })
  it('should be return some error', async () => {

      await sut.find(request,response)

      expect(sut).toBeDefined()
  })
})

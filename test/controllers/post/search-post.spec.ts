import { searchPost } from '@/http/controllers/post/search-post'
import { makeSearchPostUseCase } from '@/use-cases/factory/make-search-post-use-case'

jest.mock('@/use-cases/factory/make-search-post-use-case')

describe('searchPost controller', () => {
  const mockReply = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }

  const mockPosts = [
    {
      id: 1,
      title: 'Álgebra Linear',
      content: 'Conteúdo...',
      subject: 'Matemática',
      createdAt: new Date(),
      updatedAt: new Date(),
      author_id: 42
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()

    // Mocka o use case
    ;(makeSearchPostUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue(mockPosts)
    })
  })

  it('deve retornar posts com status 200 quando texto válido for fornecido', async () => {
    const mockRequest = {
      params: {
        search: 'álgebra'
      }
    } as any

    await searchPost(mockRequest, mockReply as any)

    expect(makeSearchPostUseCase).toHaveBeenCalled()
    expect(mockReply.status).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(mockPosts)
  })

  it('deve lançar erro se o texto da busca for inválido', async () => {
    const invalidRequest = {
      params: {
        search: undefined
      }
    } as any

    await expect(searchPost(invalidRequest, mockReply as any)).rejects.toThrow()
  })
})

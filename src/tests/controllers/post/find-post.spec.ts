import { findPost } from '@/http/controllers/post/find-post'
import { makeFindPostUseCase } from '@/use-cases/factory/make-find-post-use-case'

jest.mock('@/use-cases/factory/make-find-post-use-case')

describe('findPost controller', () => {
  const mockReply = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }

  const mockPost = {
    id: 1,
    title: 'Álgebra Linear',
    content: 'Conteúdo da postagem',
    subject: 'Matemática',
    createdAt: new Date(),
    updatedAt: new Date(),
    author_id: 42
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Mocka o use case com handler que retorna a postagem
    ;(makeFindPostUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue(mockPost)
    })
  })

  it('deve retornar um post com status 200 se o ID for válido', async () => {
    const mockRequest = {
      params: {
        id: '1'
      }
    } as any

    await findPost(mockRequest, mockReply as any)

    expect(makeFindPostUseCase).toHaveBeenCalled()
    expect(mockReply.status).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(mockPost)
  })

  it('deve lançar erro se o ID for inválido', async () => {
    const invalidRequest = {
      params: {
        id: undefined
      }
    } as any

    await expect(findPost(invalidRequest, mockReply as any)).rejects.toThrow()
  })
})

import { findAllPosts } from '@/http/controllers/post/find-all-posts'
import { makeFindAllPostsUseCase } from '@/use-cases/factory/make-find-all-posts-use-case'

jest.mock('@/use-cases/factory/make-find-all-posts-use-case')

describe('findAllPosts controller', () => {
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
    },
    {
      id: 2,
      title: 'Física',
      content: 'Segunda postagem...',
      subject: 'Ciências',
      createdAt: new Date(),
      updatedAt: new Date(),
      author_id: 43
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()

    // Mocka o caso de uso
    ;(makeFindAllPostsUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue(mockPosts)
    })
  })

  it('deve retornar todos os posts com status 200', async () => {
    const mockRequest = {} as any

    await findAllPosts(mockRequest, mockReply as any)

    expect(makeFindAllPostsUseCase).toHaveBeenCalled()
    expect(mockReply.status).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(mockPosts)
  })
})

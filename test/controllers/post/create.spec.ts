import { create } from '@/http/controllers/post/create'
import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case'

// Moca a factory
jest.mock('@/use-cases/factory/make-create-post-use-case')

describe('create post controller', () => {
  const mockReply = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }

  const mockPostData = {
    title: 'Álgebra Linear',
    content: 'Conteúdo de álgebra',
    subject: 'Matemática',
    createdAt: new Date(),
    updatedAt: new Date(),
    author_id: 42
  }

  const mockPostReturn = {
    id: 1,
    ...mockPostData
  }

  beforeEach(() => {
    jest.clearAllMocks();

    // Define o comportamento do caso de uso mockado
    (makeCreatePostUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue(mockPostReturn)
    })
  })

  it('deve criar um post com sucesso e retornar status 201', async () => {
    const mockRequest = {
      body: { ...mockPostData }
    } as any

    await create(mockRequest, mockReply as any)

    expect(makeCreatePostUseCase).toHaveBeenCalled()
    expect(mockReply.status).toHaveBeenCalledWith(201)
    expect(mockReply.send).toHaveBeenCalledWith(mockPostReturn)
  })

  it('deve lançar erro se o corpo da requisição for inválido', async () => {
    const invalidRequest = {
      body: {
        title: 123, // inválido
        content: 'ok',
        subject: 'ok'
      }
    } as any

    await expect(create(invalidRequest, mockReply as any)).rejects.toThrow()
  })
})

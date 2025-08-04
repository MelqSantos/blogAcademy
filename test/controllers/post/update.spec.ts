import { update } from '@/http/controllers/post/update'
import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case'

jest.mock('@/use-cases/factory/make-update-post-use-case')

describe('update controller', () => {
  const mockReply = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }

  const mockPost = {
    id: '1',
    title: 'Novo Título',
    content: 'Novo conteúdo',
    subject: 'Nova matéria',
    createdAt: new Date(),
    updatedAt: new Date(),
    author_id: 42
  }

  beforeEach(() => {
    jest.clearAllMocks()

    ;(makeUpdatePostUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue(mockPost)
    })
  })

  it('deve atualizar um post e retornar status 200', async () => {
    const mockRequest = {
      params: { id: '1' },
      body: {
        title: 'Novo Título',
        content: 'Novo conteúdo',
        subject: 'Nova matéria',
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 42
      }
    } as any

    await update(mockRequest, mockReply as any)

    expect(makeUpdatePostUseCase).toHaveBeenCalled()
    expect(mockReply.status).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith(mockPost)
  })

  it('deve lançar erro se o ID for inválido', async () => {
    const mockRequest = {
      params: { id: undefined },
      body: {
        title: 'Qualquer',
        content: 'Qualquer',
        subject: 'Qualquer',
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 1
      }
    } as any

    await expect(update(mockRequest, mockReply as any)).rejects.toThrow()
  })

  it('deve lançar erro se o body for inválido', async () => {
    const mockRequest = {
      params: { id: '1' },
      body: {
        title: 123, // inválido
        content: null,
        subject: true
      }
    } as any

    await expect(update(mockRequest, mockReply as any)).rejects.toThrow()
  })
})

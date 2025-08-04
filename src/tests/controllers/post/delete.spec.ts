import { deletePost } from '@/http/controllers/post/delete'
import { makeDeletePostUseCase } from '@/use-cases/factory/make-delete-post-use-case'

jest.mock('@/use-cases/factory/make-delete-post-use-case')

describe('deletePost controller', () => {
  const mockReply = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Mocka o caso de uso com um handler que apenas resolve (simula sucesso)
    ;(makeDeletePostUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue(undefined)
    })
  })

  it('deve deletar um post e retornar status 204', async () => {
    const mockRequest = {
      params: {
        id: '123'
      }
    } as any

    await deletePost(mockRequest, mockReply as any)

    expect(makeDeletePostUseCase).toHaveBeenCalled()
    expect(mockReply.status).toHaveBeenCalledWith(204)
    expect(mockReply.send).toHaveBeenCalled()
  })

  it('deve lançar erro se o ID for inválido', async () => {
    const invalidRequest = {
      params: {
        id: null // inválido
      }
    } as any

    await expect(deletePost(invalidRequest, mockReply as any)).rejects.toThrow()
  })
})

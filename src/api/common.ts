export type Data = Record<string, unknown>

export interface Result<T> {
  success: boolean

  code: number

  message: string

  data: T
}

export function request<T = any, R extends Result<T> = Result<T>>(path: string, params?: Data) {
  return new Promise<R>((resolve, reject) => {
    uni.request({
      method: 'POST',
      url: `/api${path}`,
      data: {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          mobile: localStorage.getItem('phone'),
          ...params,
        },
      },
      header: {
        token: localStorage.getItem('token'),
      },
      success(result) {
        // @ts-expect-error
        const resultD = result.data.result as R

        if (resultD.code == 200) {
          resolve(resultD)
        }

        reject(resultD)
      },
    })
  })
}

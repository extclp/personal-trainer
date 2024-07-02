export type Data = Record<string, unknown>

export interface Result<T> {
  success: boolean

  code: number

  message: string

  data: T
}

export function request<T = any, R extends Result<T> = Result<T>>(path: string, params?: Data) {

  let baseUrl;

  if (import.meta.env.DEV && !navigator) {
    baseUrl = import.meta.env.VITE_API_BASE_PATH_WEIXIN
  } else {
    baseUrl = import.meta.env.VITE_API_BASE_PATH
  }

  return new Promise<R>((resolve, reject) => {
    uni.request({
      method: 'POST',
      url: baseUrl + path,
      data: {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          mobile: uni.getStorageSync('phone'),
          ...params,
        },
      },
      header: {
        token: uni.getStorageSync('token'),
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

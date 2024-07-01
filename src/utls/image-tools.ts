export function ploadFilePromise(url: string) {
  return new Promise<string>((resolve) => {
    // #ifdef MP-WEIXIN
    uni.getFileSystemManager().readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        resolve(`data:image/jpeg;base64,${res.data}`)
      },
    })
    // #endif
    // #ifdef H5
    uni.request({
      url,
      responseType: 'arraybuffer',
      success(resp) {
        const base64 = uni.arrayBufferToBase64(resp.data as ArrayBuffer)
        resolve(`data:image/jpeg;base64,${base64}`)
      }
    })
    // #endif
  })
}

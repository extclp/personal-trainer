export type Data = Record<string, unknown>

interface Result<T> {
    success: boolean,

    code: 200,

    message: string,

    data: T
}

export function request<T = any>(path: string, params?: Data) {
    return new Promise<Result<T>>((resolve, reject) => {
        uni.request({
            method: "POST",
            url: "/api" + path,
            data: {
                jsonrpc: "2.0",
                method: "call",
                params
            },
            header: {
                "token": localStorage.getItem("token")
            },
            success(result) {
                // @ts-ignore
                const resultD = result.data.result as Result<T>

                if (resultD.code == 200) {
                    resolve(resultD)
                }

                reject(resultD)
            }
        })
    })

}
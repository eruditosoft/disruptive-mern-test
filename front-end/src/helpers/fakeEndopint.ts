export function callFakeApi(time: number, responseBody:unknown, error = false):Promise<unknown> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (error) {
                reject(new Error('Error call fake api'));
            } else {
                resolve(responseBody);
            }
        }, time);
    });
}
export function authenticate(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                resolve('your-token-here');
            } else {
                reject(new Error('Неверный логин или пароль'));
            }
        }, 2000);
    });
}
export class BaseException {
    public name: string;
    public message: string;
    public status: number;
    public data: any;

    constructor(name: string, status: number, message: string, data: any = {}) {
        this.name = name;
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
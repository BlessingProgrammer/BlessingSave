export class RejectValue {
    code: number | null;
    status: string | null;
    message: string | null;

    constructor(code: number, status: string, message: string) {
        this.code = code ?? null;
        this.status = status ?? null;
        this.message = message ?? null;
    }
}


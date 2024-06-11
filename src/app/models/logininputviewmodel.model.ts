export class LogInModel
{
    public Username:string|null = null;
    public Password:string|null = null;
    public RememberMe:boolean = false;

    constructor(data?: Partial<LogInModel>) {
        Object.assign(this, data);
    }
}
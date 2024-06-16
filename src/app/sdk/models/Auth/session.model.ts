export class SessionModel{
    public UserId:string|null = null;
    public FirstName:string|null = null;
    public LastName :string|null = null;
    public Token:string|null = null;
    public Expiry :string|null = null;
    public CompanyId :string|null = null;
    public CompanyName :string|null = null;
    
    constructor(data?: Partial<SessionModel>) {
        Object.assign(this, data);
    }
}
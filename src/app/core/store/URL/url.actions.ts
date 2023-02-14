export namespace UrlState {
export class updateState {
    static readonly type = '[url] update';
    constructor(public payload: any) {}
  }
export class resetState {
    static readonly type = '[url] reset';
  }
}
export namespace ConfigState {
export class updateState {
    static readonly type = '[config] update';
    constructor(public payload: any) {}
  }
export class resetState {
    static readonly type = '[config] reset';
  }
}
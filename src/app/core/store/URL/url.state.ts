import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Iurl } from './url.model';
import { UrlState } from './url.actions'; 
import { Selector } from '@ngxs/store';

// const defaultValue:Iconfig = {
//   File:null
// }

@State<Iurl>({
  name : 'urlState',
  //defaults: defaultValue
})


@Injectable()
export class urlState {
  constructor() {}
@Selector()
static getUrlData(state:Iurl){
    return state ;
}
@Action(UrlState.updateState)
  updateUrl(ctx: StateContext<Iurl>, action: UrlState.updateState) {
    const payload = action.payload;

    console.log("payload URL==>",action.payload);

    ctx.patchState(payload);
    
  }
@Action(UrlState.resetState)
  resetUrl(ctx:StateContext<Iurl>){
    ctx.patchState(null);
  }
}
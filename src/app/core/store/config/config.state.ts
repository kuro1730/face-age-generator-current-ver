import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Iconfig } from './config.model';
import { ConfigState } from './config.actions'; 
import { Selector } from '@ngxs/store';
const defaultValue:Iconfig = {
  File:null
}

@State<Iconfig>({
  name : 'configState',
  defaults: defaultValue
})


@Injectable()
export class configState {
  constructor() {}
@Selector()
static getConfigData(state:Iconfig){
    return state ;
}
@Action(ConfigState.updateState)
  updateConfig(ctx: StateContext<Iconfig>, action: ConfigState.updateState) {
    const payload = action.payload;
    ctx.patchState(payload);
  }
@Action(ConfigState.resetState)
  resetConfig(ctx:StateContext<Iconfig>){
    ctx.patchState(defaultValue);
  }
}
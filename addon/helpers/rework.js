import Ember from 'ember';

export function rework(params/*, hash*/) {
  let component = params[0];
  let paramsHash = params[1];
  let layersHash = params[2];
  component.processHash(paramsHash, layersHash);
}

export default Ember.Helper.helper(rework);

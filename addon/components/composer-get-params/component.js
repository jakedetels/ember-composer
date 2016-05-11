import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  init() {
    this._super(...arguments);
    let parent = this.parentView;
    let key = '__composer_registry__';
    parent[key] = parent[key] || Ember.Object.create();
  },
  willInsertElement() {
    this._super(...arguments);
    this.$().empty();
    this.$().attr('style', 'display: none;');
  },
  didRender() {
    this.$().remove();
  },
  processHash(paramsHash, layersHash) {
    let params = this.parentView.composerParams;
    if (! params) {
      params = [];
      let i = 0;
      do {
        let pName = this.get('p' + i);
        if (pName) {
          params.push(pName);
        }
        i++;
      } while( i < 10 );
    }

    for (let i = 0; i < 10; i++) {
      if (i < params.length) {
        let paramName = params[i];
        paramsHash[paramName] = paramsHash['key' + i];
        layersHash[paramName] = layersHash['key' + i];
        this.set('param' + i, paramName);
      } else {
        this.set('param' + i, null);
      }
    }

    let layersName = this.attrs.layersName || 'layers';
    this.parentView.set(layersName, layersHash);
  }
}).reopenClass({
  positionalParams: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']
});

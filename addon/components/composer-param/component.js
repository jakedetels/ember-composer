import Ember from 'ember';
import layout from './template';
import ExtractParams from '../composer-get-params/component';

export default Ember.Component.extend({
  layout,

  attributeBindings: ['layer'],
  
  init() {
    this._super(...arguments);
    if ( ! (this.parentView instanceof ExtractParams)) {
      throw new Error('Incorrect use of {{composer-param}} component. May only be used if the parent view has defined at the top of the template: `{{#composer-get-params}}{{yield}}{{/composer-get-params}}`');
    }

    let parent = this.parentView.parentView;
    let key = '__composer_registry__';
    this.registry = parent[key] = parent[key] || Ember.Object.create();
    this.registry = this.parentView.parentView.__composer_registry__;
  },
  
  willInsertElement() {
    this._super(...arguments);
    let html = this.$().contents();
    this.registry.set(this.layer, html);
  }
}).reopenClass({
  positionalParams: ['layer']
});

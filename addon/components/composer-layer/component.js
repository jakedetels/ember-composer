import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,

  attributeBindings: ['layer'],

  init() {
    this._super(...arguments);

    if (! this.parentView.__composer_registry__) {
      throw new Error('Incorrect use of {{composer-layer}} component. May only be used if the current view has defined at the top of the template: `{{#composer-get-params}}{{yield}}{{/composer-get-params}}`');
    }

    this.registry = this.parentView.__composer_registry__;
    this.set('tagless', this.tagless || this.tagLess);
  },

  willRender() {
    this.html = this.registry.get(this.layer);
    
    if (this.html) { return; }

    if (this.required) {
      let parentComponentName = this.parentView.constructor.toString();
      parentComponentName = (parentComponentName.match(/([\w-]+):$/) || [])[1];
      throw new Error(`The "${parentComponentName}" component expects a parameter named "${this.layer}" to be provided.`);
    } else {
      this.set('useDefault', true);  
    }
  },

  willInsertElement() {
    if (this.tagless) {
      this.html.insertAfter(this.element);
      this.$().attr('style', 'display:none;');
    } else {
      this.$().html(this.html);  
    }
  },

  didRender() {
    if (this.tagless) {
      this.$().remove();
    }
  }

}).reopenClass({
  positionalParams: ['layer']
});

import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['layer'],

  init() {
    this._super(...arguments);

    if (! this.parentView.__composer_registry__) {
      throw new Error('Incorrect use of {{composer-layer}} component. May only be used if the current view has defined at the top of the template: `{{#composer-get-params}}{{yield}}{{/composer-get-params}}`');
    }

    this.registry = this.parentView.__composer_registry__;
    this.set('tagless', this.tagless || this.tagLess);
  },

  willInsertElement() {
    this._super(...arguments);
    let html = this.registry.get(this.layer);
    if (! html) {
      throw new Error(`A parameter named "${this.layer}" was not provided.`);
    }
    if (this.tagless) {
      html.insertAfter(this.element);
      this.$().attr('style', 'display:none;');
    } else {
      this.$().html(html);  
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

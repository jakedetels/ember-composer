import Ember from 'ember';

export default Ember.Mixin.create({
  log(eventName) {
    console.group(this.name + ': ' + eventName);
    console.log('- this.element: ', this.element);
    console.log('- childViews: ', this.get('childViews'));
    console.log('- parent name: ' + this.parentView.name);
    console.groupEnd();
  },
  willRender() {
    this.log('willRender');
  },
  willInsertElement() {
    this.log('willInsertElement');
  },
  didInsertElement() {
    this.log('didInsertElement');
  },
  didRender() {
    this.log('didRender');
  }
});

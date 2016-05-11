import Ember from 'ember';
import ComponentLogMixin from 'layout-component/mixins/component-log';
import { module, test } from 'qunit';

module('Unit | Mixin | component log');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentLogObject = Ember.Object.extend(ComponentLogMixin);
  let subject = ComponentLogObject.create();
  assert.ok(subject);
});

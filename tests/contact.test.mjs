import test from 'node:test';
import assert from 'node:assert/strict';
import { contactReasons, validateContact } from '../src/data/contact.ts';

test('every reason accepts the same basic subject and message', () => {
  for (const reason of contactReasons) assert.deepEqual(validateContact(reason, 'My question', 'Could you help?'), { reason: '', subject: '', message: '' });
});
test('missing reason and whitespace-only fields are rejected', () => {
  const errors = validateContact('', '   ', '\n');
  assert.ok(errors.reason); assert.ok(errors.subject); assert.ok(errors.message);
});
test('unknown reasons and oversized fields are rejected', () => {
  const errors = validateContact('invalid', 'a'.repeat(101), 'a'.repeat(4001));
  assert.ok(errors.reason); assert.ok(errors.subject); assert.ok(errors.message);
});

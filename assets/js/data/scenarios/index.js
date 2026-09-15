import { mountainScenarios } from './mountains.js';
import { forestScenarios } from './forest.js';
import { riverScenarios } from './river.js';
import { fieldScenarios } from './field.js';

export const scenarios = [
  ...mountainScenarios,
  ...forestScenarios,
  ...riverScenarios,
  ...fieldScenarios
];
import { test as base, expect } from '@playwright/test'
import { collectClientCoverage } from 'nextcov/playwright'

export interface TestFixtures {
  coverage: void
}

export const test = base.extend<TestFixtures>({
  // Auto-collect v8 coverage for each test
  coverage: [
    async ({ page }, use, testInfo) => {
      await collectClientCoverage(page, testInfo, use)
    },
    { scope: 'test', auto: true },
  ],
})

export { expect }

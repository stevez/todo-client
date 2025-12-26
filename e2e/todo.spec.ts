import { test, expect } from './fixtures/test-fixtures'

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows empty state initially', async ({ page }) => {
    await expect(page.getByText('Empty To do List')).toBeVisible();
  });

  test('can add a todo item', async ({ page }) => {
    await page.getByPlaceholder('Enter New To do Item:').fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Empty To do List')).not.toBeVisible();
  });

  test('can mark todo as completed', async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder('Enter New To do Item:').fill('Walk the dog');
    await page.getByRole('button', { name: 'Add' }).click();

    // Mark as completed
    await page.getByRole('checkbox').click();

    // Check that text has line-through style
    const todoText = page.locator('span', { hasText: 'Walk the dog' });
    await expect(todoText).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('can delete a todo item', async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder('Enter New To do Item:').fill('Clean room');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Clean room')).toBeVisible();

    // Delete the todo
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText('Clean room')).not.toBeVisible();
    await expect(page.getByText('Empty To do List')).toBeVisible();
  });

  test('can add multiple todos', async ({ page }) => {
    const todos = ['Task 1', 'Task 2', 'Task 3'];

    for (const todo of todos) {
      await page.getByPlaceholder('Enter New To do Item:').fill(todo);
      await page.getByRole('button', { name: 'Add' }).click();
    }

    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible();
    }
  });

  test('prevents adding empty todo', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: 'Add' }).click();

    // Should still show empty state
    await expect(page.getByText('Empty To do List')).toBeVisible();
  });
});

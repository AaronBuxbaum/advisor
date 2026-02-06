// Type declarations for @testing-library/jest-dom matchers with Bun
import "@testing-library/jest-dom";

declare module "bun:test" {
  interface Matchers<T = unknown> {
    toBeInTheDocument(): T;
    toHaveClass(...classNames: string[]): T;
    toHaveAttribute(attr: string, value?: string | RegExp): T;
    toBeDisabled(): T;
    toBeEnabled(): T;
    toBeVisible(): T;
    toBeEmptyDOMElement(): T;
    toBeInvalid(): T;
    toBeRequired(): T;
    toBeValid(): T;
    toContainElement(element: HTMLElement | null): T;
    toContainHTML(html: string): T;
    toHaveAccessibleDescription(description?: string | RegExp): T;
    toHaveAccessibleName(name?: string | RegExp): T;
    toHaveDescription(description?: string | RegExp): T;
    toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): T;
    toHaveFocus(): T;
    toHaveFormValues(values: Record<string, any>): T;
    toHaveStyle(css: string | Record<string, any>): T;
    toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): T;
    toHaveValue(value: string | string[] | number | null): T;
    toBeChecked(): T;
    toBePartiallyChecked(): T;
    toHaveErrorMessage(message: string | RegExp): T;
  }
}
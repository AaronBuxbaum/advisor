# GitHub Copilot Instructions

## Project Overview

This is the advisor repository. When contributing to this project, please follow the guidelines and best practices outlined below.

## General Coding Standards

- Write clean, maintainable, and well-documented code
- Follow language-specific best practices and idioms
- Use meaningful variable and function names that clearly convey intent
- Keep functions focused and single-purpose
- Avoid code duplication; extract common patterns into reusable utilities

## Code Style

- Use consistent indentation:
  - 2 spaces for JavaScript, TypeScript, JSON, YAML, HTML, CSS
  - 4 spaces for Python, Java, C#, Go
  - Use tabs for Makefiles and Go (when conventional)
- Follow the existing code style in the repository
- Write self-documenting code with clear naming
- Add comments only when necessary to explain complex logic or business rules
- Keep line lengths to a maximum of 100 characters

## Documentation

- Add docstrings/JSDoc comments for all public functions and classes
- Document function parameters, return values, and exceptions
- Keep README files up to date with project changes
- Document any complex algorithms or business logic
- Include examples in documentation where helpful

## Testing Guidelines

- Write tests for all new functionality
- Ensure tests are meaningful and test actual behavior, not implementation details
- Follow the existing test structure and naming conventions
- Aim for high test coverage of critical paths
- Keep tests maintainable and easy to understand
- Run tests before committing changes

## Security Best Practices

- Never commit secrets, API keys, or sensitive credentials
- Validate and sanitize all user inputs
- Use parameterized queries for database operations
- Follow the principle of least privilege
- Keep dependencies up to date
- Review security advisories for used packages

## Git Practices

- Write clear, descriptive commit messages
- Keep commits focused on a single logical change
- Reference issue numbers in commit messages when applicable
- Keep the commit history clean and meaningful

## Dependencies

- Only add new dependencies when necessary
- Prefer well-maintained, popular libraries
- Keep dependencies up to date
- Review security advisories before adding new packages
- Document why specific dependencies were chosen

## Error Handling

- Handle errors gracefully with appropriate error messages
- Log errors with sufficient context for debugging
- Don't swallow exceptions without handling them
- Provide user-friendly error messages
- Include error codes or identifiers for troubleshooting

## Performance Considerations

- Be mindful of performance implications
- Avoid premature optimization
- Profile before optimizing
- Consider scalability in design decisions
- Use appropriate data structures and algorithms

## Code Review

- Review all changes before merging
- Provide constructive feedback
- Test changes locally when reviewing
- Ensure CI/CD checks pass
- Check for security vulnerabilities

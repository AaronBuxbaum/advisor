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
  - 4 spaces for Python, Java, C#
  - Tabs for Go and Makefiles (enforced by gofmt for Go)
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

- This project uses **bun** as the package manager
- Use `bun install` to install dependencies, not npm or yarn
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

## GitHub API Access

Claude and Copilot can access the GitHub API using the `gh` CLI tool for repository operations. To enable authenticated API access:

### Authentication
- A GitHub Personal Access Token (PAT) can be provided for API access
- Store the token securely and never commit it to the repository
- The token should have appropriate scopes for the required operations:
  - `repo` - Full control of private repositories
  - `read:org` - Read organization membership
  - `workflow` - Update GitHub Actions workflows

### Using the GitHub CLI (`gh`)
```bash
# Authenticate with a token
echo "$GITHUB_TOKEN" | gh auth login --with-token

# Common operations
gh pr list                    # List pull requests
gh pr create                  # Create a pull request
gh pr view <number>           # View PR details
gh issue list                 # List issues
gh issue create               # Create an issue
gh api repos/{owner}/{repo}   # Direct API access
gh run list                   # List workflow runs
gh run view <run-id>          # View workflow run details
```

### Environment Variables
- `GITHUB_TOKEN` - Personal access token for API authentication
- `GH_TOKEN` - Alternative variable name (also supported by `gh`)

### Best Practices
- Use the minimum required token scopes
- Prefer `gh` CLI over direct API calls when possible
- Handle rate limiting gracefully
- Never log or expose tokens in output

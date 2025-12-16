#!/usr/bin/env bash
#
# Claude Code pre-commit validation hook
# Validates commit message format before git commit runs
#

set -e

# Extract the commit message from the Bash command
# The full command is in CLAUDE_TOOL_USE_PARAMS
COMMIT_MSG_PATTERN='git commit.*-m[[:space:]]*["\x27]([^"\x27]*)["\x27]'

if [[ "$CLAUDE_TOOL_USE_PARAMS" =~ $COMMIT_MSG_PATTERN ]]; then
  COMMIT_MSG="${BASH_REMATCH[1]}"
else
  # If we can't extract the message, allow it through
  exit 0
fi

# Extract first line (subject)
SUBJECT=$(echo "$COMMIT_MSG" | head -n1)

# Basic validation rules
ERRORS=()

# Check if subject starts with lowercase type
if ! [[ "$SUBJECT" =~ ^(feat|fix|chore|docs|refactor|test|style|perf)(\([a-z-]+\))?:[[:space:]].+ ]]; then
  ERRORS+=("Subject must follow format: type(scope): message")
fi

# Check subject length (max 50 chars)
if [ ${#SUBJECT} -gt 50 ]; then
  ERRORS+=("Subject line too long (${#SUBJECT} chars, max 50)")
fi

# Check if subject ends with period
if [[ "$SUBJECT" =~ \.$  ]]; then
  ERRORS+=("Subject should not end with a period")
fi

# If there are errors, display them and exit with error
if [ ${#ERRORS[@]} -gt 0 ]; then
  echo "⚠️  Commit message validation failed:" >&2
  for error in "${ERRORS[@]}"; do
    echo "  - $error" >&2
  done
  echo "" >&2
  echo "Expected format: type(scope): message" >&2
  echo "Example: feat(auth): add login functionality" >&2
  exit 1
fi

# Validation passed
echo "✓ Commit message format validated"
exit 0

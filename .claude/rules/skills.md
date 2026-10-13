# Skills Rule

When asked to create a skill, always place it at:

```
.claude/skills/<skill-name>/SKILL.md
```

Never use `.claude/commands/` for skills. Never refer to them as commands.
Finally run `/reload-plugins` in the conversation after adding a new skill to load it into the system.

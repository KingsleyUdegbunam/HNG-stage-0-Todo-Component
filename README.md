# Todo Card

A stateful task card that tracks time in real-time and adapts its UI based on task status.

Built in two stages for the HNG Frontend track — Stage 0 established the foundation, Stage 1 introduced interactivity and state management.

## What it does

- Real-time deadline tracking — displays:
  - "Due in 3 hours"
  - "Overdue 2 mins"
  - "Long overdue"
- Auto-updates every 30 seconds and stops after 3 days overdue
- Full edit mode — update title, description, priority, and due date
- Bidirectional status sync:
  - Checkbox ↔ Status buttons (Pending / In Progress / Done)
- Dynamic priority styling — card background reflects urgency
- Smart description collapse — detects overflow and toggles "Read more"
- Dedicated overdue indicator — visually separate from countdown
- Completion state:
  - Strikes title
  - Stops timer
  - Replaces countdown with "Completed"

## What changed from Stage 0

| Area             | Stage 0      | Stage 1                                  |
| ---------------- | ------------ | ---------------------------------------- |
| Status           | Display only | Interactive (Pending, In Progress, Done) |
| Priority         | Badge only   | Badge + background styling               |
| Edit             | Console log  | Fully functional form                    |
| Description      | Static       | Collapsible with overflow detection      |
| Overdue          | Color change | Separate indicator element               |
| Time granularity | Basic        | Includes hour-level precision            |
| JS structure     | 3 modules    | 5 modules (logic separated by concern)   |

## Design decisions

- Separate edit mode instead of inline editing — clearer UI state management
- Segmented control for status — faster interaction than dropdowns
- Priority affects full card background — stronger visual hierarchy
- No build tools — `dayjs` imported via CDN for simplicity and speed

## Technical highlights

- Modular architecture with clear separation of concerns (time logic, UI state, edit handling)
- Centralized time update system with controlled interval lifecycle
- DOM state kept in sync with internal task state
- Conditional rendering patterns for UI states (editing, completed, overdue)

## Known limitations

- No persistence — state resets on refresh (intentionally scoped for this stage)
- Single-card implementation — no list management yet
- Delete action is non-functional placeholder

## Accessibility

- `aria-live="polite"` for non-intrusive screen reader updates
- Keyboard-accessible controls with visible focus states
- Proper labeling for interactive elements
- Focus management on edit mode exit

## Stack

HTML · CSS · JavaScript (ES Modules)

## Dependencies

[dayjs](https://day.js.org) — date/time calculations

## Live

[View Here](https://todo-card-hng.netlify.app/)  
[GitHub Repo](https://github.com/KingsleyUdegbunam/HNG-stage-0-Todo-Component)

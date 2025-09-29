
# Bubble

**Bubble** is a simple web-based productivity app that helps you manage focus sessions and track tasks. This project was created to gain experience with PHP.

## Features

* **Focus Timer**

  * Set a timer for your focus sessions.
  * Receive notifications when the timer ends.
  * Session durations are saved automatically to `session_log.json`.

* **To-Do List**

  * Add, delete, toggle, and reorder tasks.
  * Maximum of 3 tasks at a time.
  * Tasks are persisted in `tasks.json`.

## Usage

1. **Run a local PHP server** in the project folder:

```bash
php -S localhost:8000
```
Open the local host link
   * `http://localhost:8000/focus.html` → Focus Timer
   * `http://localhost:8000/todo.html` → To-Do List

3. Start a focus session or manage tasks. Data is automatically saved in JSON files.

## Notes

* Focus sessions and tasks are stored locally in `php/session_log.json` and `tasks.json`.
* Maximum of 3 tasks allowed in the To-Do list at a time.

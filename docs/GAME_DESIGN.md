# Math Blasters – Minimum Viable Product (MVP) Design Document

## Overview
**Math Blasters** is a browser‑playable arcade‑style game where the player defends a base by solving simple addition and subtraction problems. Correct answers fire a projectile that destroys incoming enemies; wrong answers let enemies advance. This document defines the MVP scope, gameplay loop, controls, enemy behavior, scoring, health, win/lose conditions, accessibility considerations, and acceptance criteria that can be manually verified in a web browser.

---

## Core Gameplay Loop
1. **Spawn Enemy** – An enemy appears at the right side of the screen and moves left toward the base.
2. **Present Question** – A math question (addition or subtraction) is shown above the enemy.
3. **Player Input** – The player types an answer using the keyboard and presses **Enter**.
4. **Evaluate**
   * **Correct** – Enemy is destroyed, a hit animation plays, and the player earns points.
   * **Incorrect** – Enemy continues moving; no points are awarded.
5. **Enemy Reaches Base** – If the enemy reaches the base, the base loses one health point.
6. **Repeat** – New enemies spawn at a fixed interval until the game ends.

---

## Player Controls
| Action | Key | Description |
|--------|-----|-------------|
| Submit answer | `Enter` | Evaluate the typed number.
| Clear input | `Backspace` | Delete the last digit.
| Pause/Resume | `P` | Toggle pause state.
| Mute/Unmute | `M` | Toggle audio.

The input field is always focused; the player types numbers directly.

---

## Question Generation
* **Operation** – Randomly choose addition **(+)** or subtraction **(-)** with equal probability.
* **Operand Range** – 0 – 20 for both operands.
* **Constraint** – For subtraction ensure the result is non‑negative (i.e., left operand ≥ right operand).
* **Display** – Show as `A + B = ?` or `A - B = ?` above the enemy sprite.

---

## Answer Feedback
* **Correct** – Play a short “laser” sound, flash the enemy sprite green, show `+10` points.
* **Incorrect** – Play a “miss” sound, flash red, no score change.
* **Visual** – The answer field turns green/red for 0.5 s before resetting.

---

## Enemy Movement & Attack Behavior
* **Speed** – Constant horizontal speed (e.g., 50 px/s) for MVP.
* **Spawn Position** – Right edge, random vertical lane (three lanes).
* **Collision** – Enemy collides with base when its left side reaches `x = 0`.
* **No Attack Animation** – Enemies simply walk; the only “attack” is reaching the base.

---

## Scoring & Health
* **Score per Kill** – 10 points.
* **Base Health** – 3 hit points (HP). Display as three hearts at the top‑left.
* **Game Over** – When health reaches 0.
* **High Score** – Stored in `localStorage` and displayed on the Game Over screen.

---

## Win / Lose Conditions
* **Lose** – Base health is depleted (0 HP).
* **Win** – After a fixed time limit of **2 minutes** the game ends automatically; the player wins if at least **1 HP** remains.

---

## Accessibility
* **Keyboard‑Only** – All actions are performed via the keyboard; no mouse required.
* **Contrast** – UI colors meet WCAG AA contrast ratios (e.g., bright green on dark background).
* **Audio Controls** – Player can mute sound (`M`).
* **Font** – Use a legible, sans‑serif font (e.g., `Arial, 16px`).
* **Screen‑Reader Labels** – HTML `aria-label` attributes on the answer input and status elements.

---

## Acceptance Criteria (Browser‑Testable)
1. **File Presence** – `docs/GAME_DESIGN.md` exists with the exact sections listed above.
2. **HTML/JS Game** – An `index.html` file (to be created separately) loads without external dependencies.
3. **Question Generation** – Running the game shows only addition or subtraction problems with operands 0‑20 and non‑negative subtraction results.
4. **Correct Answer** – Typing the right number and pressing Enter destroys the enemy, awards 10 points, and plays the correct sound.
5. **Incorrect Answer** – Wrong answer leaves the enemy alive and provides red feedback.
6. **Enemy Movement** – Enemies move left at a constant speed and spawn in random lanes.
7. **Base Health** – The base displays three hearts; each enemy that reaches the base removes one heart.
8. **Game Over** – The game ends when health reaches zero, showing a “Game Over” screen.
9. **Win Condition** – After 2 minutes, if health > 0, a “You Win!” screen appears.
10. **Accessibility** – The game is fully operable with keyboard only, can be muted, and UI colors meet contrast standards.
11. **LocalStorage High Score** – After a game session, the high score persists across page reloads.
12. **No External Libraries** – The implementation uses only plain HTML, CSS, and JavaScript; no CDN or npm packages are required.

---

## Summary of Changes
* Added this design document at `docs/GAME_DESIGN.md`.
* No other files modified in this commit.

---

*Verification:* The file was written to the repository and its content matches the specification.
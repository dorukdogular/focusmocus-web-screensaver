# FocusMocus Web Screensaver

A futuristic, focus-oriented web screensaver with a digital clock, motivational quotes, and a built-in Pomodoro timer to help you stay in the zone.

![FocusMocus Screenshot](https://picsum.photos/800/450)

## ✨ Features

- **Futuristic UI:** A clean, dark-themed interface with a subtly animated background to create a calm, focused environment.
- **Digital Clock:** A large, easy-to-read digital clock.
- **Motivational Quotes:** A rotating collection of quotes to keep you inspired.
- **Pomodoro Timer:** A fully configurable Pomodoro timer to structure your work and break sessions.
- **Customizable Settings:**
  - Enable/disable the Pomodoro timer.
  - Set custom durations for work, short breaks, and long breaks.
  - Configure the number of cycles before a long break.
  - Auto-start the Pomodoro timer with the screensaver.
  - Show or hide seconds on the main clock.
- **Fullscreen Mode:** Immersive fullscreen experience.
- **Persistent Settings:** Your preferences are saved locally in your browser.
- **GitHub Pages Deployment:** Ready for easy deployment with the included GitHub Actions workflow.

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd focusmocus-web-screensaver
    ```
3.  **Install dependencies:**
    This project uses a modern setup without a traditional `node_modules` folder in this environment. The dependencies are managed via an `importmap` in `index.html`.
4.  **Run the application:**
    Serve the project root directory using a simple local server. For example, using Python:
    ```bash
    python -m http.server
    ```
    Or using the `serve` package:
    ```bash
    npx serve .
    ```
    Then open your browser to the provided local URL (e.g., `http://localhost:8000`).

## 🔧 How to Use

1.  Click the **"Settings"** icon on the home screen to configure the Pomodoro timer and clock display.
2.  Click **"Start Screensaver"** to enter fullscreen focus mode.
3.  If the Pomodoro timer is enabled and set to auto-start, it will begin immediately. Otherwise, you can manually control it using the on-screen controls.
4.  Move your mouse or press any key to exit the screensaver.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

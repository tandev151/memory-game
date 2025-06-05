# Memory - Word Match Challenge!

Welcome to the Memory - Word Match Challenge! This interactive game allows users to match words with their corresponding definitions by dragging and dropping cards. The project is built with modern web technologies including React, dnd-kit for drag and drop functionality, and Tailwind CSS for styling, featuring 3D card effects.

## Features

* Interactive drag-and-drop interface for matching word and definition cards.
* Distinct areas for words (with droppable slots) and available definitions.
* "Pending match" system: Definitions are placed in slots, awaiting confirmation.
* "Confirm Results" button to evaluate matches and display correctness.
* Stylish 3D card components.
* Responsive design for various screen sizes.

## Tech Stack

* **React:** JavaScript library for building user interfaces.
* **Vite:** Next-generation front-end tooling (assumption, can be replaced with Create React App if used).
* **@dnd-kit/core:** A modern, lightweight, and accessible drag & drop toolkit for React.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Node.js:** JavaScript runtime environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Node.js (Version 20.x.x REQUIRED)**

    This project requires Node.js version 20. We strongly recommend using a Node Version Manager like `nvm` to easily install and switch between Node.js versions. However, manual installation instructions are also provided.

    * **Verify Installation:** After installation, open your terminal (Command Prompt, PowerShell, Terminal, or WSL on Windows) and type:
        ```bash
        node -v
        npm -v
        ```
        You should see `v20.x.x` (or higher within the v20 range) for Node.js and a corresponding npm version.

    * **Recommended: Using a Version Manager (Cross-Platform)**
        * **nvm (Node Version Manager):** Works on macOS, Linux, and Windows (via WSL or [nvm-windows](https://github.com/coreybutler/nvm-windows)).
            * Installation: Follow the instructions on [nvm (macOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).
            * Usage:
                ```bash
                nvm install 20
                nvm use 20
                nvm alias default 20 # Optional: sets v20 as default
                ```

    * **Manual Installation (Node.js v20)**
        If you prefer to install Node.js manually:
        1.  Go to the official Node.js website: [nodejs.org](https://nodejs.org/).
        2.  Navigate to the **"Downloads"** section.
        3.  Look for **Node.js v20.x.x**. It's often beneficial to download the **LTS (Long Term Support)** version if v20 is currently LTS. If v20 is not LTS but specifically required, find it in "Previous Releases" or "All download options". For direct access to v20 downloads: [Node.js v20 Downloads Page](https://nodejs.org/en/download/releases) (Filter or find v20).

        * **Windows:**
            1.  Download the `.msi` installer for your system (64-bit).
            2.  Run the installer and follow the on-screen prompts. Ensure "Add to PATH" is selected (usually default).

        * **macOS:**
            1.  Download the `.pkg` installer.
            2.  Run the installer and follow the on-screen prompts.
            3.  Alternatively, if you use [Homebrew](https://brew.sh/): `brew install node@20` (This might install the latest v20. Check version after.)

        * **Linux:**
            1.  You can install Node.js via package manager. Instructions vary by distribution. See the official guide: [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/).
                * Example for Debian/Ubuntu (ensure the repository provides v20 or use NodeSource distributions):
                    ```bash
                    # Using NodeSource repository (recommended for specific versions)
                    curl -fsSL [https://deb.nodesource.com/setup_20.x](https://deb.nodesource.com/setup_20.x) | sudo -E bash -
                    sudo apt-get install -y nodejs
                    ```
                * Example for Fedora:
                    ```bash
                    sudo dnf module install nodejs:20/common
                    ```
            2.  Alternatively, download the precompiled binaries (`.tar.gz` or `.tar.xz`) for Linux (x64) from the [Node.js v20 Downloads Page](https://nodejs.org/en/download/releases), extract them, and add the `bin` directory to your system's `PATH`.

2.  **npm (Node Package Manager) or Yarn**
    * npm is included with Node.js.
    * If you prefer Yarn:
        * Install Yarn globally after installing Node.js: `npm install --global yarn`
        * Verify: `yarn --version`
    This guide will primarily use `npm` commands, but `yarn` alternatives are similar (e.g., `yarn install` instead of `npm install`, `yarn dev` instead of `npm run dev`).

3.  **Git**
    * You'll need Git to clone the repository. Download it from [git-scm.com](https://git-scm.com/downloads).
    * During installation on Windows, ensure Git is added to your PATH or select "Git Bash Here" for an easy-to-use terminal.

## Getting Started

Follow these steps to set up and run the project locally using your preferred terminal application (e.g., Terminal on macOS/Linux, Command Prompt/PowerShell/Git Bash/WSL on Windows):

1.  **Clone the Repository:**
    Replace `your-repository-url.git` with the actual URL of your Git repository.
    ```bash
    git clone https://github.com/tandev151/memory-game.git 
    cd memory-game
    ```

2.  **Install Dependencies:**
    This command will download and install all the necessary project dependencies listed in `package.json`.
    ```bash
    npm install
    ```
    *(If using Yarn: `yarn install`)*

## Running the Project

Once the dependencies are installed, you can start the development server:

```bash
npm run dev

# 💖 Romedy Lovers Quiz
## Test Your Romantic Comedy Knowledge!🎬✨

## 🚀 Live Demo

Experience the quiz live: (YOUR_LIVE_DEMO_URL_HERE)
---
## 📝 Introduction

The Romedy Lovers Quiz is an interactive web application designed to test your knowledge of iconic quotes from beloved **romantic comedy movies and TV shows**. This project aims to deliver a fun, engaging, and visually polished user experience, showcasing modern front-end development skills with React and TypeScript.

Dive in, identify **which movie or TV show** these famous romantic lines came from, and see if you're truly a rom-com connoisseur! With a sleek design featuring custom gradients and subtle animations, your journey through cinematic romance will be as delightful as a happy ending.
---
## ✨ Features

* **Engaging Homepage:** A welcoming introduction to intrigue users.
* **Dynamic Quiz Lengths:** Users can select quiz lengths of 5, 10, 15, or 25 questions, ensuring a customizable experience.
* **Randomized Questions:** Each quiz session presents a fresh set of shuffled questions for endless replayability.
* **Dynamic Answer Options:** For each heartwarming quote, four answer options are dynamically generated, including the correct **movie/TV show title** and three randomized incorrect options sourced from the overall quote data.
* **Real-time Scoring:** Track your score as you progress, keeping the excitement going.
* **Instant Visual Feedback:** Clear visual cues (vibrant green for correct, bold red for incorrect) after each answer, with a brief pause before the next question to absorb the outcome.
* **Custom Gradient Styling:** Unique and thematic radial gradients for the quiz backdrop and answer options, alongside complementary linear gradients for control buttons, creating a cohesive and appealing visual theme.
* **Quiz Results Summary:** A clear and visually appealing display of your final score at the end of the quiz.
* **Seamless Restart Functionality:** Easily restart the quiz from the results screen or the homepage with a single click.
* **Responsive Design:** The layout adapts seamlessly to various screen sizes, from mobile phones to large desktops, ensuring a consistent and beautiful user experience across all devices.
* **Subtle Animations & Transitions:** Smooth CSS transitions and visual feedback for button interactions and answer selections, enhancing engagement and providing a delightful user experience.
* **Robust Type Safety:** Built with TypeScript to ensure data consistency, reduce common JavaScript errors, and improve code maintainability.
* **Thematic Typography:** Utilizes the elegant **Lora** font for readable and aesthetically pleasing text, with italicized quotes for classic flair.
---
## 🛠️ Technologies Used

* **React (v18+):** A powerful JavaScript library for building dynamic and interactive user interfaces.
* **TypeScript (v5+):** A typed superset of JavaScript that enhances code quality, readability, and reduces runtime errors.
* **Vite:** A lightning-fast next-generation frontend tooling that provides an extremely rapid development experience.
* **CSS3:** For modern styling, animations, and highly responsive design, including advanced gradient and shadow techniques.
* **Google Fonts (Lora):** For beautiful and readable typography.
---
## 🚀 Installation & Setup

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_URL_HERE] # <--- IMPORTANT: Replace with your actual GitHub repo URL!
    cd romedy-lovers-quiz # <--- Assuming your repo name is romedy-lovers-quiz, adjust if different
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or if you use yarn
    # yarn dev
    ```
    The application will typically open in your browser at `http://localhost:5173/` (or another available port).
---
## 📂 Project Structure
rom-com-quiz/
├── public/                # Static assets (like images, favicon)
├── src/
│   ├── components/
│   │   └── Question.tsx   # React component for displaying individual questions and answer options
│   ├── quotes.json        # JSON data file containing all quiz quotes and their corresponding movies/TV shows
│   ├── App.css            # Main application-specific CSS styles, including custom gradients and responsive design
│   ├── App.tsx            # The core React component, managing quiz state, logic, and overall flow
│   ├── main.tsx           # Entry point for the React application, rendering the App component
│   ├── types.ts           # TypeScript interface definitions for data structures (e.g., Quote, QuotesJsonData)
│   └── vite-env.d.ts      # TypeScript declaration file for Vite-specific types and JSON module augmentation
├── .gitignore             # Specifies intentionally untracked files to ignore
├── index.html             # The main HTML file where the React app is injected
├── package.json           # Defines project dependencies and executable scripts
├── tsconfig.json          # TypeScript compiler configuration for the client-side code
├── tsconfig.node.json     # TypeScript configuration specifically for Node.js environment (e.g., Vite config)
└── README.md              # This comprehensive guide to the project

---
## 💡 Key Learning & Challenges
---
Developing this quiz provided valuable experience in:

* **Robust State Management:** Implementing a clear and robust state machine (`quizStarted`, `quizFinished`, `currentQuestionIndex`, `score`) within `App.tsx` to precisely control the entire quiz flow and dynamic UI rendering. This involved careful planning of state transitions and data handling.
* **Advanced TypeScript Usage:** Leveraging TypeScript to define strict interfaces for complex JSON data (`types.ts`) and correctly augmenting module declarations (`vite-env.d.ts`) to ensure compile-time type safety for imported JSON files. This significantly improved code quality, predictability, and reduced debugging time.
* **Dynamic Content Generation:** Crafting intricate logic within `Question.tsx` to dynamically select, shuffle, and present correct and incorrect answer options from a large dataset, ensuring a unique and unpredictable experience for each question. Handling edge cases for answer generation was a fun and rewarding challenge.
* **Responsive Web Design Mastery:** Employing sophisticated CSS media queries to create a fluid, accessible, and aesthetically pleasing user interface that gracefully adapts to devices of all sizes, from the smallest mobile screens to expansive desktop displays.
* **Enhancing User Experience with Visuals:** Integrating subtle yet impactful CSS transitions and transformations to provide immediate, delightful, and intuitive visual feedback for user interactions (e.g., answer selection, button hovers). This attention to detail made the quiz feel significantly more polished and interactive.
* **Thematic CSS Design:** Customizing the visual aesthetic with unique gradient backgrounds and innovative `box-shadow` techniques to create modern, gradient-inspired "borders" that elevate the overall thematic feel of the application.
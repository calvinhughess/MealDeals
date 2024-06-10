
# MealDeals App

MealDeals is a web application designed to scan and identify the best possible food deals, specials, and discounts in the College Park, MD area. The app integrates various functionalities to provide users with a seamless experience in finding and utilizing food deals.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Top Deal Displays:** Showcases the top 3 best food deals upon sign-up.
- **Restaurant Preferences:** Allows users to set and update their favorite restaurants.
- **Custom Notifications:** Sends personalized notifications based on user preferences and new deals.
- **Email Deal Parsing:** Scans emails to identify and extract food deals.
- **Sequential Sign-up Process:** Collects user information in a structured, step-by-step manner.

---

## Technologies

- **Backend:** Node.js, Express, Firestore
- **Frontend:** React, HTML, CSS
- **APIs:** Google Gmail API, OpenAI API
- **Image Processing:** OpenCV
- **Others:** Cheerio (for parsing HTML)

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/MealDeals.git
   cd MealDeals
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Google API credentials, OpenAI API key, and Firestore configuration.

4. **Run the application:**
   ```sh
   npm start
   ```

---

## Usage

1. **Sign up and set your preferences:**
   - Enter your name, email, phone number, password, and food preferences.
2. **Check for top deals:**
   - View the top 3 deals displayed on the dashboard.
3. **Receive notifications:**
   - Get notified about new deals and updates based on your preferences.

---

## Project Structure

```
MealDeals/
├── app/
│   ├── auth/
│   │   ├── firebaseConfig.ts
│   │   └── signUp.ts
│   ├── components/
│   │   ├── SignInComponent.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── StepEmail.tsx
│   │   ├── StepName.tsx
│   │   ├── StepPassword.tsx
│   │   ├── StepPhone.tsx
│   │   ├── StepPreferences.tsx
│   │   └── WelcomeScreen.tsx
│   ├── context/
│   │   └── DealsContext.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── roles/
│   │   └── roleManagement.ts
│   ├── screens/
│   │   ├── ClaimedDealsScreen.tsx
│   │   ├── DealDetailsScreen.tsx
│   │   ├── DealModal.tsx
│   │   └── HomeScreen.tsx
│   ├── storage/
│   │   └── secureStorage.ts
│   ├── utils/
│   │   ├── firestoreSync.ts
│   │   ├── secureStorageUtils.ts
│   │   └── validation.ts
│   ├── _layout.tsx
│   └── index.tsx
├── backend/
│   ├── src/
│   │   ├── .env
│   │   ├── credentials.json
│   │   ├── gmail.js
│   │   ├── server.js
│   │   └── token.json
├── .expo/
├── assets/
├── hooks/
│   └── useColorScheme.ts
├── node_modules/
├── scripts/
├── .gitatttributes
├── .gitignore
├── app.json
├── babel.config.js
├── expo-env.d.ts
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## THIS IS A WORK IN PROGRESS. VIDEO DEMONSTRATION WILL BE UPLOADED SHORTLY

## Contact

**Calvin**  
- Email: [calvinhughes03@gmail.com](mailto:calvinhughes03@gmail.com)
- GitHub: [calvinhughess](https://github.com/calvinhughess)


# ZFIT — Full-Stack Fitness App for Logging Workouts & AI Powered Actionable Insights

## Introduction / Summary

**ZFIT** is a full-stack mobile fitness app designed to help users reach their fitness goals.  

The frontend is built with **React Native** and **TypeScript**, while the backend is powered by **Supabase** and a custom **Python/Flask API** integrated with **Pandas** for workout data processing and analytics.  

I created this app to solve a common frustration with existing fitness apps: many lack essential features, like workout logging and progress tracking, behind paywalls. They also often lack the functionality users actually need.  

ZFIT empowers users to: Create personalized workouts, log exercises without limits, and monitor fitness progress over time with AI-driven insights  

The goal is to make fitness tracking accessible to everyone by offering a simple, intuitive tool that removes the barriers of subscriptions and locked features, while also providing actionable data insights.

## Demo


[Click here to watch the demo](https://youtu.be/98nS1DF1aLU) 
*(A short video showcasing the app’s core features and usage)*


## Tech Stack

| Layer                | Technologies |
|-----------------------|--------------|
| **Frontend**          | React Native, TypeScript, Expo |
| **Backend**           | Python, Flask (REST API), Pandas (data processing), Supabase (Auth, Database, Storage), LLaMA 3 (LLM) |
| **Version Control**   | GitHub |
| **Development Tools** | VS Code |


## Core Features

- AI-generated custom workout plans dynamically created based on each user’s fitness goals, preferences, and input data.
- AI-driven actionable feedback and progress insights generated from a user’s exercise history to help optimize training and performance.
- Secure user sign-up and login using Supabase Authentication with JWT-based sessions  
- Full CRUD operations for custom workouts, enabling users to create, view, edit, and delete workouts  
- Seamless state management across screens using Redux Toolkit for a smooth user experience  
- Exercise search and filtering by title, difficulty, equipment, targeted muscle, category, and force type  
- Filter workouts (completed and in-progress) by muscle groups worked, workout date, and duration  
- Automatic tracking of total weight lifted, workout duration (minutes), sets, reps, workout streaks (consecutive days), and max reps per weight  
- Line graphs to visualize performance progress over time for selected exercises and months  
- Robust data protection with Supabase Row-Level Security (RLS) policies ensuring users only access their own data  




## How to Run the App


Required Technologies
- Node.js
- Xcode (for iOS simulator)
- Python
- Visual Studio Code

Step 1: Set Up the Backend (ZFIT_API)
1. Find my GitHub repository called ZFIT_API 
2. Download and unzip ZFIT_API
3. Run ZFIT_API folder in Visual Studio Code
4. From the ZFIT_API directory, install Python dependencies by running: pip3(or pip) install -r requirements.txt
5. Start the backend server: python3(or python) app.py

Note: Keep this terminal open while using the mobile app

Step 2: Set Up the Front End (ZFIT)
1. Download and unzip ZFIT from this repository
2. Open the folder ZFIT in Visual Studio Code.
3. From the ZFIT directory, install Node dependencies by running: npm install
4. Verify that Expo CLI is installed: expo --version. If no version appears, install Expo CLI globally: npm install -g expo-cli
5. Start the Expo project: Type and enter ‘expo start’ in the terminal
6. Launch the iOS simulator: Press i in the terminal to open the iPhone 16 simulator (ensure Xcode is installed). You may need to navigate to the Expo Go app in the simulator and manually enter url from the terminal that starts with ‘exp://’
Important: Both the backend (ZFIT_API) and the front end (ZFIT) must be running simultaneously.

Step 3: Using the App
1. Open the mobile app and log in with the following credentials:
- Email: Andrew866799@gmail.com
- Password: Test123

Create Tab: Test the AI-powered workout planner by clicking the Program button.

Progress Tab: Generate insights on completed exercises.

Note: Generating a new workout program from the assessment, making changes to the plan, or
generating insights may take up to one minute.


## Challenges & Learnings

- One challenge was working with Ollama, LLaMA 3, and Flask, technologies I had little prior experience with. Through research and testing, I learned to build Flask endpoints and integrate the LLaMA 3 model, successfully enabling communication between the mobile app and Python backend.
- Writing prompts for the LLM was a challenge, as initial outputs were often inaccurate. Through careful experimentation, I discovered that providing highly detailed instructions, which included specifying exactly what the output should and should not contain, significantly improved the model’s accuracy.
- Integrating the frontend, backend, and database technologies into a cohesive system. I overcame this by mapping out a detailed data flow and creating a clear implementation plan
- Designed the front end with Figma to plan layouts and user flow before development, helping ensure a clean and intuitive UI
- Worked with Redux Toolkit, TypeScript, React Native, and Supabase for the first time, gaining full-stack mobile development experience
- Faced challenges adapting layouts for various mobile screen sizes, which taught me to build responsive designs and test across different devices and simulators
- Learned how Supabase Row Level Security (RLS) policies work, and implemented secure access rules to protect user data
- Gained hands-on experience with SQL queries and database design, using ER diagrams and relational schemas to model workout and exercise data effectively

## Future Improvements


- Add more exercises across different difficulty levels, equipment types, and muscle groups to give users a broader selection
- Prepare and publish the app to the iOS App Store and Google Play Store for broader access and visibility
- Improve layout and component scaling to ensure a consistent and user-friendly experience across a wider range of iOS and Android devices
- Dockerize app
- Use a cloud-hosted LLM, such as OpenAI, to achieve faster and more accurate responses
- Expand the user assessment with additional questions to generate even more personalized workout plans.


## Contact


- Email: [Andrew866799@gmail.com](mailto:Andrew866799@gmail.com) 
- LinkedIn: [linkedin.com/in/andrewkgee](https://www.linkedin.com/in/andrewkgee)

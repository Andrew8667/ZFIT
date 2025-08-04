# ZFIT — Full-Stack Fitness App for Logging Workouts & Progress Tracking


## Introduction / Summary


**ZFIT** is a full-stack mobile fitness app built with **React Native** and **TypeScript** on the frontend, and powered by **Supabase** on the backend. I created this app to address a common frustration with fitness apps: many restrict essential features like workout logging and progress tracking behind paywalls.


ZFIT empowers users to create personalized workouts, log exercises without limits, and monitor their fitness progress over time — all completely free. The goal is to make fitness tracking accessible to everyone by offering a simple, intuitive tool that removes the barriers of subscriptions and locked features.
## Demo


[Click here to watch the demo](https://youtu.be/ZKUYFcBDdLQ) 
*(A short video showcasing the app’s core features and usage)*


## Tech Stack


| Layer      | Technologies |
|------------|--------------|
| **Frontend**  | React Native, TypeScript |
| **Backend**   | Supabase (Auth, Database, Storage) |
| **Development Tools**     | VSCode, GitHub|
| **Runtime & Deployment**     | Expo |


## Core Features


- Secure user sign-up and login using Supabase Authentication with JWT-based sessions  
- Full CRUD operations for custom workouts, enabling users to create, view, edit, and delete workouts  
- Seamless state management across screens using Redux Toolkit for a smooth user experience  
- Exercise search and filtering by title, difficulty, equipment, targeted muscle, category, and force type  
- Filter workouts (completed and in-progress) by muscle groups worked, workout date, and duration  
- Automatic tracking of total weight lifted, workout duration (minutes), sets, reps, workout streaks (consecutive days), and max reps per weight  
- Line graphs to visualize performance progress over time for selected exercises and months  
- Robust data protection with Supabase Row-Level Security (RLS) policies ensuring users only access their own data  




## How to Run the App


You can run **ZFIT** on your mobile device or locally using the iOS Simulator:


### Option 1: Run on a Real Device (No Setup Required)


1. Download the **Expo Go** app from the [App Store].
2. Scan the provided QR code
![Scan to Run the App](./assets/QRCode.png)
### Option 2: Run on iOS Simulator (Mac Only, Xcode Required)


1. Download and unzip the project ZIP file.
2. Open the unzipped folder in your preferred terminal or code editor.
3. Run the following commands inside the project folder:
   ```bash
   npm install
   npx expo start```


## Challenges & Learnings


- Designed the front end with Figma to plan layouts and user flow before development, helping ensure a clean and intuitive UI
- Worked with Redux Toolkit, TypeScript, React Native, and Supabase for the first time, gaining full-stack mobile development experience
- Faced challenges adapting layouts for various mobile screen sizes, which taught me to build responsive designs and test across different devices and simulators
- Learned how Supabase Row Level Security (RLS) policies work, and implemented secure access rules to protect user data
- Gained hands-on experience with SQL queries and database design, using ER diagrams and relational schemas to model workout and exercise data effectively
## Future Improvements


- Add more exercises across different difficulty levels, equipment types, and muscle groups to give users a broader selection
- Implement a feature that automatically creates customized workouts based on user preferences like duration, goals, muscle groups, and available equipment
- Prepare and publish the app to the iOS App Store and Google Play Store for broader access and visibility
-  Improve layout and component scaling to ensure a consistent and user-friendly experience across a wider range of iOS and Android devices


## Contact


- Email: [Andrew866799@gmail.com](mailto:Andrew866799@gmail.com) 
- LinkedIn: [linkedin.com/in/andrewkgee](https://www.linkedin.com/in/andrewkgee)

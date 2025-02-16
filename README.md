# Introduction
The YouTube Video Sharing App is a web application that allows users to share and discover YouTube videos in a streamlined and interactive way. The platform enables registered users to submit video links, view a list of shared videos, and receive real-time notifications whenever new content is added.

### Purpose
This project is designed to showcase backend development skills, particularly in handling real-time events and building a scalable application. It emphasizes features such as real-time notifications using WebSockets and structured backend logic to support seamless video sharing.

### Key Features
- User Registration & Authentication – Users can sign up and log in to access the platform.
- YouTube Video Sharing – Users can submit YouTube video links to share with the community.
- Video Feed – A list of shared videos is displayed for easy browsing.
- Real-time Notifications – Logged-in users receive instant notifications when a new video is shared, enhancing engagement.


# Prerequisites
Make sure to have all requirements ready before you run the app:

### Git
```
$ brew install git
```

### Postgres
```angular2html
$ brew install postgres
```

### Redis
```
$ brew install redis
```

### Node 20.16
You can use [nvm](https://github.com/creationix/nvm) to install node:
```bash
$ nvm install 20.16
$ nvm use 20.16
```

### Ruby 3.2.2
You can use [rbenv](https://github.com/rbenv/rbenv) to install ruby:
```bash
$ rbenv install 3.2.2
$ rbenv local 3.2.2
```


# Installation & Configuration
Clone the repository and install the dependencies:

```
$ git clone https://github.com/knh976/youtube-video-sharing.git
$ cd youtube-video-sharing
$ cd backend
$ bundle install
$ cd ../
$ cd frontend
$ yarn install
```


# Database Setup
Start the Postgres:
```
$ brew services start postgres
```

Create the databases:
```
$ bundle exec rails db:create
```

Run migration:
```
$ bundle exec rails db:migrate
```


# Running the Application
Start the development server
```
$ chmod +x bin/start.sh
$ bin/start.sh
```

Run tests
```
$ chmod +x bin/test.sh
$ bin/test.sh
```


# Docker Deployment


# Usage
You can access the app by visiting http://localhost:4200

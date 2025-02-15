# Deploy
### Backend
```
git subtree push --prefix backend heroku main
```
This means only the backend directory will be pushed to Heroku, allowing the backend to be deployed separately from the rest of the project.

### Frontend
```
git push origin HEAD
```
Since Netlify is set up to auto-deploy whenever changes are pushed to the repository, this command triggers the deployment process for the frontend.

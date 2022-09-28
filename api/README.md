**Setup instructions**

1. pull folder from github
2. install homebrew
3. do 'brew install python' (installs python3)
4. do 'brew install pipenv' (installs pipenv, a virtual environment manager for dependency management)
5. navigate to the /api directory and run 'pipenv shell' to start the virtual environment
6. run the app using 'python3 -m uvicorn main:app --reload
7. in web browser, go to '127.0.0.1:8000/api/docs


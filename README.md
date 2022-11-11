# Freshness Ecommerce - backend (Beta version)

## Project structure

<ul>
    <li>App-Folder
        <ul>
            <li>
             /src - project source code folder
                <ul>
                    <li>
                        /common - common things are stored here (commom middlewares eg validation, role)
                    </li>
                    <li>
                        /config - injectable service for working with environment variables
                    </li>
                    <li>
                        /constants - for general constants
                    </li>
                    <li>
                        /database - service for connection to database
                    </li>
                    <li>
                        /exceptions - handling http errors
                    </li>
                     <li>
                        /interfaces - global application interfaces 
                    </li>
                     <li>
                        /models - db models
                    </li>
                    <li>
                        /modules - business logic (module consists of controller, service, repository)
                    </li>
                    <li>
                        /services - additional services (working with jwt)
                    </li>
                     <li>
                        /utils - utility functions
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

### Setup environment variables

<ul>
    <li>PORT=8000</li>
    <li>CLIENT_URI=http://localhost:3000</li>
    <li>SERVER_URI=http://localhost:8000</li>
    <li>IMAGES_URI=http://localhost:8000</li>
    <li>IMAGES_URI=http://localhost:8000</li>
    <br />
    <li>DATABASE_URI_DEVELOPMENT=mongodb://localhost:27017/freshness</li>
    <li>DATABASE_URI_PRODUCTION=</li>
    <br />
    <li>SALT=</li>
    <li>JWT_ACCESS_SECRET=</li>
    <li>JWT_ACCESS_ALGORITHM=</li>
    <li>JWT_ACCESS_EXPIRES_IN=</li>
    <li>JWT_REFRESH_SECRET=</li>
    <li>JWT_REFRESH_ALGORITHM=</li>
    <li>JWT_REFRESH_EXPIRES_IN=</li>
    <li>COOKIES_JWT_REFRESH_EXPIRES_IN=</li>
    <br />
    <li>MAIL_HOST=</li>
    <li>MAIL_PORT=</li>
    <li>MAIL_AUTH_USER=</li>
    <li>MAIL_AUTH_PASS=</li>
</ul>

### Installation

### run `npm ci`

#### Code style

The project has installed and configured ES Lint and Prettier. All rules are set, you can learn them in .eslintrc file.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.\

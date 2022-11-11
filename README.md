# Freshness Ecommerce - backend (Beta version)

Ecomerce Next.js web application. With Atomic design pattern

## Project structure

<ul>
    <li>App-Folder
        <ul>
            <li>
             /src - project source code folder
                <ul>
                    <li>
                        /api - global config of axios
                    </li>
                    <li>
                        /assets - for assets (images, icons ...)
                    </li>
                    <li>
                        /components
                        <ul>
                        <li>
                        atoms - smallest building component in our application (button, input etc.)
                        </li>
                        <li>
                        molecules - e.g combining input and button (we get search component)
                        </li>
                        <li>
                        organisms - this where our logic and business components is (you can use here context, reducer etc.)
                        </li>
                         <li>
                        templates - collection of organisms
                        </li>
                        </ul>
                    </li>
                    <li>
                        /constants - for general constants
                    </li>
                    <li>
                        /context - react context (useReducer used)
                    </li>
                    <li>
                        /hooks - store custom hooks here
                    </li>
                     <li>
                        /interfaces - global application interfaces (user model etc.) 
                    </li>
                    <li>
                        /layout - header, footer
                    </li>
                    <li>
                        /pages - main entrypoints (you can fetch the data from server, you should use appropriate template here)
                    </li>
                     <li>
                        /services - localStorageService, userService...
                    </li>
                    <li>
                        /styles - for general styles and style variables
                    </li>
                     <li>
                        /utils - utility functions
                    </li>
                    <li>
                        /validators - rules of form validation
                    </li>
                </ul>
            </li>
            <li>
                /__test__ - project tests folder
                <ul>
                    <li>
                        /unit - unit tests, should duplicate project structure
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

#### Code style

The project has installed and configured ES Lint and Prettier. All rules are set, you can learn them in .eslintrc.json file.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `.next` folder.\

# Social Discussion Platform

The Social Discussion Platform is a comprehensive application designed to facilitate user interactions through a variety of features. Users can sign up and log in using a unique mobile number and email, ensuring secure and personalized access. Once registered, users can create, update, or delete discussions that include text, images, and hashtags to enhance the content. The platform allows users to search for other users by name and follow them, fostering a connected community. Users can post discussions and engage with content through comments and likes, with the ability to like comments and reply to them as well. Posts and comments can be edited or deleted, providing flexibility and control over shared content. Additionally, advanced search capabilities enable users to find posts based on hashtags or specific text within discussions. Each post features a view count, offering insights into the reach and popularity of the content. This robust platform ensures an interactive and engaging user experience, promoting dynamic and meaningful discussions within the community.

## Postman Collection and Environment

To interact with the API using Postman, you can download & import the provided collection and environment file links.

- [Postman Collection File](https://github.com/shivam-singh-au17/backend_assignment_spyne/blob/main/backend_assignment_spyne.postman_collection.json)
- [Postman Environment File](https://github.com/shivam-singh-au17/backend_assignment_spyne/blob/main/backend_assignment_spyne.postman_environment.json)

### Accessing the Postman Collection Online
You can also access the Postman collection directly using the following URL:
- [Postman URL](https://www.postman.com/shivam-singh-mzp/workspace/shivam-singh/collection/25164413-0b76129b-518c-445b-8b04-a9cb6990e242?action=share&creator=25164413)

## Logging

- Logging is implemented using winston to log API errors.
- Logs are written to both the console and a file (logs/app_error.log).

## Error Handling

- The API implements proper error handling for common scenarios such as invalid input and unauthorized access.
- Meaningful error messages are returned in the API responses to aid developers in debugging.

## Database Integration

- MongoDB is used for storing location item data, integrated using Mongoose ORM.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building server-side applications.
- **Express.js**: A web application framework for Node.js used to build RESTful APIs.
- **bcryptjs**: A library for securely hashing passwords before storing them in the database.
- **Docker**: Used for containerizing the application for ease of deployment and scaling.
- **MongoDB**: A NoSQL database for storing location data.
- **Mongoose**: An ODM for MongoDB and Node.js.

## Repository

The codebase for this API is available on GitHub.

**Repository URL**: [GitHub Repository](https://github.com/shivam-singh-au17/backend_assignment_spyne)

You can clone the repository to your local machine to explore the codebase.


4. ## Docker Deployment

    1. **Prerequisites**: Ensure you have Docker installed on your system. If not, you can download and install it from the [official Docker website](https://docs.docker.com/get-docker/).

    2. **Build the Docker Image**:
        - Open a terminal/command prompt.
        - Navigate to the root directory of your project.
        - Run the following command to build the Docker images:
            ```bash
            docker-compose build
            ```
        - This command builds the Docker images.

    3. **Run the Docker Container**:
        - After the image is successfully built, you can run the Docker container using the following command:
            ```bash
            docker-compose up
            ```
        - This command starts the container and runs your API inside it.

    4. **Access the API**:
        - Once the container is running, you can access your API at:
            ```
            http://localhost:80
            ```

    By following these steps, you can deploy your API locally using Docker and manage its lifecycle directly with Docker commands.

## How to Run the Project Locally

1. Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

2. Clone or download the repository to your local machine.
    ```bash
    git clone https://github.com/shivam-singh-au17/backend_assignment_spyne
    ```

3. Open your terminal or command prompt and navigate to the directory where you have downloaded the files.

4. Run the following command to install dependencies for every service root directory:
    ```bash
    npm install
    ```

5. Once the dependencies are installed, run the following command to start the development server:
    ```bash
    npm run dev
    ```

Feel free to explore the API and provide feedback or suggestions for improvement. Thank you for your attention!

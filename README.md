# E-Commerce Project Backend

### Overview
Welcome to the backend of our E-Commerce project! This project provides a robust backend solution for managing users, products, categories, reviews, and more. It leverages MySQL with TypeORM for database management, Jest for unit testing, AWS services like S3 for image storage, RDS for database hosting, EC2 for deployment, and Docker for containerization. Continuous Integration/Continuous Deployment (CI/CD) is handled using GitHub Actions.

### Features
#### User Management:

User registration with email verification.
Admin registration with special privileges.
Token-based authentication for secure login.
#### User CRUD Operations:

Create, Read, Update, and Delete user profiles.
Admins can manage user accounts efficiently.
#### Product Management:

CRUD operations for products.
Image uploading to S3 service for product images.
#### Category Management:

CRUD operations for product categories.
#### Review System:

Allow customers to leave reviews for products.
Admins can manage and moderate product reviews.
#### Search Functionality:

Search for products and customers based on various criteria.
## Tech Stack
#### Database:

MySQL with TypeORM for efficient data management.
#### Authentication:

Token-based authentication for user login.
#### Testing:

Unit testing using Jest for code quality assurance.
#### AWS Services:

S3 for image storage.
RDS for hosting the MySQL database.
EC2 for deployment.
#### Containerization:

Docker for containerization, ensuring consistent deployment environments.
#### CI/CD:

GitHub Actions for automated CI/CD pipeline.
## Getting Started
#### 1-Clone the Repository:

``
git clone https://github.com/your-username/e-commerce-backend.git
cd e-commerce-backend``
#### 2-Install Dependencies:

``npm install``

#### 3-Environment Variables:

Create a ``.env`` file based on the provided ``.env.example ``and fill in the necessary details.
#### 4-Database Setup:

Set up a MySQL database and update the connection details in the ``.env`` file.
#### 5-Run Migrations:

bash
``npm run migration:run``
#### 6-Start the Server:

bash
``npm run dev``
#### 7-Run Tests:

bash
``npm run test``
### API Documentation
For detailed information on available endpoints and their usage, please refer to the API Documentation.

### Contributing
If you'd like to contribute to this project, please follow our Contribution Guidelines.

### License
This project is licensed under the MIT License.

# MySQL Backup Script

This Node.js script allows you to easily back up MySQL databases using the [`mysqldump`](https://www.npmjs.com/package/mysqldump) package. Connection credentials and the backup path are managed securely via a `.env` file.

## Features
- Backup one or multiple MySQL databases.
- Export `.sql` files to a specified path.
- Use environment variables for secure and flexible configuration.

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- MySQL/MariaDB accessible from your machine.
- Appropriate permissions to connect to the database and perform a dump.

## Installation
1. Clone this repository or download the script files.
2. Install the required dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Create a .env file in the project root by copying the provided env.sample file:

   ```bash
   cp .env.sample .env
   ```

2. Edit the .env file with your MySQL database credentials and backup path:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   BACKUP_PATH=./
   ```

   - DB_HOST: Your MySQL server address (default is localhost).
   - DB_PORT: MySQL server port (default is 3306).
   - DB_USER: MySQL user.
   - DB_PASSWORD: MySQL user password.
   - BACKUP_PATH: The directory where backup files will be stored (ensure this path exists).

## Usage
1. Update the `db` array in the index.js file to include the databases you want to backup.

    ```js
    const db = [
        { dbName: 'example_db1' },
        { dbName: 'example_db2' },
    ];
    ```	

2. Run the script:
    ```bash
    npm run dump
    ```
    - Alternative: Run the `dbDump.bat` file

3. The backup files will be saved in the specified `BACKUP_PATH` with names like `backup_<database_name>.sql`.

## Schedule Daily Backups with Windows Task Scheduler
To automate the backup every day, you can use the Windows Task Scheduler.

### Step 1: Create the Task
1. Open the Windows Start menu and search for Task Scheduler.
2. In Task Scheduler, click on Create Task (on the right-hand side).
3. In the General tab:
    - Enter a name for your task (e.g., MySQL Daily Backup).
    - Select the option Run whether user is logged on or not.
    - Check Run with highest privileges.
4. In the Triggers tab:
    - Click New....
    - Set Begin the task to On a schedule.
    - Select Daily and set the time you want the backup to run.
    - Click OK.
5. In the Actions tab:
    - Click New....
    - Set Action to Start a program.
    - In the Program/script field, browse to your backup.bat file.
    - Click OK.
6. In the Conditions tab:
    - Uncheck Start the task only if the computer is on AC power (if you want backups to run on laptops even when on battery).
7. Click OK to save the task.
8. You will be prompted to enter your Windows user credentials for authentication.

### Step 2: Test the Task
1. In Task Scheduler, locate your task.
2. Right-click on it and choose Run.
3. Check your backup folder to ensure the backup files are created successfully.

## Example `.env` file
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    BACKUP_PATH=./
    ```

## Error Handling
- If the script encounters an error, it will log the error message and exit.
- Ensure the `BACKUP_PATH` directory exists and is writable.
- Check your MySQL credentials and permissions.

## License
This project is licensed under the MIT License.
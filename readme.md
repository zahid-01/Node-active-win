# App Activity Tracker

This Node.js application tracks the activity of apps opened on your computer and logs it into a file called `processes.json`.

## Installation

1. Clone the repository to your local machine:

2. Navigate to the project directory:

3. Install dependencies:

## Usage

Start the application by running:

The application will start tracking the activity of opened apps on your computer. All activity will be logged into a file called `processes.json`.

## File Structure

- `index.js`: Main entry point of the application.
- `processes.json`: Log file where app activity is recorded.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.

## Development

For now URL of active tabs are fetched only on debuging mode, when electron app is developed, it wont be necessary.

1. firefox --remote-debugging-port=9223
2. chrome --remote-debugging-port=9222

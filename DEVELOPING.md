# NLUDB

We are excited to have you on board!

These instructions contain the setup for contributors fo the NLUDB Typescript client library.

For information about _using_ this library, please see README.md

## Basic Information

- The project targets Typescript
- Testing is automated via Jest
- We recommend VS Code as a development environment

## Development Setup

After cloning the repository, run `npm install`.

## Testing

### Configuring Test Credentials

This project's unit tests are intended to be performed against a running NLUDB server. They all execute by loading the `test` profile from your NLUDB client configuration.

To establish this profile, edit your `~/.nludb.json` file to ensure it has the following:

```
{
  "profiles": {
    "test": {
			"apiKey": "your-testuser-key"
    }
  }
}
```

For NLUDB employees who may be testing against a server running on localhost, additionally add the following `apiBase` argument to your `test` profile:

```
{
  "profiles": {
    "test": {
			"apiKey": "your-testuser-key",
		  "apiBase": "http://localhost:8080/api/v1"
    }
  }
}
```

### Testing Style

In general, each test should attempt to:

1. Create resources with randomized handles (to avoid collision).
2. Delete resources after test completion

### Testing in VS Code

This project's configuration should result in automatic test availability for Visual Studio Code.

1. Click on the chemistry beaker icon at left
2. Find the test you would like to run
3. Click either `Run` or `Run with Debug`

That's it: you should see the output in your editing window.

### Testing on the Command Line

Run `npm run test`

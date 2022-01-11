# Kolibri CLI

The Kolibri CLI allows to interact with a Kolibri Broker with a simple command line interface. It can be used for quick testing, debugging or monitoring use cases.
The Kolibri CLI uses the @hms-networks/kolibri-js-client to communicate with the Kolibri Broker.

## Features

The Kolibri CLI is easy to use and provide two modes. Repl mode for manual interactions and a scripted mode for scripted interactions with the Kolibri Broker.

- 2 Modes (Repl and Scripted)
- Full access the Kolibri Broker's Consumer API.
- Ability to subscribe to node and user events.
- Custom config for the scripted mode.
- ENV Vars for the scripted mode
- Support for multiple OS
- Single binary
- help command
- Command history

## Install

TBD

### OS Support

- Linux
- Windows
- MacOS (not tested)

## Getting Started

Starting the Kolibri CLI in just one command.

```bash
./kolibri-cli-linux
```

Inside the REPL Interface type help to see all available commands.

```bash
> help 
You need to connect and login before executing RPC commands
kolibri-cli-linux <command>

Commands:
  kolibri-cli-linux connect                 Connects to the Kolibri Broker
  kolibri-cli-linux login                   Login to the Kolibri Broker
  kolibri-cli-linux close                   Closes the broker connection
  kolibri-cli-linux write                   Updates the state of one point.
  kolibri-cli-linux read                    Gets the current state of one point.
  ...
```

Each command has its own detailed help command

```bash
> login help 
You need to connect and login before executing RPC commands
kolibri-cli-linux login

Login to the Kolibri Broker

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --user      Username                                                  [string]
  --password  Password                                                  [string]
  --token     Token                                                     [string]
  --interval  Interval                                    [number] [default: 60]
  --timeout   Timeout                                      [number] [default: 5]
```

### Proxy Settings

Not supported yet

## Scripted Mode

The scripted mode connects and logs in to the Kolibri Broker automatically before the Kolibri RPC invocation. After the invocation the connection is closed down.
Therefore to be able to use the scripted mode a config file must be available in the $HOME/.kolibri-cli/ directory. On first startup of the Kolibri CLI this
directory and a default config file $HOME/.kolibri-cli/config.env will be created. Inside this file you need to fill in the specified parameters.
Alternatively you can also specify your custom config file path with:

```bash
./kolibri-cli-linux --config-file $HOME/my/custom/path/config.env user.browse 
```

If you do not want to store your connection and login information in a file, then you can use ENV vars for this. E.g.

```bash
export KOLIBRI_LOGIN_USER=myuser
export KOLIBRI_LOGIN_PASSWORD=mypassword
./kolibri-cli-linux --config-file $HOME/my/custom/path/config.env user.browse 
```

ENV variables have a precedence over the config file.

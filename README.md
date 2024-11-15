# replicator-common [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/license/mit/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/databox/replicator-common/pulls)

The `replicator-common` monorepo provides multiple packages for common utilities, interfaces, and configurations that are shared across different replicator services. It leverages the NestJS framework for building scalable server-side applications and includes TypeScript code for type safety.

## Features

- Common utilities and helpers
- Shared interfaces and types
- Configuration management
- TypeScript support
- Integration with NestJS framework

## Installation

To install the package, use the following command:

```sh
npm install @databox/config-provider
npm install @databox/redis-provider
```

## Usage

Import and use the utilities and interfaces provided by the package in your NestJS application:
```typescript
import { SomeUtility, SomeInterface } from '@databox/replicator-common';

@Injectable()
export class SomeService {
	constructor(private readonly someUtility: SomeUtility) {}

	someMethod(): SomeInterface {
		// Your logic here
	}
}
```

## Scripts
The package includes several npm scripts for development and testing:  
- `build`: Build the package using the NestJS CLI
- `watch`: Build the package in watch mode
- `format`: Format the code using Prettier
- `lint`: Lint the code using ESLint
- `test`: Run tests using Jest
- `test:watch`: Run tests in watch mode
- `test:cov`: Run tests and generate coverage report
- `bump:config-provider`: Bump the version of the config-provider package
- `bump:redis-provider`: Bump the version of the redis-provider package

## Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

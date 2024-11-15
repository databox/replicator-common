import { Injectable } from "@nestjs/common";
import { IConfigProvider } from "../contracts/interfaces/IConfigProvider";
import { ConfigException } from "../exceptions/ConfigException";

@Injectable()
export class PredefinedConfigProvider implements IConfigProvider {
	constructor(private readonly predefinedConfig: Record<string, unknown>) {}

	required(keys: string[]): void {
		const hasAllKeys = keys.every((key) => this.get(key) !== undefined);
		if (!hasAllKeys) {
			throw new ConfigException("Missing required key");
		}
	}

	get<T>(key: string): T {
		const nester = (data: unknown, keyString: string): unknown => {
			const splitIndex = keyString.indexOf(":");
			const [selectedKey, leftover] = [keyString.slice(0, splitIndex), keyString.slice(splitIndex + 1)];

			if (splitIndex === -1) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				// @ts-expect-error we expect property usage
				return data[keyString] as unknown;
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			// @ts-expect-error we expect property usage
			const selectedData = data[selectedKey] as unknown;
			return nester(selectedData, leftover);
		};

		return nester(this.predefinedConfig, key) as T;
	}

	getOrThrow<T>(key: string): T {
		const value = this.get(key);

		if (typeof value === "undefined") {
			throw new ConfigException(`Key ${key} is missing in config`);
		}

		return value as T;
	}
}

import nconf from "nconf";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigException } from "../exceptions";
import { IConfigProvider } from "../contracts/interfaces";

@Injectable()
export class NconfConfigProvider implements IConfigProvider, OnModuleInit {
	constructor() {
		this.load();
	}

	onModuleInit() {
		this.load();
	}

	private load() {
		nconf.reset();
		nconf.argv().env({
			separator: "__",
			lowerCase: true
		});

		const env = nconf.get("environment") as string;

		nconf.file({
			file: `config.${env}.json`
		});
	}

	required(keys: string[]): void {
		nconf.required(keys);
	}

	get<T>(key: string): T {
		return nconf.get(key) as T;
	}

	getOrThrow<T>(key: string): T {
		const value = nconf.get(key) as unknown;

		if (typeof value === "undefined") {
			throw new ConfigException(`Key ${key} is missing in config`);
		}

		return value as T;
	}
}

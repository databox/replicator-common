export interface IConfigProvider {
	get<T>(key: string): T;
	getOrThrow<T>(key: string): T;
	required(keys: string[]): void;
}

export const IConfigProvider = Symbol("IConfigProvider");

import { Global, Module } from "@nestjs/common";
import { IConfigProvider } from "./contracts/interfaces/IConfigProvider";
import { NconfConfigProvider } from "./providers/NconfConfigProvider";

@Global()
@Module({
	imports: [],
	providers: [
		{
			provide: IConfigProvider,
			useClass: NconfConfigProvider
		}
	],
	exports: [IConfigProvider]
})
export class ConfigProviderModule {}

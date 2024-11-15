import { Global, Module } from "@nestjs/common";
import { IConfigProvider } from "./contracts/interfaces";
import { NconfConfigProvider } from "./providers";

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

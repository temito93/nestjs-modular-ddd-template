import { DynamicModule, Module } from '@nestjs/common';
import { Country } from '@app/common/enums';

interface StrategyRegistration {
  token: symbol;
  strategies: Partial<Record<Country, new (...args: never[]) => unknown>>;
}

@Module({})
export class CountryStrategyModule {
  static forFeature(registrations: StrategyRegistration[]): DynamicModule {
    const country = process.env.COUNTRY?.toUpperCase();

    if (!country || !Object.values(Country).includes(country as Country)) {
      throw new Error(
        `Invalid or missing COUNTRY env variable: "${country}". Expected one of: ${Object.values(Country).join(', ')}`,
      );
    }

    const { providers, exports } = registrations.reduce<{
      providers: {
        provide: symbol;
        useClass: new (...args: never[]) => unknown;
      }[];
      exports: symbol[];
    }>(
      (acc, registration) => {
        const Strategy = registration.strategies[country as Country];

        if (!Strategy) {
          throw new Error(
            `No strategy found for country "${country}" with token "${registration.token.toString()}"`,
          );
        }

        acc.providers.push({ provide: registration.token, useClass: Strategy });
        acc.exports.push(registration.token);

        return acc;
      },
      { providers: [], exports: [] },
    );

    return {
      module: CountryStrategyModule,
      providers,
      exports,
    };
  }
}

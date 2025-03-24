/* We put all shared types here

This way, both FE and BE can easily access them via using the @common syntax
like this:  import { ExampleType } from '@common/types' */

export interface ExampleType {
  someProperty: string;
}

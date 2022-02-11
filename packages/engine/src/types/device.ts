import { HasName } from './base';

export type Device = HasName & {
  features: string;

  mac?: string | null;

  addedTime?: Date;

  updateTime?: Date;
};

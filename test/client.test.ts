import {getSteamshipClient} from '../src';
// @ts-ignore
import {
  randomName,
  steamshipClient
// @ts-ignore
} from './helper';

describe('Steamship Client', () => {
  test('it should load the proper workspace', async () => {
    const steamship = getSteamshipClient({
      workspace: "my-workspace"
    });
    let config = await steamship.config;
    expect(config.workspaceHandle).toBe('my-workspace');
  });
});

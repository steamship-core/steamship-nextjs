import {getSteamshipPackage} from '../src';
// @ts-ignore
import {
  randomName,
  steamshipClient
// @ts-ignore
} from './helper';

describe('Steamship Package', () => {
  test('it should be able to get a string', async () => {
    const pkg = await getSteamshipPackage({
      workspace: "my-workspace",
      pkg: "kitchen-sink"
    });

    let resp = await pkg.invoke("greet")
    let s = resp.data
    expect(s).toBe("Hello, Person!")
  });

  test('it should be able to get json', async () => {
    const pkg = await getSteamshipPackage({
      workspace: "my-workspace",
      pkg: "kitchen-sink"
    });

    let resp = await pkg.invoke("resp_dict", {}, "GET")
    let s = resp.data
    expect(typeof s).toBe('object')
    expect(s.int).toBe(10)
    expect(s.string).toBe("A String")
  });

  test('it should be able to get binary', async () => {
    const pkg = await getSteamshipPackage({
      workspace: "my-workspace",
      pkg: "kitchen-sink"
    });

    let resp = await pkg.invoke("resp_image", {}, "GET")
    let s = resp.data
    expect(typeof s).toBe('string') // It's a binary string.
  });
});

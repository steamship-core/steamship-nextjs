import getSteamshipClient, {GetSteamshipClientProps} from "./getSteamshipClient.js";
import {Md5} from "ts-md5";


export interface GetSteamshipPackageProps extends GetSteamshipClientProps {
  // The package whose method you want to proxy
  pkg: string,

  // The optional version of the package
  version?: string,

  // The config of the package whose method you want to proxy
  config?: Map<string, any>,
}

/**
 * When package configuration or version information changes, it locates the new instance in the SAME
 * workspace as prior versions. This ensures continuity of data persisted across different configurations
 * and versions.
 *
 * @param props
 */
export default async function getSteamshipPackage(props: GetSteamshipPackageProps) {
  const { pkg, version } = props;
  if ((!pkg) || (typeof pkg == "undefined")) {
    throw new Error('Missing Steamship `package` in props. This unique handle ([a-z0-9-]) identifies the API you wish to invoke.')
  }

  const client = getSteamshipClient(props)

  const config = props.config || {};

  // Calculate an instance handle that reflects a hash of the config.
  const configJsonString = JSON.stringify(config, Object.keys(config).sort());
  const md5 = new Md5();
  md5.appendStr(configJsonString)
  const configMd5 = md5.end()

  let pkgInstanceHandle = `${props.workspace}-${configMd5}`

  if (version) {
    var handleSaveVersion = version.replace(/[^a-z0-9-]/g, '');
    pkgInstanceHandle = `${pkgInstanceHandle}-v${handleSaveVersion}`
  }

  const reuse = true;

  let instance = await client.use(
    pkg,
    pkgInstanceHandle,
    config,
    version,
    reuse
  )
  return instance;
}

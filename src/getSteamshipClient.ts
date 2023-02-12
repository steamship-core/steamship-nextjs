import {Steamship} from "@steamship/client"

export interface GetSteamshipClientProps{
  // Isolates all data persisted & involved in the request.
  workspace: string,

  // Optional Steamship API Key
  api_key?: string,
}

export default function getSteamshipClient(props: GetSteamshipClientProps) {
  let api_key = props.api_key || process.env.STEAMSHIP_API_KEY;
  if ((!api_key) || (typeof api_key == "undefined")) {
    throw new Error('Missing Environment Variable STEAMSHIP_API_KEY. Get one at https://steamship.com/account/api.')
  }

  if ((!props.workspace) || (typeof props.workspace == "undefined")) {
    throw new Error('Missing Steamship `workspace` in props. This unique handle ([a-z0-9-]) scopes all persistent data and model tunings.')
  }

  return new Steamship({
      apiKey: api_key,
      workspace: props.workspace
  })
}

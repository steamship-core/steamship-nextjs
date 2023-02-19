import getSteamshipClient, {GetSteamshipClientProps} from "./getSteamshipClient.js";
import {Task} from "@steamship/client";


export interface GetTaskProps extends GetSteamshipClientProps {
  // The task ID whose result you wish to fetch
  taskId: string,
}

/**
 * Returns a task in progress.
 *
 * @param props
 */
export default async function getTask(props: GetTaskProps) {
  const client = getSteamshipClient(props)

  const {taskId} = props;

  if (!taskId) {
      throw new Error('Missing taskId  in props.')
  }

  let task = Task(client, {taskId})
  task.update();
  return task;
}

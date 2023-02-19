import getSteamshipClient, {GetSteamshipClientProps} from "./getSteamshipClient.js";
import {Task} from "@steamship/client";


export interface GetTaskProps extends GetSteamshipClientProps {
  // The task ID whose result you wish to fetch
  taskId: string,
}

export interface TaskResult {
  taskId: string;
  output?: string; // Base64
  state: string;
  statusMessage?: string;
}

/**
 * Returns a task in progress.
 *
 * @param props
 */
export default async function getTask(props: GetTaskProps): Promise<TaskResult> {
  const client = getSteamshipClient(props)

  const {taskId} = props;

  if (!taskId) {
    throw new Error('Missing taskId  in props.')
  }

  try {
    // @ts-ignore
    let task = new Task<T>(client, {taskId})
    await task.check();

    // Return JSON to the web client.
    const taskJson = { taskId: task.taskId || taskId, state: task.state, statusMessage: task.statusMessage, output: task.output }

    if (taskJson.state == 'succeeded') {
      // Output will be Base64 encoded so that binary is available.
      try {
        let buff = new Buffer(taskJson.output as any, 'base64');
        taskJson.output = buff.toString('utf-8'); // We know it's utf-8 here.
      } catch {
        console.log("Base64 decoding of task output failed.")
      }
    }
    return taskJson
  } catch (ex) {

    const taskJson = { taskId, state: 'failed', statusMessage: 'An unexpected error happened.'}

    const awaitedEx = (await ex) as any;

    if (awaitedEx?.response?.data?.status?.statusMessage) {
      taskJson.statusMessage = awaitedEx?.response?.data?.status?.statusMessage;
    }

    return taskJson
  }
}

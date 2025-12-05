import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

/**
 * @typedef {Object} ResponseBody
 * @property {string} completion
 */

type Citations = {
  generatedResponsePart: {
    textResponsePart: [Record<string, any>];
  };
  retrievedReferences: [Record<string, any>];
}[];

type Metadata = {
  article_id: string;
  subtype: string;
  "x-amz-bedrock-kb-data-source-id": string;
  "x-amz-bedrock-kb-source-file-modality": string;
  standfirst: string;
  created_at: string;
  published: string;
  published_at: string;
  headline: string;
  "x-amz-bedrock-kb-chunk-id": string;
  authors: string;
};

/**
 * Invokes a Bedrock agent to run an inference using the input
 * provided in the request body.
 *
 * @param {string} prompt - The prompt that you want the Agent to complete.
 * @param {string} sessionId - An arbitrary identifier for the session.
 */
export const invokeBedrockAgent = async (prompt: string, sessionId: string) => {
  const client = new BedrockAgentRuntimeClient({
    region: "eu-central-1",
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
      sessionToken: "",
    },
  });
  const agentId = "MDOQ3CWZ4A";
  const agentAliasId = "MM28XPA6HE";

  const command = new InvokeAgentCommand({
    agentId,
    agentAliasId,
    sessionId,
    inputText: prompt,
  });

  try {
    let completion = "";
    const response = await client.send(command);

    if (response.completion === undefined) {
      throw new Error("Completion is undefined");
    }

    const references: Metadata[] = [];

    for await (const chunkEvent of response.completion) {
      const chunk = chunkEvent.chunk;
      if (
        chunk &&
        "attribution" in chunk &&
        chunk.attribution &&
        "citations" in chunk.attribution &&
        chunk.attribution.citations
      ) {
        const citations: Citations = chunk.attribution
          .citations as unknown as Citations;

        for (const ref of citations) {
          ref.retrievedReferences.forEach((r) => {
            const metadata: Metadata = r.metadata;
            references.push(metadata);
          });
          // console.log("Generated part:", ref.generatedResponsePart.textResponsePart); // This is the text span
        }
      }
      const decodedResponse = new TextDecoder("utf-8").decode(chunk?.bytes);
      completion += decodedResponse;
    }

    return { response, sessionId: sessionId, completion, references };
  } catch (err) {
    console.error(err);
  }
};

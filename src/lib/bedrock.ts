import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

const bedrockClient = new BedrockAgentRuntimeClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: "",
  },
});

export const queryKnowledgeBase = async (query: string): Promise<any> => {
  const command = new InvokeAgentCommand({
    agentId: "MDOQ3CWZ4A",
    agentAliasId: "FLVMXIYJRP",
    sessionId: crypto.randomUUID(),
    inputText: query,
  });

  const response = await bedrockClient.send(command);

  // Decode the response stream
  let completion = "";
  if (response.completion) {
    for await (const chunk of response.completion) {
      if (chunk.chunk?.bytes) {
        const text = new TextDecoder().decode(chunk.chunk.bytes);
        completion += text;
      }
    }
  }

  return completion;
};

export const retrieveAndGenerate = async (
  knowledgeBaseId: string,
  query: string,
): Promise<string> => {
  const command = new RetrieveAndGenerateCommand({
    input: {
      text: query,
    },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId,
        modelArn:
          "arn:aws:bedrock:region::foundation-model/anthropic.claude-v2",
      },
    },
  });

  const response = await bedrockClient.send(command);
  return response.output?.text || "";
};

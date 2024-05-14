import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Heading, Text, Spinner } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      setResponse("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} p={8}>
      <Heading>GPT-3.5 Turbo Prompt</Heading>
      <Input placeholder="Enter your prompt here..." value={prompt} onChange={handlePromptChange} />
      <Button leftIcon={<FaPaperPlane />} colorScheme="teal" onClick={handleSubmit} isDisabled={loading}>
        Submit
      </Button>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
          <Text>{response}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Index;
